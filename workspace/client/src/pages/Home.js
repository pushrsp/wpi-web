import React from "react";
import { Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";

import SideBar from "components/home/SideBar";

const { Content, Header } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Header style={{ backgroundColor: "transparent" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 30 }}>WPI-WEB</span>
        </div>
      </Header>
      <Content style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "12%", height: "100%" }}>
          <SideBar />
        </div>
        <div style={{ width: "80%", height: "100%", overflowY: "auto" }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
