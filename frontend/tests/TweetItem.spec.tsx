import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import TweetItem from "../src/components/tweets/TweetList/TweetItem";
import { Tweet } from "../src/types";
import React from "react";
import { initialTweets, renderWithProviders } from "../src/util/test-helper";

describe("<TweetItem />", () => {
  test("displays content properly", () => {
    const tweet: Tweet = initialTweets[0];

    renderWithProviders(<TweetItem tweet={tweet} />);

    const element = screen.getByText(tweet.content);

    expect(element).toBeDefined();
  });

  test("displays the correct likes count", () => {
    const tweet: Tweet = initialTweets[0];

    renderWithProviders(<TweetItem tweet={tweet} />);

    const element = screen.getByText(tweet.likes);

    expect(element).toBeDefined();
  });

  test("displays the correct replies count", () => {
    const tweet: Tweet = initialTweets[0];

    renderWithProviders(<TweetItem tweet={tweet} />);

    const element = screen.getByText(tweet.replyCount);

    expect(element).toBeDefined();
  });
});
