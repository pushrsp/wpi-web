import { useState, useEffect, useContext, useRef } from "react";
import _ from "lodash";

import { getNode, setNode } from "./Mycoil_Nodes";
import { MycoilContext } from "./Mycoil_Root";

function useSetMycoilValue(mycoilValue) {
  const { getListeners } = useContext(MycoilContext);
  return function (newValOrUpdater) {
    const state = typeof newValOrUpdater === "function" ? newValOrUpdater(getNode(mycoilValue)) : newValOrUpdater;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const listeners = getListeners(mycoilValue);

    listeners.forEach((listener) => listener(state));
  };
}

function useMycoilValue(mycoilValue) {
  const [, forceUpdate] = useState(0);
  const curState = useRef(getNode(mycoilValue));
  const { subscribe } = useContext(MycoilContext);

  useEffect(() => {
    const listener = (nextState) => {
      if (_.isEqual(curState.current, nextState)) return;

      curState.current = setNode({ key: mycoilValue, state: nextState });
      forceUpdate((prev) => (prev += 1));
    };

    return subscribe(mycoilValue, listener);
  }, []);

  return curState.current;
}

function useMycoilState(mycoilValue) {
  return [useMycoilValue(mycoilValue), useSetMycoilValue(mycoilValue)];
}

export { useMycoilState };
