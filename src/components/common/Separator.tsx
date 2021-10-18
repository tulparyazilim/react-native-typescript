import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, Block} from '@theme';

const Separator = ({color = COLORS.gray, isVertical = false, ...rest}) => {
  const separatorStyle = isVertical
    ? styles.verticalSeparator
    : styles.horizontalSeparator;
  return (
    <Block noflex {...rest}>
      <View style={[separatorStyle, {backgroundColor: color}]} />
    </Block>
  );
};

export default Separator;

const styles = StyleSheet.create({
  horizontalSeparator: {
    height: 0.8,
  },
  verticalSeparator: {
    flex: 1,
    width: 0.8,
  },
});