import styled from "styled-components";
import { Tweet } from "../types";
import emptyProfilePicture from "../assets/empty-profile-picture.png";
import emptyHeart from "../assets/heart.svg";
import repliesIcon from "../assets/replies.svg";
import shareIcon from "../assets/share.svg";

const Icon = styled.img`
  width: 1.2em;
  height: 1.2em;
`;

const TweetContainer = styled.div`
  display: flex;
  background-color: white;
  border: 2px solid #aaaaaa;
  border-radius: 5px;
  padding: 1em;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const FullName = styled.div`
  font-weight: bold;
`;

const Username = styled.div`
  color: #555555;
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const TweetButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const TweetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: transparent;
  border: none;
  color: #555555;
`;

const TweetBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-size: 1em;
  padding-left: 1em;
`;

const TweetItem = ({ tweet }: { tweet: Tweet }) => (
  <TweetContainer>
    <ProfilePicture src={emptyProfilePicture} />

    <TweetBody>
      <AuthorInfo>
        <FullName>{tweet.author.fullName}</FullName>

        <Username>@{tweet.author.username}</Username>
      </AuthorInfo>

      <div>{tweet.content}</div>

      <TweetButtons>
        <TweetButton>
          <Icon src={emptyHeart} />
          <span>{tweet.likes}</span>
        </TweetButton>

        <TweetButton>
          <Icon src={shareIcon} />
          <span>0</span>
        </TweetButton>

        <TweetButton>
          <Icon src={repliesIcon} />
          <span>0</span>
        </TweetButton>
      </TweetButtons>
    </TweetBody>
  </TweetContainer>
);

export default TweetItem;
