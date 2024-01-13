import { initialUsers, renderWithProviders } from "../src/util/test-helper";
import { describe, test, expect } from "vitest";
import UserItem from "../src/components/users/UserItem";
import React from "react";
import { screen } from "@testing-library/react";

describe("<UserItem />", () => {
  test("displays username", () => {
    const user = initialUsers[0];

    renderWithProviders(<UserItem user={user} />);

    const element = screen.getByText(`@${user.username}`);

    expect(element).toBeDefined();
  });

  test("displays full name if present", () => {
    const user = initialUsers[0];

    renderWithProviders(<UserItem user={user} />);

    const element = screen.getByText(user.fullName!);

    expect(element).toBeDefined();
  });

  test("displays `TwitturIn User` if full name missing", () => {
    const user = initialUsers[1];

    renderWithProviders(<UserItem user={user} />);

    const element = screen.getByText("TwitturIn User");

    expect(element).toBeDefined();
  });
});
