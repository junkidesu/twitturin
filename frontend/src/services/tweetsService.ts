import axios from "axios";
import { NewTweet, Tweet } from "../types";

const baseUrl = "/api/tweets";

let token: string | undefined;

const setToken = (t: string) => {
  token = t;
};

const getAll = async (): Promise<Tweet[]> => {
  const response = await axios.get<Tweet[]>(baseUrl);

  return response.data;
};

const add = async (newTweet: NewTweet): Promise<Tweet> => {
  const response = await axios.post<Tweet>(baseUrl, newTweet, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

const removeLike = async (id: string, userId: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}/likes/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default { setToken, getAll, add, like, removeLike };
