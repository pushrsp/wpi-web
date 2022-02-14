import React from "react";
import { Collapse, Typography, Layout } from "antd";
import { useFetch } from "use-http";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { GET_DOCS, UPDATE_DOC } from "constant/url";
import { TOAST_CONFIG } from "constant/toast";

import Description from "components/doc/Description";
import Element from "./Element";
import If from "components/common/If";
import UploadJsonButton from "components/common/UploadJsonButton";

const { Panel } = Collapse;
const { Text, Title } = Typography;

const Doc = () => {
  const { _id } = useParams();
  const { post } = useFetch(`${UPDATE_DOC}/${_id}`);
  const { data = {} } = useFetch(`${GET_DOCS}/${_id}`, {}, []);
  const wpi = data?.data?.wpi || [];

  const onOk = async ({ title, version, onCancel, file }) => {
    if (!title || !version) {
      toast.error("빈 칸이 있는지 확인해주세요.", TOAST_CONFIG);
      return;
    }

    if (data.data.info.version === version) {
      onCancel();
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("version", version);

    const result = await post(formData);

    if (result?.data === "ok") {
      onCancel();
      toast.success("수정이 완료되었습니다.", TOAST_CONFIG);
      window.location.replace("/");
    } else {
      toast.error(result.error, TOAST_CONFIG);
    }
  };

  return (
    <Layout style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <If condition={data?.data?.info} ifNot={null}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Typography>
            <Title>
              {data?.data?.info.title} {data?.data?.info.version}
            </Title>
          </Typography>
          <UploadJsonButton
            header="수정하기"
            defaultTitle={data?.data?.info.title}
            defaultVersion={data?.data?.info.version}
            onOk={onOk}
          />
        </div>
      </If>

      <Collapse expandIconPosition={"left"} style={{ width: "100%" }}>
        {wpi.map((v) => {
          return (
            <Panel key={v.route} header={v.route} extra={<Text strong>{v.method}</Text>}>
              <Description description={v.description} />
              <Element data={v.body} header="Body" />
              <Element data={v.success} header="Success" />
              <Element data={v.fail} header="Fail" />
            </Panel>
          );
        })}
      </Collapse>
    </Layout>
  );
};

export default Doc;
