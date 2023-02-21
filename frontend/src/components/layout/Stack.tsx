import MuiStack, { StackProps as MuiStackProps } from '@mui/material/Stack';

type Direction = 'column' | 'row';
type HorizontalAlignment = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceEvenly';
type VerticalAlignment = 'start' | 'center' | 'end';

export interface StackProps {
  children: React.ReactNode;
  direction?: Direction;
  horizontalAlignment?: HorizontalAlignment;
  verticalAlignment?: VerticalAlignment;
}

export default function Stack(props: StackProps): JSX.Element {
  const { children, direction = 'row', horizontalAlignment = 'start', verticalAlignment = 'start' } = props;

  const alignItems = (): MuiStackProps['alignItems'] => {
    switch (verticalAlignment) {
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  };

  const justifyContent = (): MuiStackProps['justifyContent'] => {
    switch (horizontalAlignment) {
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      case 'spaceBetween':
        return 'space-between';
      case 'spaceEvenly':
        return 'space=evenly';
      default:
        return 'flex-start';
    }
  };

  return (
    <MuiStack alignItems={alignItems()} direction={direction} justifyContent={justifyContent()}>
      {children}
    </MuiStack>
  );
}
