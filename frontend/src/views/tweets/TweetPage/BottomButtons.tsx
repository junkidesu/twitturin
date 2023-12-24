import styled from "styled-components";
import { icons } from "../../../assets";
import IconButton from "../../../components/core/buttons/IconButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";
import {
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} from "../../../services/tweetsService";
import { Tweet } from "../../../types";
import Card from "../../../components/containers/Card";
import { RWebShare } from "react-web-share";

const Wrapper = styled(Card)`
  padding: 0.5em;
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
      await like(tweet);
    }
  };

  const handleUnlike = async () => {
    if (!userId) {
      navigate("/login");
    } else {
      await unlike(tweet);
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
    <Wrapper $horizontal $gap="0.5em">
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
      <IconButton icon={<icons.BookmarkIcon />} label="Save" $vertical />

      <RWebShare
        data={{
          text: `Tweet by ${tweet.author.username}`,
          title: "Twittur",
          url: `https://twitturin.onrender.com/tweets/${tweet.id}`,
        }}
      >
        <IconButton icon={<icons.ShareIcon />} label="Share" $vertical />
      </RWebShare>
    </Wrapper>
  );
};

export default BottomButtons;
