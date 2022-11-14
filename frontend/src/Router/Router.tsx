import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import ActiveUserContext from "../Contexts/ActiveUserContext";
import PrivateRoute from "./PrivateRoute";
import authorities from "../config/Authorities";
import HomePage from "../components/pages/HomePage/HomePage";
import LandingPage from "../components/pages/LandingPage/LandingPage";
import UnauthorizedPage from "../components/pages/UnauthorizedPage/UnauthorizedPage";
import AdminPage from "../components/pages/AdminPage/AdminPage";
import ProfilePage from "../components/pages/ProfilePage/ProfilePage";
/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={"/"} element={<LandingPage />} />
      <Route
        path={"/unauthorized"}
        element={
          <PrivateRoute authorities={[]} element={<UnauthorizedPage />} />
        }
      />
      <Route path={"/login"} element={<LoginPage />} />
      <Route
        path={"/homepage"}
        element={
          <PrivateRoute
            authorities={[
              {
                id: "2b0a0711-8807-4d20-b376-5d5b184078c3",
                name: authorities.READ,
              },
            ]}
            element={
              checkRole("ADMIN") === false ? <HomePage /> : <AdminPage />
            }
          />
        }
      />
      <Route
        path={`/users/:userid`}
        element={
          <PrivateRoute
            authorities={[
              {
                id: "2b0a0711-8807-4d20-b376-5d5b184078c3",
                name: authorities.READ,
              },
            ]}
            element={<ProfilePage />}
          ></PrivateRoute>
        }
      />

      <Route path={"*"} element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
