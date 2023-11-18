import axios from "axios";
import { SignUpFormValues, User } from "../types";

const baseUrl = "/api/users";

const getAll = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(baseUrl);

  return response.data;
};

const create = async (formValues: SignUpFormValues): Promise<User> => {
  const response = await axios.post<User>(baseUrl, formValues);
  return response.data;
};

export default { getAll, create };
