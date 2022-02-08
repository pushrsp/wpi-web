import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";

import PrivateRouter from "components/PrivateRouter";
import Home from "pages/Home";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";

const Router = () => {
  return (
    <Layout style={{ width: "100%", height: "100vh" }}>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/home"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />
        {/*<Route exact path="/home" element={<Home />} />*/}
      </Routes>
    </Layout>
  );
};

export default Router;
