import { Input, Button, Spinner, SizableText } from "tamagui";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { validateEmail } from "../../utils/validation";
import { supabase } from "../../../supabase";
import Toast from "react-native-toast-message";
import AvatarSelectorCarousel from "../SelectAvatar/AvatarSelectorCarousel";

interface SignUpProps {
    email?: string
}

export default function SignUp(props: SignUpProps) {
    const { email } = props;

    const [email_, setEmail] = useState(email);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(0);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp, session, anonToPermanentUser } = useAuth();

    const accountAlreadyExists = async () => {
        const result = await supabase.from('profiles').select().eq('email', email);

        if (result.data) return result.data.length > 0;
        return false;
    }

    async function signUpWithEmail() {
        if (!validateEmail(email_)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Email is not valid'
            });
            return;
        }
        setLoading(true);
        if (await accountAlreadyExists()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Email is already in use',
            });
            setLoading(false);
            return;
        }
        if (!session?.user.is_anonymous) {
            await signUp(email_, username, password, avatar);
        } else {
            await anonToPermanentUser(email_, username, password, avatar);
        }
        setLoading(false);
    }

    return (
        <>
            {!email ? <Input inputMode={'email'} onChangeText={(text) => setEmail(text)} value={email_} placeholder={`Email`} borderColor={'$main12'} /> : null}
            <Input inputMode={'text'} onChangeText={(text) => setUsername(text)} value={username} placeholder={`Username`} borderColor={'$main12'} />
            <Input inputMode={'text'} onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} placeholder={`Password`} borderColor={'$main12'} />
            <SizableText size={'$5'}>Select an avatar</SizableText>
            <AvatarSelectorCarousel setAvatar={setAvatar} avatar={avatar} />
            <Button iconAfter={loading ? <Spinner /> : null} backgroundColor={'$main12'} color={'$main2'} width={'100%'} onPress={() => signUpWithEmail()} >Continue</Button>
        </>
    )
}