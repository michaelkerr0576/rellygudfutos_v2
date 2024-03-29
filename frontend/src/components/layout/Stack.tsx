import clsx from 'clsx';

import MuiStack, { StackProps as MuiStackProps } from '@mui/material/Stack';

import Divider from '../dataDisplay/Divider';

type AlignItems = 'start' | 'center' | 'end';
type Direction = 'column' | 'row';
type JustifyContent = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceEvenly';

export interface StackProps {
  alignItems?: AlignItems;
  children: React.ReactNode;
  className?: MuiStackProps['className'];
  direction?: Direction;
  hasDivider?: boolean;
  justifyContent?: JustifyContent;
  spacing?: MuiStackProps['spacing']; // * The gap in theme.spacing()
}

export default function Stack(props: StackProps): JSX.Element {
  const {
    alignItems = 'start',
    children,
    className = '',
    direction = 'row',
    hasDivider,
    justifyContent = 'start',
    spacing = 0,
  } = props;

  const getAlignItems = (): MuiStackProps['alignItems'] => {
    switch (alignItems) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      default:
        return alignItems;
    }
  };

  const getJustifyContent = (): MuiStackProps['justifyContent'] => {
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

  const renderDivider = (): JSX.Element => (
    <Divider orientation={direction === 'column' ? 'horizontal' : 'vertical'} />
  );

  const stackStyles = clsx('rgf-stack', `rgf-stack--${direction}`, {
    [className]: !!className,
  });

  return (
    <MuiStack
      alignItems={getAlignItems()}
      className={stackStyles}
      direction={direction}
      divider={hasDivider ? renderDivider() : null}
      justifyContent={getJustifyContent()}
      spacing={spacing}
    >
      {children}
    </MuiStack>
  );
}
