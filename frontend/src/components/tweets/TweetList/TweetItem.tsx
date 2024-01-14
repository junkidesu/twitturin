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
import Card from "../../containers/Card";
import { RWebShare } from "react-web-share";

const UsernameLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FullNameLink = styled(RouterLink)`
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const TweetHeader = ({ tweet }: { tweet: Tweet }) => {
  const submissionTime = new Date(tweet.createdAt);

  return (
    <Box $horizontal $gap="0.5em">
      <FullNameLink $bold to={`/users/${tweet.author.id}`}>
        {tweet.author.fullName || "Twittur User"}
      </FullNameLink>

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

  return (
    <Box $horizontal>
      <Box $horizontal>
        <IconButton
          label={tweet.likes}
          icon={<LikeIcon $liked={likedByMe} />}
          onClick={likedByMe ? handleUnlike : handleLike}
        />

        <RouterLink to={`/tweets/${tweet.id}`}>
          <IconButton icon={<icons.RepliesIcon />} label={tweet.replyCount} />
        </RouterLink>
      </Box>

      <Box $horizontal>
        <IconButton icon={<icons.BookmarkIcon />} />

        <RWebShare
          data={{
            text: `Tweet by ${tweet.author.username}`,
            title: "Twittur",
            url: `https://twitturin.onrender.com/tweets/${tweet.id}`,
          }}
        >
          <IconButton icon={<icons.ShareIcon />} />
        </RWebShare>
      </Box>
    </Box>
  );
};

const ContentWrapper = styled(Box)`
  flex-grow: 1;
`;

const TweetItem = ({ tweet }: { tweet: Tweet }) => {
  const navigate = useNavigate();

  return (
    <Card $horizontal $gap="1em" id={tweet.id}>
      <ProfilePicture
        src={tweet.author.profilePicture || pictures.emptyProfilePicture}
        onClick={() => navigate(`/users/${tweet.author.id}`)}
      />

      <ContentWrapper $gap="1em">
        <TweetHeader tweet={tweet} />

        <RouterLink to={`/tweets/${tweet.id}`}>{tweet.content}</RouterLink>

        <TweetActions tweet={tweet} />
      </ContentWrapper>
    </Card>
  );
};

export default TweetItem;
