import api from "../config/Api";

const roleSet = new Set();

const RoleService = {
  findAll: () => api.get("/roles")}
export default RoleService;
