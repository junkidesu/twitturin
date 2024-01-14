import styled from "styled-components";
import { icons, pictures } from "../../../assets";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUserTweetsQuery,
  useGetLikedTweetsQuery,
  useGetUserRepliesQuery,
} from "../../../services/usersService";
import LoadingUserProfile from "../../util/LoadingUserProfile";
import Box from "../../../components/containers/Box";
import Label from "../../../components/core/text/Label";
import Heading from "../../../components/core/text/Heading";
import TweetList from "../../../components/tweets/TweetList";
import RouterLink from "../../../components/core/RouterLink";
import FollowButton from "../../../components/users/FollowButton";
import { User } from "../../../types";
import PageNotFound from "../../util/PageNotFound";
import { useState } from "react";
import ReplyList from "../../../components/replies/ReplyList";
import LoadingReplyList from "../../../components/util/LoadingReplyList";
import LoadingTweetList from "../../../components/util/LoadingTweetList";
import Empty from "../../../components/util/Empty";
import FlatButton from "../../../components/core/buttons/FlatButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { removeCredentials } from "../../../reducers/authReducer";
import storageService from "../../../services/storageService";
import ErrorPage from "../../util/ErrorPage";
import Card from "../../../components/containers/Card";
import useLoadingStripe from "../../../hooks/useLoadingStripe";
import useAlert from "../../../hooks/useAlert";
import useAuthentication from "../../../hooks/useAuthentication";

const Banner = styled.div`
  position: relative;
  height: 170px;
  background: linear-gradient(45deg, #555555, #333333);
`;

const ProfilePicture = styled.img`
  position: absolute;
  width: 5em;
  height: 5em;
  box-sizing: border-box;
  overflow: hidden;
  border: 0.3em solid white;
  border-radius: 100em;
  bottom: -2.5em;
  left: 1em;
  overflow: hidden;
`;

const Username = styled(Label)`
  color: ${(props) => props.theme.colors.grey2};
`;

const ProfileHeader = ({ user }: { user: User }) => {
  return (
    <Box $bg="white" $gap="1.5em" $hide>
      <Banner>
        <ProfilePicture
          src={user.profilePicture || pictures.emptyProfilePicture}
        />
      </Banner>

      <Card $gap="1em">
        <Box>
          <Heading $level={3}>{user.fullName || "Twittur User"}</Heading>
          <Username>@{user.username}</Username>
        </Box>

        <Label>
          {user.bio || `This user does not appear to have any biography.`}
        </Label>
      </Card>
    </Box>
  );
};

const AdditionalInfoWrapper = styled(Box)`
  color: ${({ theme }) => theme.colors.grey2};
`;

const AdditionalInfo = ({ user }: { user: User }) => {
  return (
    <Card $gap="1em">
      <AdditionalInfoWrapper $horizontal $center $gap="0.5em">
        {user.kind === "teacher" ? <icons.AwardIcon /> : <icons.InfoIcon />}

        {user.kind === "teacher" ? (
          <Label $size="extraSmall">TTPU Teacher ({user.subject})</Label>
        ) : (
          <Label $size="extraSmall">
            TTPU Student from {user.major} ({user.studentId})
          </Label>
        )}
      </AdditionalInfoWrapper>

      {user.country && (
        <AdditionalInfoWrapper $horizontal $center $gap="0.5em">
          <icons.MapPinIcon />
          <Label $size="extraSmall">{user.country}</Label>
        </AdditionalInfoWrapper>
      )}

      {user.birthday && (
        <AdditionalInfoWrapper $horizontal $center $gap="0.5em">
          <icons.CalendarIcon />
          <Label $size="extraSmall">
            {new Date(user.birthday).toDateString()} ({user.age!} y.o.)
          </Label>
        </AdditionalInfoWrapper>
      )}
    </Card>
  );
};

const FollowWrapper = styled(Box)`
  justify-content: space-between;
`;

const FollowPanel = ({ user, id }: { user: User; id: string }) => {
  return (
    <FollowWrapper $pad="l" $bg="white" $horizontal $center>
      <Box $horizontal $gap="1.5em">
        <RouterLink to={`/users/${id}/followers`} $size="small">
          {user.followersCount} followers
        </RouterLink>

        <RouterLink to={`/users/${id}/following`} $size="small">
          {user.followingCount} following
        </RouterLink>
      </Box>

      <FollowButton user={user} />
    </FollowWrapper>
  );
};

