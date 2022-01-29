import React from "react";

const If = ({ condition, children, ifNot = null }) => {
  if (condition) {
    return children;
  }

  return ifNot;
};

export default If;
