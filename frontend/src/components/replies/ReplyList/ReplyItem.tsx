import { Reply } from "../../../types";
import styled from "styled-components";
import RouterLink from "../../core/RouterLink";
import { icons, pictures } from "../../../assets";
import Box from "../../containers/Box";
import IconButton from "../../core/buttons/IconButton";
import { useEffect, useState } from "react";
import Form from "../../core/Form";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import useField from "../../../hooks/useField";
import Button from "../../core/buttons/Button";
import TextArea from "../../core/inputs/TextArea";
import lightTheme from "../../../themes/lightTheme";
import { useReplyToReplyMutation } from "../../../services/repliesService";
import { hide, show } from "../../../reducers/loadingStripeReducer";

interface Props {
  reply: Reply;
}

const UsernameLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const ProfilePicture = styled.img`
  width: 1.5em;
  height: 1.5em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const Line = styled.div`
  width: 3px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grey3};
  cursor: pointer;

  &:hover {
    transition: 0.2s;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface LikeIconProps {
  $liked: boolean;
}

const LikeIcon = styled(icons.HeartIcon)<LikeIconProps>`
  color: ${({ $liked, theme }) => ($liked ? theme.colors.primary : "inherit")};
  fill: ${({ $liked, theme }) => ($liked ? theme.colors.primary : "none")};
`;

const ReplyForm = ({
  setFormVisible,
  id,
}: {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
  const dispatch = useAppDispatch();
  const [reply, { isLoading, isSuccess }] = useReplyToReplyMutation();
  const content = useField("text", "Type your reply...");

  useEffect(() => {
    if (isLoading) dispatch(show());
    else if (isSuccess) {
      dispatch(hide());
      setFormVisible(false);
    }
  }, [isLoading, isSuccess, dispatch, setFormVisible]);

  const token = useAppSelector(({ auth }) => auth.token);

  if (!token) return null;

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await reply({ content: content.value, parentId: id });
  };

  return (
    <Form onSubmit={handleReply}>
      <TextArea {...content} required />
      <Box $horizontal $gap="0.5em">
        <Button $bg="white" $size="extraSmall">
          Submit
        </Button>
        <Button
          onClick={() => setFormVisible(false)}
          $fg={lightTheme.colors.secondary}
          $bg="white"
          $size="extraSmall"
        >
          Cancel
        </Button>
      </Box>
    </Form>
  );
};

const ReplyItem = ({ reply }: Props) => {
  const [visible, setVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  if (!visible)
    return (
      <Box $horizontal $center $pad="s" $gap="0.5em">
        <IconButton
          icon={<icons.OpenIcon />}
          onClick={() => setVisible(true)}
        />

        <RouterLink to={`/users/${reply.author.id}`}>
          <ProfilePicture src={pictures.emptyProfilePicture} />
        </RouterLink>

        <RouterLink $bold to={`/users/${reply.author.id}`}>
          {reply.author.fullName || "Twittur User"}
        </RouterLink>

        <UsernameLink $size="extraSmall" to={`/users/${reply.author.id}`}>
          @{reply.author.username}
        </UsernameLink>
      </Box>
    );

  return (
    <Box $horizontal $bg="white" $gap="1em" $pad="s" $rounded id={reply.id}>
      <Box $center>
        <RouterLink to={`/users/${reply.author.id}`}>
          <ProfilePicture src={pictures.emptyProfilePicture} />
        </RouterLink>

        <Line onClick={() => setVisible(false)} />
      </Box>

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <RouterLink $bold to={`/users/${reply.author.id}`}>
            {reply.author.fullName || "Twittur User"}
          </RouterLink>

          <UsernameLink $size="extraSmall" to={`/users/${reply.author.id}`}>
            @{reply.author.username}
          </UsernameLink>
        </Box>

        <RouterLink to={`/tweets/${reply.tweet}/#${reply.id}`}>
          {reply.content}
        </RouterLink>

        <Box $horizontal $gap="0.5em">
          <IconButton label={0} icon={<LikeIcon $liked={true} />} />

          <IconButton
            icon={<icons.RepliesIcon />}
            onClick={() => setFormVisible(true)}
          />

          <IconButton icon={<icons.ShareIcon />} />

          <IconButton icon={<icons.BookmarkIcon />} />
        </Box>

        {formVisible && (
          <ReplyForm id={reply.id} setFormVisible={setFormVisible} />
        )}

        {reply.replies.map((r) => (
          <ReplyItem reply={r} key={r.id} />
        ))}
      </Box>
    </Box>
  );
};

export default ReplyItem;
