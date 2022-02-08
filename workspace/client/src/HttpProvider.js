import React, { useRef } from "react";
import { Provider } from "use-http";
import localStorage from "localStorage";

import { SERVER } from "constant/url";
import { useMycoilState } from "pkg/store/Mycoil_Hooks";
import { USER } from "global/user";

const HttpProvider = ({ children }) => {
  const token = useRef(undefined);
  const [me, setMe] = useMycoilState(USER);

  return (
    <Provider
      url={SERVER}
      options={{
        interceptors: {
          request({ options }) {
            token.current = token.current || localStorage.getItem("@wpi-token");
            // options.headers.authorization = `Bearer ${token.current}`;

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
