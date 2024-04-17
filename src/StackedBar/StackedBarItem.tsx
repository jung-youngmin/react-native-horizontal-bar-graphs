import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { ColorValue, DimensionValue, StyleSheet, Animated, Easing } from "react-native";

export interface IStackedBarItemProps {
	readonly index: number;

	readonly value: number;
	readonly containerWidth: number;

	readonly color: ColorValue;
	// readonly onPress: ((label: string, value: number, color: ColorValue) => void | Promise<void>) | undefined;
	/** 전체 갯수(분모) */
	readonly totalCnt: number;

	readonly barHeight: number;
	readonly barAnimated: boolean;
	readonly barLeftStyle: "rounded" | "square";
	readonly barRightStyle: "rounded" | "square";
}

export default function StackedBarItem(props: IStackedBarItemProps) {
	const valPercent = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100);
	}, [props.value / props.totalCnt]);

	const animWidth = useRef(new Animated.Value(0)).current;
	useLayoutEffect(() => {
		if (props.containerWidth <= 0 || props.barAnimated === false) {
			return;
		}

		const w = (props.containerWidth * valPercent) / 100;

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

	const styles = getStyles(props.barHeight, props.color);

	return (
		<Animated.View
			style={[
				styles.colorBarStyle,
				{ width: props.barAnimated ? animWidth : ((valPercent + "%") as DimensionValue) },
				props.barLeftStyle === "rounded" && styles.roundedLeftBar,
				props.barRightStyle === "rounded" && styles.roundedRightBar,
			]}
		/>
	);
}

const getStyles = (barHeight: number, color: ColorValue) => {
	return StyleSheet.create({
		colorBarStyle: {
			height: barHeight,
			backgroundColor: color,
		},
		roundedLeftBar: {
			borderTopLeftRadius: barHeight / 2,
			borderBottomLeftRadius: barHeight / 2,
		},
		roundedRightBar: {
			borderTopRightRadius: barHeight / 2,
			borderBottomRightRadius: barHeight / 2,
		},
	});
};
