import clsx from 'clsx';

import { GridProps as MuiGridProps } from '@mui/material/Grid';
import MuiGrid2 from '@mui/material/Unstable_Grid2/Grid2';

type AlignItems = 'start' | 'center' | 'end';
type Direction = 'column' | 'row';
type JustifyContent = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceEvenly';

export interface GridProps {
  alignItems?: AlignItems;
  children: React.ReactNode;
  className?: MuiGridProps['className'];
  desktop?: number | 'auto';
  desktopOffset?: number;
  direction?: Direction;
  isContainer?: MuiGridProps['container'];
  justifyContent?: JustifyContent;
  laptop?: number | 'auto';
  laptopOffset?: number;
  mobile?: number | 'auto';
  mobileOffset?: number;
  spacing?: MuiGridProps['spacing']; // * The gap elements in theme.spacing()
  tablet?: number | 'auto';
  tabletOffset?: number;
}

export default function Grid(props: GridProps): JSX.Element {
  const {
    alignItems = 'start',
    children,
    className = '',
    desktop = undefined,
    desktopOffset = undefined,
    direction = 'row',
    isContainer = false,
    justifyContent = undefined,
    laptop = undefined,
    laptopOffset = undefined,
    mobile = undefined,
    mobileOffset = undefined,
    spacing = 0,
    tablet = undefined,
    tabletOffset = undefined,
  } = props;

  const getAlignItems = (): MuiGridProps['alignItems'] => {
    switch (alignItems) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      default:
        return alignItems;
    }
  };

  const getJustifyContent = (): MuiGridProps['justifyContent'] => {
    switch (justifyContent) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      case 'spaceBetween':
        return 'space-between';
      case 'spaceEvenly':
        return 'space-evenly';
      default:
        return justifyContent;
    }
  };

  const gridStyles = clsx('rgf-grid', {
    [className]: !!className,
  });

  return (
    <MuiGrid2
      alignItems={getAlignItems()}
      className={gridStyles}
      container={isContainer || !!justifyContent}
      desktop={desktop}
      desktopOffset={desktopOffset}
      direction={direction}
      justifyContent={getJustifyContent()}
      laptop={laptop}
      laptopOffset={laptopOffset}
      mobile={mobile}
      mobileOffset={mobileOffset}
      spacing={spacing}
      tablet={tablet}
      tabletOffset={tabletOffset}
    >
      {children}
    </MuiGrid2>
  );
}
