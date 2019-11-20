import { createContext } from "react";

const myContext = createContext({
  username: "default",
  id: 0,
  level: "default",
  consultations: [],
  joinedConsultations: [],
  hostedConsultations: [],
  refetchUserConsultations: () => {},
  refetchAllConsultations: () => {},
  refetchHostedConsultations: () => {},
  newConsultationForm: () => {}
});

export default myContext;
