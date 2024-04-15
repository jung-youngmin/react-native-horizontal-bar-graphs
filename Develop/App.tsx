import React from 'react';
import {StyleSheet, SafeAreaView, Alert} from 'react-native';

import {BarGraph} from './dist';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BarGraph
        graphData={[
          {
            value: 10,
            label: 'data 0',
            onPress: (label, value, color) => {
              Alert.alert(label, value + '__' + color.toString());
            },
          },
          {
            value: 9,
            label: 'data 1',
          },
          {
            value: 16,
            label: 'data 2',
          },
          {
            value: 12,
            label: 'data 3',
          },
          {
            value: 7,
            label: 'data 4',
          },
          {
            value: 1,
            label: 'data 5',
          },
          {
            value: 4,
            label: 'data 6',
          },
          {
            value: 7,
            label: 'data 7',
          },
          {
            value: 0,
            label: 'data 8',
          },
          {
            value: 44,
            label: 'data 9',
          },
        ]}
        style={{
          margin: 16,
          padding: 16,
          borderRadius: 16,
          elevation: 8,
          backgroundColor: 'white',
        }}
        totalCnt={10 + 9 + 16 + 12 + 7 + 1 + 4 + 7 + 0 + 44}
        // percentPosition="left"
        percentPosition="right"
        percentFixed={2}
        // barLeftStyle="square"
        // barRightStyle="square"
        title="TITLE"
        titlePosition="top"
        valuePosition="right"
        barAnimated={true}
        // valuePosition="left"
        // labelPosition="bottom"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
});

export default App;
