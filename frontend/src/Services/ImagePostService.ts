import api from "../config/Api";

export const ImagePostService = () => ({
    getAllImagePosts: async () => {
        const data = await api.get(`/imagepost/0/10`).catch((error) => {
            throw error;
        })
        return data.data;
    },

    getAllImagePostsByUser: async (username : string) => {
        const data = await api.get(`/user/${username}/imageposts`).catch((error) => {
            throw error;
        })
        return data.data;
    }
});

