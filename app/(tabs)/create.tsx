import { StyledContainer } from '../../src/styles/styles';
import CreateCard from '../../src/components/CreateCard/CreateCard';
import KeyboardExtender from '../../src/components/Misc/KeyboardExtender';
import { View } from 'tamagui';
import { CreateProvider } from '../../src/Contexts/CreateContext';


export default function Tab() {

    return (
        <CreateProvider>
            <View flex={1}>
                <StyledContainer>
                    <CreateCard />
                </StyledContainer>
                <KeyboardExtender />
            </View>
        </CreateProvider>
    );
}