import { StyledContainer } from "../../src/styles/styles";
import { View } from "tamagui";
import AvatarSelector from "../../src/components/SelectAvatar/AvatarSelector";


export default function selectAvatar() {
    return (
        <StyledContainer>
            <AvatarSelector />
        </StyledContainer>
    )
}