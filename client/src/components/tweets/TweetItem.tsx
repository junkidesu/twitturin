import styled from "styled-components";
import { Tweet } from "../../types";
import emptyProfilePicture from "../../assets/images/empty-profile-picture.png";
import emptyHeart from "../../assets/icons/heart.svg";
import repliesIcon from "../../assets/icons/replies.svg";
import shareIcon from "../../assets/icons/share.svg";
import VerticalContainer from "../containers/VerticalContainer";
import HorizontalContainer from "../containers/HorizontalContainer";
import IconButton from "../core/IconButton";
import Link from "../core/Link";

const TweetContainer = styled(HorizontalContainer)`
  display: flex;
  background-color: white;
  border: 2px solid #aaaaaa;
  border-radius: 5px;
  padding: 1em;
`;

const FullName = styled(Link)`
  font-weight: bold;
`;

const Username = styled(Link)`
  color: #555555;
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const TweetBody = styled(VerticalContainer)`
  font-size: 1em;
  padding-left: 1em;
  gap: 1em;
`;

const TweetItem = ({ tweet }: { tweet: Tweet }) => (
  <TweetContainer>
    <Link>
      <ProfilePicture src={emptyProfilePicture} />
    </Link>

    <TweetBody>
      <HorizontalContainer $center>
        <FullName>{tweet.author.fullName}</FullName>

        <Username>@{tweet.author.username}</Username>
      </HorizontalContainer>

      <div>{tweet.content}</div>

      <HorizontalContainer gap="0.5em">
        <IconButton icon={emptyHeart} label={tweet.likes} />

        <IconButton icon={repliesIcon} label={0} />

        <IconButton icon={shareIcon} label={0} />
      </HorizontalContainer>
    </TweetBody>
  </TweetContainer>
);

export default TweetItem;