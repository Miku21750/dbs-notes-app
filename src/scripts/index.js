// CSS imports
import '../styles/styles.css';

import App from './pages/app';

import { isLoggedIn, getUserName, logout } from './utils/auth';
import { goto, urlBase64ToUint8Array } from './utils/transition';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});



function updateNavbar() {
  const navList = document.getElementById('nav-list');
  navList.innerHTML = '';

  const beranda = document.createElement('li');
  beranda.innerHTML = '<a href="#/">Beranda</a>';
  const tambah = document.createElement('li');
  tambah.innerHTML = `<a href="#/tambah">Tambah Cerita</a>`;
  const offline = document.createElement('li');
  offline.innerHTML = `<a href="#/offline">Cerita Offline</a>`
  navList.appendChild(beranda);
  navList.appendChild(tambah);
  navList.appendChild(offline);
  // console.log(isLoggedIn());
  if(isLoggedIn()){
    const userLi = document.createElement('li')
    userLi.textContent = `👤 ${getUserName()}`
    userLi.setAttribute("aria-label", "Nama pengguna")

    const logoutLi = document.createElement('li')
    const logoutBtn = document.createElement('button')
    logoutBtn.textContent = 'Logout'
    logoutBtn.setAttribute('aria-label', 'Logout')
    logoutBtn.style.cursor = 'pointer'
    logoutBtn.onclick = () =>{
      logout();
      updateNavbar();
      goto('#/')
    }
    logoutLi.appendChild(logoutBtn)

    navList.appendChild(userLi)
    navList.appendChild(logoutLi)


    const toggleNotification = document.createElement('li');
    toggleNotification.innerHTML =  '<button id="toggle-push" aria-label="Toggle Notifikasi">🔔 Notifikasi</button>';
    navList.appendChild(toggleNotification);

    if('serviceWorker' in navigator && 'PushManager' in window){
      navigator.serviceWorker.ready.then((reg) => {
        const toggleBtn = document.getElementById('toggle-push');
        reg.pushManager.getSubscription().then(async (sub) =>{
          let isSubscribed = !!sub;
          updateButton();

          toggleBtn.addEventListener('click', async () => {
            toggleBtn.disabled = true;
            const originalText = toggleBtn.textContent;
            toggleBtn.textContent = 'Memproses...'
            try {
              
              if(isSubscribed){
                if(sub){
                  await sub.unsubscribe();
                  await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ endpoint: sub.endpoint }),
                  })
                  console.log('Unsubscribed');
                  sub = null;
                }
              }else{
                if ('Notification' in window && Notification.permission !== 'granted') {
                  const permission = await Notification.requestPermission();
                  if(permission !== 'granted'){
                    alert("Notifikasi ditolak");
                    return;
                  }
                }
  
                sub = await reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array('BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk'),      
                })
                const payload = {
                  endpoint: sub.endpoint,
                  keys: {
                    p256dh: sub.toJSON().keys.p256dh,
                    auth: sub.toJSON().keys.auth,
                  },
                };
                const response = await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe' , {
                  method: 'POST',
                  headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(`token`)}`
                  },
                  body: JSON.stringify(payload),
                })
  
                console.log('Subscribed');
              }
  
              isSubscribed = !isSubscribed
              updateButton();
            } catch (error) {
              console.error('Gagal toggle notifikasi:', error);
              alert('Gagal memproses permintaan notifikasi');
            }finally {
              updateButton();
              toggleBtn.disabled = false
            }
          })

          function updateButton() {
            toggleBtn.textContent = isSubscribed ? '🔕 Nonaktifkan Notifikasi' : '🔔 Aktifkan Notifikasi';
          }
        })
      })
    }
  }else{
    const login = document.createElement('li');
    login.innerHTML = '<a href="#/login">Login</a>'
    const register = document.createElement('li');
    register.innerHTML = '<a href="#/register">Register</a>'
    navList.appendChild(login)
    navList.appendChild(register)
  } 

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.createElement('button');
    installBtn.textContent = '📲 Install Aplikasi';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '1rem';
    installBtn.style.right = '1rem';
    installBtn.style.zIndex = '1000';
    installBtn.style.padding = '1rem';
    installBtn.style.background = '#4f46e5';
    installBtn.style.color = '#fff';
    installBtn.style.borderRadius = '10px';
    installBtn.style.border = 'none';
    installBtn.style.cursor = 'pointer';
    installBtn.setAttribute('aria-label', 'Install Aplikasi');

    document.body.appendChild(installBtn);

    installBtn.addEventListener('click', async () => {
      installBtn.remove();
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null
    })
  })
}

window.addEventListener('load', updateNavbar);
window.addEventListener('hashchange', updateNavbar);

window.addEventListener('load', () => {
  
})

if('Notification' in window && Notification.permission !== 'granted'){
  Notification.requestPermission().then((permission) =>{
    if(permission !== 'granted'){
      console.warn('Notification permission not gran')
    }
  })
}
