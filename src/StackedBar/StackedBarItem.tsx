import React, { useEffect, useMemo, useRef, useState } from "react";
import { ColorValue, DimensionValue, StyleProp, TextStyle, Text, View, StyleSheet, ViewStyle, Animated, Easing } from "react-native";
import { IBarGraphData } from "../horizontal-bar-graphs-types";
import { DEFAULT_COLORS } from "../consts";

export interface IStackedBarItemProps {
	// readonly label: string;
	// readonly showLabel: boolean;
	// readonly labelStlye: StyleProp<TextStyle>;

	readonly index: number;

	readonly value: number;
	readonly containerWidth: number;
	// readonly showValue: boolean;
	// readonly labelPosition: "top" | "bottom";
	// readonly valuePosition: "left" | "right";

	readonly color: ColorValue;
	// readonly onPress: ((label: string, value: number, color: ColorValue) => void | Promise<void>) | undefined;

	readonly totalCnt: number;

	readonly barHeight: number;
	// readonly barHolderColor: ColorValue;
	// readonly barDistance: number;
	readonly barAnimated: boolean;
	// readonly barAnimateDelay: number;
	// readonly barLeftStyle: "rounded" | "square";
	// readonly barRightStyle: "rounded" | "square";

	// readonly showDivider: boolean;
	// readonly dividerInterver: 4 | 5 | 10 | 20 | 25 | 33.3 | 50;
	// readonly dividerHeight: DimensionValue;
	// readonly dividerColor: ColorValue;
	// readonly dividerWidth: number;

	// readonly percentPosition: "left" | "right" | undefined;
	// readonly percentFixed: 0 | 1 | 2;
	// readonly percentLblWidth: number;
	// readonly PercentLabelComponent: PercentLabelComp | null | undefined;
}

export default function StackedBarItem(props: IStackedBarItemProps) {
	const valPercent = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100);
	}, [props.value / props.totalCnt]);

	// const [barWidth, setBarWidth] = useState<number>(0);
	const animWidth = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		if (props.containerWidth <= 0 || props.barAnimated === false) {
			return;
		}

		const w = (props.containerWidth * valPercent) / 100;
		console.log("@@@ w", w);

		Animated.timing(animWidth, {
			toValue: w,
			duration: 1000,
			delay: 20 * (props.index + 1),
			useNativeDriver: false,
			isInteraction: true,
			easing: Easing.out(Easing.exp),
		}).start();

		return () => {
			animWidth.setValue(0);
		};
	}, [props.barAnimated, props.index, props.value, props.totalCnt, props.containerWidth]);

	return <Animated.View style={{ width: animWidth, height: props.barHeight, backgroundColor: props.color }}></Animated.View>;
}

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 16,
	},
});
