import CONFIG from '../config';
import { getToken } from '../utils';

const ENDPOINTS = {
  STORIES : `${CONFIG.BASE_URL}/stories`,
  ADD_STORY : `${CONFIG.BASE_URL}/stories`,
  LOGIN : `${CONFIG.BASE_URL}/login`,
  REGISTER : `${CONFIG.BASE_URL}/register`,
};


export async function getData() {
  try {
    const fetchResponse = await fetch(ENDPOINTS.STORIES, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
  
    if(!fetchResponse.ok) throw new Error("Gagal mengambil data cerita");
    
    return await fetchResponse.json();
  } catch (error) {
    console.error('Gagal mengambil data cerita:', error);
    return { listStory: [] }
  }
}

export async function fetchStoryById(id) {
  try {
    const response = await fetch(`${ENDPOINTS.STORIES}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    if(!response.ok) throw new Error('Gagal mengambil detail cerita');

    const data = await response.json();
    return data.story;
  } catch (error) {
    console.error('Gagal mengambil detail cerita:', error);
    return null;
  }
}
export async function addStory({ description, photo, lat, lon }){
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if(lat && lon) {
    formData.append('lat', lat);
    formData.append('lon', lon);
  }

  for (let pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1]);
  }
  try {

    const response = await fetch(ENDPOINTS.ADD_STORY, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData,
    });
    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(`Gagal menambahkan cerita: ${errorMsg.message || JSON.stringify(errorJson)}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Gagal menambahkan cerita:', error);
    throw error;
  }
} 

export async function login({ email, password }) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Gagal masuk');
    }

    const data = await response.json();

    if(!data.error && data.loginResult?.token){
      localStorage.setItem('token', data.loginResult.token);
      localStorage.setItem('name', data.loginResult.name);
    }
    return data;
  } catch (error) {
    console.error('Gagal login:', error);
    throw error;
  }
}

export async function register({ name, email, password }) {
  try {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Gagal mendaftar');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Gagal mendaftar:', error);
    throw error;
  }
}