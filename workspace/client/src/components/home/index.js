import React from "react";
import { Layout } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { markdown } from "constant/markdown";

import UploadJsonButton from "components/home/UploadJsonButton";

const Home = () => {
  return (
    <Layout style={{ width: "100%", height: "100%", fontSize: 20, display: "flex", flexDirection: "column" }}>
      <UploadJsonButton />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </Layout>
  );
};

export default Home;
