import { createContext } from "react";

const myContext = createContext({
  username: "default",
  id: 0,
  level: "default",
  consultations: [],
  userConsultations: [],
  refetchUserConsultations: () => {},
  refetchAllConsultations: () => {}
});

export default myContext;
