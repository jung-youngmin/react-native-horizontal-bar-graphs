import { useMemo } from "react";
import { IHorizontalBarGraphsBaseProps } from "../horizontal-bar-graphs-types";

export default function useDefaultProps(props: IHorizontalBarGraphsBaseProps) {
	const title = useMemo(() => {
		return props.title === undefined ? "" : props.title;
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

	const barHolderRightStyle = useMemo(() => {
		return props.barHolderRightStyle === undefined ? "rounded" : props.barHolderRightStyle;
	}, [props.barHolderRightStyle]);

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

	const percentPosition = useMemo(() => {
		return props.percentPosition === undefined ? "right" : props.percentPosition;
	}, [props.percentPosition]);

	const percentFixed = useMemo(() => {
		return props.percentFixed === undefined ? 0 : props.percentFixed;
	}, [props.percentFixed]);

	const enableTouchHighlight = useMemo(() => {
		return props.enableTouchHighlight === undefined ? true : props.enableTouchHighlight;
	}, [props.enableTouchHighlight]);

	const defaultProps: Required<Omit<IHorizontalBarGraphsBaseProps, "style" | "titleStyle" | "PercentLabelComponent">> = {
		graphData: props.graphData,
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
	};

	return defaultProps;
}
