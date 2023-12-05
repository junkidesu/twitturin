import * as users from "./users";
import * as tweets from "./tweets";
import * as auth from "./auth";
import * as replies from "./replies";

export default { ...users, ...tweets, ...replies, ...auth } as object;
