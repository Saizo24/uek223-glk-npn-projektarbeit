import roles from '../../config/Roles';
import { Authority } from './Authority.model';

/**
 * Role type
 */
export type Role = {
  id: string;
  name: roles;
  authorities: Authority[];
};
