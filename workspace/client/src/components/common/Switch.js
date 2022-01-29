import React, { Children } from "react";

export const Switch = (props) => {
  let children = Children.toArray(props.children);

  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      if (el.type.name === "Case" && el.props.when) {
        return el;
      }
    }

    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      if (el.type.name === "Default") {
        return el;
      }
    }
  }

  return null;
};

export const Case = (props) => {
  return <>{props.children}</>;
};

export const Default = (props) => {
  return <>{props.children}</>;
};
