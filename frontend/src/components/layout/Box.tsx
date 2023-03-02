import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';

export interface BoxProps {
  ariaRole?: MuiBoxProps['role'];
  children: React.ReactNode;
  className?: MuiBoxProps['className'];
  m?: MuiBoxProps['m'];
  mb?: MuiBoxProps['mb'];
  ml?: MuiBoxProps['ml'];
  mr?: MuiBoxProps['mr'];
  mt?: MuiBoxProps['mt'];
  mx?: MuiBoxProps['mx'];
  my?: MuiBoxProps['my'];
  onClick?: MuiBoxProps['onClick'];
  onKeyDown?: MuiBoxProps['onKeyDown'];
  p?: MuiBoxProps['p'];
  pb?: MuiBoxProps['pb'];
  pl?: MuiBoxProps['pl'];
  pr?: MuiBoxProps['pr'];
  pt?: MuiBoxProps['pt'];
  px?: MuiBoxProps['px'];
  py?: MuiBoxProps['py'];
  style?: MuiBoxProps['sx'];
}

export default function Box(props: BoxProps): JSX.Element {
  const {
    ariaRole = 'presentation',
    children,
    className = 'rgf_box',
    m = undefined,
    mb = undefined,
    ml = undefined,
    mr = undefined,
    mt = undefined,
    mx = undefined,
    my = undefined,
    onClick = (): void => {},
    onKeyDown = (): void => {},
    p = undefined,
    pb = undefined,
    pl = undefined,
    pr = undefined,
    pt = undefined,
    px = undefined,
    py = undefined,
    style = undefined,
  } = props;

  return (
    <MuiBox
      className={className}
      m={m}
      mb={mb}
      ml={ml}
      mr={mr}
      mt={mt}
      mx={mx}
      my={my}
      onClick={onClick}
      onKeyDown={onKeyDown}
      p={p}
      pb={pb}
      pl={pl}
      pr={pr}
      pt={pt}
      px={px}
      py={py}
      role={ariaRole}
      sx={style}
    >
      {children}
    </MuiBox>
  );
}
