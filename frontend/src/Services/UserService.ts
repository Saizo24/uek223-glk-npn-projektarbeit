import api from '../config/Api';
import { User } from '../types/models/User.model';

const UserService = {
  getUser: (id: string) => {
    return api.get(`/users/${id}`);
  },
  updateUser: (user: User) => {
    return api.put(`/users/${user.id}`, user);
  },

  addUser: (user: User) => {
    return api.post('/users/', user).then((res) => {
      return res.data;
    });
  },
  addAllUsers: (users: User[]) => {
    return api.post('/users/list', users);
  },
  getAllUsers: () => {
    return api.get(`/users`);
  },

  deleteUser: (id: string) => {
    return api.delete(`/users/${id}`);
  },

  getUserByID: async (userID: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${userID}`);
    return data;
  },
};

export default UserService;
