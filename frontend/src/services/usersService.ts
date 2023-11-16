import axios from "axios";
import { User } from "../types";

const baseUrl = "/api/users";

const getAll = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(baseUrl);

  return response.data;
};

export default { getAll };
