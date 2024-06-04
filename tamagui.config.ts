import { color, radius, size, space, themes, zIndex } from '@tamagui/themes';
import { createTamagui, createTokens } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';

const headingFont = createInterFont();
const bodyFont = createInterFont();

const tokens = createTokens({
	size,
	space,
	zIndex,
	color,
	radius,
});

const funLibsTheme = {
	...themes,
	light: {
		...themes.light,
		main1: themes.light.blue1,
		main2: themes.light.blue2,
		main3: themes.light.blue3,
		main4: themes.light.blue4,
		main5: themes.light.blue5,
		main6: themes.light.blue6,
		main7: themes.light.blue7,
		main8: themes.light.blue8,
		main9: themes.light.blue9,
		main10: themes.light.blue10,
		main11: themes.light.blue11,
		main12: themes.light.blue12,
	},
	dark: {
		...themes.dark,
		main1: themes.dark.blue1,
		main2: themes.dark.blue2,
		main3: themes.dark.blue3,
		main4: themes.dark.blue4,
		main5: themes.dark.blue5,
		main6: themes.dark.blue6,
		main7: themes.dark.blue7,
		main8: themes.dark.blue8,
		main9: themes.dark.blue9,
		main10: themes.dark.blue10,
		main11: themes.dark.blue11,
		main12: themes.dark.blue12,
	},
};

const config = createTamagui({
	fonts: {
		heading: headingFont,
		body: bodyFont,
	},
	themes: funLibsTheme,
	tokens,
});

export type AppConfig = typeof config;

declare module 'tamagui' {
	// overrides TamaguiCustomConfig so your custom types
	// work everywhere you import `tamagui`
	interface TamaguiCustomConfig extends AppConfig {}
}

declare module '@tamagui/core' {
	interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
