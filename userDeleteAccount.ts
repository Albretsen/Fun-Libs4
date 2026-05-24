import { supabase } from "./supabase";

/**
 * Deletes the currently authenticated user's account from Supabase.
 *
 * This function performs the following steps:
 * 1. Retrieves a fresh session token using the Supabase client (supabase.auth.getSession()).
 * 2. Verifies that the user is authenticated and that a valid access token is available.
 * 3. Calls a Supabase Edge Function (delete-user) with the access token in the Authorization header
 *    to securely delete the user account on the server side.
 * 4. Parses the response from the Edge Function and handles errors or success accordingly.
 * 5. Signs the user out locally if the deletion was successful.
 *
 * @returns {Promise<{ success: boolean; error?: string; message?: string; details?: any }>}
 * - success: true and a message if the deletion was successful.
 * - success: false with error and optional details if the deletion failed.
 *
 * Notes:
 * - Requires an active Supabase session; otherwise returns an authentication error.
 * - The Edge Function `delete-user` must be deployed and configured to handle user deletion securely.
 */


export async function userDeleteAccount() {
    try {
        // Get a fresh session token using your existing supabase client
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            console.error('Session error:', sessionError);
            return { success: false, error: 'Session error: ' + sessionError.message };
        }

        if (!sessionData.session) {
            console.error('No active session found');
            return { success: false, error: 'Not authenticated - no session found' };
        }

        // Get the access token
        const token = sessionData.session.access_token;
        console.log('Token available:', !!token);
        console.log('Token length:', token.length);
        console.log('First few characters:', token.substring(0, 10) + '...');

        // Call the Edge Function with the token
        const response = await fetch(
            'https://eslrohuhvzvuxvueuziv.supabase.co/functions/v1/delete-user',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Parse and handle the response
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            return {
                success: false,
                error: errorData.error || `HTTP error ${response.status}`,
                details: errorData.details
            };
        }

        const result = await response.json();
        console.log('Success response:', result);

        // Sign out locally since the account is now deleted
        if (result.success) {
            await supabase.auth.signOut();
        }

        return { success: true, message: result.message };

    } catch (error) {
        // Type assertation to avoid ts error
        const err = error as Error
        console.error('Exception in deleteMyAccount:', error);
        return {
            success: false,
            error: 'Unexpected error',
            details: err.message
        };
    }
}