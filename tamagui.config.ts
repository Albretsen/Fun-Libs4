import { createInterFont } from '@tamagui/font-inter';
import { color, radius, size, space, themes, zIndex } from '@tamagui/themes';
import { createTamagui, createTokens } from 'tamagui';

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
	light: {
		...themes.light,
		main1: tokens.color.blue1Light,
		main2: tokens.color.blue2Light,
		main3: tokens.color.blue3Light,
		main4: tokens.color.blue4Light,
		main5: tokens.color.blue5Light,
		main6: tokens.color.blue6Light,
		main7: tokens.color.blue7Light,
		main8: tokens.color.blue8Light,
		main9: tokens.color.blue9Light,
		main10: tokens.color.blue10Light,
		main11: tokens.color.blue11Light,
		main12: tokens.color.blue12Light,
		background: tokens.color.blue4Light,
		backgroundHover: tokens.color.blue3Light,
		backgroundPress: tokens.color.blue5Light,
		backgroundFocus: tokens.color.blue5Light,
		borderColor: tokens.color.blue6Light,
		borderColorHover: tokens.color.blue7Light,
		color: tokens.color.blue12Light,
		colorHover: tokens.color.blue11Light,
		colorPress: tokens.color.blue10Light,
		colorFocus: tokens.color.blue6Light,
		shadowColor: tokens.color.blue5Light,
		shadowColorHover: tokens.color.blue6Light,
	},
	dark: {
		...themes.dark,
		main1: tokens.color.blue1Dark,
		main2: tokens.color.blue2Dark,
		main3: tokens.color.blue3Dark,
		main4: tokens.color.blue4Dark,
		main5: tokens.color.blue5Dark,
		main6: tokens.color.blue6Dark,
		main7: tokens.color.blue7Dark,
		main8: tokens.color.blue8Dark,
		main9: tokens.color.blue9Dark,
		main10: tokens.color.blue10Dark,
		main11: tokens.color.blue11Dark,
		main12: tokens.color.blue12Dark,
		background: tokens.color.blue4Dark,
		backgroundHover: tokens.color.blue3Dark,
		backgroundPress: tokens.color.blue5Dark,
		backgroundFocus: tokens.color.blue5Dark,
		borderColor: tokens.color.blue6Dark,
		borderColorHover: tokens.color.blue7Dark,
		color: tokens.color.blue12Dark,
		colorHover: tokens.color.blue11Dark,
		colorPress: tokens.color.blue10Dark,
		colorFocus: tokens.color.blue6Dark,
		shadowColor: tokens.color.blue5Dark,
		shadowColorHover: tokens.color.blue6Dark,
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
