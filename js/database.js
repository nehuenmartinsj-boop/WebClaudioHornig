const FORMS = {
    masterclass: '1FAIpQLSe4gbGxlKZJEKrv4Cpg22ajDIbZY2kULveHhkptYiXAkX9S_Q',
    checkout: '1FAIpQLSdFSWdStRCOAbHqfkPO_7Aj-HYM2-JyJsR_scx_q6rE_Bba3Q',
    agenda: '1FAIpQLSe-0p0EZfQZ14HY8bOc47tkyUmKzZdWJRgl4ztzQw9y-fKNWg'
};

const FIELD_MAP = {
    masterclass: {
        nombre: 'entry.1131854161',
        email: 'entry.601882798',
        telefono: 'entry.1650002445',
        ciudad: 'entry.996912712'
    },
    checkout: {
        nombre: 'entry.2009859634',
        email: 'entry.1180103440',
        telefono: 'entry.190249211',
        rut: 'entry.122704312'
    },
    agenda: {
        nombre: 'entry.274453835',
        email: 'entry.1187255089',
        telefono: 'entry.41779768',
        rut: 'entry.199259602',
        ciudad: 'entry.9876543210',
        motivo: 'entry.355106775',
        fecha: 'entry.402920034'
    }
};

const LEAD_STATUS = {
    SUSPECTO: 'suspecto',
    LEAD: 'lead',
    CLIENTE: 'cliente',
    FIDELIZADO: 'fidelizado'
};

const LEAD_FUENTE = {
    MASTERCLASS: 'masterclass',
    AGENDA: 'agenda',
    CURSO: 'curso',
    ORGANICO: 'organico'
};

function getLeads() {
    const leads = localStorage.getItem('leads');
    return leads ? JSON.parse(leads) : [];
}

function saveLeads(leads) {
    localStorage.setItem('leads', JSON.stringify(leads));
}

function findLeadByEmail(email) {
    const leads = getLeads();
    return leads.find(l => l.email.toLowerCase() === email.toLowerCase());
}

function getOrCreateLead(email, nombre, fuente = LEAD_FUENTE.MASTERCLASS, ciudad = '') {
    const leads = getLeads();
    let lead = leads.find(l => l.email.toLowerCase() === email.toLowerCase());
    
    if (!lead) {
        const now = new Date().toISOString();
        lead = {
            id: Date.now().toString(),
            nombre,
            email,
            ciudad: ciudad || '',
            status: LEAD_STATUS.LEAD,
            fuente,
            score: 10,
            fecha_registro: now,
            ultima_interaccion: now,
            notas: []
        };
        leads.push(lead);
        saveLeads(leads);
    } else if (ciudad && !lead.ciudad) {
        lead.ciudad = ciudad;
        saveLeads(leads);
    }
    
    return lead;
}

function updateLeadStatus(email, status, nota = '') {
    const leads = getLeads();
    const lead = leads.find(l => l.email.toLowerCase() === email.toLowerCase());
    
    if (lead) {
        lead.status = status;
        lead.ultima_interaccion = new Date().toISOString();
        if (nota) {
            lead.notas.push({ fecha: new Date().toISOString(), texto: nota });
        }
        saveLeads(leads);
    }
}

function updateLeadScore(email, scoreDelta, nota = '') {
    const leads = getLeads();
    const lead = leads.find(l => l.email.toLowerCase() === email.toLowerCase());
    
    if (lead) {
        lead.score = Math.min(100, Math.max(0, lead.score + scoreDelta));
        lead.ultima_interaccion = new Date().toISOString();
        if (nota) {
            lead.notas.push({ fecha: new Date().toISOString(), texto: nota });
        }
        saveLeads(leads);
    }
}

function getLeadsByStatus(status) {
    const leads = getLeads();
    return leads.filter(l => l.status === status);
}

function getLeadSummary() {
    const leads = getLeads();
    return {
        total: leads.length,
        suspecto: leads.filter(l => l.status === LEAD_STATUS.SUSPECTO).length,
        lead: leads.filter(l => l.status === LEAD_STATUS.LEAD).length,
        cliente: leads.filter(l => l.status === LEAD_STATUS.CLIENTE).length,
        fidelizado: leads.filter(l => l.status === LEAD_STATUS.FIDELIZADO).length,
        promedioScore: leads.length ? Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length) : 0
    };
}

async function saveToDatabase(data, formType = 'masterclass', leadNota = '') {
    const formId = FORMS[formType] || FORMS.masterclass;
    const fields = FIELD_MAP[formType] || FIELD_MAP.masterclass;
    
    const targetUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
    
    const formData = new URLSearchParams();
    
    Object.entries(fields).forEach(([key, entryId]) => {
        if (data[key] !== undefined && key !== 'fecha') {
            formData.append(entryId, data[key]);
        }
    });
    
    if (formType === 'agenda' && data.motivo) {
        const match = data.motivo.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
        if (match) {
            formData.append('entry.402920034', `${match[3]}-${match[2]}-${match[1]}`);
        }
    }
    
    try {
        await fetch(targetUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        console.log('Datos enviados (no-cors):', data);
    } catch (error) {
        console.error('Error:', error);
    }
    
    const fuente = formType === 'masterclass' ? LEAD_FUENTE.MASTERCLASS :
                   formType === 'agenda' ? LEAD_FUENTE.AGENDA :
                   formType === 'checkout' ? LEAD_FUENTE.CURSO : LEAD_FUENTE.ORGANICO;
    
    const lead = getOrCreateLead(data.email, data.nombre, fuente);
    
    if (formType === 'masterclass') {
        updateLeadScore(data.email, 20, 'Registrado en masterclass');
    } else if (formType === 'agenda') {
        updateLeadScore(data.email, 40, 'Reservó cita');
        updateLeadStatus(data.email, LEAD_STATUS.CLIENTE);
    } else if (formType === 'checkout') {
        updateLeadScore(data.email, 50, 'Compró curso');
        updateLeadStatus(data.email, LEAD_STATUS.CLIENTE);
    }
    
    if (data.ciudad && lead) {
        lead.ciudad = data.ciudad;
        saveLeads(getLeads());
    }
    
    leadNota && updateLeadScore(data.email, 0, leadNota);
    
    return { success: true, lead };
}