import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { showAlert } from '../utils/alert';
import { Session } from '@supabase/supabase-js';

export default function useAuth() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			},
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	async function getSession() {
		if (session) return session;

		try {
			const { data: session, error } = await supabase.auth.getSession();
			if (error) throw error;
			setSession(session.session);
			return session.session;
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error fetching session', error.message);
			}
		}
	}

	const signIn = async (email: string, password: string) => {
		email = email.toLowerCase();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) showAlert(error.message);
	};

	const signUp = async (
		email: string,
		username: string,
		password: string,
		avatar: number,
	) => {
		email = email.toLowerCase();
		if (!avatar) avatar = 0;
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username,
					email,
					avatar_url: `https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/${avatar}.png`,
				},
			},
		});

		if (error) showAlert(error.message);
		else if (!session) showAlert('Please check your inbox for email verification!', 'success');
	};

	const anonToPermanentUser = async (
		email: string,
		username: string,
		password: string,
		avatar: number,
	) => {
		email = email.toLowerCase();
		const { data, error } = await supabase.auth.updateUser({
			email,
			data: {
				email,
				username,
				avatar_url: `https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/${avatar}.png`,
			},
		});

		await supabase.auth.updateUser({
			password,
		});

		if (session) {
			await supabase
				.from('profiles')
				.update({
					username,
					email,
					avatar_url: `https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/${avatar}.png`,
				})
				.eq('id', session.user.id);
		}

		if (error) showAlert(error.message);
		if (!session) showAlert('Please check your inbox for email verification!', 'success');
	};

	const signInAnonymously = async () => {
		const { error } = await supabase.auth.signInAnonymously();

		if (error) showAlert(error.message);
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) showAlert(error.message);
	};

	return {
		signIn,
		signUp,
		signOut,
		signInAnonymously,
		session,
		getSession,
		anonToPermanentUser,
	};
}
