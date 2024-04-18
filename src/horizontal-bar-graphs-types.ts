import { ReactElement } from "react";
import { ColorValue } from "react-native";

export interface IBarGraphData {
	readonly label: string;
	readonly value: number;
	readonly color?: ColorValue;
	readonly onPress?: (label: string, value: number, color: ColorValue) => void | Promise<void>;
}

export interface IPercentLabelCompProps {
	readonly value: number;
	readonly total: number;
	readonly color: ColorValue | undefined;
}

export type PercentLabelComp = (props: IPercentLabelCompProps) => ReactElement;
