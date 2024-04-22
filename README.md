# WIP: It is not completed. (21-APR-2024)
# react-native-horizontal-bar-graphs

`react-native-horizontal-bar-graphs` allows you to easily draw horizontal bar graphs.  
In a mobile environment, vertical bar graphs have many space limitations.

The bars are arranged horizontally to make it mobile friendly.

`react-native-horizontal-bar-graphs` provides two types of graphs.  
For both graphs, you can draw the graph by passing **only 1 or 2 required prop.**  
You can also customize it by passing other additional(optional) props.

> `react-native-horizontal-bar-graphs`는 가로 형태의 막대 그래프를 쉽게 그릴 수 있도록 합니다.  
> 모바일 환경에서 세로형태의 막대 그래프는 공간의 제약이 많습니다.
>
> 막대를 가로로 배치하여 모바일 환경에 적합하도록 구성했습니다.  
> `react-native-horizontal-bar-graphs`는 2가지의 그래프를 제공합니다.  
> 2가지 그래프 모두 **1개 또는 2개의 필수 props만** 전달하면 그래프를 그릴 수 있습니다.  
> 또한 다른 부가적인 props를 전달하여 커스터마이즈할 수 있습니다.

## 1. BarGraph

![samp_bar_no_anim](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/e64a56aa-11e2-476e-b41e-a270e3d7ca1c)
![samp_bar_anim](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/6fb297d7-79db-413a-9492-064406893fa7)

It is a typical bar graph.  
One data is rendered as one bar.  
Each bar can display a label, value, or percentage.  
You should pass **1 required prop.**

## 2. StackedBar

![samp_stack_no_anim](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/e2dedf31-a1bc-413a-9724-999262c6db83)
![samp_stack_anim](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/be58add5-234d-4108-9793-7f280558c5bf)

Data is stacked and rendered in one bar.  
Information about each data is displayed as a list at the bottom of the bar.  
You should pass **2 required props.**

# Installation

WIP...

# How to use

```tsx
import {BarGraph, IBarGraphData, StackedBar} from 'react-native-horizontal-bar-graphs';

const BAR_DATA: IBarGraphData[] = [
    {
        value: 10,
        label: 'Label 0',
        onPress: (label, value, color) => {
            // your onPresss
        },
    },
    {
        value: 9,
        label: 'Label 1',
    },
    {
        value: 16,
        label: 'Label 2',
    }
    ];

// in your component
<BarGraph
    graphData={BAR_DATA}
    // optional props...
/>

<StackedBar
    graphData={BAR_DATA}
    totalCnt={100}
    // optional props...
/>
```

# Props

## IBarGraphData

Basic data of graphs.  
Used in both `<BarGraph/>` and `<StackedBar/>`

