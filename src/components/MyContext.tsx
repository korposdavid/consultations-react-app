import { createContext } from "react";
import UserModel from "../models/UserModel"
import ConsultationModel from "../models/ConsultationModel"


interface AppContextInterface {
  user: UserModel;
  consultations: ConsultationModel[];
  joinedConsultations: ConsultationModel[];
  hostedConsultations: ConsultationModel[];
  refetchUserConsultations: () => void;
  refetchAllConsultations: () => void;
  refetchHostedConsultations: () => void;
  newConsultationForm: () => void;
  fetchSubjects: () => void;
  setUser: (user: UserModel) => void;
  logout: () =>  void;
  subjects: string[]
}

const MyContext = createContext<AppContextInterface>({
  user: {username: '', level: '', id: 0},
  logout: () => {},
  setUser: (user: UserModel) => {},
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
