import React, { useEffect, useMemo, useRef } from "react";
import { ColorValue, DimensionValue, StyleSheet, Animated, Easing, View, Text } from "react-native";
import { IBarGraphData, PercentLabelComp } from "../horizontal-bar-graphs-types";
import PercentLabel from "../Shared/PercentLabel";

export interface IStackedListItemProps extends IBarGraphData {
	readonly index: number;
	readonly totalCnt: number;
	// readonly barHeight: number;
	readonly percentFixed: 0 | 1 | 2;
	/** require Fixed `width` style */
	readonly PercentLabelComponent?: PercentLabelComp | null | undefined;
}

export default function StackedListItem(props: IStackedListItemProps) {
	const valPercent = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100);
	}, [props.value / props.totalCnt]);

	const { PercentLabelComponent } = props;

	const animOpacity = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		Animated.timing(animOpacity, {
			toValue: 1,
			duration: 1000,
			delay: 500 + 50 * (props.index + 1),
			useNativeDriver: false,
			isInteraction: true,
			easing: Easing.out(Easing.exp),
		}).start();

		return () => {
			animOpacity.setValue(0);
		};
	}, [props.index]);

	// const styles = getStyles();
	return (
		<Animated.View style={[{ borderWidth: 1, backgroundColor: props.color, opacity: animOpacity }]}>
			<View>
				<Text>{props.label}</Text>
				<Text>{props.value}</Text>
				{PercentLabelComponent !== null && PercentLabelComponent !== undefined && <PercentLabelComponent value={props.value} total={props.totalCnt} />}
			</View>
		</Animated.View>
	);
}
