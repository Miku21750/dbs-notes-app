import HomeView from "../views/home-view";
import HomeModel from "../model/home-model";
import { isLoggedIn } from "../../utils/auth";
import { goto } from "../../utils/transition";
import { showFormattedDate } from "../../utils";
import { saveStoryOffline } from "../../utils/idb";
import { fetchStoryById } from "../../data/api";

export default class HomePresenter  {
    async render(){
        if(!isLoggedIn()){
            goto('#/login');
            return '';
        }
        return HomeView.render();
    }

    async afterRender() {
        if(!isLoggedIn()) return;

        window.addEventListener('online', () => {
            alert('anda kembali online');
            location.reload();
        })

        window.addEventListener('offline', () => {
            alert('Anda offline');
            location.reload();
        })
        
        try {
            const response = await HomeModel.getStories();
            const stories = response.listStory || [];
            await HomeView.showStories(stories, showFormattedDate);
            if(!navigator.onLine){
                const storyList = document.getElementById('stories-list');
                const mapContainer = document.getElementById('map');
                const offlineMessage = document.getElementById('offline-message')

                if(storyList) storyList.style.display = 'none';
                if(mapContainer) mapContainer.style.display = 'none';
                if(offlineMessage && isLoggedIn()) offlineMessage.style.display = 'block'
            }
            document.querySelectorAll('.save-offline').forEach((btn) =>{
                btn.addEventListener('click', async (e) => {
                    const storyId = e.target.dataset.id;
                    const storyData = await fetchStoryById(storyId);
                    await saveStoryOffline(storyData);
                    alert('Story disimpan ke offline');
                })
            })
        } catch (e) {
            console.error('Gagal memuat data: ', e)
        }
    }
}