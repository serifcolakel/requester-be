import db from "@lib/db";

export async function getUsers() {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
