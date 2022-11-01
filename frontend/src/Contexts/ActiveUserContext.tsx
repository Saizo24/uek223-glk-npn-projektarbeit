import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/Api';
import roles from '../config/Roles';
import AuthorityService from '../Services/AuthorityService';
import UserService from '../Services/UserService';
import { User } from '../types/models/User.model';
import { Nullable } from '../types/Nullable';

/**
 * USER_DATA_LOCAL_STORAGE_KEY defines the localStorageKey in which the
 * activeUser gets stored.
 */
export const USER_DATA_LOCAL_STORAGE_KEY = 'user';
export const TOKEN_LOCAL_STORAGE_KEY = 'token';

/**
 * ActiveUserContextType defines the provided values
 */
export type ActiveUserContextType = {
  user: Nullable<User>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setActiveUser: (user: User) => void;
  loadActiveUser: () => void;
  checkRole: (roleToCheck: keyof typeof roles) => boolean;
};

/**
 * noContextProviderFound is a method that throws an error and is used
 * inside the defaultContextValue
 */
const noContextProviderFound = () => {
  throw new Error('No provider for the ActiveUserContext found');
};

/**
 * defaultContextValue defines the default values for the ActiveUserContext.
 */
const defaultContextValue: ActiveUserContextType = {
  user: null,
  login: noContextProviderFound,
  logout: noContextProviderFound,
  setActiveUser: noContextProviderFound,
  loadActiveUser: noContextProviderFound,
  checkRole: noContextProviderFound,
};

/**
 * ActiveUserContext has the purpose of providing the currently active user
 * as well as related values, modifiers and related operations such as login
 * and logout.
 */
const ActiveUserContext =
  createContext<ActiveUserContextType>(defaultContextValue);
export default ActiveUserContext;

/**
 * Props for the ActiveUserContextProvider Component
 */
type ActiveUserContextProviderProps = {
  children: React.ReactNode;
};

/**
 * ActiveUserContextProvider Component is used to provide the ActiveUserContext
 * to all child-components.
 * @param children consists of all the elements that are located inside the
 */
export const ActiveUserContextProvider = ({
  children,
}: ActiveUserContextProviderProps) => {
  /**
   * Try to load the user data that is stored inside the LocalStorage.
   * If non is present, null will be returned.
   */
  const loadSavedUserData = (): Nullable<User> => {
    const storeUser = localStorage.getItem(USER_DATA_LOCAL_STORAGE_KEY);
    if (storeUser === null) return null;
    return JSON.parse(storeUser);
  };

  // The following line defines the user state which is holding the user
  // data inside this context.
  const [user, setUser] = useState<Nullable<User>>(() => loadSavedUserData());
  const navigate = useNavigate();
  /**
   * Update the user that is provided by the ActiveUserContext
   * @param updatedUser
   */
  const setActiveUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem(
      USER_DATA_LOCAL_STORAGE_KEY,
      JSON.stringify(updatedUser)
    );
  };

  /**
   * Remove all user and authorization related data from the localStorage
   */
  const resetAuthorization = () => {
    // Reset the stored data inside the AuthorityService.
    AuthorityService.clearAuthorities();
    // Clear all data from the localStorage.
    localStorage.clear();
    // Set the user, which is stored inside the context to null.
    setUser(null);
  };

  /**
   * Logout the currently active user by resetting the stored user data
   * and redirecting to the LoginPage.
   */
  const logout = () => {
    // If no token is saved inside the local storage clear the localStorage directly
    if (localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) === null) {
      resetAuthorization();
      return;
    }
    // If a token is present send a logout-request and clear the localStorage afterwards
    api.get('/logout').finally(resetAuthorization);
    //navigate to login page
    navigate('/login');
  };

  /**
   * Login with the provided credentials. If successful the current user gets
   * updated and stored inside the context. Also the JWT-Token for further
   * request based authentication is stored inside the localStorage.
   * @param email
   * @param password
   */
  const login = async (email: string, password: string) => {
    await api.post('user/login', { email, password }).then((response: any) => {
      console.log(response.headers.authorization);
      localStorage.setItem(
        TOKEN_LOCAL_STORAGE_KEY,
        response.headers.authorization
      );
      setActiveUser(response.data);
      return true;
    });
    return false;
  };

  /**
   * Request the user data for the currently active user from the api
   * and save it to the context-state.
   */
  const loadActiveUser = () => {
    return user
      ? UserService.getUser(user.id).then((res: any) => {
          setActiveUser(res.data);
        })
      : null;
  };

  function activeUserHasRole(roleToCheck: keyof typeof roles): boolean {
    return user ? user.roles.some((role) => role.name === roleToCheck) : false;
  }

  /**
   * Try to load the user-object from the localStorage if present.
   * This is done automatically on the first render of this component.
   */
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    if (token !== null) {
      loadActiveUser();
    }
  }, []);

  /**
   * If the user state is updated and the user is not equal to null,
   * the data used in the AuthorityService as well as the data stored inside
   * the localStorage will be updated with the new user-data.
   */
  useEffect(() => {
    if (user !== null) {
      AuthorityService.initAuthoritySet(user);
      localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  return (
    <div>
      <ActiveUserContext.Provider
        value={{
          user,
          setActiveUser,
          login,
          logout,
          loadActiveUser,
          checkRole: activeUserHasRole,
        }}
      >
        {children}
      </ActiveUserContext.Provider>
    </div>
  );
};
