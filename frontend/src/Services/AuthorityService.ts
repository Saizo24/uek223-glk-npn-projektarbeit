import { Authority } from '../types/models/Authority.model';
import { Role } from '../types/models/Role.model';

const authoritySet = new Set();

const AuthorityService = {
  initAuthoritySet: (
    user = JSON.parse(localStorage.getItem('user') || '{}')
  ) => {
    const roles = user && user.roles ? user.roles : [];
    roles.forEach((role: Role) => {
      role.authorities.forEach((authority: Authority) => {
        authoritySet.add(authority.name);
      });
    });
  },
  hasAuthority: (authority: Authority) => {
    AuthorityService.initAuthoritySet();
    return authoritySet.has(authority);
  },
  hasAuthorities: (authorities: Authority[]) => {
    AuthorityService.initAuthoritySet();
    for (const element of authorities) {
      if (!authoritySet.has(element)) {
        return false;
      }
    }
    return true;
  },
  hasAnyAuthority: (authorities: Authority[]) => {
    for (const element of authorities) {
      if (authoritySet.has(element)) {
        return true;
      }
    }
    return false;
  },
  clearAuthorities: (): void => {
    authoritySet.clear();
  },
};

export default AuthorityService;
