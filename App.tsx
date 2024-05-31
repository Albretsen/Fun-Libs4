import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import '@tamagui/core/reset.css';
import { TamaguiProvider, View, Text } from '@tamagui/core';
import appConfig from './tamagui.config';
import { useLoadAssets } from './src/hooks/useLoadAssets';

export default function App() {
	const isLoadingComplete = useLoadAssets();

	if (!isLoadingComplete) return null;

	return (
		<TamaguiProvider config={appConfig}>
			<View style={styles.container}>
				<Text>Home</Text>
				<StatusBar style='auto' />
			</View>
		</TamaguiProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
