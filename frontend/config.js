
const config = {

  apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://seu-backend.up.railway.app'  
};


window.API_URL = config.apiUrl;