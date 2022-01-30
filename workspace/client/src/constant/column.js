import React from "react";
import { Tag } from "antd";

export const BODY_COLUMNS = [
  {
    title: "키",
    dataIndex: "key",
    key: "key",
    align: "center",
    width: "20%",
  },
  { title: "설명", dataIndex: "explain", key: "explain", align: "center", width: "50%" },
  {
    title: "타입",
    dataIndex: "type",
    align: "center",
    key: "type",
    width: "20%",
    render: (type) =>
      type.split("|").map((v, i) => (
        <Tag key={v} color={"geekblue"}>
          {v}
        </Tag>
      )),
  },
];
