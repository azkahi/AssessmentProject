import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

const textDescription = ({title, description}) => {
  return (
    <View>
      <Text style={styles.titleTextDescription}>{title}</Text>
      <Text style={styles.textDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTextDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  textDescription: {
    fontSize: 14,
    marginVertical: 10,
  },
});

export default textDescription;
