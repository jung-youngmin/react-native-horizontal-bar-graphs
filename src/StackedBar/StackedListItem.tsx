import React, { useEffect, useMemo, useRef } from "react";
import { ColorValue, StyleSheet, Animated, Easing, View, Text, TouchableOpacity } from "react-native";
import { IBarGraphData, PercentLabelComp } from "../horizontal-bar-graphs-types";

export interface IStackedListItemProps extends IBarGraphData {
	readonly color: ColorValue;
	readonly index: number;
	readonly totalCnt: number;
	readonly percentPosition: "left" | "right" | "none" | undefined;
	readonly percentFixed: 0 | 1 | 2;
	/** require Fixed `width` style */
	readonly PercentLabelComponent: PercentLabelComp;
	readonly onTouching: (index: number, isTouched: boolean) => void | Promise<void>;
	readonly listAnimated: boolean;
}

export default React.memo(_StackedListItem);
function _StackedListItem(props: IStackedListItemProps) {
	const { PercentLabelComponent } = props;
	const canRenderPercentLbl = PercentLabelComponent !== null && PercentLabelComponent !== undefined;

	const animOpacity = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		if (props.listAnimated === false) {
			animOpacity.setValue(1);
			return;
		}
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
	}, [props.listAnimated, props.index]);

	const styles = useMemo(() => {
		return getStyles(props.color);
	}, [props.color]);

	return (
		<TouchableOpacity
			onPressIn={() => props.onTouching(props.index, true)}
			onPressOut={() => props.onTouching(props.index, false)}
			onPress={() => props.onPress?.(props.label, props.value, props.color)}>
			<Animated.View style={[{ opacity: animOpacity }, styles.listItemContainer]}>
				{canRenderPercentLbl && props.percentPosition === "left" && (
					<PercentLabelComponent value={props.value} total={props.totalCnt} color={props.color} />
				)}
				{(props.percentPosition === "right" || props.percentPosition === undefined || props.percentPosition === "none") && (
					<View style={styles.coloredDot} />
				)}
				<View style={styles.textContainer}>
					<Text style={styles.labelStyle}>{props.label}</Text>
					<Text>{props.value}</Text>
				</View>
				{canRenderPercentLbl && props.percentPosition === "right" && (
					<PercentLabelComponent value={props.value} total={props.totalCnt} color={props.color} />
				)}
				{props.percentPosition === "left" && <View style={styles.coloredDot} />}
			</Animated.View>
		</TouchableOpacity>
	);
}

const getStyles = (color: ColorValue) => {
	return StyleSheet.create({
		listItemContainer: { paddingVertical: 8, flexDirection: "row", alignItems: "center" },
		coloredDot: { width: 20, height: 20, backgroundColor: color, borderRadius: 24 },
		textContainer: { flex: 1, marginLeft: 16 },
		labelStyle: { fontSize: 16 },
	});
};
