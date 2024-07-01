import { supabase } from '../../supabase';
import useAuth from './useAuth';

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

	return { addLike, removeLike };
}
