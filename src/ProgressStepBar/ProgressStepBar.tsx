import _ from "lodash";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	Animated,
	ColorValue,
	Easing,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import MoinSpinner from "src/shared/elements/MoinSpinner";
import MoinText from "src/shared/elements/MoinText";
import { TFontSize, TFontWeight, TStyleSize } from "src/shared/styles";
import { TColors, useMoinStyles } from "src/shared/theme";

export interface IProgressStepBarProps {
	readonly totalStep: number;
	readonly currentStep?: number;
	readonly isLoading?: boolean;
	readonly containerStyle?: StyleProp<ViewStyle>;
}

export default function ProgressStepBar(props: IProgressStepBarProps) {
	const { colors, styleSize, commonStyles, fontStyles, styles } =
		useMoinStyles(createStyles);

	const PROGRESS_HEIGHT = useMemo(() => 44, []);

	const [stepPercent, setStepPercent] = useState<number>(0);
	useEffect(() => {
		const step = Math.round((100 / props.totalStep) * 100) / 100;
		setStepPercent(step);
	}, [props.totalStep]);

	const [barWidth, setBarWidth] = useState<number>(0);
	const animation = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		if (barWidth <= 0) {
			return;
		}

		const w = (barWidth * ((props.currentStep || 0) * stepPercent)) / 100;
		Animated.timing(animation, {
			toValue: w + PROGRESS_HEIGHT / 2, // 어떤 값으로 변경할지 - 필수
			duration: 1000, // 애니메이션에 걸리는 시간(밀리세컨드) - 기본값 500
			delay: 100, // 딜레이 이후 애니메이션 시작 - 기본값 0
			useNativeDriver: false, // 네이티브 드라이버 사용 여부 - 필수
			isInteraction: true, // 사용자 인터랙션에 의해 시작한 애니메이션인지 지정 - 기본값 true
			// easing: Easing.inOut(Easing.ease), // 애니메이션 속서 변경 함수 - 기본값 Easing.inOut(Easing.ease)
			easing: Easing.out(Easing.exp),
			// easing: Easing.in(Easing.exp),
		}).start(() => {
			// 애니메이션 처리 완료 후 실행할 작업
		});
	}, [props.currentStep, barWidth, stepPercent]);

	const renderDot = useCallback(() => {
		if (_.isUndefined(props.currentStep)) {
			return null;
		}

		return (
			<>
				<View
					style={[
						{
							position: "absolute",
							left: -(PROGRESS_HEIGHT / 2),
							width: PROGRESS_HEIGHT,
							height: PROGRESS_HEIGHT,
							borderRadius: PROGRESS_HEIGHT,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: colors.shapePrimary,
						},
					]}>
					<MoinText
						style={[
							fontStyles.textHeaderBold,
							{ color: colors.textPrimaryLight },
						]}>
						{0}
					</MoinText>
				</View>
				{_.map(new Array(props.totalStep), (item, idx) => {
					if (_.isUndefined(props.currentStep)) {
						return null;
					}
					return (
						<ProgressDot
							key={props.totalStep + "_" + idx}
							dotSize={PROGRESS_HEIGHT}
							currentStep={idx}
							stepPercent={stepPercent}
							isActive={props.currentStep > idx}
						/>
					);
				})}
			</>
		);
	}, [props.totalStep, props.currentStep, stepPercent, colors.mode]);

	return (
		<View
			style={[
				props.containerStyle,
				{
					width: "100%",
					height: PROGRESS_HEIGHT,
					borderRadius: PROGRESS_HEIGHT,
					backgroundColor: colors.skeletonSecondary,
				},
			]}>
			<View
				style={[
					{
						flex: 1,
						height: PROGRESS_HEIGHT,
						marginHorizontal: PROGRESS_HEIGHT / 2,
						backgroundColor: colors.skeletonSecondary,
					},
				]}
				onLayout={event => {
					console.log("@@@@ width", event.nativeEvent.layout.width);
					setBarWidth(event.nativeEvent.layout.width);
				}}>
				{/* 색칠된 바 */}
				<Animated.View
					style={{
						position: "absolute",
						left: 0,
						backgroundColor: colors.shapeSecondary,
						width: animation,
						height: "100%",
						borderTopRightRadius: PROGRESS_HEIGHT / 2,
						borderBottomRightRadius: PROGRESS_HEIGHT / 2,
					}}
				/>
				{props.isLoading ? (
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<MoinSpinner />
					</View>
				) : (
					renderDot()
				)}
			</View>
		</View>
	);
}

interface IProgressDotProps {
	readonly dotSize: number;
	readonly currentStep: number;
	readonly stepPercent: number;
	readonly isActive: boolean;
	readonly dotColor?: ColorValue;
}
function ProgressDot(props: IProgressDotProps) {
	const { colors, styleSize, commonStyles, fontStyles, styles } =
		useMoinStyles();

	return (
		<View
			style={{
				position: "absolute",
				left: 0,
				width: props.stepPercent * (props.currentStep + 1) + "%",
				height: "100%",
			}}>
			<View
				style={[
					{
						position: "absolute",
						right: -props.dotSize / 2,
						width: props.dotSize,
						height: props.dotSize,
						borderRadius: props.dotSize,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: props.isActive
							? colors.shapePrimary
							: colors.sheetBg,
					},
					props.isActive === false && {
						borderWidth: 2,
						borderColor: colors.placeholder,
					},
				]}>
				<MoinText
					style={[
						fontStyles.textHeaderBold,
						{
							color: props.isActive
								? colors.textPrimaryLight
								: colors.placeholder,
						},
					]}>
					{props.currentStep + 1}
				</MoinText>
			</View>
		</View>
	);
}

const createStyles = (
	colors: TColors,
	fontSize: TFontSize,
	fontWeights: TFontWeight,
	styleSize: TStyleSize,
) => StyleSheet.create({});
