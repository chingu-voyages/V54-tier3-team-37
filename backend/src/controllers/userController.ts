import { UserPayload } from "../types/userTypes.ts";

let users: string[] = [];

export const interactWithDatabase = (user: UserPayload) => {
  if (!user.email) return;
  let exists = users.includes(user.email);
  if (!exists) {
    users.push(user.email);
  }
};
