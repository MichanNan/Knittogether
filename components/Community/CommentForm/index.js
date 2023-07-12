import { useState } from "react";
import styled from "styled-components";
import StyledButton from "../../Common/StyledButton";
export default function CommentForm({ postId, updateComments }) {
  const [comment, setComment] = useState("");

  async function handleCommentSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`/api/comment`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, postId }),
    });
    if (response.ok) {
      setComment("");
      updateComments();
    }
  }
  return (
    <Form onSubmit={handleCommentSubmit}>
      <label htmlFor="text">leave a comment</label>
      <TextArea
        maxLength="100"
        name="text"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></TextArea>
      <StyledButton width="3rem" height="2rem">
        send
      </StyledButton>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;
const TextArea = styled.textarea`
  height: 5rem;
  width: 18rem;
  border-radius: 0.5rem;
  background-color: var(--color-grey);
  border: none;
  padding: 0.3rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;
