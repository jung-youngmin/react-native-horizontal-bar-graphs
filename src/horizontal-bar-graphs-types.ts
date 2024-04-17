import { ReactElement } from "react";
import { ColorValue } from "react-native";

export interface IBarGraphData {
	readonly label: string;
	readonly value: number;
	readonly color?: ColorValue;
	readonly onPress?: (label: string, value: number, color: ColorValue) => void | Promise<void>;
}

export type PercentLabelComp = ({ value, total }: { value: number; total: number }) => ReactElement;
