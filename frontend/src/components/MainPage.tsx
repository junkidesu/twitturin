import styled from "styled-components";
import TweetList from "./tweets/TweetList";
import Box from "./containers/Box";
import { pictures } from "../assets";
import TextArea from "./core/inputs/TextArea";
import Button from "./core/buttons/Button";

const Wrapper = styled(Box)``;

const FormWrapper = styled(Box)`
  align-items: end;
`;

const TweetTextArea = styled(TextArea)`
  border: none;
  box-sizing: border-box;
  padding-top: 0;
  width: 100%;
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  border-radius: 10em;
  cursor: pointer;
`;

const CreateTweetForm = () => {
  return (
    <Box $horizontal $pad="l" $bg="white">
      <ProfilePicture src={pictures.emptyProfilePicture} />

      <FormWrapper $width="100%">
        <TweetTextArea placeholder="Tweet your thoughts now!"/>

        <Button $bg="white">Tweet</Button>
      </FormWrapper>
    </Box>
  );
};

const MainPage = () => {
  return (
    <Wrapper $gap="0.1em">
      <CreateTweetForm />

      <TweetList />
    </Wrapper>
  );
};

export default MainPage;
