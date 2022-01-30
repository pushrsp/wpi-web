import React from "react";
import { Typography, Divider } from "antd";

import If from "components/common/If";

const { Text } = Typography;

const Description = ({ description }) => {
  return (
    <If condition={description} ifNot={null}>
      <div>
        <Divider plain>
          <Text strong>Description</Text>
        </Divider>
        <Text>{description}</Text>
      </div>
    </If>
  );
};

export default Description;
