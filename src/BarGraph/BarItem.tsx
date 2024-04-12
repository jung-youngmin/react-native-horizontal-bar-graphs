import React, { ReactElement, useMemo } from "react";
import { ColorValue, DimensionValue, Text, View } from "react-native";
import GraphDivider from "./GraphDivider";
import PercentLabel from "./PercentLabel";

interface IBarItemProps {
	/** 설문 문항 내용 */
	readonly label: string;
	/** 문항의 답변 수 */
	readonly value: number;
	/** 그래프에서의 색 */
	readonly color: ColorValue;
	readonly totalCnt: number;
	readonly barCnt: number;
	readonly barHeight: number;
	readonly showDivider: boolean;
	readonly dividerInterver: 4 | 5 | 10 | 20 | 50;

	readonly percentPosition: "left" | "right" | undefined;
	// readonly percentTextAlign: "left" | "right";
	readonly percentFixed: 0 | 1 | 2;
	// readonly percentIntegerTextStlye: StyleProp<TextStyle>;
	// readonly percentDecimalTextStlye: StyleProp<TextStyle>;
	// readonly percentTextStyle: StyleProp<TextStyle>;
	// readonly onLayoutPercentLabel: (width: number) => void;
	readonly percentLblWidth: number;
	readonly PercentLabelComponent?: ReactElement;
}

export default function BarItem(props: IBarItemProps) {

	const percentInteger = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100).toFixed(0);
	}, [props.value, props.totalCnt]);

	return (
		<View style={[{}]}>
			<Text allowFontScaling={false} numberOfLines={2} style={[{ color: "#999999" }]}>
				{props.label}
			</Text>
			<View style={[ { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
				{props.percentPosition === "left" &&
					(props.PercentLabelComponent === undefined ? (
						<PercentLabel
							value={props.value}
							totalCnt={props.totalCnt}
							percentFixed={props.percentFixed}
							textAlign={"left"}
							percentLblWidth={props.percentLblWidth}
							// percentIntegerTextStlye={props.percentIntegerTextStlye}
							// percentDecimalTextStlye={props.percentDecimalTextStlye}
							// percentTextStyle={props.percentTextStyle}
						/>
					) : (
						props.PercentLabelComponent
					))}
				<View
					style={[
						{
							flex: 1,
							marginHorizontal: props.barHeight / 2,
							height: props.barHeight,
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#e5e5e5",
						},
					]}>
					<View
						style={{
							position: "absolute",
							backgroundColor: props.color,
							borderRadius: props.barHeight,
							width: props.barHeight,
							height: props.barHeight,
							alignItems: "center",
							justifyContent: "center",
							left: -(props.barHeight / 2),
						}}
					/>
					<View
						style={{
							position: "absolute",
							backgroundColor: "#e5e5e5",
							borderRadius: props.barHeight,
							width: props.barHeight,
							height: props.barHeight,
							alignItems: "center",
							justifyContent: "center",
							right: -(props.barHeight / 2),
						}}
					/>
					<GraphDivider leftPosition={props.barHeight / 2} dividerInterver={props.dividerInterver} />
					<View
						style={{
							height: props.barHeight,
							width: `${percentInteger}%` as DimensionValue,
							backgroundColor: props.color,
							// borderTopRightRadius: props.barHeight,
							// borderBottomRightRadius: props.barHeight,
						}}>
						<View
							style={{
								position: "absolute",
								backgroundColor: props.color,
								borderRadius: props.barHeight,
								width: props.barHeight,
								height: props.barHeight,
								alignItems: "center",
								justifyContent: "center",
								right: -(props.barHeight / 2),
							}}>
							{/* <MoinText allowFontScaling={false} numberOfLines={1} style={[fontStyles.textTitleBold, { color: colors.textPrimaryLight }]}>
								{props.value}
							</MoinText> */}
						</View>
						<View
							style={{
								position: "absolute",
								backgroundColor: props.color,
								borderRadius: props.barHeight,
								width: props.barHeight,
								height: props.barHeight,
								alignItems: "center",
								justifyContent: "center",
								left: -(props.barHeight / 2),
							}}>
							{/* <MoinText allowFontScaling={false} numberOfLines={1} style={[fontStyles.textTitleBold, { color: colors.textPrimaryLight }]}>
								{props.value}
							</MoinText> */}
						</View>
					</View>
				</View>
				{props.percentPosition === "right" &&
					(props.PercentLabelComponent === undefined ? (
						<PercentLabel
							value={props.value}
							totalCnt={props.totalCnt}
							percentFixed={props.percentFixed}
							textAlign={"right"}
							percentLblWidth={props.percentLblWidth}
							// percentIntegerTextStlye={props.percentIntegerTextStlye}
							// percentDecimalTextStlye={props.percentDecimalTextStlye}
							// percentTextStyle={props.percentTextStyle}
						/>
					) : (
						props.PercentLabelComponent
					))}
			</View>
		</View>
	);
}
