
import { View, useTheme } from 'tamagui';
import { ReactNode } from 'react';

interface StyledContainerProps {
	children?: ReactNode,
}

export function StyledContainer({ children }: StyledContainerProps) {
	const theme = useTheme();
	return (
		<View
			backgroundColor={theme.background.val}
			flex={1}
			paddingLeft={16}
			paddingRight={16}
			paddingTop={16}
		>
			{children}
		</View>
	)
}
