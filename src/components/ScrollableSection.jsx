import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, Link, Stack } from '@mui/joy';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ShopsCard from './ShopsCard';

const ScrollableSection = ({ title, items }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const { current } = scrollRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  }, []);

  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      updateScrollButtons();

      current.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);

      return () => {
        current.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, [items, updateScrollButtons]);

  const scroll = useCallback((direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" sx={{ mb: 2 }}>
        <Typography level="h4" color='primary'>
          {title}
        </Typography>
        <Link href={`/shops/${title.toLowerCase()}`} underline="always" sx={{ ml: 'auto' }}>Tümünü Gör</Link>
      </Stack>
      <Box sx={{ position: 'relative' }}>
        {canScrollLeft && (
          <IconButton
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>
        )}
        {canScrollRight && (
          <IconButton
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 999,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        )}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { display: 'none' },
            padding: '0 40px',
            gap: 2,
          }}
        >
          {items.map((item) => (
            <ShopsCard key={item.shopId} data={item} minWidth={300} maxWidth={300} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ScrollableSection);