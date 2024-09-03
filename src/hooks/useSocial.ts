import { supabase } from '../../supabase';
import useAuth from './useAuth';
import useLib from './useLib';

export default function useSocial() {
	const { session } = useAuth();

	const addLike = async (lib_id: number) => {
		return await supabase
			.from('likes')
			.insert({ lib_id, user_id: session?.user.id });
	};

	const removeLike = async (lib_id: number) => {
		return await supabase
			.from('likes')
			.delete()
			.eq('lib_id', lib_id)
			.eq('user_id', session?.user.id);
	};

	/**
	 * TODO:
	 * "Multithread" awaits
	 */
	const changeAvatar = async (avatar_url: string) => {
		if (!session?.user?.id) return false;
		await supabase.auth.updateUser({ data: { avatar_url } });
		return await supabase.from('profiles').update({ avatar_url }).eq('id', session?.user.id);
	}

	return { addLike, removeLike, changeAvatar };
}
