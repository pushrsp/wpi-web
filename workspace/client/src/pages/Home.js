import React from "react";
import { Layout, Collapse, Typography } from "antd";
import wpi from "test/wpi.json";

import Description from "components/doc/Description";
import Body from "components/doc/Body";

const { Header, Content } = Layout;
const { Panel } = Collapse;
const { Text } = Typography;

const Home = () => {
  console.log(wpi);
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Header style={{ backgroundColor: "transparent" }} />
      <Content style={{ display: "flex", justifyContent: "center" }}>
        <Collapse expandIconPosition={"left"} style={{ width: "70%" }}>
          {wpi.map((v) => (
            <Panel key={v.route} header={v.route} extra={<Text strong>{v.method}</Text>}>
              <Description description={v.description} />
              <Body body={v.body} />
            </Panel>
          ))}
        </Collapse>
      </Content>
    </Layout>
  );
};

export default Home;
