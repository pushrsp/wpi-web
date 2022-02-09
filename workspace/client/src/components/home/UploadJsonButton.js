import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "antd";

import { CREATE_DOC } from "constant/url";
import { TOAST_CONFIG } from "constant/toast";

const UploadJsonButton = () => {
  const { post } = useFetch(CREATE_DOC);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");

  const onOk = async () => {
    if (!file) {
      toast.error("파일을 넣어주세요.", TOAST_CONFIG);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("version", version);

    const result = await post(formData);

    console.log(result);
  };

  const onCancel = () => {
    setFile(null);
    setOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setOpen((prev) => !prev)}>
        파일 등록
      </Button>
      <Modal visible={open} onOk={onOk} title="파일 업로드" onCancel={onCancel}>
        <Input placeholder="제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
        <div style={{ marginBottom: 10 }} />
        <Input placeholder="버젼을 입력해주세요." value={version} onChange={(e) => setVersion(e.target.value)} />
        <div style={{ marginBottom: 10 }} />
        <FileUploader handleChange={(_file) => setFile(_file)} name="file" types={["json"]} />
      </Modal>
    </div>
  );
};

export default UploadJsonButton;
