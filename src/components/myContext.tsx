import { createContext } from "react";

const myContext = createContext({
  username: "myUser",
  id: 4,
  level: "WEB"
});

export default myContext;
