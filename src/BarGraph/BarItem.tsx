import React, { ReactElement, useEffect, useMemo, useState } from "react";
import {
	ColorValue,
	DimensionValue,
	StyleProp,
	Text,
	TextStyle,
	TouchableOpacity,
	View,
} from "react-native";
import GraphDivider from "./GraphDivider";
import PercentLabel from "./PercentLabel";

interface IBarItemProps {
	/** 설문 문항 내용 */
	readonly label: string;
	readonly showLabel: boolean;
	readonly labelStlye: StyleProp<TextStyle>;

	/** 문항의 답변 수 */
	readonly value: number;
	readonly showValue: boolean;
	readonly valuePosition: "left" | "right";

	/** 그래프에서의 색 */
	readonly color: ColorValue;
	readonly onPress:
		| ((
				label: string,
				value: number,
				color: ColorValue,
		  ) => void | Promise<void>)
		| undefined;

	readonly totalCnt: number;

	readonly barHeight: number;
	readonly barHolderColor: ColorValue;
	readonly barDistance: number;
	readonly barLeftStyle: "rounded" | "square";
	readonly barRightStyle: "rounded" | "square";

	readonly showDivider: boolean;
	readonly dividerInterver: 4 | 5 | 10 | 20 | 33.3 | 50;
	readonly dividerHeight: DimensionValue;
	readonly dividerColor: ColorValue;

	readonly percentPosition: "left" | "right" | undefined;
	readonly percentFixed: 0 | 1 | 2;
	readonly percentLblWidth: number;
	readonly PercentLabelComponent?: ReactElement;
}

export default function BarItem(props: IBarItemProps) {
	const percentInteger = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100).toFixed(0);
	}, [props.value, props.totalCnt]);

	// const [labelWdith, setLabelWidth] = useState(props.barHeight);

	// useEffect(() => {
	// 	console.log("@@@@", props.label, labelWdith);
	// }, [labelWdith]);

	return (
		<TouchableOpacity
			disabled={props.onPress === undefined}
			style={{ marginTop: props.barDistance }}
			onPress={() => {
				if (props.onPress !== undefined) {
					props.onPress(props.label, props.value, props.color);
				}
			}}>
			<View style={[{}]}>
				{/* label */}
				{props.showLabel && (
					<Text
						allowFontScaling={false}
						numberOfLines={2}
						style={[{ color: "#999999" }, props.labelStlye]}>
						{props.label}
					</Text>
				)}
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					{/* left percent label */}
					{props.percentPosition === "left" &&
						(props.PercentLabelComponent === undefined ? (
							<PercentLabel
								value={props.value}
								totalCnt={props.totalCnt}
								percentFixed={props.percentFixed}
								textAlign={"left"}
								percentLblWidth={props.percentLblWidth}
							/>
						) : (
							props.PercentLabelComponent
						))}
					<View
						style={{
							flex: 1,
							marginHorizontal: props.barHeight / 2,
							height: props.barHeight,
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: props.barHolderColor,
						}}>
						{/* 왼쪽 반원 */}
						<HalfCircle
							size={props.barHeight}
							color={props.color}
							shape="left"
							isRounded={props.barLeftStyle === "rounded"}
						/>
						{/* 바 홀더 오른쪽 끝 반원 */}
						<HalfCircle
							size={props.barHeight}
							color={props.barHolderColor}
							shape="right"
							isRounded={props.barRightStyle === "rounded"}
						/>
						{props.showDivider && (
							<GraphDivider
								leftPosition={props.barHeight / 2}
								dividerInterver={props.dividerInterver}
								dividerHeigt={props.dividerHeight}
								dividerColor={props.dividerColor}
							/>
						)}
						<View
							style={{
								height: props.barHeight,
								width: `${percentInteger}%` as DimensionValue,
								backgroundColor: props.color,
							}}
							// onLayout={event => {
							// 	const layoutWidth =
							// 		event.nativeEvent.layout.width;
							// 	console.log(props.label, layoutWidth);
							// 	setLabelWidth(
							// 		Math.max(layoutWidth, props.barHeight),
							// 	);
							// }}
						>
							<HalfCircle
								size={props.barHeight}
								color={props.color}
								shape="right"
								isRounded={props.barRightStyle === "rounded"}
							/>
							{props.showValue && (
								<View
									style={[
										{
											position: "absolute",
											minWidth: props.barHeight,
											height: props.barHeight,
											justifyContent: "center",
											alignItems: "center",
										},
										props.valuePosition === "right" && {
											right: -(props.barHeight / 2),
										},
										props.valuePosition === "left" && {
											left: -(props.barHeight / 2),
										},
									]}>
									<Text
										allowFontScaling={false}
										numberOfLines={1}
										style={[
											{
												fontSize: props.barHeight / 2,
												fontWeight: "bold",
												color: "#F0F0F0",
											},
										]}>
										{props.valuePosition === "left" &&
										props.value >= 10
											? "  "
											: null}
										{props.value}
										{props.valuePosition === "right" &&
										props.value >= 10
											? "  "
											: null}
									</Text>
								</View>
							)}
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
							/>
						) : (
							props.PercentLabelComponent
						))}
				</View>
			</View>
		</TouchableOpacity>
	);
}

const HalfCircle = ({
	size,
	color,
	shape,
	isRounded,
}: {
	size: number;
	color: ColorValue;
	shape: "left" | "right";
	isRounded: boolean;
}) => {
	return (
		<View
			style={[
				{
					position: "absolute",
					width: size / 2,
					height: size,
					overflow: "hidden",
				},
				// 안드로이드에서 아주 미세하게 view 사이가 벌어지는 현상 때문에 0.1 더해줌
				shape === "right" && {
					right: -(size / 2) + 0.1,
				},
				shape === "left" && {
					left: -(size / 2) + 0.1,
				},
			]}>
			<View
				style={[
					{
						backgroundColor: color,
						width: size,
						height: "100%",
					},
					shape === "right" && { marginLeft: -(size / 2) },
					shape === "left" && { marginRight: -(size / 2) },
					isRounded && { borderRadius: size },
				]}
			/>
		</View>
	);
};
