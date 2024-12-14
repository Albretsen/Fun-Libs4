import { rgba } from '@tamagui/core';
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

const rgbBlue12Light = hslToRgb(tokens.color.blue12Light.val);
const rgbBlue12Dark = hslToRgb(tokens.color.blue12Dark.val);

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
		background: tokens.color.blue1Light,
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
		placeholder: `rgba(${rgbBlue12Light.r}, ${rgbBlue12Light.g}, ${rgbBlue12Light.b}, 0.4)`,
		lockBackground: "rgba(168, 191, 227,0.9)",
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
		background: tokens.color.blue1Dark,
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
		placeholder: `rgba(${rgbBlue12Dark.r}, ${rgbBlue12Dark.g}, ${rgbBlue12Dark.b}, 0.4)`,
		lockBackground: "rgba(0,20,34,0.9)",
	},
};

const redTheme = {
	light: {
		...themes.light,
		main1: '#FFFCFC',
		main2: '#FFF8F7',
		main3: '#FEEBE7',
		main4: '#FFDCD3',
		main5: '#FFCDC2',
		main6: '#FDBDAF',
		main7: '#F5A898',
		main8: '#EC8E7B',
		main9: '#E54D2E',
		main10: '#DD4425',
		main11: '#D13415',
		main12: '#5C271F',
		background: 'white',
		backgroundHover: tokens.color.blue3Light,
		backgroundPress: tokens.color.blue5Light,
		backgroundFocus: tokens.color.blue5Light,
		borderColor: tokens.color.blue6Light,
		borderColorHover: tokens.color.blue7Light,
		color: '#5C271F',
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
		background: tokens.color.blue12Dark,
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
	interface TamaguiCustomConfig extends AppConfig { }
}

declare module '@tamagui/core' {
	interface TamaguiCustomConfig extends AppConfig { }
}

function hslToRgb(hsl: string) {
	const [hue, sat, light] = hsl
		.substring(4, hsl.length - 1)
		.split(',')
		.map(value => parseFloat(value.trim()) / 100); // Ensure proper scaling for saturation and lightness

	const hueScaled = hue * 360; // Hue should be in the range of 0-360
	let r, g, b;

	if (sat === 0) {
		r = g = b = light; // achromatic
	} else {
		const c = (1 - Math.abs(2 * light - 1)) * sat;
		const x = c * (1 - Math.abs(((hueScaled / 60) % 2) - 1));
		const m = light - c / 2;

		let rgb: [number, number, number];

		if (hueScaled >= 0 && hueScaled < 60) {
			rgb = [c, x, 0];
		} else if (hueScaled >= 60 && hueScaled < 120) {
			rgb = [x, c, 0];
		} else if (hueScaled >= 120 && hueScaled < 180) {
			rgb = [0, c, x];
		} else if (hueScaled >= 180 && hueScaled < 240) {
			rgb = [0, x, c];
		} else if (hueScaled >= 240 && hueScaled < 300) {
			rgb = [x, 0, c];
		} else if (hueScaled >= 300 && hueScaled < 360) {
			rgb = [c, 0, x];
		} else {
			rgb = [0, 0, 0];
		}

		r = Math.round((rgb[0] + m) * 255);
		g = Math.round((rgb[1] + m) * 255);
		b = Math.round((rgb[2] + m) * 255);
	}

	return { r, g, b };
}

export default config;
