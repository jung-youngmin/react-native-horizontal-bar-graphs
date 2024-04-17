import React, { useMemo } from "react";
import { ColorValue, Text, View, ViewStyle } from "react-native";

interface IPercentLabelProps {
	readonly value: number;
	readonly valueColor: ColorValue | undefined;
	readonly totalCnt: number;
	readonly barHeight: number;
	readonly percentFixed: 0 | 1 | 2;
	readonly textAlign: "left" | "right" | undefined;
	readonly percentLblWidth: number;
}

export default function PercentLabel(props: IPercentLabelProps) {
	const largeSize = useMemo(() => {
		return Math.round((props.barHeight / 2) * 1.3);
	}, [props.barHeight]);
	const smallSize = useMemo(() => {
		return Math.round(props.barHeight / 2);
	}, [props.barHeight]);

	const percentInteger = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100).toFixed(0);
	}, [props.value, props.totalCnt]);

	const percentDecimal = useMemo(() => {
		if (props.percentFixed <= 0) {
			return null;
		} else {
			return (((props.value / props.totalCnt) * 100) % 1).toFixed(props.percentFixed).split(".")[1];
		}
	}, [props.value, props.totalCnt, props.percentFixed]);

	const textAlign = useMemo<ViewStyle>(() => {
		if (props.textAlign === "left") {
			return { justifyContent: "flex-start" };
		} else if (props.textAlign === "right") {
			return { justifyContent: "flex-end" };
		} else {
			return { justifyContent: "flex-end" };
		}
	}, [props.textAlign]);

	return (
		<View
			style={[
				{
					flexDirection: "row",
					alignItems: "baseline",
				},
				textAlign,
				props.percentLblWidth > 0 && { width: props.percentLblWidth },
			]}>
			<Text
				allowFontScaling={false}
				numberOfLines={1}
				style={[
					{ fontSize: largeSize, fontWeight: "bold" },
					props.valueColor !== undefined && {
						color: props.valueColor,
					},
				]}>
				{percentInteger}
			</Text>
			{percentDecimal !== null && (
				<Text
					allowFontScaling={false}
					numberOfLines={1}
					style={[
						{ fontSize: smallSize },
						props.valueColor !== undefined && {
							color: props.valueColor,
						},
					]}>
					{"." + percentDecimal}
				</Text>
			)}
			<Text
				allowFontScaling={false}
				numberOfLines={1}
				style={[
					{ fontSize: smallSize },
					props.valueColor !== undefined && {
						color: props.valueColor,
					},
				]}>
				{" %"}
			</Text>
		</View>
	);
}
