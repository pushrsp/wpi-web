import React from "react";
import { Table, Typography } from "antd";
import _ from "lodash";

import { BODY_COLUMNS } from "constant/column";

const { Text } = Typography;

const ExpandTable = ({ collapse, expandRecursion, title }) => {
  return (
    <Table
      pagination={{ defaultPageSize: 5, hideOnSinglePage: true, position: ["topRight"] }}
      size={"small"}
      bordered={true}
      columns={BODY_COLUMNS}
      dataSource={collapse}
      expandable={{
        expandedRowRender: (record) => expandRecursion(record.collapse),
        rowExpandable: (record) => !_.isEmpty(record.collapse),
      }}
      title={() => <Text strong>{title}</Text>}
    />
  );
};

export default ExpandTable;
