import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

interface IconComponentProps extends Omit<IconProps, 'children'> {
  type: string;
}
function MyIcon(props: IconComponentProps) {
  const { type, ...rest } = props;
  if (type === 'circle') {
    return (
      <Icon viewBox="0 0 200 200" {...rest}>
        <path
          fill="currentColor"
          d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
        />
      </Icon>
    );
  }
  return (
    <Icon viewBox="0 0 20 20" {...rest}>
      <path d="M0 0h20v20H0z" fill="currentColor" />
    </Icon>
  );
}

export default MyIcon;
