const FORMS = {
    masterclass: '1FAIpQLSe4gbGxlKZJEKrv4Cpg22ajDIbZY2kULveHhkptYiXAkX9S_Q',
    checkout: '1FAIpQLSdFSWdStRCOAbHqfkPO_7Aj-HYM2-JyJsR_scx_q6rE_Bba3Q',
    agenda: '1FAIpQLSe-0p0EZfQZ14HY8bOc47tkyUmKzZdWJRgl4ztzQw9y-fKNWg'
};

const FIELD_MAP = {
    masterclass: {
        nombre: 'entry.1131854161',
        email: 'entry.601882798',
        telefono: 'entry.1650002445'
    },
    checkout: {
        nombre: 'entry.2009859634',
        email: 'entry.1180103440',
        telefono: 'entry.190249211'
    },
    agenda: {
        nombre: 'entry.274453835',
        email: 'entry.1187255089',
        telefono: 'entry.41779768',
        motivo: 'entry.355106775',
        fecha: 'entry.402920034'
    }
};

async function saveToDatabase(data, formType = 'masterclass') {
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
    
    return { success: true };
}