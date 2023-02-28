import MuiStack, { StackProps as MuiStackProps } from '@mui/material/Stack';

import Divider from '../dataDisplay/Divider';

type Direction = 'column' | 'row';
type HorizontalAlignment = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceEvenly';
type VerticalAlignment = 'start' | 'center' | 'end';

export interface StackProps {
  children: React.ReactNode;
  direction?: Direction;
  hasDivider?: boolean;
  horizontalAlignment?: HorizontalAlignment;
  spacing?: MuiStackProps['spacing'];
  verticalAlignment?: VerticalAlignment;
}

export default function Stack(props: StackProps): JSX.Element {
  const {
    children,
    direction = 'row',
    hasDivider,
    horizontalAlignment = 'start',
    spacing = 0,
    verticalAlignment = 'start',
  } = props;

  const muiAlignItems = (): MuiStackProps['alignItems'] => {
    switch (verticalAlignment) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      default:
        return verticalAlignment;
    }
  };

  const muiJustifyContent = (): MuiStackProps['justifyContent'] => {
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
    <MuiStack
      alignItems={muiAlignItems()}
      className="rgf_stack"
      direction={direction}
      divider={hasDivider ? <Divider orientation="vertical" /> : null}
      justifyContent={muiJustifyContent()}
      spacing={spacing}
    >
      {children}
    </MuiStack>
  );
}
