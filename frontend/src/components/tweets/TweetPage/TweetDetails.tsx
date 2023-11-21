import styled from "styled-components";
import RouterLink from "../../core/RouterLink";
import { icons, pictures } from "../../../assets";
import IconButton from "../../core/buttons/IconButton";
import { Tweet } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";
import {
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} from "../../../services/tweetsService";
import Box from "../../containers/Box";
import BorderedBox from "../../containers/BorderedBox";
import Label from "../../core/text/Label";

const DetailsBox = styled(BorderedBox)`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const UsernameLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const ProfilePicture = styled.img`
  width: 3em;
  height: 3em;
  box-sizing: border-box;
  border-radius: 10em;
`;

interface LikeIconProps {
  $liked: boolean;
}

const LikeIcon = styled(icons.HeartIcon)<LikeIconProps>`
  color: ${({ $liked, theme }) => ($liked ? theme.colors.primary : "inherit")};
  fill: ${({ $liked, theme }) => ($liked ? theme.colors.primary : "none")};
`;

interface Props {
  tweet: Tweet;
}

const TweetDetails = ({ tweet }: Props) => {
  const [like] = useLikeTweetMutation();
  const [unlike] = useUnlikeTweetMutation();
  const navigate = useNavigate();
  const userId = useAppSelector(({ auth }) => auth?.id);

  const likedByMe = userId && tweet.likedBy.map((u) => u.id).includes(userId);

  const likeButtonLabel = `${tweet.likes} ${
    tweet.likes === 1 ? "like" : "likes"
  }`;

  const replyButtonLabel = `${tweet.replyCount} ${
    tweet.replyCount === 1 ? "reply" : "replies"
  }`;

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

  return (
    <DetailsBox $bg="white" $horizontal $pad="l" $gap="1.5em" $minWidth="600px">
      <RouterLink to={`/users/${tweet.author.id}`}>
        <ProfilePicture src={pictures.emptyProfilePicture} />
      </RouterLink>

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <RouterLink $size="medium" $bold to={`/users/${tweet.author.id}`}>
            {tweet.author.fullName || "Twittur User"}
          </RouterLink>

          <UsernameLink $size="medium" to={`/users/${tweet.author.id}`}>
            @{tweet.author.username}
          </UsernameLink>
        </Box>

        <Label>{tweet.content}</Label>

        <Box $horizontal $gap="0.5em">
          <IconButton
            icon={<LikeIcon $liked={likedByMe || false} />}
            label={likeButtonLabel}
            onClick={likedByMe ? handleUnlike : handleLike}
          />

          <IconButton icon={<icons.RepliesIcon />} label={replyButtonLabel} />
          <IconButton icon={<icons.RetweetIcon />} label="0 retweets" />
          <IconButton icon={<icons.MoreIcon />} />
        </Box>
      </Box>
    </DetailsBox>
  );
};

export default TweetDetails;
