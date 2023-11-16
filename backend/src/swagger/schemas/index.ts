import * as users from "./users";
import * as tweets from "./tweets";
import * as auth from "./auth";

export default { ...users, ...tweets, ...auth } as object;
