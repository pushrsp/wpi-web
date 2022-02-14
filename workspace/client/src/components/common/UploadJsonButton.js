import React, { useState } from "react";
import { Modal, Button } from "antd";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "antd";

const UploadJsonButton = ({ defaultTitle, defaultVersion, header, onOk }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(defaultTitle || "");
  const [version, setVersion] = useState(defaultVersion || "");

  const onCancel = () => {
    setFile(null);
    setOpen(false);
  };

  const _onOk = async () => {
    await onOk({ title, file, version, onCancel });
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", paddingRight: 30 }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        {header}
      </Button>
      <Modal visible={open} onOk={_onOk} title="파일 업로드" onCancel={onCancel}>
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
