import Gallery from '@/components/Gallery';
import { COUNT } from '@/constants';
import { getShibes } from '@/lib/shibes';

import type { Shibe } from '@/types/Shibe';
import type { GetStaticProps } from 'next';

import styles from './index.module.scss';

type Props = {
  shibes: Shibe[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const shibes = await getShibes(COUNT);

  return {
    props: { shibes },
    // revalidate initial shibes per day.
    revalidate: 60 * 60 * 24,
  };
};

const Page = ({ shibes }: Props) => (
  <>
    <h1 className={styles.heading}>Some More Shiba</h1>
    <Gallery initialShibes={shibes} />
  </>
);

export default Page;
