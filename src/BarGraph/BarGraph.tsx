import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ColorValue, DimensionValue, StyleProp, TextStyle, Text, View, StyleSheet, ViewStyle } from "react-native";
import BarItem from "./BarItem";
import PercentLabel from "../Shared/PercentLabel";
import { IBarGraphData, PercentLabelComp } from "../horizontal-bar-graphs-types";
import { DEFAULT_COLORS } from "../consts";

export interface IBarGraphProps {
	readonly graphData: IBarGraphData[];
	readonly style?: StyleProp<ViewStyle>;

	readonly title?: string;
	/** default: "top" */
	readonly titlePosition?: "top" | "bottom";
	/**
	 * default
	 * ```
	 * {
	 * 	fontWeight: "bold",
	 * 	fontSize: 20,
	 * 	textAlign: "center",
	 * 	marginVertical: 16,
	 * }
	 * ```
	 */
	readonly titleStyle?: StyleProp<TextStyle>;

	/** default: 28 */
	readonly barHeight?: number;
	/** default: "#EEEEEE" */
	readonly barHolderColor?: ColorValue;
	/** default: 12, 첫번째 바에는 적용되지 않음 */
	readonly barDistance?: number;
	/** default: true */
	readonly barAnimated?: boolean;
	/** default: 60 (ms) */
	readonly barAnimateDelay?: number;
	/** default: "rounded" */
	readonly barLeftStyle?: "rounded" | "square";
	/** default: "rounded" */
	readonly barRightStyle?: "rounded" | "square";

	/** default: true */
	readonly showLabel?: boolean;
	/** default: "top" */
	readonly labelPosition?: "top" | "bottom";
	/** default: `{ color: "#999999" }` */
	readonly labelStlye?: StyleProp<TextStyle>;

	/** default: true */
	readonly showValue?: boolean;
	/** default: "right" */
	readonly valuePosition?: "left" | "right";

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
}

