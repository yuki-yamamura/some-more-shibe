import { LIMIT } from '@/constants';
import { getShibes } from '@/lib/shibes';

import type { Shibe } from '@/types/Shibe';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  _: NextApiRequest,
  response: NextApiResponse<{ shibes: Shibe[] }>,
) => {
  try {
    const shibes = await getShibes(LIMIT);
    response.status(200).json({ shibes });
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error });
      throw error;
    }
  }
};

export default handler;
