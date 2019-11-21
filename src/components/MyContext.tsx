import { createContext } from "react";

const MyContext = createContext({
  username: "default",
  id: 0,
  level: "default",
  consultations: [],
  joinedConsultations: [],
  hostedConsultations: [],
  refetchUserConsultations: () => {},
  refetchAllConsultations: () => {},
  refetchHostedConsultations: () => {},
  newConsultationForm: () => {},
  fetchSubjects: () => {},
  subjects: []
});

export default MyContext;
