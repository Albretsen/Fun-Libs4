import { StyledContainer } from "../../src/styles/styles";
import DeleteAccountButton from "../../src/components/Misc/DeleteAccountButton";
import Header from "../../src/components/Header";

export default function selectAvatar() {
    return (
        <StyledContainer>
            <Header />
            <DeleteAccountButton />
        </StyledContainer>
    )
}
