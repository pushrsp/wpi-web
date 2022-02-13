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

    if (result.message === "success") {
      onCancel();
      toast.success("등록이 완료 되었습니다.", TOAST_CONFIG);
      window.location.replace("/");
    } else {
      toast.error(result.message, TOAST_CONFIG);
    }
  };

  const onCancel = () => {
    setFile(null);
    setOpen(false);
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", paddingRight: 30 }}>
      <Button type="primary" onClick={() => setOpen(true)}>
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
