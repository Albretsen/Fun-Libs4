import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { Alert } from 'react-native';
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
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
	};

	const signUp = async (email: string, password: string) => {
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		if (!session) Alert.alert('Please check your inbox for email verification!');
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) Alert.alert(error.message);
	};

	return { signIn, signUp, signOut, session, getSession };
}
