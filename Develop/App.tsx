import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Alert, Button} from 'react-native';

import {BarGraph, IBarGraphData, StackedBar} from './dist';

const App = () => {
  const BAR_DATA: IBarGraphData[] = [
    {
      value: 10,
      label: 'Label 0',
      onPress: (label, value, color) => {
        Alert.alert(label, value + '__' + color.toString());
      },
    },
    {
      value: 9,
      label: 'Label 1',
    },
    {
      value: 16,
      label: 'Label 2',
    },
    {
      value: 12,
      label: 'Label 3',
    },
    {
      value: 7,
      label: 'Label 4',
    },
    {
      value: 1,
      label: 'Label 5',
    },
    {
      value: 4,
      label: 'Label 6',
    },
    {
      value: 7,
      label: 'Label 7',
    },
    {
      value: 0,
      label: 'Label 8',
    },
    {
      value: 44,
      label: 'Label 9',
    },
  ];

  const [showBarGraph, setShowBarGraph] = useState(false);
  const [showStackedBarGraph, setShowStackedBarGraph] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Bar Graph"
        onPress={() => setShowBarGraph(prev => !prev)}
      />
      <BarGraph
        graphData={BAR_DATA}
        style={[
          styles.graphContainer,
          {display: showBarGraph ? 'flex' : 'none'},
        ]}
        // totalCnt={10 + 9 + 16 + 12 + 7 + 1 + 4 + 7 + 0 + 44}
        // percentPosition="left"
        percentPosition="right"
        percentFixed={2}
        // barLeftStyle="square"
        // barRightStyle="square"
        title="TITLE"
        titlePosition="top"
        valuePosition="right"
        // labelPosition="bottom"
        barAnimated={true}
        // valuePosition="left"
        // labelPosition="bottom"
        dividerWidth={1}
        // dividerHeight={'100%'}
        // dividerInterver={25}
        // barAnimateDelay={0}
        // PercentLabelComponent={({value, total}) => {
        //   return (
        //     <Text style={{borderWidth: 1, width: 70}}>
        //       {value + ', ' + total}
        //     </Text>
        //   );
        // }}
      />
      <Button
        title="Stacked Bar Graph"
        onPress={() => setShowStackedBarGraph(prev => !prev)}
      />
      <StackedBar
        graphData={BAR_DATA}
        style={[
          styles.graphContainer,
          {display: showStackedBarGraph ? 'flex' : 'none'},
        ]}
        // totalCnt={10 + 9 + 16 + 12 + 7 + 1 + 4 + 7 + 0 + 44}
        // percentPosition="left"
        percentPosition="right"
        percentFixed={2}
        // barLeftStyle="square"
        // barRightStyle="square"
        title="TITLE"
        titlePosition="top"
        valuePosition="right"
        // labelPosition="bottom"
        barAnimated={true}
        // valuePosition="left"
        // labelPosition="bottom"
        dividerWidth={1}
        // dividerHeight={'100%'}
        // dividerInterver={25}
        // barAnimateDelay={0}
        // PercentLabelComponent={({value, total}) => {
        //   return (
        //     <Text style={{borderWidth: 1, width: 70}}>
        //       {value + ', ' + total}
        //     </Text>
        //   );
        // }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  graphContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 8,
    backgroundColor: 'white',
  },
});

export default App;
