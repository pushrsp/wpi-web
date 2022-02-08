import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";

import { TOAST_CONFIG } from "constant/toast";

const UploadJsonButton = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const onOk = async () => {
    if (!file) {
      toast.error("파일을 넣어주세요.", TOAST_CONFIG);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData.getAll("file"));
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
        <FileUploader handleChange={(_file) => setFile(_file)} name="file" types={["json"]} />
      </Modal>
    </div>
  );
};

export default UploadJsonButton;
