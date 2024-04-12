import React, { useMemo } from "react";
import { ColorValue, DimensionValue, View } from "react-native";

interface IGraphDividerProps {
	readonly dividerInterver: 4 | 5 | 10 | 20 | 50;
	readonly leftPosition: number;
	/** default: "60%" */
	readonly dividerHeigt?: DimensionValue | undefined;
	/** default: "#BBBBBB" */
	readonly dividerColor?: ColorValue;
}

export default function GraphDivider(props: IGraphDividerProps) {

	const dividerList = useMemo(() => {
		const dividerCnt = 100 / props.dividerInterver;
		const dividerList: number[] = [];
		for (let index = 1; index < dividerCnt; index++) {
			dividerList.push(props.dividerInterver * index);
		}
		return dividerList;
	}, [props.dividerInterver]);

	const dividerHeigt = useMemo<DimensionValue>(() => {
		return props.dividerHeigt === undefined ? "60%" : props.dividerHeigt;
	}, [props.dividerHeigt]);

	const dividerColor = useMemo(() => {
		return props.dividerColor === undefined ? "#BBBBBB" : props.dividerColor;
	}, [props.dividerColor]);

	return (
		<View style={{ position: "absolute", marginLeft: props.leftPosition, flexDirection: "row", width: "100%", height: "100%", alignItems: "center" }}>
			{dividerList.map((div, i) => {
				return (
					<View
						key={"div_" + div}
						style={[
							{
								position: "absolute",
								borderRightWidth: 1,
								borderColor: dividerColor,
								width: div + "%" as DimensionValue,
								height: dividerHeigt,
								justifyContent: "center",
								alignItems: "center",
							},
						]}
					/>
				);
			})}
		</View>
	);
}
