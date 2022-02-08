import React, { useState } from "react";
import { Badge, Avatar } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

const NotifWithBadge = () => {
  const [count, setCount] = useState(0);

  return (
    <Badge count={5}>
      <NotificationOutlined style={{ fontSize: 25, cursor: "pointer" }} />
    </Badge>
  );
};

export default NotifWithBadge;
