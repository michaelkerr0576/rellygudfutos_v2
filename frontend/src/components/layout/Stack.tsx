import clsx from 'clsx';

import MuiStack, { StackProps as MuiStackProps } from '@mui/material/Stack';

import Divider from '../dataDisplay/Divider';

type Direction = 'column' | 'row';
type HorizontalAlignment = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceEvenly';
type VerticalAlignment = 'start' | 'center' | 'end';

export interface StackProps {
  children: React.ReactNode;
  className?: MuiStackProps['className'];
  direction?: Direction;
  hasDivider?: boolean;
  horizontalAlignment?: HorizontalAlignment;
  spacing?: MuiStackProps['spacing']; // * The gap elements in theme.spacing()
  verticalAlignment?: VerticalAlignment;
}

export default function Stack(props: StackProps): JSX.Element {
  const {
    children,
    className = '',
    direction = 'row',
    hasDivider,
    horizontalAlignment = 'start',
    spacing = 0,
    verticalAlignment = 'start',
  } = props;

  const getAlignItems = (): MuiStackProps['alignItems'] => {
    switch (verticalAlignment) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      default:
        return verticalAlignment;
    }
  };

  const getJustifyContent = (): MuiStackProps['justifyContent'] => {
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
      alignItems={getAlignItems()}
      className={clsx('rgf-stack', { [className]: !!className })}
      direction={direction}
      divider={hasDivider ? <Divider orientation="vertical" /> : null}
      justifyContent={getJustifyContent()}
      spacing={spacing}
    >
      {children}
    </MuiStack>
  );
}
