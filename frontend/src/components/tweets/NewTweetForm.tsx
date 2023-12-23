import styled from "styled-components";
import Form from "../core/Form";
import TextArea from "../core/inputs/TextArea";
import Button from "../core/buttons/Button";
import useField from "../../hooks/useField";
import { useAddTweetMutation } from "../../services/tweetsService";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { hideModal } from "../../reducers/modalReducer";
import { pictures } from "../../assets";
import { useGetUserQuery } from "../../services/usersService";
import Card from "../containers/Card";
import useLoadingStripe from "../../hooks/useLoadingStripe";
import useAlert from "../../hooks/useAlert";

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

const FormWrapper = styled(Form)`
  align-items: end;
  width: 100%;
  padding: 0;
`;

const Wrapper = styled(Card)`
  max-width: 500px;
`;

const NewTweetForm = ({ className }: { className?: string }) => {
  const [clearContent, content] = useField("text", "Tweet your thoughts");
  const id = useAppSelector(({ auth }) => auth.id);
  const { data: user } = useGetUserQuery(id!);
  const [addTweet, { isLoading }] = useAddTweetMutation();
  const dispatch = useAppDispatch();
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const { errorAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    showLoadingStripe();
    try {
      await addTweet({ content: content.value }).unwrap();
      clearContent();
      dispatch(hideModal());
    } catch (error) {
      errorAlert(error);
    }

    hideLoadingStripe();
  };

  return (
    <Wrapper $horizontal className={className}>
      <ProfilePicture
        src={user?.profilePicture || pictures.emptyProfilePicture}
      />

      <FormWrapper onSubmit={handleSubmit}>
        <TweetTextArea {...content} required />

        <Button $bg="white" disabled={isLoading}>
          Tweet
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default NewTweetForm;
