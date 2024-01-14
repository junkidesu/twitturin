import { Reply } from "../types";

export const updateReplies =
  (id: string, change: (reply: Reply) => Reply) =>
  (replies: Reply[]): Reply[] => {
    const found = replies.find((r) => r.id === id);

    if (found) {
      return replies.map((r) => (r.id !== id ? r : change(r)));
    }

    return replies.map((r) => ({
      ...r,
      replies: updateReplies(id, change)(r.replies),
    }));
  };

export const like =
  (userId: string) =>
  (r: Reply): Reply => ({
    ...r,
    likes: r.likes + 1,
    likedBy: r.likedBy.concat(userId),
  });

export const unlike =
  (userId: string) =>
  (r: Reply): Reply => ({
    ...r,
    likes: r.likes - 1,
    likedBy: r.likedBy.filter((u) => u !== userId),
  });
