import { GridProps as MuiGridProps } from '@mui/material/Grid';
import MuiGrid2 from '@mui/material/Unstable_Grid2/Grid2';

type Direction = 'column' | 'row';
type HorizontalAlignment = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceEvenly';

export interface GridProps {
  children: React.ReactNode;
  desktop?: number;
  desktopOffset?: number;
  direction?: Direction;
  horizontalAlignment?: HorizontalAlignment;
  isContainer?: MuiGridProps['container'];
  laptop?: number;
  laptopOffset?: number;
  mobile?: number;
  mobileOffset?: number;
  tablet?: number;
  tabletOffset?: number;
}

export default function Grid(props: GridProps): JSX.Element {
  const {
    children,
    desktop = undefined,
    desktopOffset = undefined,
    direction = 'row',
    horizontalAlignment = undefined,
    isContainer = false,
    laptop = undefined,
    laptopOffset = undefined,
    mobile = undefined,
    mobileOffset = undefined,
    tablet = undefined,
    tabletOffset = undefined,
  } = props;

  const muiJustifyContent = (): MuiGridProps['justifyContent'] => {
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
      className="rgf_grid"
      container={isContainer || !!horizontalAlignment}
      desktop={desktop}
      desktopOffset={desktopOffset}
      direction={direction}
      laptop={laptop}
      laptopOffset={laptopOffset}
      mobile={mobile}
      mobileOffset={mobileOffset}
      tablet={tablet}
      tabletOffset={tabletOffset}
      justifyContent={muiJustifyContent()}
    >
      {children}
    </MuiGrid2>
  );
}
