import React, {useCallback, useMemo, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {
  BarGraph,
  IBarGraphData,
  IStackedCustomListItemProps,
  StackedBar,
  StackedCustomListItem,
} from './dist';

const App = () => {
  const BAR_DATA: IBarGraphData[] = useMemo(() => {
    return [
      {
        value: 20000000,
        label: 'Label 0',
        onPress: (label, value, color) => {
          Alert.alert(label, value + '__' + color.toString());
        },
      },
      {
        value: 15,
        label: 'Label 1',
      },
      {
        value: 15,
        label: 'Label 2',
      },
      {
        value: 16,
        label: 'Label 3',
      },
      {
        value: 24,
        label: 'Label 4',
      },
      {
        value: 18,
        label: 'Label 5',
      },
      {
        value: 12,
        label: 'Label 6',
      },
      {
        value: 8,
        label: 'Label 7',
      },
      {
        value: 45,
        label: 'Label 8',
      },
      {
        value: 36,
        label: 'Label 9',
      },
    ];
  }, []);

  const dataTotalCnt = useMemo(() => {
    let total = 0;
    BAR_DATA.forEach(item => {
      total += item.value;
    });
    return total;
  }, [BAR_DATA]);

  const [showBarGraph, setShowBarGraph] = useState(false);
  const [showStackedBarGraph, setShowStackedBarGraph] = useState(false);

  const _ListItem = useCallback<StackedCustomListItem>(
    (listProps: IStackedCustomListItemProps) => {
      const {
        onTouching,
        index,
        label,
        totalCnt,
        value,
        color,
        PercentLabelComponent,
      } = listProps;

      const itemCont: ViewStyle = {
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      };

      const labelStyle: TextStyle = {
        fontSize: 18,
        fontWeight: 'bold',
        color: color,
      };

      const valueCont: ViewStyle = {
        width: 70,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
      };

      const valueStyle: TextStyle = {fontSize: 16, fontWeight: 'bold'};
      const valueSubStyle: TextStyle = {fontSize: 12};

      return (
        <TouchableOpacity
          // To use `TouchHighlight`, implement `onPressIn` and `onPressOut` as follows:
          onPressIn={() => onTouching(index, true)}
          onPressOut={() => onTouching(index, false)}
          onPress={() => {}}>
          <View style={itemCont}>
            <Text style={labelStyle}>{label}</Text>
            <View style={valueCont}>
              <Text style={valueStyle}>{value}</Text>
              <Text style={valueSubStyle}>{' / ' + totalCnt}</Text>
            </View>
            <PercentLabelComponent
              value={value}
              total={totalCnt}
              color={color}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ListItem = React.memo(_ListItem);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          title="Bar Graph"
          onPress={() => setShowBarGraph(prev => !prev)}
        />
        {showBarGraph && (
          <BarGraph
            graphData={BAR_DATA}
            style={[styles.graphContainer]}
            valueSuffixCnt={1000}
            // valueSuffixList={['만', '억', '조']}
            // title="Bar Graph Title"
            // titlePosition="bottom"
            // titleStyle={{marginTop: 32}}
            // barHeight={20}
            // barHolderColor={'#DDDDDD'}
            // barAnimated={true}
            // barLeftStyle="square"
            // barRightStyle="rounded"
            // barHolderRightStyle="rounded"
            // showDivider={true}
            // dividerInterver={25}
            // dividerHeight={'50%'}
            // dividerColor={'#FFFFFF'}
            // dividerWidth={1}
            // percentPosition="right"
            // percentFixed={2}
            // PercentLabelComponent={({value, total, color}) => {
            //   return (
            //     <Text
            //       style={{
            //         width: 70,
            //         fontSize: 16,
            //         textAlign: 'right',
            //         fontWeight: 'bold',
            //         color: color,
            //         fontStyle: 'italic',
            //         textDecorationLine: 'underline',
            //       }}>
            //       {((value / total) * 100).toFixed(1) + '%'}
            //     </Text>
            //   );
            // }}
            // enableTouchHighlight
            // barDistance={24}
            // barAnimateDelay={50}
            // showLabel={true}
            // labelPosition="bottom"
            // labelStlye={{fontSize: 20}}
            // showValue={true}
            // valuePosition="left"
          />
        )}
        <Button
          title="Stacked Bar Graph"
          onPress={() => setShowStackedBarGraph(prev => !prev)}
        />
        {showStackedBarGraph && (
          <StackedBar
            graphData={BAR_DATA}
            totalCnt={dataTotalCnt + 30}
            style={styles.graphContainer}
            title="This is Title"
            // titlePosition="top"
            // titleStyle={{borderWidth: 1}}
            // barHeight={24}
            // barHolderColor={'#DDDDDD'}
            // barAnimated={true}
            // barLeftStyle="square"
            // barRightStyle="rounded"
            // barHolderRightStyle="rounded"
            // showDivider={true}
            // dividerInterver={25}
            // dividerHeight={'90%'}
            // dividerColor={'gray'}
            // dividerWidth={1}
            // percentPosition="right"
            // percentFixed={1}
            // PercentLabelComponent={({value, total, color}) => {
            //   return (
            //     <Text
            //       style={{
            //         width: 70,
            //         fontSize: 16,
            //         textAlign: 'right',
            //         fontWeight: 'bold',
            //         color: color,
            //         fontStyle: 'italic',
            //         textDecorationLine: 'underline',
            //       }}>
            //       {((value / total) * 100).toFixed(1) + '%'}
            //     </Text>
            //   );
            // }}
            // enableTouchHighlight={true}
            // showList={false}
            // listAnimated={true}
            // listContainerStyle={{marginTop: 16}}
            // ListItemComponent={ListItem}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  graphContainer: {
    // flex: 1,
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 8,
    backgroundColor: 'white',
  },
});

export default App;
