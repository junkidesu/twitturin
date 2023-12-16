import styled from "styled-components";
import { Tweet } from "../../../types";
import { icons, pictures } from "../../../assets";
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
  cursor: pointer;
`;

const LikeIcon = styled(icons.HeartIcon)<{ $liked: boolean }>`
  color: ${({ $liked, theme }) => ($liked ? theme.colors.primary : "inherit")};
  fill: ${({ $liked, theme }) => ($liked ? theme.colors.primary : "none")};
`;

const TweetInfo = ({ tweet }: { tweet: Tweet }) => {
  const submissionTime = new Date(tweet.createdAt);
  const editTime = new Date(tweet.updatedAt);

  const edited = editTime.valueOf() - submissionTime.valueOf() > 0;

  return (
    <Box $horizontal $gap="0.5em">
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
        {elapsedTime(submissionTime.valueOf())}
      </Label>

      <Label
        $size="extraSmall"
        $color={lightTheme.colors.grey2}
        title={`last edited at ${editTime.toString()}`}
      >
        {edited && " (edited)"}
      </Label>
    </Box>
  );
};

const TweetActions = ({ tweet }: { tweet: Tweet }) => {
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
      await unlike(tweet.id);
    }
  };

  return (
    <Box $horizontal $width="100%">
      <IconButton
        label={tweet.likes}
        icon={<LikeIcon $liked={likedByMe} />}
        onClick={likedByMe ? handleUnlike : handleLike}
      />

      <RouterLink to={`/tweets/${tweet.id}`}>
        <IconButton icon={<icons.RepliesIcon />} label={tweet.replyCount} />
      </RouterLink>

      <IconButton icon={<icons.RetweetIcon />} label={0} />

      <IconButton icon={<icons.BookmarkIcon />} label={0} />

      <IconButton icon={<icons.ShareIcon />} label={0} />
    </Box>
  );
};

const TweetItem = ({ tweet }: { tweet: Tweet }) => {
  const navigate = useNavigate();

  return (
    <Box $horizontal $pad="l" $gap="1em" $bg="white" $width="500px">
      <ProfilePicture
        src={pictures.emptyProfilePicture}
        onClick={() => navigate(`/tweets/${tweet.id}`)}
      />

      <Box $gap="1em">
        <TweetInfo tweet={tweet} />

        <RouterLink to={`/tweets/${tweet.id}`}>{tweet.content}</RouterLink>

        <TweetActions tweet={tweet} />
      </Box>
    </Box>
  );
};

export default TweetItem;
