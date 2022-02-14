import React from "react";
import { Layout } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useFetch } from "use-http";
import { toast } from "react-toastify";
import { CREATE_DOC } from "constant/url";

import { TOAST_CONFIG } from "constant/toast";
import { markdown } from "constant/markdown";

import UploadJsonButton from "components/common/UploadJsonButton";

const Home = () => {
  const { post } = useFetch(CREATE_DOC);

  const onOk = async ({ title, file, version, onCancel }) => {
    if (!file) {
      toast.error("파일을 넣어주세요.", TOAST_CONFIG);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("version", version);

    const result = await post(formData);

    if (result.message === "success") {
      onCancel();
      toast.success("등록이 완료 되었습니다.", TOAST_CONFIG);
      window.location.replace("/");
    } else {
      toast.error(result.message, TOAST_CONFIG);
    }
  };

  return (
    <Layout style={{ width: "100%", height: "100%", fontSize: 20, display: "flex", flexDirection: "column" }}>
      <UploadJsonButton onOk={onOk} url={CREATE_DOC} header="파일 등록" />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </Layout>
  );
};

export default Home;
