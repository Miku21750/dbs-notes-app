import OfflineStoriesView from "../views/offlinestory-view";
import OfflineModel from "../model/offline-model";
import { getAllOfflineStories, deleteOfflineStory, clearAllOfflineStories } from "../../utils/idb";
import { isLoggedIn } from "../../utils/auth";
import { goto } from "../../utils/transition";

export default class OfflineStoriesPresenter {
    constructor({ content}) {
        this._content = content
    }
    async render(){
        if(!isLoggedIn()){
            goto('#/login');
            return '';
        }
        return OfflineStoriesView.render();
    }

    async afterRender() {
        const stories = await OfflineModel.getAllOfflineStories();
        OfflineStoriesView.showOfflineStories(stories);

        document.querySelectorAll('.delete-offline').forEach(btn =>{
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await OfflineModel.deleteOfflineStory(id);
                this.afterRender();
            })
        })

        document.getElementById('clear-offline-stories').addEventListener('click', async () => {
            if (confirm('Yakin ingin menghapus semua cerita offline?')) {
                await OfflineModel.clearAllOfflineStories();
                this.afterRender();
            }
        })
    }
}