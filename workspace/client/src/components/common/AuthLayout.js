import React from "react";
import { Layout } from "antd";
import { Row, Col } from "antd";

const { Header, Footer, Content } = Layout;

const AuthLayout = ({ children }) => {
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Header style={{ backgroundColor: "transparent" }} />
      <Content>
        <Row style={{ width: "100%", height: "100%" }}>
          <Col span={6} />
          <Col span={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
            {children}
          </Col>
          <Col span={6} />
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AuthLayout;
