import styled from "styled-components";
import VerticalList from "../../lists/VerticalList";
import HorizontalList from "../../lists/HorizontalList";
import RouterLink from "../../core/RouterLink";
import emptyProfilePicture from "../../../assets/images/empty-profile-picture.png";
import emptyHeart from "../../../assets/icons/heart.svg";
import filledHeart from "../../../assets/icons/filledHeart.svg";
import repliesIcon from "../../../assets/icons/replies.svg";
import shareIcon from "../../../assets/icons/share.svg";
import IconButton from "../../core/IconButton";
import { Tweet } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";
import {
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} from "../../../services/tweetsService";

const Wrapper = styled(HorizontalList)`
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

const Body = styled(VerticalList)`
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

  const handleLike = async () => {
    if (!userId) {
      navigate("/login");
    } else {
      if (!likedByMe) await like(tweet.id);
      else
        await unlike({
          id: tweet.id,
          userId,
        });
    }
  };

  return (
    <Wrapper>
      <RouterLink to={`/users/${tweet.author.id}`}>
        <ProfilePicture src={emptyProfilePicture} />
      </RouterLink>

      <Body>
        <HorizontalList $center $gap="0.5em">
          <FullName to={`/users/${tweet.author.id}`}>
            {tweet.author.fullName || "Twittur User"}
          </FullName>

          <Username to={`/users/${tweet.author.id}`}>
            @{tweet.author.username}
          </Username>
        </HorizontalList>

        <Content>{tweet.content}</Content>

        <HorizontalList $gap="0.5em">
          {likedByMe ? (
            <IconButton
              icon={filledHeart}
              label={likeButtonLabel}
              onClick={handleLike}
            />
          ) : (
            <IconButton
              icon={emptyHeart}
              label={likeButtonLabel}
              onClick={handleLike}
            />
          )}
          <IconButton
            icon={repliesIcon}
            label={`${tweet.replyCount} ${
              tweet.replyCount === 1 ? "reply" : "replies"
            }`}
          />
          <IconButton icon={shareIcon} label="0 shares" />
        </HorizontalList>
      </Body>
    </Wrapper>
  );
};

export default TweetDetails;
