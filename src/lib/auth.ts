import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  const parsedUserId = Number(userId);

  if (Number.isNaN(parsedUserId)) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parsedUserId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}