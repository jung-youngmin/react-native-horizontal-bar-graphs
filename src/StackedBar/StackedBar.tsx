import React, { useCallback, useMemo, useState } from "react";
import { ColorValue, StyleProp, Text, View, StyleSheet, ViewStyle } from "react-native";
import { IBarGraphData, IHorizontalBarGraphsBaseProps, IPercentLabelCompProps, StackedCustomListItem } from "../horizontal-bar-graphs-types";
import { DEFAULT_COLORS } from "../consts";
import GraphDivider from "../Shared/GraphDivider";
import StackedBarItem from "./StackedBarItem";
import PercentLabel from "../Shared/PercentLabel";
import StackedListItem from "./StackedListItem";
import useDefaultProps from "../Shared/useDefaultProps";

export interface IStackedBarProps extends IHorizontalBarGraphsBaseProps {
	/**
	 * Total number of data. Used as denominator when calculating percentages
	 * - 데이터의 전체 갯수. 퍼센트를 계산할 때 분모로 사용됨
	 */
	readonly totalCnt: number;

	/**
	 * Whether to render a list of graphData
	 * - default: `true`
	 */
	readonly showList?: boolean;
	/**
	 * Whether to run animations when the list is displayed
	 * - default: `true`
	 */
	readonly listAnimated?: boolean;
	/** Style of list container */
	readonly listContainerStyle?: StyleProp<ViewStyle>;
	readonly ListItemComponent?: StackedCustomListItem | React.MemoExoticComponent<StackedCustomListItem> | null;
}

export default function StackedBar(props: IStackedBarProps) {
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

	const sumOfValues = useMemo(() => {
		let sum = 0;
		props.graphData.forEach((item, index) => {
			sum += item.value;
		});
		return sum;
	}, [props.graphData]);

	const showTitle = useMemo(() => {
		return props.title !== undefined && props.title !== "";
	}, [props.title]);

	const showList = useMemo(() => {
		return props.showList === undefined ? true : props.showList;
	}, [props.showList]);

	const listAnimated = useMemo(() => {
		return props.listAnimated === undefined ? true : props.listAnimated;
	}, [props.listAnimated]);

	const [barWidth, setBarWidth] = useState(0);

	const { PercentLabelComponent } = props;
	const PercentLbl = useCallback(
		(lblProps: IPercentLabelCompProps) => {
			if (PercentLabelComponent === null || PercentLabelComponent === undefined) {
				return (
					<PercentLabel
						value={lblProps.value}
						valueColor={undefined}
						barHeight={barHeight}
						totalCnt={lblProps.total}
						percentFixed={percentFixed}
						textAlign={percentPosition}
					/>
				);
			} else {
				return <PercentLabelComponent {...lblProps} />;
			}
		},
		[barHeight, percentFixed, percentPosition, PercentLabelComponent],
	);

	const [touchedIndex, setTouchedIndex] = useState<number>(-1);
	const onTouching = useCallback(
		(index: number, isTouched: boolean) => {
			if (enableTouchHighlight) {
				if (isTouched) {
					setTouchedIndex(index);
				} else {
					setTouchedIndex(-1);
				}
			}
		},
		[enableTouchHighlight],
	);

	const StackedItem = useCallback(
		(item: IBarGraphData, index: number) => {
			const barColor = item.color === undefined ? DEFAULT_COLORS[index % DEFAULT_COLORS.length] : item.color;
			return (
				<StackedBarItem
					key={item.label + "_" + index}
					index={index}
					value={item.value}
					containerWidth={barWidth}
					color={barColor}
					totalCnt={props.totalCnt}
					barHeight={barHeight}
					barAnimated={barAnimated}
					barLeftStyle={barLeftStyle === "rounded" && index === 0 ? "rounded" : "square"}
					barRightStyle={barRightStyle === "rounded" && index === props.graphData.length - 1 ? "rounded" : "square"}
					isTouched={touchedIndex === index}
				/>
			);
		},
		[barWidth, props.totalCnt, barHeight, barAnimated, barLeftStyle, barRightStyle, touchedIndex],
	);

	const ListItem = useCallback(
		({ item, index }: { item: IBarGraphData; index: number }) => {
			const barColor = item.color === undefined ? DEFAULT_COLORS[index % DEFAULT_COLORS.length] : item.color;
			if (props.ListItemComponent === undefined || props.ListItemComponent === null) {
				return (
					<StackedListItem
						key={item.label + "_" + index}
						index={index}
						value={item.value}
						label={item.label}
						color={barColor}
						totalCnt={props.totalCnt}
						percentPosition={percentPosition}
						percentFixed={percentFixed}
						PercentLabelComponent={PercentLbl}
						onTouching={onTouching}
						onPress={item.onPress}
						listAnimated={listAnimated}
					/>
				);
			} else {
				const { ListItemComponent } = props;
				return (
					<ListItemComponent
						key={item.label + "_" + index}
						index={index}
						label={item.label}
						value={item.value}
						color={barColor}
						totalCnt={props.totalCnt}
						onTouching={onTouching}
						PercentLabelComponent={PercentLbl}
					/>
				);
			}
		},
		[props.totalCnt, percentPosition, percentFixed, PercentLbl, onTouching, listAnimated, props.ListItemComponent],
	);

	const styles = getStyles(barHeight, barHolderColor);
	return (
		<View style={props.style}>
			{showTitle && titlePosition === "top" && <Text style={[styles.title, props.titleStyle]}>{title}</Text>}
			<View style={styles.flexRowVerticalCenter}>
				{/* left percent label */}
				{percentPosition === "left" && <PercentLbl value={sumOfValues} total={props.totalCnt} color={undefined} />}
				<View
					style={[
						styles.barHolderStyle,
						barLeftStyle === "rounded" && styles.roundedLeftBar,
						barHolderRightStyle === "rounded" && styles.roundedRightBar,
					]}
					onLayout={event => {
						setBarWidth(event.nativeEvent.layout.width);
					}}>
					{showDivider && (
						<GraphDivider
							leftPosition={0}
							dividerInterver={dividerInterver}
							dividerHeight={dividerHeight}
							dividerColor={dividerColor}
							dividerWidth={dividerWidth}
						/>
					)}
					{barWidth > 0 && props.graphData.map((item, index) => StackedItem(item, index))}
				</View>
				{percentPosition === "right" && <PercentLbl value={sumOfValues} total={props.totalCnt} color={undefined} />}
			</View>
			{showList && (
				<View style={props.listContainerStyle}>
					{props.graphData.map((item, index) => (
						<ListItem key={index} item={item} index={index} />
					))}
				</View>
			)}
			{showTitle && titlePosition === "bottom" && <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>}
		</View>
	);
}

const getStyles = (barHeight: number, barHolderColor: ColorValue) => {
	return StyleSheet.create({
		title: {
			fontWeight: "bold",
			fontSize: 20,
			textAlign: "center",
			marginVertical: 16,
		},
		flexRowVerticalCenter: { flexDirection: "row", alignItems: "center" },
		barHolderStyle: {
			flexDirection: "row",
			overflow: "hidden",
			flex: 1,
			height: barHeight,
			backgroundColor: barHolderColor,
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
