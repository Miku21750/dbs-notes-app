const OfflineStoriesView = {
    render() {
        return `
        <section class="container">
            <h1>Offline Stories</h1>
            <div id="offline-stories-list" class="story-list"></div>
            <button id="clear-offline-stories" class="clear-all-btn">🗑️ Hapus Semua Cerita Offline</button>
        </section>
        `
    },

    showOfflineStories(stories){
        const container = document.getElementById('offline-stories-list');
        if(!container) return

        container.innerHTML = '';

        stories.forEach(story => {
            const storyElement = document.createElement('div');
            storyElement.classList.add('story-item');

            const imageUrl = story.imageBlob ? URL.createObjectURL(story.imageBlob) : '';
            storyElement.innerHTML = `
                <img src="${imageUrl}" alt="${story.name}" />
                <h2>${story.name}</h2>
                <p>${story.description}</p>
                <button class="delete-offline" data-id="${story.id}">🗑️ Hapus</button>
            `
            container.appendChild(storyElement)
        });
    }
}

export default OfflineStoriesView;