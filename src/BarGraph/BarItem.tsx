import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, ColorValue, DimensionValue, Easing, StyleProp, Text, TextStyle, TouchableOpacity, StyleSheet, View } from "react-native";
import GraphDivider from "../Shared/GraphDivider";
import PercentLabel from "../Shared/PercentLabel";
import { PercentLabelComp } from "../horizontal-bar-graphs-types";

interface IBarItemProps {
	/** 설문 문항 내용 */
	readonly label: string;
	readonly showLabel: boolean;
	readonly labelStlye: StyleProp<TextStyle>;

	readonly index: number;

	/** 문항의 답변 수 */
	readonly value: number;
	readonly showValue: boolean;
	readonly labelPosition: "top" | "bottom";
	readonly valuePosition: "left" | "right";

	/** 그래프에서의 색 */
	readonly color: ColorValue;
	readonly onPress: ((label: string, value: number, color: ColorValue) => void | Promise<void>) | undefined;

	readonly totalCnt: number;

	readonly barHeight: number;
	readonly barHolderColor: ColorValue;
	readonly barDistance: number;
	readonly barAnimated: boolean;
	readonly barAnimateDelay: number;
	readonly barLeftStyle: "rounded" | "square";
	readonly barRightStyle: "rounded" | "square";

	readonly showDivider: boolean;
	readonly dividerInterver: 4 | 5 | 10 | 20 | 25 | 33.3 | 50;
	readonly dividerHeight: DimensionValue;
	readonly dividerColor: ColorValue;
	readonly dividerWidth: number;

	readonly percentPosition: "left" | "right" | undefined;
	readonly percentFixed: 0 | 1 | 2;
	readonly percentLblWidth: number;
	readonly PercentLabelComponent: PercentLabelComp | null | undefined;
}

export default function BarItem(props: IBarItemProps) {
	const valPercent = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100);
	}, [props.value / props.totalCnt]);

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const [barWidth, setBarWidth] = useState<number>(0);
	const animWidth = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		if (barWidth <= 0 || props.barAnimated === false) {
			return;
		}

		const w = (barWidth * valPercent) / 100;

		Animated.timing(animWidth, {
			toValue: w,
			duration: 1000,
			delay: props.barAnimateDelay * (props.index + 1),
			useNativeDriver: false,
			isInteraction: true,
			easing: Easing.out(Easing.exp),
		}).start();

		return () => {
			animWidth.setValue(0);
		};
	}, [props.barAnimated, props.barAnimateDelay, props.index, props.value, props.totalCnt, barWidth]);

	const { PercentLabelComponent } = props;
	const PercentLbl = ({ value, total }: { value: number; total: number }) => {
		if (PercentLabelComponent === null || PercentLabelComponent === undefined) {
			return (
				<PercentLabel
					value={value}
					valueColor={isTouched ? props.color : undefined}
					barHeight={props.barHeight}
					totalCnt={total}
					percentFixed={props.percentFixed}
					textAlign={props.percentPosition}
					percentLblWidth={props.percentLblWidth}
				/>
			);
		} else {
			return <PercentLabelComponent value={value} total={total} />;
		}
	};

	const styles = getStyles(props.barHeight, props.barHolderColor, props.color);

	return (
		<View style={[{ marginTop: props.barDistance }]}>
			{/* label */}
			{props.showLabel && props.labelPosition === "top" && (
				<Text allowFontScaling={false} numberOfLines={2} style={[styles.labelDefault, props.labelStlye, isTouched && { color: props.color }]}>
					{props.label}
				</Text>
			)}
			<TouchableOpacity
				activeOpacity={1}
				onPressIn={() => setIsTouched(true)}
				onPressOut={() => setIsTouched(false)}
				onPress={() => {
					if (props.onPress !== undefined) {
						props.onPress(props.label, props.value, props.color);
					}
				}}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					{/* left percent label */}
					{props.percentPosition === "left" && <PercentLbl value={props.value} total={props.totalCnt} />}
					<View
						style={styles.barHolder}
						onLayout={event => {
							setBarWidth(event.nativeEvent.layout.width);
						}}>
						{/* 바 홀더 오른쪽 끝 반원 */}
						<HalfCircle size={props.barHeight} color={props.barHolderColor} shape="right" isRounded={props.barRightStyle === "rounded"} />
						{props.showDivider && (
							<GraphDivider
								leftPosition={props.barHeight / 2}
								dividerInterver={props.dividerInterver}
								dividerHeight={props.dividerHeight}
								dividerColor={isTouched ? props.color : props.dividerColor}
								dividerWidth={props.dividerWidth}
							/>
						)}
						<Animated.View
							style={[
								styles.barColored,
								{
									width: props.barAnimated ? animWidth : (`${valPercent.toFixed(0)}%` as DimensionValue),
								},
							]}>
							{/* 왼쪽 반원 */}
							<HalfCircle size={props.barHeight} color={props.color} shape="left" isRounded={props.barLeftStyle === "rounded"} />
							<HalfCircle size={props.barHeight} color={props.color} shape="right" isRounded={props.barRightStyle === "rounded"} />
							{props.showValue && (
								<View
									style={[
										styles.valueCont,
										props.valuePosition === "right" && {
											right: -(props.barHeight / 2),
										},
										props.valuePosition === "left" && {
											left: -(props.barHeight / 2),
										},
									]}>
									<Text allowFontScaling={false} numberOfLines={1} style={styles.valueText}>
										{props.valuePosition === "left" && props.value >= 10 ? "  " : null}
										{props.value}
										{props.valuePosition === "right" && props.value >= 10 ? "  " : null}
									</Text>
								</View>
							)}
						</Animated.View>
					</View>
					{props.percentPosition === "right" && <PercentLbl value={props.value} total={props.totalCnt} />}
				</View>
			</TouchableOpacity>
			{props.showLabel && props.labelPosition === "bottom" && (
				<Text allowFontScaling={false} numberOfLines={2} style={[styles.labelDefault, props.labelStlye, isTouched && { color: props.color }]}>
					{props.label}
				</Text>
			)}
		</View>
	);
}

const HalfCircle = ({ size, color, shape, isRounded }: { size: number; color: ColorValue; shape: "left" | "right"; isRounded: boolean }) => {
	return (
		<View
			style={[
				{
					position: "absolute",
					width: size / 2,
					height: size,
				},
				shape === "right" && {
					right: -(size / 2),
				},
				shape === "left" && {
					left: -(size / 2),
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

const getStyles = (barHeight: number, barHolderColor: ColorValue, color: ColorValue) => {
	return StyleSheet.create({
		labelDefault: { color: "#999999", fontSize: barHeight / 2 },
		barHolder: {
			flex: 1,
			marginHorizontal: barHeight / 2,
			height: barHeight,
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: barHolderColor,
		},
		barColored: {
			position: "absolute",
			height: barHeight,
			backgroundColor: color,
		},
		valueCont: {
			position: "absolute",
			minWidth: barHeight,
			height: barHeight,
			justifyContent: "center",
			alignItems: "center",
		},
		valueText: {
			fontSize: barHeight / 2,
			fontWeight: "bold",
			color: "#F0F0F0",
		},
	});
};
