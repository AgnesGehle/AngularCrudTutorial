import { TokenData } from "./tokenData";

export interface Response {
  access: boolean;
  status: number;
  message: string;
  tokenData: TokenData;
}
