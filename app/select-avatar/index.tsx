import { StyledContainer } from "../../src/styles/styles";
import { View } from "tamagui";
import AvatarSelector from "../../src/components/SelectAvatar/AvatarSelector";
import Header from "../../src/components/Header";

export default function selectAvatar() {
    return (
        <StyledContainer>
            <Header />
            <AvatarSelector />
        </StyledContainer>
    )
}