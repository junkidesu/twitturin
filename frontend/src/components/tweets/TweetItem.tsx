import styled from "styled-components";
import { Tweet } from "../../types";
import { icons, pictures } from "../../assets";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import IconButton from "../core/IconButton";
import RouterLink from "../core/RouterLink";
import { useLikeTweetMutation } from "../../services/tweetsService";
import { useUnlikeTweetMutation } from "../../services/tweetsService";
import { useAppSelector } from "../../hooks/store";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(HStack)`
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-radius: 5px;
  padding: 1em;
  min-width: 500px;
`;

const FullName = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey1};
  font-weight: bold;
`;

const Username = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const Body = styled(VStack)`
  padding-left: 1em;
  gap: 1em;
`;

const TweetItem = ({ tweet }: { tweet: Tweet }) => {
  const [like] = useLikeTweetMutation();
  const [unlike] = useUnlikeTweetMutation();
  const navigate = useNavigate();
  const userId = useAppSelector(({ auth }) => auth.id);

  const likedByMe = userId && tweet.likedBy.map((u) => u.id).includes(userId);

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
    <Wrapper>
      <RouterLink to={`/users/${tweet.author.id}`}>
        <ProfilePicture src={pictures.emptyProfilePicture} />
      </RouterLink>

      <Body>
        <HStack $center $gap="0.5em">
          <FullName to={`/users/${tweet.author.id}`}>
            {tweet.author.fullName || "Twittur User"}
          </FullName>

          <Username to={`/users/${tweet.author.id}`}>
            @{tweet.author.username}
          </Username>
        </HStack>

        <RouterLink to={`/tweets/${tweet.id}`}>{tweet.content}</RouterLink>

        <HStack $gap="0.5em">
          <IconButton
            icon={likedByMe ? icons.filledHeartIcon : icons.emptyHeartIcon}
            label={tweet.likes}
            onClick={likedByMe ? handleUnlike : handleLike}
          />

          <RouterLink to={`/tweets/${tweet.id}`}>
            <IconButton icon={icons.repliesIcon} label={tweet.replyCount} />
          </RouterLink>

          <IconButton icon={icons.shareIcon} label={0} />
        </HStack>
      </Body>
    </Wrapper>
  );
};

export default TweetItem;
