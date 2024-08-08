import { Share } from 'react-native';
import useLib from './useLib';

export default function useShare() {
	const { parseLibToText } = useLib();

	const share = async (message: string) => {
		await Share.share({
			message,
		});
	};

	const shareLib = async (lib: any) => {
		const message = parseLibToText(lib) + '\n\n' + 'Written in Fun Libs!';

		await Share.share({
			message,
		});
	};

	return { share, shareLib };
}
