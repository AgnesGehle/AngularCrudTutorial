import { TokenData } from "./tokenData";

export interface LoginResponse {
  access: boolean;
  status: number;
  message: string;
  tokenData: TokenData;
}
