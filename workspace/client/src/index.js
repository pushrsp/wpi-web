import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import MycoilRoot from "pkg/store/Mycoil_Root";
import Router from "components/Router";
import HttpProvider from "./HttpProvider";

ReactDOM.render(
  <MycoilRoot>
    <BrowserRouter>
      <HttpProvider>
        <Router />
      </HttpProvider>
    </BrowserRouter>
  </MycoilRoot>,
  document.getElementById("root"),
);
