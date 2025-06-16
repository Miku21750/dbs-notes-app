import { getAllOfflineStories, deleteOfflineStory, clearAllOfflineStories } from '../../utils/idb';

const OfflineModel = {
    getAllOfflineStories,
    deleteOfflineStory,
    clearAllOfflineStories,
}

export default OfflineModel;