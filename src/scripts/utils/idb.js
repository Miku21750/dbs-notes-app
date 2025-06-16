import { openDB } from "idb";

const DB_NAME = 'my-story-db';
const DB_VERSION = 1;
const STORE_NAME = 'offline-stories';

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db){
        if(!db.objectStoreNames.contains(STORE_NAME)){
            db.createObjectStore(STORE_NAME, {keyPath: 'id'})
        }
    }
})

export async function saveStoryOffline(story) {
    const db = await dbPromise;
    await db.put(STORE_NAME, story);
}

export async function getAllOfflineStories() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
}

export async function deleteOfflineStory(id) {
    const db = await dbPromise;
    return db.delete(STORE_NAME, id);
}

export async function clearAllOfflineStories() {
    const db = await dbPromise;
    return db.clear(STORE_NAME);
}