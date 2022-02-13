import React from "react";
import { Layout, Menu } from "antd";
import { useFetch } from "use-http";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { GET_DOCS } from "constant/url";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const { data } = useFetch(GET_DOCS, {}, []);
  const { _id } = useParams();
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const docs = data?.data || [];

  const onClick = ({ key }) => {
    navigate(`/${key}`, { replace: true });
  };

  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Sider collapsible={false}>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={[_id || path.match(/[a-zA-Z]+/)[0]]} onClick={onClick}>
          <Menu.Item key="home">Home</Menu.Item>
          <SubMenu key="docs" title="Docs">
            {docs.map((v) => (
              <Menu.Item key={`home/${v._id}`}>{v.title}</Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default SideBar;
