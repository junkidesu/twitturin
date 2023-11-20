import styled from "styled-components";
import VStack from "../../containers/VStack";
import HStack from "../../containers/HStack";
import RouterLink from "../../core/RouterLink";
import { icons, pictures } from "../../../assets";
import IconButton from "../../core/IconButton";
import { Tweet } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";
import {
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} from "../../../services/tweetsService";

const Wrapper = styled(HStack)`
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 1em;
  min-width: 600px;
`;

const FullName = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey1};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: bold;
`;

const Username = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const Content = styled.p`
  color: ${(props) => props.theme.colors.grey1};
  margin: none;
  font-size: ${(props) => props.theme.fontSizes.small};
`;

const ProfilePicture = styled.img`
  width: 3em;
  height: 3em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const Body = styled(VStack)`
  padding-left: 1em;
  gap: 1em;
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

        <Content>{tweet.content}</Content>

        <HStack $gap="0.5em">
          <IconButton
            icon={likedByMe ? icons.filledHeartIcon : icons.emptyHeartIcon}
            label={likeButtonLabel}
            onClick={likedByMe ? handleUnlike : handleLike}
          />

          <IconButton icon={icons.repliesIcon} label={replyButtonLabel} />
          <IconButton icon={icons.shareIcon} label="0 shares" />
        </HStack>
      </Body>
    </Wrapper>
  );
};

export default TweetDetails;
