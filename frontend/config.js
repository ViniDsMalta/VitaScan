
const config = {

  apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://vitascan-backend-axs2.onrender.com'  
};


window.API_URL = config.apiUrl;