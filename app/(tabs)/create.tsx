import { StyledContainer } from '../../src/styles/styles';
import CreateCard from '../../src/components/CreateCard/CreateCard';
import KeyboardExtender from '../../src/components/Misc/KeyboardExtender';
import { SizableText, View } from 'tamagui';
import SignUp from '../../src/components/Auth/SignUp';
import useAuth from '../../src/hooks/useAuth';

export default function Tab() {

    const { session } = useAuth();

    return (
        <>
            {!session?.user.is_anonymous ?
                <View flex={1}>
                    <StyledContainer>
                        <CreateCard />
                    </StyledContainer>
                    <KeyboardExtender />
                </View>
                :
                <StyledContainer >
                    <View gap={8}>
                        <SizableText size={'$5'}>⚠️ Create an account to publish stories!</SizableText>
                        <SignUp />
                    </View>
                </StyledContainer>}
        </>
    );
}