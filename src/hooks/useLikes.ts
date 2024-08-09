import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import useSocial from './useSocial';
import useAuth from './useAuth';

export default function useLikes(item: any) {
	const { getSession } = useAuth();

	const { addLike, removeLike } = useSocial();

	const [likes, setLikes] = useState<number>(0);
	const [liked, setLiked] = useState<boolean>(false);

	useEffect(() => {
		getLikes();
	}, []);

	const getLikes = async () => {
		if (!item) return;

		const session = await getSession();
		const result = await supabase
			.from('likes')
			.select('*', { count: 'exact' })
			.eq('lib_id', item.id);
		if (session && 'user' in session && session.user?.id) {
			result.data?.forEach(async item_ => {
				if (item_.user_id && item_.user_id === session.user.id) {
					setLiked(true);
				}
			});
		}
		if (result?.count) setLikes(result.count);
	};

	const like = async () => {
		if (!liked) {
			setLiked(true);
			setLikes(likes + 1);
			const result = await addLike(item.id);
			if (result.error != null) {
				setLikes(likes);
				setLiked(false);
			}
		} else {
			setLiked(false);
			setLikes(likes - 1);
			const result = await removeLike(item.id);
			if (result.error != null) {
				setLikes(likes);
				setLiked(true);
			}
		}
	};

	return {
		like,
		likes,
		liked,
	};
}
