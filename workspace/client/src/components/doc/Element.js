import React from "react";
import { Typography, Divider, Table, Collapse } from "antd";
import _ from "lodash";

import { COLUMNS } from "constant/column";

import If from "components/common/If";
import ExpandTable from "components/doc/ExpandTable";

const { Text } = Typography;
const { Panel } = Collapse;

const Element = ({ data = [], header }) => {
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

  // console.log(data);

  return (
    <If condition={data.length > 0} ifNot={null}>
      <Collapse ghost>
        <Panel header={header}>
          <Table
            pagination={{ defaultPageSize: 5, hideOnSinglePage: true }}
            size={"small"}
            bordered={true}
            columns={COLUMNS}
            dataSource={data}
            expandable={{
              expandedRowRender: (record) => expandRecursion(record.collapse),
              rowExpandable: (record) => !_.isEmpty(record.collapse),
            }}
          />
        </Panel>
      </Collapse>
    </If>
  );
};

export default Element;
