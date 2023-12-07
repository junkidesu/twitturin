import styled from "styled-components";
import Box from "../../containers/Box";
import { icons } from "../../../assets";
import IconButton from "../../core/buttons/IconButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";
import {
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} from "../../../services/tweetsService";
import { Tweet } from "../../../types";

const Wrapper = styled(Box)`
  justify-content: space-around;
`;

const LikeIcon = styled(icons.HeartIcon)<{ $liked: boolean }>`
  color: ${({ $liked, theme }) => ($liked ? theme.colors.primary : "inherit")};
  fill: ${({ $liked, theme }) => ($liked ? theme.colors.primary : "none")};
`;

const BottomButtons = ({ tweet }: { tweet: Tweet }) => {
  const [like] = useLikeTweetMutation();
  const [unlike] = useUnlikeTweetMutation();
  const navigate = useNavigate();

  const userId = useAppSelector(({ auth }) => auth?.id);

  const handleLike = async () => {
    if (!userId) {
      navigate("/login");
    } else {
      await like(tweet.id);
    }
  };

  const handleUnlike = async () => {
    if (!userId) {
      navigate("/login");
    } else {
      await unlike({ id: tweet.id, userId });
    }
  };

  const likedByMe = userId && tweet.likedBy.includes(userId);

  const likeButtonLabel = `${tweet.likes} ${
    tweet.likes === 1 ? "like" : "likes"
  }`;

  const replyButtonLabel = `${tweet.replyCount} ${
    tweet.replyCount === 1 ? "reply" : "replies"
  }`;

  return (
    <Wrapper $horizontal $gap="0.5em" $bg="white" $pad="m">
      <IconButton
        icon={<LikeIcon $liked={likedByMe || false} />}
        label={likeButtonLabel}
        $vertical
        onClick={likedByMe ? handleUnlike : handleLike}
      />

      <IconButton
        icon={<icons.RepliesIcon />}
        label={replyButtonLabel}
        $vertical
      />
      <IconButton icon={<icons.RetweetIcon />} label="0 retweets" $vertical />
      <IconButton icon={<icons.BookmarkIcon />} label="Save" $vertical />
      <IconButton icon={<icons.ShareIcon />} label="Share" $vertical />
    </Wrapper>
  );
};

export default BottomButtons;