const SectionButton = styled.button<{ $active: boolean }>`
  width: 100%;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.grey2};
  padding: 0.7em;
  background-color: white;
  font-size: ${(props) => props.theme.fontSizes.small};
  /* font-weight: ${({ $active }) => ($active ? "bold" : "normal")}; */
  border: none;
  transition: 0.2s;

  @media (min-width: 651px) {
    &:hover {
      background-color: ${(props) => props.theme.colors.grey4};
      transition: 0.2s;
    }
  }
`;

const UserTweets = ({ user }: { user: User }) => {
  const {
    data: tweets,
    isLoading,
    isFetching,
    isError,
  } = useGetUserTweetsQuery(user.id);

  if (isLoading || isFetching) return <LoadingTweetList />;

  if (isError) return <ErrorPage />;

  return <TweetList tweets={tweets!} />;
};

const UserReplies = ({ user }: { user: User }) => {
  const {
    data: replies,
    isLoading,
    isFetching,
    isError,
  } = useGetUserRepliesQuery(user.id);

  if (isLoading || isFetching) return <LoadingReplyList />;

  if (isError) return <ErrorPage />;

  return <ReplyList replies={replies!} />;
};

const LikedTweets = ({ user }: { user: User }) => {
  const {
    data: tweets,
    isLoading,
    isFetching,
    isError,
  } = useGetLikedTweetsQuery(user.id);

  if (isLoading || isFetching) return <LoadingTweetList />;

  if (isError) return <ErrorPage />;

  if (!tweets) return <div>Some error occurred!</div>;

  if (tweets.length === 0) return <Empty />;

  return <TweetList tweets={tweets} />;
};

const NavButton = styled(FlatButton)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 0.9em 1em;
`;

const DeleteButton = styled(NavButton)`
  color: #ff0037;

  &:hover {
    color: #ff0037;
  }
`;

const Settings = ({ user }: { user: User }) => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  const { errorAlert } = useAlert();
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const dispatch = useAppDispatch();
  const [deleteUser] = useDeleteUserMutation();

  const handleSignOut = () => {
    logout();
  };

  const handleDeleteProfile = async () => {
    if (confirm("Are you sure you want to delete your profile?")) {
      showLoadingStripe();

      try {
        await deleteUser(user.id).unwrap();
        dispatch(removeCredentials());
        storageService.removeAuthUser();
        navigate("/home");
      } catch (error) {
        errorAlert(error);
      }

      hideLoadingStripe();
    }
  };

  return (
    <Box $gap="0.1em">
      <NavButton
        label="Edit Profile"
        icon={<icons.EditIcon />}
        onClick={() => navigate("/edit-profile")}
      />
      <DeleteButton
        label="Delete Profile"
        icon={<icons.TrashIcon />}
        onClick={handleDeleteProfile}
      />
      <NavButton
        label="Log out"
        icon={<icons.LogOutIcon />}
        onClick={handleSignOut}
      />
    </Box>
  );
};

type Section = "tweets" | "replies" | "likes" | "settings";
const Sections = ({ user }: { user: User }) => {
  const id = useParams().id;
  const myId = useAppSelector(({ auth }) => auth.id);
  const [section, setSection] = useState<Section>("tweets");

  return (
    <Box $gap="0.1em">
      <Box $bg="white" $horizontal>
        <SectionButton
          $active={section === "tweets"}
          onClick={() => setSection("tweets")}
        >
          Tweets
        </SectionButton>
        <SectionButton
          $active={section === "replies"}
          onClick={() => setSection("replies")}
        >
          Replies
        </SectionButton>
        <SectionButton
          $active={section === "likes"}
          onClick={() => setSection("likes")}
        >
          Likes
        </SectionButton>
        {id === myId && (
          <SectionButton
            $active={section === "settings"}
            onClick={() => setSection("settings")}
          >
            Settings
          </SectionButton>
        )}
      </Box>

      {section === "tweets" && <UserTweets user={user} />}
      {section === "replies" && <UserReplies user={user} />}
      {section === "likes" && <LikedTweets user={user} />}
      {section === "settings" && id === myId && <Settings user={user} />}
    </Box>
  );
};

const UserPage = () => {
  const id = useParams().id;

  const { data: user, isLoading, isFetching, isError } = useGetUserQuery(id!);

  if (isLoading || isFetching) return <LoadingUserProfile />;

  if (!user) return <ErrorPage />;

  if (isError) return <PageNotFound />;

  return (
    <Box $gap="0.1em" $width="500px">
      <ProfileHeader user={user} />

      <AdditionalInfo user={user} />

      <FollowPanel id={id!} user={user} />

      <Sections user={user} />
    </Box>
  );
};

export default UserPage;
