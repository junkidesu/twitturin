import styled from "styled-components";
import { Tweet } from "../../../types";
import { icons, pictures } from "../../../assets";
import BorderedBox from "../../containers/BorderedBox";
import Box from "../../containers/Box";
import IconButton from "../../core/buttons/IconButton";
import RouterLink from "../../core/RouterLink";
import { useLikeTweetMutation } from "../../../services/tweetsService";
import { useUnlikeTweetMutation } from "../../../services/tweetsService";
import { useAppSelector } from "../../../hooks/store";
import { useNavigate } from "react-router-dom";
import { elapsedTime } from "../../../util/time";
import Label from "../../core/text/Label";
import lightTheme from "../../../themes/lightTheme";

const UsernameLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
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

const TweetItem = ({ tweet }: { tweet: Tweet }) => {
  const [like] = useLikeTweetMutation();
  const [unlike] = useUnlikeTweetMutation();
  const navigate = useNavigate();
  const userId = useAppSelector(({ auth }) => auth.id);

  const likedByMe = userId ? tweet.likedBy.includes(userId) : false;

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

  const submissionTime = new Date(tweet.createdAt);

  return (
    <BorderedBox
      $gap="1em"
      $pad="l"
      $bg="white"
      $rounded
      $horizontal
      $minWidth="500px"
    >
      <RouterLink to={`/users/${tweet.author.id}`}>
        <ProfilePicture src={pictures.emptyProfilePicture} />
      </RouterLink>

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <RouterLink $bold to={`/users/${tweet.author.id}`}>
            {tweet.author.fullName || "Twittur User"}
          </RouterLink>

          <UsernameLink to={`/users/${tweet.author.id}`}>
            @{tweet.author.username}
          </UsernameLink>

          {"•"}

          <Label
            $size="extraSmall"
            $color={lightTheme.colors.grey2}
            title={submissionTime.toString()}
          >
            posted {elapsedTime(submissionTime.valueOf())}
          </Label>
        </Box>

        <RouterLink to={`/tweets/${tweet.id}`}>{tweet.content}</RouterLink>

        <Box $horizontal $gap="0.5em">
          <IconButton
            label={tweet.likes}
            icon={<LikeIcon $liked={likedByMe} />}
            onClick={likedByMe ? handleUnlike : handleLike}
          />

          <RouterLink to={`/tweets/${tweet.id}`}>
            <IconButton icon={<icons.RepliesIcon />} label={tweet.replyCount} />
          </RouterLink>

          <IconButton icon={<icons.RetweetIcon />} label={0} />
        </Box>
      </Box>
    </BorderedBox>
  );
};

export default TweetItem;
