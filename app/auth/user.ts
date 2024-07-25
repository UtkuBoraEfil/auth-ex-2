import 'server-only';
import { cache } from 'react';
import prisma from '@/app/lib/prisma';
import { verifySession } from '@/app/lib/session';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await prisma.users.findMany({
      where: {
        id: session.userId,
      },
    });

    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});