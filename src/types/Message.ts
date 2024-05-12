import { User } from "./User";

export type Toxicity = {
  isToxic: boolean;
};

export type Message = {
  sender: User;
  message: string;
  toxicity: Toxicity;
  timestamp: string;
};
