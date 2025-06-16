import { getData } from "../../data/api";

const HomeModel = {
    async getStories() {
        return await getData();
    }
}

export default HomeModel;