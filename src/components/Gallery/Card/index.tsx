import { gap, gridAutoRows } from '..';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import type { Shibe } from '@/types/Shibe';

import styles from './index.module.scss';

type Props = {
  shibe: Shibe;
};

const Card = ({ shibe: { id, url, height, width } }: Props) => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const containerRef = useRef<HTMLAnchorElement | null>(null);

  // calculate image's height using the same aspect as width.
  const calculatedHeight = height * (currentWidth / width);
  const rowSpan = Math.floor(calculatedHeight / (gridAutoRows + gap)) + 1;
  // adjust container height so the image can fill entire the card.
  const containerHeight = rowSpan * (gridAutoRows + gap) - gap;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current === null) return;

      setCurrentWidth(containerRef.current.offsetWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="no-referrer"
      ref={containerRef}
      className={styles.module}
      style={
        {
          '--height': `${containerHeight}px`,
          '--grid-row-end': `span ${rowSpan}`,
        } as React.CSSProperties
      }
    >
      <Image
        id={id}
        src={url}
        alt="shibe"
        fill
        unoptimized
        sizes="100vw (min-width: 768px) 50vw (min-width: 1024px) 33vw"
        className={styles.img}
      />
    </a>
  );
};

export default Card;
