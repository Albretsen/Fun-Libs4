import { Text } from 'react-native';
import { StyledContainer } from '../../src/styles/styles';
import { Button, View, SizableText } from 'tamagui';
import useAuth from '../../src/hooks/useAuth';
import SignUp from '../../src/components/Auth/SignUp';
import Header from '../../src/components/Header';
import { useEffect, useState } from 'react';

export default function Tab() {
    const { signOut, session } = useAuth();

    const [user, setUser] = useState<any>();

    useEffect(() => {
        if (session) setUser(session.user);
    }, [session]);

    return (
        <>
            {!session?.user.is_anonymous ?
                <StyledContainer>
                    <Header />
                    <Text>Tab Profile: {user.user_metadata.username}</Text>
                    <Button onPress={() => signOut()}>Sign out</Button>
                </StyledContainer>
                :
                <StyledContainer >
                    <View gap={8}>
                        <SizableText size={'$5'}>⚠️ Create an account to view your profile!</SizableText>
                        <SignUp />
                    </View>
                </StyledContainer>
            }
        </>
    );
}

/*
{
  "id": "c5c2ec05-c358-4fd4-8886-ba0eea80a866",
  "aud": "authenticated",
  "role": "authenticated",
  "email": "test@email.com",
  "email_confirmed_at": "2024-08-07T18:47:20.510837016Z",
  "phone": "",
  "last_sign_in_at": "2024-08-07T18:47:20.515077921Z",
  "app_metadata": {
    "provider": "email",
    "providers": [
      "email"
    ]
  },
  "user_metadata": {
    "avatar_url": "https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/default.png",
    "email": "test@email.com",
    "email_verified": false,
    "phone_verified": false,
    "sub": "c5c2ec05-c358-4fd4-8886-ba0eea80a866",
    "username": "Test Account"
  },
  "identities": [
    {
      "identity_id": "8847b765-a925-4617-8bc0-33967dbe2b50",
      "id": "c5c2ec05-c358-4fd4-8886-ba0eea80a866",
      "user_id": "c5c2ec05-c358-4fd4-8886-ba0eea80a866",
      "identity_data": {
        "avatar_url": "https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/default.png",
        "email": "test@email.com",
        "email_verified": false,
        "phone_verified": false,
        "sub": "c5c2ec05-c358-4fd4-8886-ba0eea80a866",
        "username": "Test Account"
      },
      "provider": "email",
      "last_sign_in_at": "2024-08-07T18:47:20.504936007Z",
      "created_at": "2024-08-07T18:47:20.505015Z",
      "updated_at": "2024-08-07T18:47:20.505015Z",
      "email": "test@email.com"
    }
  ],
  "created_at": "2024-08-07T18:47:20.491151Z",
  "updated_at": "2024-08-07T18:47:20.520222Z",
  "is_anonymous": false
}
*/