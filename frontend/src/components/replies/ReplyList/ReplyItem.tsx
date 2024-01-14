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
import {
  useLikeReplyMutation,
  useUnlikeReplyMutation,
} from "../../../services/repliesService";
import { useAppSelector } from "../../../hooks/store";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";

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
  cursor: pointer;
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
  const navigate = useNavigate();
  const [like] = useLikeReplyMutation();
  const [unlike] = useUnlikeReplyMutation();
  const userId = useAppSelector(({ auth }) => auth.id);

  const likedByMe = userId ? reply.likedBy.includes(userId) : false;

  const handleLike = async () => {
    if (!likedByMe) await like(reply);
    else await unlike(reply);
  };

  if (!visible)
    return (
      <Box $bg="white" $horizontal $center $gap="1em">
        <IconButton
          icon={<icons.OpenIcon />}
          onClick={() => setVisible(true)}
        />

        <RouterLink to={`/users/${reply.author?.id}`}>
          <ProfilePicture
            src={reply.author?.profilePicture || pictures.emptyProfilePicture}
          />
        </RouterLink>

        <RouterLink $bold to={`/users/${reply.author.id}`}>
          {reply.author?.fullName || "Twittur User"}
        </RouterLink>

        <UsernameLink $size="extraSmall" to={`/users/${reply.author.id}`}>
          {reply.author ? `@${reply.author.username}` : "Deleted User"}
        </UsernameLink>
      </Box>
    );

  const submissionTime = new Date(reply.createdAt);

  return (
    <Box $bg="white" $horizontal $gap="1em" $pad="s" id={reply.id}>
      <Box $center>
        <ProfilePicture
          src={reply.author?.profilePicture || pictures.emptyProfilePicture}
          onClick={() => navigate(`/users/${reply.author?.id}`)}
        />

        <Line onClick={() => setVisible(false)} />
      </Box>

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <RouterLink $bold to={`/users/${reply.author?.id}`}>
            {reply.author?.fullName || "Twittur User"}
          </RouterLink>

          <UsernameLink $size="extraSmall" to={`/users/${reply.author?.id}`}>
            {reply.author ? `@${reply.author.username}` : "Deleted User"}
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
            className="like-button"
            label={reply.likes}
            icon={<LikeIcon $liked={likedByMe} />}
            onClick={handleLike}
          />

          <IconButton
            className="reply-button"
            icon={<icons.RepliesIcon />}
            onClick={() => setFormVisible(true)}
          />

          <RWebShare
            data={{
              text: `Reply by ${reply.author.username}`,
              title: "Twittur",
              url: `https://twitturin.onrender.com/tweets/${reply.tweet}/#${reply.id}`,
            }}
          >
            <IconButton icon={<icons.ShareIcon />} />
          </RWebShare>

          <IconButton icon={<icons.BookmarkIcon />} />
        </Box>

        {formVisible && (
          <ReplyForm
            parentId={reply.id}
            parent="reply"
            setVisible={setFormVisible}
          />
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
