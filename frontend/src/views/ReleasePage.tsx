import styled from "styled-components";
import Card from "../components/containers/Card";
import PageHeading from "../components/util/PageHeading";
import Markdown from "react-markdown";
import { useGetLatestReleaseQuery } from "../services/githubService";
import ErrorPage from "./util/ErrorPage";
import Box from "../components/containers/Box";
import Button from "../components/core/buttons/Button";
import { ReleaseInformation } from "../types";
import Label from "../components/core/text/Label";
import { elapsedTime } from "../util/time";
import Accordion from "../components/containers/Accordion";

const Wrapper = styled(Box)`
  width: 500px;
`;

const ReleaseNotes = ({ notes }: { notes?: string }) => {
  return (
    <Card>
      <Accordion heading="Release Notes">
        <Markdown>{notes || "No release notes were provided."}</Markdown>
      </Accordion>
    </Card>
  );
};

const DownloadButton = styled(Button).attrs({ as: "a" })`
  box-sizing: border-box;
  text-decoration: none;
  width: 100%;
`;

const Download = ({ release }: { release: ReleaseInformation }) => {
  const createdAt = new Date(release.assets[0].created_at);

  console.log(elapsedTime(createdAt.valueOf()));

  return (
    <Card $gap="1em">
      <DownloadButton
        as="a"
        href={release!.assets[0].browser_download_url}
        $width="100%"
      >
        Download Twitturin on Android
      </DownloadButton>
      <Label>Number of downloads: {release.assets[0].download_count}</Label>
      <Label>Time: {createdAt.toString()}</Label>
    </Card>
  );
};

const ReleasePage = () => {
  const {
    data: release,
    isLoading,
    isSuccess,
    isError,
  } = useGetLatestReleaseQuery(undefined);

  if (isLoading)
    return (
      <Wrapper>
        <Card>Loading...</Card>
      </Wrapper>
    );

  if (isError) return <ErrorPage />;

  return (
    <Wrapper $gap="0.1em">
      <PageHeading label="Latest Release" />

      {isSuccess && (
        <PageHeading level={4} label={`Tag Name: ${release!.tag_name}`} />
      )}

      <Download release={release!} />

      {isSuccess && <ReleaseNotes notes={release!.body} />}
    </Wrapper>
  );
};

export default ReleasePage;
