import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, ColorValue, DimensionValue, Easing, StyleProp, Text, TextStyle, TouchableOpacity, StyleSheet, View } from "react-native";
import GraphDivider from "../Shared/GraphDivider";
import PercentLabel from "../Shared/PercentLabel";
import { IPercentLabelCompProps, PercentLabelComp } from "../horizontal-bar-graphs-types";

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
	readonly valueSuffixCnt: number;
	readonly valueSuffixList: string[];

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
	readonly barHolderRightStyle: "rounded" | "square";

	readonly showDivider: boolean;
	readonly dividerInterver: 4 | 5 | 10 | 20 | 25 | 33.3 | 50;
	readonly dividerHeight: string | number;
	readonly dividerColor: ColorValue;
	readonly dividerWidth: number;

	readonly percentPosition: "left" | "right" | "none";
	readonly percentFixed: 0 | 1 | 2;
	readonly PercentLabelComponent: PercentLabelComp | null | undefined;

	readonly enableTouchHighlight: boolean;
}

export default function BarItem(props: IBarItemProps) {
	const valPercent = useMemo(() => {
		return Math.round((props.value / props.totalCnt) * 100);
	}, [props.value / props.totalCnt]);

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const [barWidth, setBarWidth] = useState<number>(0);
	const animWidth = useRef(new Animated.Value(props.barHeight)).current;
	useEffect(() => {
		if (barWidth <= 0 || props.barAnimated === false) {
			return;
		}

		const w = (barWidth * valPercent) / 100;

		Animated.timing(animWidth, {
			toValue: w + props.barHeight,
			duration: 1000,
			delay: props.barAnimateDelay * (props.index + 1),
			useNativeDriver: false,
			isInteraction: true,
			easing: Easing.out(Easing.exp),
		}).start();

		return () => {
			animWidth.setValue(props.barHeight);
		};
	}, [props.barHeight, props.barAnimated, props.barAnimateDelay, props.index, props.value, props.totalCnt, barWidth]);

	const { PercentLabelComponent } = props;
	const PercentLbl = (lblProps: IPercentLabelCompProps) => {
		if (PercentLabelComponent === null || PercentLabelComponent === undefined) {
			return (
				<PercentLabel
					value={lblProps.value}
					valueColor={isTouched ? props.color : undefined}
					barHeight={props.barHeight}
					totalCnt={lblProps.total}
					percentFixed={props.percentFixed}
					textAlign={props.percentPosition}
				/>
			);
		} else {
			return <PercentLabelComponent {...lblProps} />;
		}
	};

	const getValueSuffix = useCallback(
		(value: number, suffixCnt: number, suffixIdx: number): string => {
			const dividing = value / suffixCnt;
			const showUnderNum = value % suffixCnt >= suffixCnt * 0.1;

			if (dividing >= 1) {
				if (dividing < suffixCnt) {
					return dividing.toFixed(showUnderNum ? 1 : 0) + props.valueSuffixList[suffixIdx] + "  ";
				} else {
					const nextIdx = suffixIdx + 1;
					if (nextIdx >= props.valueSuffixList.length) {
						return dividing.toFixed(showUnderNum ? 1 : 0) + props.valueSuffixList[suffixIdx] + "  ";
					} else {
						return getValueSuffix(dividing, suffixCnt, nextIdx);
					}
				}
			} else {
				return value.toString();
			}
		},
		[props.valueSuffixList],
	);

	const valueWithSuffix = useMemo(() => {
		if (props.valueSuffixCnt <= 0) {
			return props.value.toLocaleString();
		} else {
			const val = getValueSuffix(props.value, props.valueSuffixCnt, 0);
			return val;
		}
	}, [props.value, props.valueSuffixCnt, props.valueSuffixList]);

	const onTouching = useCallback(
		(touched: boolean) => {
			if (props.enableTouchHighlight) {
				setIsTouched(touched);
			}
		},
		[props.enableTouchHighlight],
	);

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
				activeOpacity={0.6}
				onPressIn={() => onTouching(true)}
				onPressOut={() => onTouching(false)}
				onPress={() => {
					if (props.onPress !== undefined) {
						props.onPress(props.label, props.value, props.color);
					}
				}}>
				<View style={styles.rowCenter}>
					{/* left percent label */}
					{props.percentPosition === "left" && <PercentLbl value={props.value} total={props.totalCnt} color={props.color} />}
					<View
						style={[
							styles.barHolder,
							props.barLeftStyle === "rounded" && styles.roundedLeftBar,
							props.barHolderRightStyle === "rounded" && styles.roundedRightBar,
						]}>
						<View
							style={[styles.barHolder, { marginLeft: props.barHeight }]}
							onLayout={event => {
								setBarWidth(event.nativeEvent.layout.width);
							}}>
							{props.showDivider && (
								<GraphDivider
									leftPosition={0}
									dividerInterver={props.dividerInterver}
									dividerHeight={props.dividerHeight}
									dividerColor={props.dividerColor}
									dividerWidth={props.dividerWidth}
								/>
							)}
						</View>
						<Animated.View
							style={[
								styles.barColored,
								{
									width: props.barAnimated ? animWidth : (`${valPercent.toFixed(0)}%` as DimensionValue),
								},
								props.barLeftStyle === "rounded" && styles.roundedLeftBar,
								props.barRightStyle === "rounded" && styles.roundedRightBar,
							]}>
							{props.showValue && (
								<View
									style={[styles.valueCont, props.valuePosition === "right" && { right: 0 }, props.valuePosition === "left" && { left: 0 }]}>
									<Text allowFontScaling={false} numberOfLines={1} style={styles.valueText}>
										{valueWithSuffix}
										{valPercent >= 5 ? " " : ""}
									</Text>
								</View>
							)}
						</Animated.View>
					</View>
					{props.percentPosition === "right" && <PercentLbl value={props.value} total={props.totalCnt} color={props.color} />}
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

const getStyles = (barHeight: number, barHolderColor: ColorValue, color: ColorValue) => {
	return StyleSheet.create({
		labelDefault: { color: "#999999", fontSize: barHeight / 2 },
		rowCenter: {
			flexDirection: "row",
			alignItems: "center",
		},
		barHolder: {
			flex: 1,
			height: barHeight,
			flexDirection: "row",
			alignItems: "center",
			overflow: "hidden",
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
