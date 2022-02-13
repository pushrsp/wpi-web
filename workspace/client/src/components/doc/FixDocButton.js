import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { toast } from "react-toastify";
import { useFetch } from "use-http";

import { TOAST_CONFIG } from "constant/toast";
import { UPDATE_DOC } from "constant/url";

import If from "components/common/If";

const FixDocButton = ({ info }) => {
  const { patch } = useFetch(UPDATE_DOC);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(info?.title || "");
  const [version, setVersion] = useState(info?.version || "");

  const onOk = async () => {
    if (!title || !version) {
      toast.error("빈 칸이 있는지 확인해주세요.", TOAST_CONFIG);
      return;
    }

    if (info.version === version) {
      onCancel();
      return;
    }

    const result = await patch({ title, version, _id: info._id });

    if (result?.data === "ok") {
      onCancel();
      toast.success("수정이 완료되었습니다.", TOAST_CONFIG);
      window.location.replace("/");
    } else {
      toast.error(result.error, TOAST_CONFIG);
    }
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button style={{ marginRight: 30 }} onClick={() => setOpen(true)}>
        수정하기
      </Button>
      <If condition={info} ifNot={null}>
        <Modal visible={open} title="DOC 수정하기" onOk={onOk} onCancel={onCancel}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <div style={{ marginBottom: 10 }} />
          <Input value={version} onChange={(e) => setVersion(e.target.value)} />
        </Modal>
      </If>
    </>
  );
};

export default FixDocButton;
