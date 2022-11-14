import api from "../config/Api";
import { ImagePost } from "../types/models/ImagePost.model";

const ENDPOINT_PREFIX = "/imagepost"

export const ImagePostService = () => ({
    getAllImagePosts: async (page: number) => {
        const data = await api.get(`${ENDPOINT_PREFIX}/${page}`).catch((error) => {
            throw error;
        })
        return data.data;
    },

    getAllImagePostsByUser: async (username: string, page: number) => {
        const data = await api.get(`${ENDPOINT_PREFIX}/${username}/${page}`).catch((error) => {
            throw error;
        })
        return data.data;
    },

    likePostByUsername: async (imagePost: ImagePost, username: string) => {
        const data = await api.put(`${ENDPOINT_PREFIX}/like/${username}`, imagePost).catch((error) => {
            throw error
        })
        return data.data;
    },

    unlikePostByUsername: async (imagePost: ImagePost, username: string) => {
        const data = await api.put(`${ENDPOINT_PREFIX}/unlike/${username}`, imagePost).catch((error) => {
            throw error
        })
        return data.data;
    },

    createNewPost: async (imagePost: ImagePost, username: string) => {
        const data = await api.post(`${ENDPOINT_PREFIX}/${username}`, imagePost).catch((error) => {
            throw error;
        })
        return data.data;
    },

    updatePostById: async (imagePost: ImagePost, id: string) => {
        const data = await api.put(`${ENDPOINT_PREFIX}/edit/${id}`, imagePost).catch((error) => {
            throw error
        })
        return data.data;
    },

    deletePostById: async (userId: string, imagePost: ImagePost) => {
        const data = await api.delete(`${ENDPOINT_PREFIX}/${userId}/${imagePost.id}`).catch((error) => {
            throw error
        })
        return data.data
    }
});

