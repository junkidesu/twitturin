import * as users from "./users";
import * as tweets from "./tweets";
import * as auth from "./auth";
import * as replies from "./replies";
import * as search from "./search";

export default {
  ...users,
  ...tweets,
  ...replies,
  ...auth,
  ...search,
} as object;
