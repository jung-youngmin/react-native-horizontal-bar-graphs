import React, { useMemo } from "react";
import { Text, View, ViewStyle } from "react-native";

interface IPercentLabelProps {
	readonly value: number;
	readonly totalCnt: number;
	readonly percentFixed: 0 | 1 | 2;
	readonly textAlign: "left" | "right" | undefined;
	readonly percentLblWidth: number;
	// readonly percentIntegerTextStlye: StyleProp<TextStyle>;
	// readonly percentDecimalTextStlye: StyleProp<TextStyle>;
	// readonly percentTextStyle: StyleProp<TextStyle>;
	// readonly onLayoutPercentLabel: (width: number) => void;
}

export default function PercentLabel(props: IPercentLabelProps) {

	// const isLayoutFinished = useMemo(() => {
	// 	return props.percentLblWidth > 0;
	// }, [props.percentLblWidth]);

	const percentInteger = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100).toFixed(0);
	}, [props.value, props.totalCnt]);

	const percentDecimal = useMemo(() => {
		if (props.percentFixed === 0) {
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
			style={[{ flexDirection: "row", alignItems: "baseline" }, textAlign, props.percentLblWidth > 0 && { width: props.percentLblWidth }]}
			// onLayout={event => {
			// 	props.onLayoutPercentLabel(event.nativeEvent.layout.width);
			// }}
		>
			<Text allowFontScaling={false} numberOfLines={1} style={[{fontSize: 18, fontWeight:"bold"}]}>
				{percentInteger}
			</Text>
			{percentDecimal !== null && (
				<Text allowFontScaling={false} numberOfLines={1} style={[{fontSize: 12}]}>
					{"." + percentDecimal}
				</Text>
			)}
			<Text allowFontScaling={false} numberOfLines={1} style={[]}>
				{" %"}
			</Text>
		</View>
	);

	// return (
	// 	<View
	// 		style={[{ flexDirection: "row", alignItems: "baseline" }, textAlign, { width: isLayoutFinished ? props.percentLblWidth : undefined }]}
	// 		// onLayout={event => {
	// 		// 	props.onLayoutPercentLabel(event.nativeEvent.layout.width);
	// 		// }}
	// 	>
	// 		<MoinText
	// 			allowFontScaling={false}
	// 			numberOfLines={1}
	// 			style={[fontStyles.textHeaderBold, /* props.percentIntegerTextStlye, */ !isLayoutFinished && { color: "transparent" }]}>
	// 			{percentInteger}
	// 		</MoinText>
	// 		{percentDecimal !== null && (
	// 			<MoinText
	// 				allowFontScaling={false}
	// 				numberOfLines={1}
	// 				style={[fontStyles.textSecondary, /* props.percentDecimalTextStlye, */ !isLayoutFinished && { color: "transparent" }]}>
	// 				{"." + percentDecimal}
	// 			</MoinText>
	// 		)}
	// 		<MoinText
	// 			allowFontScaling={false}
	// 			numberOfLines={1}
	// 			style={[fontStyles.textPrimary, /* props.percentTextStyle, */ !isLayoutFinished && { color: "transparent" }]}>
	// 			{" %"}
	// 		</MoinText>
	// 	</View>
	// );
}
