import api from "../config/Api";

export const ImagePostService = () => ({
    getAllImagePosts: async (page: number) => {
        const data = await api.get(`/imagepost/${page}`).catch((error) => {
            throw error;
        })
        return data.data;
    },

    getAllImagePostsByUser: async (username: string, page: number) => {
        const data = await api.get(`/imagepost/${username}/${page}`).catch((error) => {
            throw error;
        })
        return data.data;
    }
});

