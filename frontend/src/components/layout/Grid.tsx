import clsx from 'clsx';

import { GridProps as MuiGridProps } from '@mui/material/Grid';
import MuiGrid2 from '@mui/material/Unstable_Grid2/Grid2';

type Direction = 'column' | 'row';
type HorizontalAlignment = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceEvenly';

export interface GridProps {
  children: React.ReactNode;
  className?: MuiGridProps['className'];
  desktop?: number | 'auto';
  desktopOffset?: number;
  direction?: Direction;
  horizontalAlignment?: HorizontalAlignment;
  isContainer?: MuiGridProps['container'];
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
    children,
    className = '',
    desktop = undefined,
    desktopOffset = undefined,
    direction = 'row',
    horizontalAlignment = undefined,
    isContainer = false,
    laptop = undefined,
    laptopOffset = undefined,
    mobile = undefined,
    mobileOffset = undefined,
    spacing = 0,
    tablet = undefined,
    tabletOffset = undefined,
  } = props;

  const getJustifyContent = (): MuiGridProps['justifyContent'] => {
    switch (horizontalAlignment) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      case 'spaceBetween':
        return 'space-between';
      case 'spaceEvenly':
        return 'space-evenly';
      default:
        return horizontalAlignment;
    }
  };

  return (
    <MuiGrid2
      className={clsx('rgf-grid', { [className]: !!className })}
      container={isContainer || !!horizontalAlignment}
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
