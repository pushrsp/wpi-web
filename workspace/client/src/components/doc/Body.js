import React from "react";
import { Typography, Divider, Table } from "antd";
import _ from "lodash";

import { BODY_COLUMNS } from "constant/column";

import If from "components/common/If";
import ExpandTable from "components/doc/ExpandTable";

const { Text } = Typography;

const Body = ({ body = [] }) => {
  const expandRecursion = (collapse = {}) => {
    if (_.isEmpty(collapse)) return null;

    const keys = Object.keys(collapse);
    if (keys.length > 1) {
      return keys.map((v) => (
        <ExpandTable key={v} collapse={collapse[v]} title={v} expandRecursion={expandRecursion} />
      ));
    } else {
      return <ExpandTable collapse={collapse[keys[0]]} title={keys[0]} expandRecursion={expandRecursion} />;
    }
  };

  return (
    <If condition={body.length > 0} ifNot={null}>
      <div>
        <Divider plain>
          <Text strong>Body</Text>
        </Divider>
        <Table
          pagination={{ defaultPageSize: 5, hideOnSinglePage: true }}
          size={"small"}
          bordered={true}
          columns={BODY_COLUMNS}
          dataSource={body}
          expandable={{
            expandedRowRender: (record) => expandRecursion(record.collapse),
            rowExpandable: (record) => !_.isEmpty(record.collapse),
          }}
        />
      </div>
    </If>
  );
};

export default Body;
