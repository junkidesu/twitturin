import axios from "axios";
import { Credentials, TokenData } from "../types";

const baseUrl = "/api/auth";

const login = async (credentials: Credentials) => {
  const response = await axios.post<TokenData>(baseUrl, credentials);

  return response.data;
};

export default { login };
