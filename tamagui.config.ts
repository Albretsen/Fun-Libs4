import { config } from '@tamagui/config/v3';
import { createTamagui, createTokens } from '@tamagui/core';
import { color, radius, size, space, themes, zIndex } from '@tamagui/themes';

const tokens = createTokens({
	size,
	space,
	zIndex,
	color,
	radius,
});

const appConfig = createTamagui({
	themes,
	tokens,
});

export type AppConfig = typeof appConfig;

declare module '@tamagui/core' {
	interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
