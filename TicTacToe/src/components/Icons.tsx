import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Icons = ({ name }: { name: string }) => {
  if (name === 'cross') {
    return <Icon name="times" size={44} color="#38CC77" />;
  }

  if (name === 'circle') {
    return <Icon name="circle-thin" size={44} color="#F7CD2E" />;
  }

  return <Icon name="pencil" size={44} color="#FFFFFF" />;
};

export default Icons;
