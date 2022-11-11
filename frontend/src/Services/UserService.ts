import api from '../config/Api';
import { User } from '../types/models/User.model';

const ENDPOINT_PREFIX = "/user"

const UserService = {
  getUser: (id: string) => {
    return api.get(`${ENDPOINT_PREFIX}/id/${id}`);
  },
  updateUser: (user: User) => {
    return api.put(`${ENDPOINT_PREFIX}/${user.id}`, user);
  },

  addUser: (user: User) => {
    return api.post(`${ENDPOINT_PREFIX}/`, user).then((res) => {
      return res.data;
    });
  },
  addAllUsers: (users: User[]) => {
    return api.post(`${ENDPOINT_PREFIX}/list`, users);
  },
  getAllUsers: (pageNumber: number) => {
    return api.get(`${ENDPOINT_PREFIX}/page/${pageNumber}`).then((res) => {
      return res.data
    });
  },

  deleteUser: (id: string) => {
    return api.delete(`${ENDPOINT_PREFIX}/${id}`);
  },

  getUserByID: async (userID: string): Promise<User> => {
    const { data } = await api.get<User>(`${ENDPOINT_PREFIX}/${userID}`);
    return data;
  },
};

export default UserService;
