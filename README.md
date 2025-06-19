# 📸 MyStory - Aplikasi Berbagi Cerita dengan Peta dan Kamera

MyStory adalah aplikasi web berbasis Single Page Application (SPA) yang memungkinkan pengguna untuk berbagi cerita secara publik, lengkap dengan foto, lokasi di peta, dan dukungan mode offline.

🚀 **Live Demo**: [http://miku21-dbs-story-app.netlify.app](http://miku21-dbs-story-app.netlify.app)

---

## ✨ Fitur Unggulan

- 🔐 **Autentikasi Pengguna**
  - Register & login dengan token authorization.
  - Proteksi halaman untuk pengguna yang belum login.

- 📷 **Tambah Cerita Baru**
  - Ambil gambar langsung dari kamera.
  - Akses lokasi pengguna dan tampilkan di peta (Leaflet + OpenStreetMap).
  - Submit cerita dengan deskripsi, foto, dan lokasi.

- 🌐 **Cerita Terpeta**
  - Tampilkan daftar cerita dari publik API.
  - Tampilkan semua lokasi cerita di peta interaktif.
  - Fitur simpan cerita ke mode offline.

- 📴 **Mode Offline & IndexedDB**
  - Simpan cerita ke IndexedDB.
  - Halaman khusus untuk melihat dan menghapus cerita offline.
  - Gambar offline tetap tampil via cache.

- 🔁 **Transisi Halaman Halus**
  - Gunakan View Transition API untuk animasi antar halaman.

- ♿ **Aksesibilitas**
  - Tautan "Skip to Content".
  - Input dilengkapi label dan `alt` untuk gambar.
  - Struktur semantik HTML (`<main>`, `<section>`, dsb.)

- 📦 **PWA Support**
  - Aplikasi dapat di-install di perangkat.
  - Offline-first experience dengan Service Worker (Workbox).

---

## 🛠️ Teknologi yang Digunakan

- Front-End: **Vite + Vanilla JS (MVP Pattern)**
- Peta: **Leaflet + OpenStreetMap**
- IndexedDB: **idb**
- Transisi: **View Transition API**
- Kamera & GPS: **Web Media API & Geolocation API**
- Offline Support: **Workbox (Service Worker)**
- Deployment: **Netlify**

---

## 📁 Struktur Proyek

```

src/
├── pages/
│   ├── views/       → Komponen tampilan (View)
│   └── presenter/   → Logika interaksi halaman (Presenter)
├── data/            → API endpoints
├── utils/           → Fungsi utilitas, auth, idb
├── routes/          → Routing SPA
├── script/
│   └── workbox-sw\.cjs → Konfigurasi service worker (Workbox)
public/

````

---

## 📦 Cara Menjalankan Proyek Lokal

```bash
# 1. Clone repo
git clone https://github.com/Miku21750/dbs-notes-app.git
cd dbs-notes-app

# 2. Install dependencies
npm install

# 3. Jalankan app di dev mode
npm run dev

# 4. Build untuk production
npm run build

# 5. Deploy ke Netlify atau platform lain
````

---

## 📝 Lisensi

Proyek ini menggunakan lisensi [MIT](LICENSE).

---

## 🙌 Kontribusi

Silakan fork dan pull request untuk perbaikan atau penambahan fitur. Semua bentuk kontribusi sangat dihargai!

---

## 📮 Kontak

Dibuat dengan ❤️ oleh \[Miku21]
