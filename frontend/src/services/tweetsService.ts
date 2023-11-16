import axios from "axios";
import { Tweet } from "../types";

const baseUrl = "/api/tweets";

const getAll = async (): Promise<Tweet[]> => {
  const response = await axios.get<Tweet[]>(baseUrl);

  return response.data;
};

export default { getAll };
