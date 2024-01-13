import { beforeEach, describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import TweetItem from "../src/components/tweets/TweetList/TweetItem";
import { Tweet } from "../src/types";
import React from "react";
import { initialTweets, renderWithProviders } from "../src/util/test-helper";

describe("<TweetItem />", () => {
  const tweet: Tweet = initialTweets[0];

  beforeEach(() => {
    renderWithProviders(<TweetItem tweet={tweet} />);
  });

  test("displays content properly", () => {
    const element = screen.getByText(tweet.content);

    expect(element).toBeDefined();
  });

  test("displays the correct likes count", () => {
    const element = screen.getByText(tweet.likes);

    expect(element).toBeDefined();
  });

  test("displays the correct replies count", () => {
    const element = screen.getByText(tweet.replyCount);

    expect(element).toBeDefined();
  });

  test("author username is displayed", () => {
    const element = screen.getByText(`@${tweet.author.username}`);

    expect(element).toBeDefined();
  });
});
