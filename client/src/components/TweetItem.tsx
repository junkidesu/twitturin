import styled from "styled-components";
import { Tweet } from "../types";
import emptyProfilePicture from "../assets/empty-profile-picture.png";

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
  margin-bottom: 0.5em;
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

const TweetBody = styled.div`
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

      {tweet.content}
    </TweetBody>
  </TweetContainer>
);

export default TweetItem;
