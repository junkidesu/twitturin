import useField from "../hooks/useField";
import { useSearchQuery } from "../services/searchService";
import Box from "./containers/Box";
import Input from "./core/inputs/Input";
import Heading from "./core/text/Heading";
import TweetList from "./tweets/TweetList";
import LoadingTweetList from "./util/LoadingTweetList";
import ReplyList from "./replies/ReplyList";
import LoadingReplyList from "./util/LoadingReplyList";
import UserItem from "./users/UserItem";
import LoadingUserItem from "./util/LoadingUserItem";
import Empty from "./util/Empty";

const Header = () => {
  return (
    <Box $pad="l" $bg="white">
      <Heading $level={2}>Explore</Heading>
    </Box>
  );
};

type Props = {
  keyword: {
    value: string;
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => void;
    type?: string;
    placeholder?: string;
  };
};

const SearchField = ({ keyword }: Props) => {
  return (
    <Box $bg="white" $pad="l">
      <Input {...keyword} />
    </Box>
  );
};

const SearchLists = ({ keyword }: Props) => {
  const {
    data: results,
    isLoading,
    isFetching,
  } = useSearchQuery(keyword.value, {
    skip: !keyword.value,
  });

  if (isLoading || isFetching)
    return (
      <Box $gap="0.1em">
        <Box $pad="l" $bg="white">
          <Heading $level={4}>Tweets</Heading>
        </Box>

        <LoadingTweetList />

        <Box $pad="l" $bg="white">
          <Heading $level={4}>Users</Heading>
        </Box>

        <>
          <LoadingUserItem />
          <LoadingUserItem />
          <LoadingUserItem />
        </>

        <Box $pad="l" $bg="white">
          <Heading $level={4}>Replies</Heading>
        </Box>

        <LoadingReplyList />
      </Box>
    );

  return (
    <Box $gap="0.1em">
      <Box $pad="l" $bg="white">
        <Heading $level={4}>Tweets</Heading>
      </Box>

      {keyword.value && <TweetList tweets={results?.tweets || []} />}

      <Box $pad="l" $bg="white">
        <Heading $level={4}>Users</Heading>
      </Box>

      {keyword.value &&
        (results?.users.length === 0 ? (
          <Empty />
        ) : (
          <>
            {(results?.users || []).map((u) => (
              <UserItem key={u.id} user={u} />
            ))}
          </>
        ))}

      <Box $pad="l" $bg="white">
        <Heading $level={4}>Replies</Heading>
      </Box>

      {keyword.value && <ReplyList replies={results?.replies || []} />}
    </Box>
  );
};

const ExplorePage = () => {
  const [, keyword] = useField("text", "Search");

  return (
    <Box $width="500px" $gap="0.1em">
      <Header />

      <SearchField keyword={keyword} />

      <SearchLists keyword={keyword} />
    </Box>
  );
};

export default ExplorePage;
