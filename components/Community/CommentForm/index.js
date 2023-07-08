import { useState } from "react";

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
    <form onSubmit={handleCommentSubmit}>
      <label htmlFor="text">leave a comment</label>
      <input
        name="text"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></input>
      <button>send</button>
    </form>
  );
}
