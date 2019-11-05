import UserModel from "./UserModel";

export default interface Consultation {
  id: number;
  date: string;
  duration: number;
  subjects: string[];
  host: UserModel;
  participants: UserModel[];
  participantLimit: number;
  description: string;
}
