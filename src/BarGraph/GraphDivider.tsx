import React, { useMemo } from "react";
import { ColorValue, DimensionValue, View } from "react-native";

interface IGraphDividerProps {
	readonly dividerInterver: 4 | 5 | 10 | 20 | 25 | 33.3 | 50;
	readonly leftPosition: number;
	/** default: "60%" */
	readonly dividerHeight: DimensionValue | undefined;
	/** default: "#BBBBBB" */
	readonly dividerColor: ColorValue;
	readonly dividerWidth: number;
}

export default function GraphDivider(props: IGraphDividerProps) {
	const dividerList = useMemo(() => {
		const dividerCnt = 99 / props.dividerInterver;
		const dividerList: number[] = [];
		for (let index = 1; index < dividerCnt; index++) {
			dividerList.push(props.dividerInterver * index);
		}
		return dividerList;
	}, [props.dividerInterver]);

	return (
		<View
			style={{
				position: "absolute",
				marginLeft: props.leftPosition,
				flexDirection: "row",
				width: "100%",
				height: "100%",
				alignItems: "center",
			}}>
			{dividerList.map((div, i) => {
				return (
					<View
						key={"div_" + div}
						style={[
							{
								position: "absolute",
								borderRightWidth: props.dividerWidth,
								borderColor: props.dividerColor,
								width: (div + "%") as DimensionValue,
								height: props.dividerHeight,
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
