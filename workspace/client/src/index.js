import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "antd/dist/antd.css";

import MycoilRoot from "pkg/store/Mycoil_Root";
import Router from "components/Router";

ReactDOM.render(
  <MycoilRoot>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </MycoilRoot>,
  document.getElementById("root"),
);
