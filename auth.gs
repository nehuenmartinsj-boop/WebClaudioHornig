// ============================================
// AUTH SERVICE - Google Apps Script
// Desployar como Web App
// ============================================

const AUTHORIZED_EMAILS = [
  'nehuen.martin.sj@gmail.com'
];

function doGet() {
  return ContentService.createTextOutput('Auth Service Running');
}

// Verificar email autorizado
function verifyEmail(email) {
  return AUTHORIZED_EMAILS.includes(email.toLowerCase());
}

// API endpoint para verificar desde el frontend
function verifyAccess(email) {
  const isAuthorized = verifyEmail(email);
  return ContentService.createTextOutput(JSON.stringify({
    authorized: isAuthorized,
    email: email
  })).setMimeType(ContentService.MimeType.JSON);
}

// Obtener lista de emails autorizados (para admin)
function getAuthorizedEmails() {
  return AUTHORIZED_EMAILS.map(e => ({ email: e }));
}