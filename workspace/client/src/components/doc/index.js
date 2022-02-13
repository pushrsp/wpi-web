import React from "react";
import { Collapse, Typography, Layout } from "antd";
import { useFetch } from "use-http";
import { useParams } from "react-router-dom";

import { GET_DOCS } from "constant/url";

import Description from "components/doc/Description";
import Body from "components/doc/Body";
import FixDocButton from "components/doc/FixDocButton";
import If from "components/common/If";

const { Panel } = Collapse;
const { Text, Title } = Typography;

const Doc = () => {
  const { _id } = useParams();
  const { data = {} } = useFetch(`${GET_DOCS}/${_id}`, {}, []);
  const wpi = data?.data?.wpi || [];

  return (
    <Layout style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <If condition={data?.data?.info} ifNot={null}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Typography>
            <Title>
              {data?.data?.info.title} {data?.data?.info.version}
            </Title>
          </Typography>
          <FixDocButton info={data?.data?.info} />
        </div>
      </If>

      <Collapse expandIconPosition={"left"} style={{ width: "100%" }}>
        {wpi.map((v) => (
          <Panel key={v.route} header={v.route} extra={<Text strong>{v.method}</Text>}>
            <Description description={v.description} />
            <Body body={v.body} />
          </Panel>
        ))}
      </Collapse>
    </Layout>
  );
};

export default Doc;
