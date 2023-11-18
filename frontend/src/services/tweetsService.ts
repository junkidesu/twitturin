import axios from "axios";
import { Tweet } from "../types";

const baseUrl = "/api/tweets";

let token: string | undefined;

const setToken = (t: string) => {
  token = t;
};

const getAll = async (): Promise<Tweet[]> => {
  const response = await axios.get<Tweet[]>(baseUrl);

  return response.data;
};

const like = async (id: string): Promise<Tweet> => {
  const response = await axios.post<Tweet>(
    `${baseUrl}/${id}/likes`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default { setToken, getAll, like };
