import MuiStack from '@mui/material/Stack';

type Direction = 'column' | 'row';
type HorizontalAlignment = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceEvenly';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space=evenly';
type VerticalAlignment = 'start' | 'center' | 'end';
type AlignItems = 'flex-start' | 'center' | 'flex-end';

export interface StackProps {
  children: React.ReactNode;
  direction?: Direction;
  horizontalAlignment?: HorizontalAlignment;
  verticalAlignment?: VerticalAlignment;
}

export default function Stack(props: StackProps): JSX.Element {
  const { children, direction, horizontalAlignment, verticalAlignment } = props;

  const alignItems = (): AlignItems => {
    switch (verticalAlignment) {
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  };

  const justifyContent = (): JustifyContent => {
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
    <MuiStack alignItems={alignItems} direction={direction} justifyContent={justifyContent}>
      {children}
    </MuiStack>
  );
}

Stack.defaultProps = {
  direction: 'row',
  horizontalAlignment: 'start',
  verticalAlignment: 'start',
};
