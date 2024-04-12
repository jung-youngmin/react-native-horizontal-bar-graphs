import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { ColorValue, View } from "react-native";
import BarItem from "./BarItem";
import PercentLabel from "./PercentLabel";

interface IBarGraphData {
	readonly color?: ColorValue;
	readonly label: string;
	readonly value: number;
}

interface IBarGraphProps {
	readonly graphData: IBarGraphData[];
	readonly totalCnt: number;
	/** default: 28 */
	readonly barHeight?: number;

	/** default: true */
	readonly showDivider?: boolean;
	/** default: 20 */
	readonly dividerInterver?: 4 | 5 | 10 | 20 | 50;
	/** default: "60%" */
	readonly dividerHeight?: string | number | undefined;
	/** default: "#BBBBBB" */
	readonly dividerColor?: ColorValue;

	/** default: "right" */
	readonly percentPosition?: "left" | "right" | undefined;
	// readonly percentTextAlign?: "left" | "right";
	/** default: 0 */
	readonly percentFixed?: 0 | 1 | 2;
	readonly PercentLabelComponent?: ReactElement;
	// readonly percentIntegerTextStlye?: StyleProp<TextStyle>;
	// readonly percentDecimalTextStlye?: StyleProp<TextStyle>;
	// readonly percentTextStyle?: StyleProp<TextStyle>;
}

const DEFAULT_COLORS: ColorValue[] = ["#ff7473", "#ffc952", "#47b8e0", "#34314c", "#fd999a", "#0080ff", "#ee2560", "#e97f02", "#274555", "#6f2108"];

export default function BarGraph(props: IBarGraphProps) {
	console.log("@@@ props", props.graphData);

	const barHeight = useMemo(() => {
		return props.barHeight === undefined ? 28 : props.barHeight;
	}, [props.barHeight]);

	const showDivider = useMemo(() => {
		return props.showDivider === undefined ? true : props.showDivider;
	}, [props.showDivider]);

	const dividerInterver = useMemo(() => {
		return props.dividerInterver === undefined ? 20 : props.dividerInterver;
	}, [props.dividerInterver]);

	const percentFixed = useMemo(() => {
		return props.percentFixed === undefined ? 0 : props.percentFixed;
	}, [props.percentFixed]);

	// const percentTextAlign = useMemo(() => {
	// 	if (props.percentTextAlign === undefined) {
	// 		if (props.percentPosition === undefined) {
	// 			return "right";
	// 		} else if (props.percentPosition === "left") {
	// 			return "left";
	// 		} else if (props.percentPosition === "right") {
	// 			return "right";
	// 		} else {
	// 			return "right";
	// 		}
	// 	} else {
	// 		return props.percentTextAlign;
	// 	}
	// }, [props.percentTextAlign, props.percentPosition]);

	// const _percentLblWidth = useRef<number[]>([]);
	const [percentLblWidth, setPercentLblWidth] = useState<number>(0);
	const [isLayoutFinished, setIsLayoutFinished] = useState<boolean>(false);
	useEffect(() => {
		if (props.percentPosition === undefined) {
			setIsLayoutFinished(true);
		} else {
			if (percentLblWidth > 0) {
				setIsLayoutFinished(true);
			} else {
				setIsLayoutFinished(false);
			}
		}
	}, [props.percentPosition, percentLblWidth]);

	return (
		<View style={{ borderWidth: 4 }}>
			{isLayoutFinished ? (
				props.graphData.map((v, i) => {
					const barColor = v.color === undefined ? DEFAULT_COLORS[i % DEFAULT_COLORS.length] : v.color;
					return (
						<BarItem
							key={v.label + "_" + i}
							label={v.label}
							value={v.value}
							barHeight={barHeight}
							color={barColor}
							barCnt={props.graphData.length}
							totalCnt={props.totalCnt}
							showDivider={showDivider}
							dividerInterver={dividerInterver}
							percentPosition={props.percentPosition}
							// percentTextAlign={percentTextAlign}
							percentFixed={percentFixed}
							// percentIntegerTextStlye={props.percentIntegerTextStlye}
							// percentDecimalTextStlye={props.percentDecimalTextStlye}
							// percentTextStyle={props.percentTextStyle}
							percentLblWidth={percentLblWidth}
							PercentLabelComponent={props.PercentLabelComponent}
						/>
					);
				})
			) : (
				<View
					style={{ position: "absolute" }}
					onLayout={event => {
						if (percentLblWidth === 0) {
							setPercentLblWidth(Math.round(event.nativeEvent.layout.width) + 4);
						}
					}}>
					<PercentLabel
						value={1}
						totalCnt={1}
						percentFixed={percentFixed}
						textAlign={props.percentPosition}
						percentLblWidth={percentLblWidth}
						// percentIntegerTextStlye={{ color: "transparent" }}
						// percentDecimalTextStlye={{ color: "transparent" }}
						// percentTextStyle={{ color: "transparent" }}
					/>
				</View>
			)}
		</View>
	);
}