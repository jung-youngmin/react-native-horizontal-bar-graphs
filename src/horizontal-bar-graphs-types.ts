import { ReactElement } from "react";
import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IBarGraphData {
	readonly label: string;
	readonly value: number;
	readonly color?: ColorValue;
	readonly onPress?: (label: string, value: number, color: ColorValue) => void | Promise<void>;
}

export interface IHorizontalBarGraphsBaseProps {
	/** Data to be rendered */
	readonly graphData: IBarGraphData[];
	/** Styles for graph containers */
	readonly style?: StyleProp<ViewStyle>;

	/**
	 * Title of graph
	 * - NOTE: If `title` is `undefined` or an empty string (`""`), it will not be rendered.
	 */
	readonly title?: string;
	/**
	 * Position of the title
	 * - default: `"top"`
	 */
	readonly titlePosition?: "top" | "bottom";
	/** Styles for title */
	readonly titleStyle?: StyleProp<TextStyle>;

	/**
	 * Height of each bar
	 * - default: `28`
	 */
	readonly barHeight?: number;
	/**
	 * Placeholder color for bars
	 * - default: `"#EEEEEE"`
	 */
	readonly barHolderColor?: ColorValue;
	/**
	 * Whether to animate the bar
	 * - default: `true`
	 */
	readonly barAnimated?: boolean;
	/**
	 * Left style of bar (both colored and holder)
	 * - default: `"rounded"`
	 */
	readonly barLeftStyle?: "rounded" | "square";
	/**
	 * Right style of colored bar
	 * - default: `"rounded"`
	 */
	readonly barRightStyle?: "rounded" | "square";
	/**
	 * Right style of placeholder of bar
	 * - default: `"rounded"`
	 */
	readonly barHolderRightStyle?: "rounded" | "square";

	/**
	 * Whether to display a divider at certain percentages in the bar's placeholder
	 * - default: `true`
	 */
	readonly showDivider?: boolean;
	/**
	 * A number for what percentage of intervals the dividing lines are rendered
	 * - NOTE: If set to `20`, dividers will be rendered at `20%`, `40%`, `60%`, and `80%`.
	 * - NOTE: divider가 몇%마다 표시될지
	 * - default: `20`
	 */
	readonly dividerInterver?: 4 | 5 | 10 | 20 | 25 | 33.3 | 50;
	/**
	 * Height of divider
	 * - NOTE: When set to `"100%"`, it is equal to the height of the bar
	 * - default: `"60%"`
	 */
	readonly dividerHeight?: string | number | undefined;
	/**
	 * Color of divider
	 * - default: `"#BBBBBB"`
	 */
	readonly dividerColor?: ColorValue;
	/**
	 * Width of each divider
	 * - default: `1`
	 */
	readonly dividerWidth?: number;

	/**
	 * Position where the percentage corresponding to value is displayed.
	 * - NOTE: If `undefined` or `"none"`, it is not rendered.
	 * - default: `"right"`
	 */
	readonly percentPosition?: "left" | "right" | "none";
	/**
	 * A number representing the decimal place of a percentage to be rendered.
	 * - e.g.1) Rendered to `50%` when set to `0`
	 * - e.g.2) Rendered to `50.0%` when set to `1`
	 * - e.g.3) Rendered to `50.00%` when set to `2`
	 * - NOTE: this prop is ignored when `PercentLabelComponent` is passed
	 * - NOTE: 퍼센트의 소수점 몇번째 자리까지 표시할지
	 * - default: `0`
	 */
	readonly percentFixed?: 0 | 1 | 2;
	/**
	 * A React Component to display percentages.
	 * - `value`, `total` and `color` are provided to calculate percentage.
	 * - NOTE: It is recommended to use `fixed width styles`
	 * - NOTE: color may be passed undefined.
	 * 	- Only the PercentLabelComponent that will be rendered on the right or left sides of the `StackedBar` has an `undefined` color.
	 * - NOTE: The color of `BarGraph.PercentLabelComponent` is `not undefined`
	 * - NOTE: color는 undefined로 전달될 수 있습니다.
	 * 	- `StackedBar`의 오른쪽이나 왼쪽에 렌더될 PercentLabelComponent만 color가 `undefined`입니다.
	 * - NOTE: BarGraph.PercentLabelComponent의 color는 undefined가 아닙니다
	 */
	readonly PercentLabelComponent?: PercentLabelComp | null | undefined;

	/**
	 * Whether to enable color highlighting when a bar or list item is touched.
	 * - default: `true`
	 */
	readonly enableTouchHighlight?: boolean;
}

export interface IPercentLabelCompProps {
	readonly value: number;
	readonly total: number;
	readonly color: ColorValue | undefined;
}

export type PercentLabelComp = (props: IPercentLabelCompProps) => ReactElement;

export interface IStackedCustomListItemProps {
	readonly label: string;
	readonly value: number;
	readonly color: ColorValue;
	readonly index: number;
	readonly totalCnt: number;
	readonly onTouching: (index: number, isTouched: boolean) => void;
	readonly PercentLabelComponent: PercentLabelComp;
}
export type StackedCustomListItem = (props: IStackedCustomListItemProps) => ReactElement;
