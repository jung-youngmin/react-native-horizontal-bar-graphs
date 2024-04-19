import { ReactElement } from "react";
import { ColorValue, DimensionValue, StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IBarGraphData {
	readonly label: string;
	readonly value: number;
	readonly color?: ColorValue;
	readonly onPress?: (label: string, value: number, color: ColorValue) => void | Promise<void>;
}

export interface IHorizontalBarGraphsBaseProps {
	readonly graphData: IBarGraphData[];
	readonly style?: StyleProp<ViewStyle>;

	readonly title?: string;
	/** default: "top" */
	readonly titlePosition?: "top" | "bottom";
	/** default: `{ fontWeight: "bold", fontSize: 20, textAlign: "center", marginVertical: 16 }` */
	readonly titleStyle?: StyleProp<TextStyle>;

	/** default: 28 */
	readonly barHeight?: number;
	/** default: "#EEEEEE" */
	readonly barHolderColor?: ColorValue;
	/** default: true */
	readonly barAnimated?: boolean;
	/** default: "rounded" */
	readonly barLeftStyle?: "rounded" | "square";
	/** default: "rounded" */
	readonly barRightStyle?: "rounded" | "square";

	/** default: true */
	readonly showDivider?: boolean;
	/** default: 20 */
	readonly dividerInterver?: 4 | 5 | 10 | 20 | 25 | 33.3 | 50;
	/** default: "60%" */
	readonly dividerHeight?: DimensionValue | undefined;
	/** default: "#BBBBBB" */
	readonly dividerColor?: ColorValue;
	/** default: 1 */
	readonly dividerWidth?: number;

	/** default: "right" */
	readonly percentPosition?: "left" | "right" | undefined;
	/** default: 0 */
	readonly percentFixed?: 0 | 1 | 2;
	/** require Fixed `width` style */
	readonly PercentLabelComponent?: PercentLabelComp | null | undefined;

	/** default: true */
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
