import axios from 'axios';
import probe from 'probe-image-size';
import { v4 as uuidv4 } from 'uuid';

import type { Shibe } from '@/types/Shibe';

export const getShibes = async (limit: number): Promise<Shibe[]> => {
  const url = `https://shibe.online/api/shibes?count=${limit}&httpsUrls=true`;
  const { data: urls } = await axios.get<string[]>(url);

  return Promise.all(
    urls.map(async (url) => {
      const { height, width } = await probe(url);

      // use uuid because the same image may be called twice.
      return { id: uuidv4(), url, height, width };
    }),
  );
};
