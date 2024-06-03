import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eslrohuhvzvuxvueuziv.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbHJvaHVodnp2dXh2dWV1eml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MDE1OTksImV4cCI6MjAzMjk3NzU5OX0.rD-nyc4tAUlQV6BS9RNaeJkCds1IM1kY7qNoLty3dvA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
