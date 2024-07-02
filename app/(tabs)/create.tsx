import { StyledContainer } from '../../src/styles/styles';
import CreateCard from '../../src/components/CreateCard/CreateCard';
import KeyboardExtender from '../../src/components/Misc/KeyboardExtender';
import { View } from 'tamagui';
import useCreateLogic from '../../src/hooks/useCreateLogic';


export default function Tab() {

    return (
        <View flex={1}>
            <StyledContainer>
                <CreateCard />
            </StyledContainer>
            <KeyboardExtender />
        </View>
    );
}