export default function BarGraph(props: IBarGraphProps) {
	const totalCnt = useMemo(() => {
		let total = 0;
		props.graphData.forEach((item, index) => {
			total += item.value;
		});
		return total;
	}, [props.graphData]);

	const showTitle = useMemo(() => {
		return props.title !== undefined && props.title !== "";
	}, [props.title]);

	const titlePosition = useMemo(() => {
		return props.titlePosition === undefined ? "top" : props.titlePosition;
	}, [props.titlePosition]);

	const barHeight = useMemo(() => {
		return props.barHeight === undefined ? 28 : props.barHeight;
	}, [props.barHeight]);

	const barHolderColor = useMemo(() => {
		return props.barHolderColor === undefined ? "#EEEEEE" : props.barHolderColor;
	}, [props.barHolderColor]);

	const barDistance = useMemo(() => {
		return props.barDistance === undefined ? 12 : props.barDistance;
	}, [props.barDistance]);

	const barAnimated = useMemo(() => {
		return props.barAnimated === undefined ? true : props.barAnimated;
	}, [props.barAnimated]);

	const barAnimateDelay = useMemo(() => {
		return props.barAnimateDelay === undefined ? 60 : props.barAnimateDelay;
	}, [props.barAnimateDelay]);

	const barLeftStyle = useMemo(() => {
		return props.barLeftStyle === undefined ? "rounded" : props.barLeftStyle;
	}, [props.barLeftStyle]);

	const barRightStyle = useMemo(() => {
		return props.barRightStyle === undefined ? "rounded" : props.barRightStyle;
	}, [props.barRightStyle]);

	const showLabel = useMemo(() => {
		return props.showLabel === undefined ? true : props.showLabel;
	}, [props.showLabel]);

	const labelPosition = useMemo(() => {
		return props.labelPosition === undefined ? "top" : props.labelPosition;
	}, [props.labelPosition]);

	const labelStlye = useMemo(() => {
		return props.labelStlye === undefined ? null : props.labelStlye;
	}, [props.labelStlye]);

	const showValue = useMemo(() => {
		return props.showValue === undefined ? true : props.showValue;
	}, [props.showValue]);

	const valuePosition = useMemo(() => {
		return props.valuePosition === undefined ? "right" : props.valuePosition;
	}, [props.valuePosition]);

	const showDivider = useMemo(() => {
		return props.showDivider === undefined ? true : props.showDivider;
	}, [props.showDivider]);

	const dividerInterver = useMemo(() => {
		return props.dividerInterver === undefined ? 20 : props.dividerInterver;
	}, [props.dividerInterver]);

	const dividerHeight = useMemo(() => {
		return props.dividerHeight === undefined ? "60%" : props.dividerHeight;
	}, [props.dividerHeight]);

	const dividerColor = useMemo(() => {
		return props.dividerColor === undefined ? "#BBBBBB" : props.dividerColor;
	}, [props.dividerColor]);

	const dividerWidth = useMemo(() => {
		return props.dividerWidth === undefined ? 1 : props.dividerWidth;
	}, [props.dividerWidth]);

	const percentFixed = useMemo(() => {
		return props.percentFixed === undefined ? 0 : props.percentFixed;
	}, [props.percentFixed]);

	const [percentLblWidth, setPercentLblWidth] = useState<number>(0);
	const [isLayoutFinished, setIsLayoutFinished] = useState<boolean>(false);

	useEffect(() => {
		if (props.PercentLabelComponent === null || props.PercentLabelComponent === undefined) {
			if (props.percentPosition === undefined) {
				setIsLayoutFinished(true);
			} else {
				if (percentLblWidth > 0) {
					setIsLayoutFinished(true);
				} else {
					setIsLayoutFinished(false);
				}
			}
		} else {
			setIsLayoutFinished(true);
		}
	}, [props.percentPosition, percentLblWidth, props.PercentLabelComponent]);

	useLayoutEffect(() => {
		setPercentLblWidth(0);
	}, [props.percentFixed, props.barHeight]);

	return (
		<View style={props.style}>
			{isLayoutFinished && showTitle && titlePosition === "top" && <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>}
			{isLayoutFinished ? (
				props.graphData.map((v, i) => {
					const barColor = v.color === undefined ? DEFAULT_COLORS[i % DEFAULT_COLORS.length] : v.color;
					return (
						<BarItem
							key={v.label + "_" + i}
							label={v.label}
							showLabel={showLabel}
							labelPosition={labelPosition}
							labelStlye={labelStlye}
							index={i}
							value={v.value}
							onPress={v.onPress}
							color={barColor}
							barHeight={barHeight}
							barHolderColor={barHolderColor}
							barDistance={i === 0 ? 0 : barDistance}
							barAnimated={barAnimated}
							barAnimateDelay={barAnimateDelay}
							barLeftStyle={barLeftStyle}
							barRightStyle={barRightStyle}
							showValue={showValue}
							valuePosition={valuePosition}
							totalCnt={totalCnt}
							showDivider={showDivider}
							dividerInterver={dividerInterver}
							dividerHeight={dividerHeight}
							dividerColor={dividerColor}
							dividerWidth={dividerWidth}
							percentPosition={props.percentPosition}
							percentFixed={percentFixed}
							percentLblWidth={percentLblWidth}
							PercentLabelComponent={props.PercentLabelComponent}
						/>
					);
				})
			) : (
				<View
					style={{ position: "absolute" }}
					onLayout={event => {
						if (percentLblWidth === 0) {
							setPercentLblWidth(Math.round(event.nativeEvent.layout.width) + 4);
						}
					}}>
					<PercentLabel
						value={1}
						valueColor={"transparent"}
						barHeight={barHeight}
						totalCnt={1}
						percentFixed={percentFixed}
						textAlign={props.percentPosition}
						percentLblWidth={percentLblWidth}
					/>
				</View>
			)}
			{isLayoutFinished && showTitle && titlePosition === "bottom" && <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 16,
	},
});
