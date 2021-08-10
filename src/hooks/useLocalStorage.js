import { useState, useEffect } from "react";

const useLocalStorage = (key, initialState) => {
  const getLocalState = (key) => {
    const localState = JSON.parse(localStorage.getItem(key));
    if (localState) {
      return localState;
    } else return null;
  };
  const [state, setState] = useState(getLocalState(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  const removeState = () => {
    localStorage.setItem(key, JSON.stringify([]));
  };

  return [state, setState, removeState];
};

export default useLocalStorage;
