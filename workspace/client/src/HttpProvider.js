import React, { useRef } from "react";
import { Provider } from "use-http";
import localStorage from "localStorage";

import { SERVER } from "constant/url";

const HttpProvider = ({ children }) => {
  const token = useRef(undefined);

  return (
    <Provider
      url={SERVER}
      options={{
        cache: "no-cache",
        interceptors: {
          request({ options }) {
            token.current = token.current || localStorage.getItem("@wpi-token");
            options.headers.authorization = `Bearer ${token.current}`;

            return options;
          },
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default HttpProvider;
