import { StyledContainer } from "../../src/styles/styles";
import { View, Input, Button, Spinner, SizableText } from "tamagui";
import Header from "../../src/components/Header";
import { useState } from "react";

export default function deleteAccount() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    async function deleteAccount() {
        setLoading(true);
        // Account deletion logic here
        setLoading(false);
    }

    return (
        <StyledContainer>
            <Header />
            <View
                gap={10}

            >
                <SizableText fontWeight={500} size={'$8'}>Delete account</SizableText>
                <SizableText>Are you sure you want to delete your account? This will also delete all your published libs. This action cannot be undone.</SizableText>
                <SizableText>Input your password to confirm that you want to permanently delete your account.</SizableText>
                <Input onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} placeholder={`Password`} borderColor={'$main12'} />
                <Button iconAfter={loading ? <Spinner /> : null} backgroundColor={'$main12'} color={'$main2'} width={'100%'} onPress={() => deleteAccount()} >Delete account</Button>
            </View>
        </StyledContainer>
    )
}