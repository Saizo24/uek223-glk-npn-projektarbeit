import api from "../config/Api";

export const ImagePostService = () => ({
    getAllImagePosts: async () => {
        const data = await api.get(`/imagePost/0/10`).catch((error) => {
            throw error;
        })
        return data.data;
    },
});

