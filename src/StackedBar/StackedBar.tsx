import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ColorValue, StyleProp, Text, View, StyleSheet, ViewStyle } from "react-native";
import { IBarGraphData, IHorizontalBarGraphsBaseProps, IPercentLabelCompProps, StackedCustomListItem } from "../horizontal-bar-graphs-types";
import { DEFAULT_COLORS } from "../consts";
import GraphDivider from "../Shared/GraphDivider";
import StackedBarItem from "./StackedBarItem";
import PercentLabel from "../Shared/PercentLabel";
import StackedListItem from "./StackedListItem";

export interface IStackedBarProps extends IHorizontalBarGraphsBaseProps {
	readonly totalCnt: number;

	/** default: true */
	readonly showList?: boolean;
	/** default: true */
	readonly listAnimated?: boolean;
	readonly listContainerStyle?: StyleProp<ViewStyle>;
	readonly ListItemComponent?: StackedCustomListItem | React.MemoExoticComponent<StackedCustomListItem> | null;
}

export default function StackedBar(props: IStackedBarProps) {
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

	const titlePosition = useMemo(() => {
		return props.titlePosition === undefined ? "top" : props.titlePosition;
	}, [props.titlePosition]);

	const barHeight = useMemo(() => {
		return props.barHeight === undefined ? 28 : props.barHeight;
	}, [props.barHeight]);

	const barHolderColor = useMemo(() => {
		return props.barHolderColor === undefined ? "#EEEEEE" : props.barHolderColor;
	}, [props.barHolderColor]);

	const barAnimated = useMemo(() => {
		return props.barAnimated === undefined ? true : props.barAnimated;
	}, [props.barAnimated]);

	const barLeftStyle = useMemo(() => {
		return props.barLeftStyle === undefined ? "rounded" : props.barLeftStyle;
	}, [props.barLeftStyle]);

	const barRightStyle = useMemo(() => {
		return props.barRightStyle === undefined ? "rounded" : props.barRightStyle;
	}, [props.barRightStyle]);

	const showDivider = useMemo(() => {
		return props.showDivider === undefined ? true : props.showDivider;
	}, [props.showDivider]);

	const dividerInterver = useMemo(() => {
		return props.dividerInterver === undefined ? 20 : props.dividerInterver;
	}, [props.dividerInterver]);

	const dividerHeight = useMemo(() => {
		return props.dividerHeight === undefined ? "60%" : props.dividerHeight;
	}, [props.dividerHeight]);

	const dividerColor = useMemo(() => {
		return props.dividerColor === undefined ? "#BBBBBB" : props.dividerColor;
	}, [props.dividerColor]);

	const dividerWidth = useMemo(() => {
		return props.dividerWidth === undefined ? 1 : props.dividerWidth;
	}, [props.dividerWidth]);

	const percentFixed = useMemo(() => {
		return props.percentFixed === undefined ? 0 : props.percentFixed;
	}, [props.percentFixed]);

	const showList = useMemo(() => {
		return props.showList === undefined ? true : props.showList;
	}, [props.showList]);

	const listAnimated = useMemo(() => {
		return props.listAnimated === undefined ? true : props.listAnimated;
	}, [props.listAnimated]);

	const [percentLblWidth, setPercentLblWidth] = useState<number>(0);
	const [isLayoutFinished, setIsLayoutFinished] = useState<boolean>(false);

	useEffect(() => {
		if (props.PercentLabelComponent === null || props.PercentLabelComponent === undefined) {
			if (props.percentPosition === undefined) {
				setIsLayoutFinished(true);
			} else {
				if (percentLblWidth > 0) {
					setIsLayoutFinished(true);
				} else {
					setIsLayoutFinished(false);
				}
			}
		} else {
			setIsLayoutFinished(true);
		}
	}, [props.percentPosition, percentLblWidth, props.PercentLabelComponent]);

	useLayoutEffect(() => {
		setPercentLblWidth(0);
	}, [props.percentFixed, props.barHeight]);

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
						textAlign={props.percentPosition}
						percentLblWidth={percentLblWidth}
					/>
				);
			} else {
				return <PercentLabelComponent {...lblProps} />;
			}
		},
		[barHeight, percentFixed, props.percentPosition, percentLblWidth, PercentLabelComponent],
	);

	const [touchedIndex, setTouchedIndex] = useState<number>(-1);
	const onTouching = useCallback(
		(index: number, isTouched: boolean) => {
			if (props.enableTouchHighlight !== false) {
				if (isTouched) {
					setTouchedIndex(index);
				} else {
					setTouchedIndex(-1);
				}
			}
		},
		[props.enableTouchHighlight],
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
						percentPosition={props.percentPosition}
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
		[props.totalCnt, props.percentPosition, percentFixed, PercentLbl, onTouching, listAnimated, props.ListItemComponent],
	);

	const styles = getStyles(barHeight, barHolderColor);
	return (
		<View style={props.style}>
			{isLayoutFinished && showTitle && titlePosition === "top" && (
				<Text style={[styles.title, props.titleStyle, { color: undefined }]}>{props.title}</Text>
			)}
			{isLayoutFinished ? (
				<>
					<View style={styles.flexRowVerticalCenter}>
						{/* left percent label */}
						{props.percentPosition === "left" && <PercentLbl value={sumOfValues} total={props.totalCnt} color={undefined} />}
						<View
							style={[
								styles.barHolderStyle,
								barLeftStyle === "rounded" && styles.roundedLeftBar,
								barRightStyle === "rounded" && styles.roundedRightBar,
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
						{props.percentPosition === "right" && <PercentLbl value={sumOfValues} total={props.totalCnt} color={undefined} />}
					</View>
					{showList && (
						<View style={[{ marginTop: 16 }, props.listContainerStyle]}>
							{props.graphData.map((item, index) => (
								<ListItem key={index} item={item} index={index} />
							))}
						</View>
					)}
				</>
			) : (
				<View
					style={{ position: "absolute" }}
					onLayout={event => {
						setPercentLblWidth(event.nativeEvent.layout.width);
					}}>
					<PercentLabel
						value={1}
						valueColor={"transparent"}
						barHeight={barHeight}
						totalCnt={1}
						percentFixed={percentFixed}
						textAlign={props.percentPosition}
						percentLblWidth={percentLblWidth}
					/>
				</View>
			)}
			{isLayoutFinished && showTitle && titlePosition === "bottom" && <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>}
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
