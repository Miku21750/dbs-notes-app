import { StoryModel } from "../model/story-model";
import { addStoryView } from "../views/addstory-view";
import { goto } from "../../utils/transition";
import { isLoggedIn } from "../../utils/auth";

export default class AddStoryPresenter {
    constructor() {
        this.stream = null;
        this.capturedPhotoBlob = null;
        this.selectedLat = null;
        this.selectedLon = null;
    }

    async render(){
        if(!isLoggedIn()){
            goto('#/login');
            return '';
        }
        return addStoryView.render();
    }

    cleanup() {
        if(this.stream){
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null
        }
    }

    async afterRender() {
        if(!isLoggedIn()) return 
        const form = document.getElementById('storyForm')
        const statusMsg = document.getElementById('statusMsg');

        const video = document.getElementById('camera');
        const canvas = document.getElementById('photoCanvas');
        const takePhotoBtn = document.getElementById('takePhotoBtn');
        const previewImage = document.getElementById('previewImage');
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment "}})
            video.srcObject = this.stream;
        } catch (error) {
            console.error("tidak bisa mengakses kamera: ",error)
            takePhotoBtn.disabled = true;
        }

        let capturedPhotoBlob = null;
        takePhotoBtn.addEventListener('click', () => {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            canvas.getContext('2d').drawImage(video, 0,0)
            
            canvas.toBlob((blob) =>{
                this.capturedPhotoBlob = blob
                previewImage.src = URL.createObjectURL(blob);
                alert ("Foto berhasil diambil")
            }, 'image/jpeg', 0.9)
        })

        const mapContainer = document.getElementById('map');
        let map, marker = null;
        const self = this;

        function initializeMap(lat = 7.2756, lon = 112.6417, message = '') {
            map = L.map(mapContainer).setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            if(message){
                L.popup()
                    .setLatLng([lat, lon])
                    .setContent(message)
                    .openOn(map);
            }
            map.on('click', (e) => {
                self.selectedLat = e.latlng.lat;
                self.selectedLon = e.latlng.lng;
    
                if (marker) map.removeLayer(marker);
                marker = L.marker([self.selectedLat, self.selectedLon]).addTo(map);
            })
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            initializeMap(latitude, longitude)
        }, (err) => {
            console.error('Geolocation error:', err);
            statusMsg.textContent = 'Gagal mendapatkan lokasi. Cerita akan disimpan tanpa lokasi.';
            initializeMap();
        })


        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const description = form.description.value;
            const photoInput = document.getElementById('photoInput').files[0];
            let photoFile = null;

            if(this.capturedPhotoBlob){
                photoFile = new File([this.capturedPhotoBlob], 'captured-photo.jpg', { type: 'image/jpeg'})
            } else if (photoInput && photoInput instanceof File && photoInput.type.startsWith('image/')) {
                photoFile = photoInput
            }else {
                alert('mohon ambil foto atau unggah gambar')
                return
            }

            try {
                statusMsg.textContent = 'Mengirim cerita...';
                console.log("Photo File:", photoFile);
                console.log("Description:", description);
                console.log("Lat/Lon:", this.selectedLat, this.selectedLon);

                const result = await StoryModel.submitStory({ description, photo: photoFile, lat: this.selectedLat, lon: this.selectedLon });

                if (result.error) throw new Error(result.message);
                statusMsg.textContent = 'Berhasil mengirim cerita!';

                form.reset();
                goto('#/')
            } catch (error) {
                console.error('Error:', error);
                statusMsg.textContent = `Gagal mengirim cerita: ${error.message}`;
            }
        })
        window.addEventListener('hashchange', () => {
            this.cleanup();
        });
    }
}