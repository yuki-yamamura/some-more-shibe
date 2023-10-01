import Card from './Card';
import { useShibes } from '@/hooks/useShibes';

import type { Shibe } from '@/types/Shibe';

import styles from './index.module.scss';

export const gap = 20;

export const gridAutoRows = 20;

type Props = {
  initialShibes: Shibe[];
};

const Gallery = ({ initialShibes: initialImages }: Props) => {
  const { data, error, isValidating, observeIntersection } = useShibes();
  const loadedShibes = data?.map(({ shibes }) => shibes).flat();

  return (
    <div
      className={styles.module}
      style={
        {
          '--gap': `${gap}px`,
          '--grid-auto-rows': `${gridAutoRows}px`,
        } as React.CSSProperties
      }
    >
      {initialImages.map((shibe) => (
        <Card shibe={shibe} key={shibe.id} />
      ))}
      {error === undefined &&
        loadedShibes &&
        loadedShibes.map((shibe) => <Card shibe={shibe} key={shibe.id} />)}
      {error === undefined && !isValidating && (
        <div ref={observeIntersection} />
      )}
    </div>
  );
};

export default Gallery;
