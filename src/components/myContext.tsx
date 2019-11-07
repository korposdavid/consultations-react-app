import { createContext } from "react";

const myContext = createContext({
  username: "default",
  id: 0,
  level: "default",
  consultations: [],
  userConsultations: []
});

export default myContext;
