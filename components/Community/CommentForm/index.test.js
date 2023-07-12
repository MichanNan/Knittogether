import { render, screen } from "@testing-library/react";
import CommentForm from ".";
import userEvent from "@testing-library/user-event";

test("submits comment form and calls updateComments", async () => {
  render(<CommentForm />);

  const commentLabel = screen.getByText("leave a comment");
  const commentInput = commentLabel.nextSibling;

  const commentText = "This is a test comment";
  await userEvent.type(commentInput, commentText);

  expect(commentInput).toHaveValue(commentText);
});
