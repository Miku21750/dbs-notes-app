const HomeView = {
    render() {
        return `
        <section class="container">
            <h1>Daftar Cerita</h1>
            <div id="stories-list" class="story-list"></div>
            <div id="map" style="height: 400px; margin-top: 20px;"></div>
            <div id="offline-message" style="display: none; text-align:center; padding: 2rem;">
                <h2>📴 Anda sedang offline</h2>
                <p>Silakan buka <strong>cerita offline</strong> atau hubungkan internet Anda kembali.</p>
            </div>

        </section>
        
        `
    },

    async showStories(stories, showFormattedDate) {
        const container = document.getElementById('stories-list');
        const mapContainer = document.getElementById('map');

        if(!container || !mapContainer) return;

        let map;
        if(window.L){
            map = L.map(mapContainer).setView([-7.2756, 112.6417], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        stories.forEach((story) =>{
            const storyElement = document.createElement('div');
            storyElement.classList.add('story-item');
            storyElement.innerHTML = `
            <img src="${story.photoUrl}" alt="${story.name}" />
            <h2>${story.name}</h2>
            <p>${showFormattedDate(story.createdAt)}</p>
            <p>${story.description}</p>
            <button class="save-offline" data-id="${story.id}"> 💾 Save to Offline</button>
            `;
    
            container.appendChild(storyElement);
    
            if(window.L && story.lat && story.lon){
            L.marker([story.lat, story.lon]).addTo(map)
                .bindPopup(`<b>${story.name}</b><br>${story.description}`)
                .openPopup();
            }
        })
    }
}

export default HomeView;