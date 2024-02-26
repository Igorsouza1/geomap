// src/services/apiService.js
import axios from '../utils/axios';

function getCSRFToken() {
  let cookieValue = null;
  const name = 'csrftoken';
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function submitShape(formData) {
  axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken();

  return axios.post('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function fetchMapas() {
  return axios.get('/mapas/');
}
