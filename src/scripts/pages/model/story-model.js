import { addStory } from "../../data/api";

export const StoryModel = {
    async submitStory({ description, photo, lat, lon }) {
        return await addStory({ description, photo, lat, lon })
    }
}