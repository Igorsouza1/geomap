// axios-config.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // URL base do seu servidor Django
  // Outras configurações podem ser definidas aqui
});

export default axiosInstance;
