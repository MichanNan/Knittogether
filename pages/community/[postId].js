import Image from "next/image";
import Header from "../../components/Common/Heading";
import Navigation from "../../components/Common/Navigation";
import CommentForm from "../../components/Community/CommentForm";
import BackIcon from "../../components/Common/BackIcon/BackIcon";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import {
  Main,
  ImageWrapper,
  HeavyFont,
  LightFont,
  DeleteButton,
} from "../../styles";
import styled from "styled-components";

export default function PostPage() {
  const router = useRouter();

  //get user id
  const session = useSession();
  const userId = session?.data?.user?.id;

  //get the post id
  const { postId } = router.query;

  //get single post by the post id
  const { data: post } = useSWR(`/api/${postId}`);

  //get all comments of this post
  const { data: comments, mutate: updateComments } = useSWR(
    `/api/comment?postId=${postId}`
  );

  async function handleDeleteComment(id) {
    const response = await fetch("/api/comment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      updateComments();
    }
  }

  if (!comments || !post) {
    return;
  }

  return (
    <Main>
      <Header bottom="5rem">
        <BackIcon handleGoBack={() => router.push("/community")} />
        {post.name}
      </Header>

      <ImageWrapper radius="2rem" top="4rem">
        <Image
          src={post.image}
          alt={post.name}
          width={200}
          height="0"
          style={{ width: "100", height: "auto" }}
        />
      </ImageWrapper>
      <HeavyFont>Knitter: {`${post?.user[0].name}`}</HeavyFont>
      <CommentForm postId={postId} updateComments={updateComments} />
      <CommentContainer>
        {comments.map((comment) => (
          <CommentItem key={comment._id}>
            <HeavyFont>{`${comment.user[0].name}:`}</HeavyFont>
            <LightFont>{comment.text}</LightFont>
            {userId === comment.user[0]._id && (
              <DeleteButton
                marginLeft="auto"
                onClick={() => handleDeleteComment(comment._id)}
              >
                x
              </DeleteButton>
            )}
          </CommentItem>
        ))}
      </CommentContainer>
      <Navigation />
    </Main>
  );
}

const CommentContainer = styled.div`
  margin: 2rem auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: start;
`;
const CommentItem = styled.li`
  width: 100%;
  display: flex;
  gap: 1rem;
`;