| prop  | Required | Type       | Default | Description         |
| ----- | :------: | ---------- | ------- | ------------------- |
| label | O        | `string`     |         | Label(name) of data |
| value | O        | `number`     |         | Number of data      |
| color | X        | `ColorValue` | "coral",<br>"cornflowerblue",<br>"crimson", <br>"darkcyan", <br>"dodgerblue", <br>"orangered", <br>"forestgreen", <br>"goldenrod", <br>"yellowgreen", <br>"darkviolet" | Color to be rendered to Bar.<br>If you do not specify a color, the colors in `DEFAULT_COLORS` will be applied in a cycle.(modular operation)<br>**NOTE:** `DEFAULT_COLORS` were selected from [Named colors](https://reactnative.dev/docs/colors#named-colors) of React Native |
| onPress | X | function<br>`(label: string, value: number, color: ColorValue) => void \| Promise<void>` | | A function that runs when the user touches the bar.<br> `label`, `value`, and `color` are provided as parameters.<br>**NOTE:** In `BarGraph` it is triggered when the bar is touched<br>**NOTE:** In `StackedBar` it is triggered when an item in the list is touched.<br>**NOTE:** BarGraph에서는 막대를 터치할때 트리거됩니다.<br>**NOTE:** StackedBar에서는 리스트의 아이템을 터치할때 트리거됩니다. |

## BarGraph
only 1 required prop
| prop | Required | Type | Default | Description |
| --- | :---: | --- | --- | --- |
| graphData | O | `IBarGraphData` |  | Data to be rendered<br>[details](#ibargraphdata) |
| style | X | `StyleProp<ViewStyle>` |  | Styles for graph containers |
| title | X | `string` |  | Title of graph<br>**NOTE:** If `title` is `undefined` or an empty string (`""`), it will not be rendered. |
| titlePosition | X | `"top" \| "bottom"` | `"top"` | Position of the title |
| titleStyle | X | `StyleProp<TextStyle>` | `{fontWeight: "bold", fontSize: 20, textAlign: "center", marginVertical: 16}` | Styles for title |
| barHeight | X | `number` | `28` | Height of each bar |
| barHolderColor | X | `ColorValue` | `"#EEEEEE"` | Placeholder color for bars |
| barDistance | X | `number` | `12` | Distance between bars<br>**NOTE:** excluding the first bar |
| barAnimated | X | `boolean` | `true` | Whether to animate the bar |
| barAnimateDelay | X | `number` | `60` | Delay time (ms) at which the animation of the bars begins<br>막대들의 애니메이션이 시작되는 지연 시간 (ms) |
| barLeftStyle | X | `"rounded" \| "square"` | `"rounded"` | Left style of bar (both colored and holder) |
| barRightStyle | X | `"rounded" \| "square"` | `"rounded"` | Right style of colored bar |
| barHolderRightStyle | X | `"rounded" \| "square"` | `"rounded"` | Right style of placeholder of bar |
| showLabel | X | `boolean` | `true` | Whether to show each label of graphData |
| labelPosition | X | `"top" \| "bottom"` | `"top"` | Position of each label relative to the bar<br>막대를 기준으로 각 label의 포지션 |
| labelStlye | X | `StyleProp<TextStyle>` | `{ color: "#999999", fontSize: barHeight / 2 }` | Styles for label<br>**NOTE:** By default fontSize is set to `barHeight/2`.<br>**NOTE:** When you touch the bar, the text color is highlighted in the same color as the bar. If you don't want it, set `enableTouchHighlight` to `false`. |
| showValue | X | `boolean` | `true` | Whether to show the value above the bar |
| valuePosition | X | `"left" \| "right"` | `"right"` | Position on the bar where the value is rendered |
| showDivider | X | `boolean` | `true` | Whether to display a divider at certain percentages in the bar's placeholder |
| dividerInterver | X | `4 \| 5 \| 10 \| 20 \| 25 \| 33.3 \| 50` | `20` | A number for what percentage of intervals the dividing lines are rendered.<br>*e.g.* If set to `20`, dividers will be rendered at `20%`, `40%`, `60%`, and `80%`.<br>divider가 몇%마다 표시될지 |
| dividerHeight | X | `string \| number` | `"60%"` | Height of divider<br>When set to "100%", it is equal to the height of the bar |
| dividerColor | X | `ColorValue` | `"#BBBBBB"` | Color of divider |
| dividerWidth | X | `number` | `1` | Width of each divider |
| percentPosition | X | `"left" \| "right" \| "none"` | `"right"` | Position where the percentage corresponding to value is displayed.<br>**NOTE:** If it is `undefined` or `"none"`, it is not rendered. |
| percentFixed | X | `0 \| 1 \| 2` | `0` | A number representing the decimal place of a percentage to be rendered.<br>*e.g.1* Rendered to `50%` when set to `0`<br>*e.g.2* Rendered to `50.0%` when set to `1`<br>*e.g.3* Rendered to `50.00%` when set to `2`<br>**NOTE:** this prop is ignored when `PercentLabelComponent` is passed<br>퍼센트의 소수점 몇번째 자리까지 표시할지 |
| PercentLabelComponent | X | `({ value, total, color }: { value: number; total: number, color: ColorValue \| undefined }) => ReactElement \| null \| undefined` | | A React Component to display percentages.<br>`value`, `total` and `color` are provided to calculate percentage.<br>**NOTE:** It is recommended to **use fixed width** styles<br>**NOTE:** color may be passed `undefined`. Only the `PercentLabelComponent` that will be rendered on the right or left sides of the `StackedBar` has an `undefined` color.<br>**NOTE:** The color of `BarGraph.PercentLabelComponent` is **not** `undefined`<br>**NOTE:** color는 `undefined`로 전달될 수 있습니다. `StackedBar의` 오른쪽이나 왼쪽에 렌더될 `PercentLabelComponent만` color가 `undefined`입니다.<br>**NOTE:** `BarGraph.PercentLabelComponent`의 color는 `undefined`**가 아닙니다** |
| enableTouchHighlight | X | `boolean` | `true` | Whether to enable color highlighting when a bar or list item is touched. |

## StackedBar
2 required props. Shares many items with props from `BarGraph`

| prop | Required | Type | Default | Description |
| ---- | :-------:| ---- | ------- | ----------- |
| graphData | O | `IBarGraphData` |  | Data to be rendered<br>[details](#ibargraphdata) |
| totalCnt | O | `number` |  | Total number of data.<br>Used as denominator when calculating percentages.<br>데이터의 전체 갯수.<br>퍼센트를 계산할 때 분모로 사용됨. |
| style | X | `StyleProp<ViewStyle>` |  | Styles for graph containers |
| title | X | `string` |  | Title of graph<br>**NOTE:** If title is `undefined` or an empty string (`""`), it will not be rendered. |
| titlePosition | X | `"top" \| "bottom"` | `"top"` | Position of the title |
| titleStyle | X | `StyleProp<TextStyle>` | `{fontWeight: "bold", fontSize: 20, textAlign: "center", marginVertical: 16}` | Styles for title |
| barHeight | X | `number` | `28` | Height of each bar |
| barHolderColor | X | `ColorValue` | `"#EEEEEE"` | Placeholder color for bars |
| barAnimated | X | `boolean` | `true` | Whether to animate the bar |
| barLeftStyle | X | `"rounded" \| "square"` | `"rounded"` | Left style of bar (both colored and holder) |
| barRightStyle | X | `"rounded" \| "square"` | `"rounded"` | Right style of colored bar |
| barHolderRightStyle | X | `"rounded" \| "square"` | `"rounded"` | Right style of placeholder of bar |
| showDivider | X | `boolean` | `true` | Whether to display a divider at certain percentages in the bar's placeholder |
| dividerInterver | X | `4 \| 5 \| 10 \| 20 \| 25 \| 33.3 \| 50` | `20` | A number for what percentage of intervals the dividing lines are rendered<br>*e.g.* If set to `20`, dividers will be rendered at `20%`, `40%`, `60%`, and `80%`.<br>divider가 몇%마다 표시될지 |
| dividerHeight | X | `string \| number` | `"60%"` | Height of divider<br>When set to "100%", it is equal to the height of the bar |
| dividerColor | X | `ColorValue` | `"#BBBBBB"` | Color of divider |
| dividerWidth | X | `number` | `1` | Width of each divider |
| percentPosition | X | `"left" \| "right" \| "none"` | `"right"` | Position where the percentage corresponding to value is displayed.<br>**NOTE:** If it is `undefined` or `"none"`, it is not rendered. |
| percentFixed | X | `0 \| 1 \| 2` | `0` | A number representing the decimal place of a percentage to be rendered.<br>*e.g.1* Rendered to `50%` when set to `0`<br>*e.g.2* Rendered to `50.0%` when set to `1`<br>*e.g.3* Rendered to `50.00%` when set to `2`<br>**NOTE:** this prop is ignored when `PercentLabelComponent` is passed<br>퍼센트의 소수점 몇번째 자리까지 표시할지 |
| PercentLabelComponent | X | `({ value, total, color }: { value: number; total: number, color: ColorValue \| undefined }) => ReactElement \| null \| undefined` | | A React Component to display percentages.<br>`value`, `total` and `color` are provided to calculate percentage.<br>**NOTE:** It is recommended to **use fixed width** styles<br>**NOTE:** color may be passed `undefined`. Only the `PercentLabelComponent` that will be rendered on the right or left sides of the `StackedBar` has an `undefined` color.<br>**NOTE:** The color of `BarGraph.PercentLabelComponent` is **not** `undefined`<br>**NOTE:** color는 `undefined`로 전달될 수 있습니다. `StackedBar의` 오른쪽이나 왼쪽에 렌더될 `PercentLabelComponent만` color가 `undefined`입니다.<br>**NOTE:** `BarGraph.PercentLabelComponent`의 color는 `undefined`**가 아닙니다** |
| enableTouchHighlight | X | `boolean` | `true` | Whether to enable color highlighting when a bar or list item is touched. |
| showList | X | `boolean` | `true` | Whether to render a list of `graphData` |
| listAnimated | X | `boolean` | `true` | Whether to run animations when the list is displayed |
| listContainerStyle | X | `StyleProp<ViewStyle>` |  | Style of list container |
| ListItemComponent | X | `(props: IStackedCustomListItemProps) => ReactElement` |  | A React Component that renders custom list items.<br>[ListItemComponent (StackedBar Only)](#listitemcomponent-stackedbar-only) |

# Demo
## barLeftStyle, barRightStyle, barHolderRightStyle
![bar_sss](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/4dceed33-460a-4cff-841a-2d025f2bec3e)
![stack_sss](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/0a19eb59-c282-4f63-88fd-83813463d65a)
```tsx
barLeftStyle="square"
barRightStyle="square"
barHolderRightStyle="square"
```

![bar_rsr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/da2b2f93-f434-41ea-918e-302dde8d875f)
![stack_rsr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/71858464-e050-4b70-ad96-acf6a6b375ac)
```tsx
barLeftStyle="rounded"
barRightStyle="square"
barHolderRightStyle="rounded"
```

![bar_srr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/d33e7293-5395-47c1-8d0f-d9ae743aeb0c)
![stack_srr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/6c9ef94b-379b-44da-9e4d-233823302538)
```tsx
barLeftStyle="square"
barRightStyle="rounded"
barHolderRightStyle="rounded"
```

## PercentLabelComponent
recommend to use `fixed width styles`

![bar_percent_default](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/43945c20-e5e6-4a6b-9461-cf9aa68e24e1)
![bar_percent_custom](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/d58de523-a297-4163-aa9e-a5c66358ba19)

![stack_percent_custom](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/7955f6da-f84f-4e60-8274-0600aa4ee95f)
![stack_percent_default](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/b8a05d95-8cf6-4ae7-8970-95dfc0617d6e)
```tsx
<BarGraph
  graphData={BAR_DATA}
  style={[styles.graphContainer]}
  PercentLabelComponent={({value, total, color}) => {
    return (
      <Text
        style={{
          width: 70, // recommended to use `fixed width styles`
          fontSize: 16,
          textAlign: 'right',
          fontWeight: 'bold',
          color: color,
          fontStyle: 'italic',
          textDecorationLine: 'underline',
        }}>
        {((value / total) * 100).toFixed(1) + '%'}
      </Text>
    );
  }}
/>

<StackedBar
  graphData={BAR_DATA}
  totalCnt={TOTAL_CNT}
  style={styles.graphContainer}
  PercentLabelComponent={({value, total, color}) => {
    return (
      <Text
        style={{
          width: 70,
          fontSize: 16,
          textAlign: 'right',
          fontWeight: 'bold',
          color: color,
          fontStyle: 'italic',
          textDecorationLine: 'underline',
        }}>
        {((value / total) * 100).toFixed(1) + '%'}
      </Text>
    );
  }}
/>
```

## enableTouchHighlight
If you don't want this effect, set `enableTouchHighlight` to `false`.  
default is `true`

![bar_highlight](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/92d05060-47d1-4ce4-9e25-3a3389dda806)
![stack_highlight](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/13804cd0-01fc-494f-8432-ade7bb2bf777)


## barDistance (BarGraph only)
![bar_distance](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/f69747ec-9445-4fdb-b6fb-becec7247b0c)
![bar_distance_24](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/59d6fe5f-f108-4437-b1c2-4c28b023303c)
```tsx
<BarGraph
  graphData={BAR_DATA}
  style={[styles.graphContainer]}
  barDistance={24} // default : 12
  // ...other props
/>
```

## valuePosition (BarGraph only)
![bar_val_left](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/7a4015d6-b221-4c30-9a39-9fad55450862)
![bar_val_right](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/7e2572cc-2f7e-4d43-970b-a3914db1d34f)
```tsx
<BarGraph
  graphData={BAR_DATA}
  style={[styles.graphContainer]}
  valuePosition="left" // default: "right"
  // ...other props
/>
```

## ListItemComponent (StackedBar Only)

If you want to use your own custom list items, use this `ListItemComponent`.
> For performance reasons, I strongly recommend wrapping your custom component with `React.memo()`
> 
![stack_list_dd](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/b4c152fc-5399-4a84-a282-91e5419c7504)
![stack_list_cd](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/07d5198e-03ff-4745-9210-f17bc849f6ba)
![stack_list_cc](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/8b5a3db7-5b02-40a7-bc85-bbeb5dca0534)


The following `props` of `ListItemComponent` are passed:

```tsx
export interface IStackedCustomListItemProps {
	readonly label: string;
	readonly value: number;
	readonly color: ColorValue;
	readonly index: number;
	readonly totalCnt: number;
	readonly onTouching: (index: number, isTouched: boolean) => void;
	readonly PercentLabelComponent: PercentLabelComp;
}
```

***onTouching***

If you want to use the same color highlight effect as when using [enableTouchHighlight](),

implement `onPressIn()` and `onPressOut()` of your TouchableComponents (such as `TouchableOpacity` or `TouchableHighlight`) using `props.onTouching()` as follows:

```tsx
<TouchableOpacity
	// To use `TouchHighlight`, implement `onPressIn` and `onPressOut` as follows:
	onPressIn={() => props.onTouching(props.index, true)}
	onPressOut={() => props.onTouching(props.index, false)}
	onPress={() => {}}>
	{...}
</TouchableOpacity>
```

***PercentLabelComponent***

If you passed your `PercentLabelComponent` as the props of `StackedBar`,

the same `PercentLabelComponent` will be passed as the props of `ListItemComponent`.

If you did **NOT** pass a `PercentLabelComponent` as the props of `StackedBar`,

the default `PercentLabelComponent` will be passed as the props of `ListItemComponent`.

***Full sample code of using `ListItemComponent`***

```tsx
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
    return (
      <TouchableOpacity
        // To use `TouchHighlight`, implement `onPressIn` and `onPressOut` as follows:
        onPressIn={() => onTouching(index, true)}
        onPressOut={() => onTouching(index, false)}
        onPress={() => {}}>
        <View
          style={{
            marginVertical: 8,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: color}}>
            {label}
          </Text>
          <View
            style={{
              width: 70,
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'flex-end',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{value}</Text>
            <Text style={{fontSize: 12}}>{' / ' + totalCnt}</Text>
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

// For performance reasons,
// I strongly recommend wrapping your custom component with React.memo()
const ListItem = React.memo(_ListItem);

return (
	// return statement in your components
	// or return statement of render() in your components
	// ...
	<StackedBar
	  graphData={BAR_DATA}
	  totalCnt={dataTotalCnt + 30}
	  style={styles.graphContainer}
	  title="This is Title"
	  PercentLabelComponent={({value, total, color}) => {
	    return (
	      <Text
	        style={{
	          width: 70,
	          fontSize: 16,
	          textAlign: 'right',
	          fontWeight: 'bold',
	          color: color,
	          fontStyle: 'italic',
	          textDecorationLine: 'underline',
	        }}>
	        {((value / total) * 100).toFixed(1) + '%'}
	      </Text>
	    );
	  }}
	  listContainerStyle={{marginTop: 16}}
	  ListItemComponent={ListItem}
	/>
);

```

# License
MIT license