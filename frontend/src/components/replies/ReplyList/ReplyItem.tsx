import { Reply } from "../../../types";
import styled from "styled-components";
import RouterLink from "../../core/RouterLink";
import { icons, pictures } from "../../../assets";
import Box from "../../containers/Box";
import IconButton from "../../core/buttons/IconButton";
import { useState } from "react";
import ReplyForm from "../ReplyForm";
import lightTheme from "../../../themes/lightTheme";
import { elapsedTime } from "../../../util/time";
import Label from "../../core/text/Label";
import { useLikeReplyMutation } from "../../../services/repliesService";
import { useAppSelector } from "../../../hooks/store";

interface Props {
  reply: Reply;
  showChildReplies?: boolean;
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

const ReplyItem = ({ reply, showChildReplies }: Props) => {
  const [visible, setVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [like] = useLikeReplyMutation();
  const userId = useAppSelector(({ auth }) => auth.id);

  const likedByMe = userId
    ? reply.likedBy.map((u) => u.id).includes(userId)
    : false;

  const handleLike = async () => {
    if (!likedByMe) await like({ id: reply.id });
  };

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

  const submissionTime = new Date(reply.createdAt);

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

          {"•"}

          <Label
            $size="extraSmall"
            $color={lightTheme.colors.grey2}
            title={submissionTime.toString()}
          >
            {elapsedTime(submissionTime.valueOf())}
          </Label>
        </Box>

        <RouterLink to={`/tweets/${reply.tweet}/#${reply.id}`}>
          {reply.content}
        </RouterLink>

        <Box $horizontal $gap="0.5em">
          <IconButton
            label={reply.likes}
            icon={<LikeIcon $liked={likedByMe} />}
            onClick={handleLike}
          />

          <IconButton
            icon={<icons.RepliesIcon />}
            onClick={() => setFormVisible(true)}
          />

          <IconButton icon={<icons.ShareIcon />} />

          <IconButton icon={<icons.BookmarkIcon />} />
        </Box>

        {formVisible && (
          <ReplyForm id={reply.id} parent="reply" setVisible={setFormVisible} />
        )}

        {showChildReplies &&
          reply.replies.map((r) => (
            <ReplyItem reply={r} key={r.id} showChildReplies />
          ))}
      </Box>
    </Box>
  );
};

export default ReplyItem;
