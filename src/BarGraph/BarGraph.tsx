import React, { useMemo } from "react";
import { StyleProp, TextStyle, Text, View, StyleSheet } from "react-native";
import BarItem from "./BarItem";
import { IHorizontalBarGraphsBaseProps } from "../horizontal-bar-graphs-types";
import { DEFAULT_COLORS } from "../consts";
import useDefaultProps from "../Shared/useDefaultProps";

export interface IBarGraphProps extends IHorizontalBarGraphsBaseProps {
	/**
	 * Distance between bars
	 * @description excluding the first bar
	 * @default 12
	 */
	readonly barDistance?: number;
	/**
	 * Delay time (ms) at which the animation of the bars begins
	 * @description 막대들의 애니메이션이 시작되는 지연 시간 (ms)
	 * @default 60
	 */
	readonly barAnimateDelay?: number;

	/**
	 * Whether to show each label of graphData
	 * @default true
	 */
	readonly showLabel?: boolean;
	/**
	 * Position of each label relative to the bar
	 * @description 막대를 기준으로 각 label의 포지션
	 * @default "top"
	 */
	readonly labelPosition?: "top" | "bottom";
	/**
	 * Styles for label
	 * @description By default fontSize is set to `barHeight/2`.
	 * @description When you touch the bar, the font color is highlighted in the bar color. If you don't want it, set `enableTouchHighlight` to `false`.
	 */
	readonly labelStlye?: StyleProp<TextStyle>;

	/**
	 * Whether to show the value above the bar
	 * @default true
	 */
	readonly showValue?: boolean;
	/**
	 * Position on the bar where the value is rendered
	 * @default "right"
	 */
	readonly valuePosition?: "left" | "right";
	/**
	 * Number to attach suffix when value exceeds valueSuffixCnt
	 * value가 valueSuffixCnt을 초과할 때 suffix를 붙이기 위한 숫자
	 * If set to 0, no suffix is appended.
	 * 0을 설정하면 suffix를 붙이지 않습니다
	 * @default 1000
	 */
	readonly valueSuffixCnt?: number;
	/**
	 * List of value suffix attached to value after dividing value by valueSuffixCnt
	 * value를 valueSuffixCnt로 나눈 후 value에 붙는 value suffix의 리스트
	 * @default ["k", "m", "b", "t"]
	 */
	readonly valueSuffixList?: string[];
}

export default function BarGraph(props: IBarGraphProps) {
	const defaultProps = useDefaultProps(props);
	const {
		title,
		titlePosition,
		barHeight,
		barHolderColor,
		barAnimated,
		barLeftStyle,
		barRightStyle,
		barHolderRightStyle,
		showDivider,
		dividerInterver,
		dividerHeight,
		dividerColor,
		dividerWidth,
		percentPosition,
		percentFixed,
		enableTouchHighlight,
	} = defaultProps;

	const totalCnt = useMemo(() => {
		let total = 0;
		props.graphData.forEach((item, index) => {
			total += item.value;
		});
		return total;
	}, [props.graphData]);

	const showTitle = useMemo(() => {
		return props.title !== undefined && props.title !== "";
	}, [props.title]);

	const barDistance = useMemo(() => {
		return props.barDistance === undefined ? 12 : props.barDistance;
	}, [props.barDistance]);

	const barAnimateDelay = useMemo(() => {
		return props.barAnimateDelay === undefined ? 60 : props.barAnimateDelay;
	}, [props.barAnimateDelay]);

	const showLabel = useMemo(() => {
		return props.showLabel === undefined ? true : props.showLabel;
	}, [props.showLabel]);

	const labelPosition = useMemo(() => {
		return props.labelPosition === undefined ? "top" : props.labelPosition;
	}, [props.labelPosition]);

	const labelStlye = useMemo(() => {
		return props.labelStlye === undefined ? null : props.labelStlye;
	}, [props.labelStlye]);

	const showValue = useMemo(() => {
		return props.showValue === undefined ? true : props.showValue;
	}, [props.showValue]);

	const valuePosition = useMemo(() => {
		return props.valuePosition === undefined ? "right" : props.valuePosition;
	}, [props.valuePosition]);

	const valueSuffixCnt = useMemo(() => {
		return props.valueSuffixCnt === undefined ? 1000 : props.valueSuffixCnt;
	}, [props.valueSuffixCnt]);

	const valueSuffixList = useMemo(() => {
		return props.valueSuffixList === undefined ? ["k", "m", "b", "t"] : props.valueSuffixList;
	}, [props.valueSuffixList]);

	return (
		<View style={props.style}>
			{showTitle && titlePosition === "top" && <Text style={[styles.title, props.titleStyle]}>{title}</Text>}
			{props.graphData.map((v, i) => {
				const barColor = v.color === undefined ? DEFAULT_COLORS[i % DEFAULT_COLORS.length] : v.color;
				return (
					<BarItem
						key={v.label + "_" + i}
						label={v.label}
						showLabel={showLabel}
						labelPosition={labelPosition}
						labelStlye={labelStlye}
						index={i}
						value={v.value}
						onPress={v.onPress}
						color={barColor}
						barHeight={barHeight}
						barHolderColor={barHolderColor}
						barDistance={i === 0 ? 0 : barDistance}
						barAnimated={barAnimated}
						barAnimateDelay={barAnimateDelay}
						barLeftStyle={barLeftStyle}
						barRightStyle={barRightStyle}
						barHolderRightStyle={barHolderRightStyle}
						showValue={showValue}
						valuePosition={valuePosition}
						valueSuffixCnt={valueSuffixCnt}
						valueSuffixList={valueSuffixList}
						totalCnt={totalCnt}
						showDivider={showDivider}
						dividerInterver={dividerInterver}
						dividerHeight={dividerHeight}
						dividerColor={dividerColor}
						dividerWidth={dividerWidth}
						percentPosition={percentPosition}
						percentFixed={percentFixed}
						PercentLabelComponent={props.PercentLabelComponent}
						enableTouchHighlight={enableTouchHighlight}
					/>
				);
			})}
			{showTitle && titlePosition === "bottom" && <Text style={[styles.title, props.titleStyle]}>{title}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 16,
	},
});
