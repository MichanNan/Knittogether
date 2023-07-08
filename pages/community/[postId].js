import { useRouter } from "next/router";
import useSWR from "swr";
import Header from "../../components/Common/Heading";
import { Main, ImageWrapper, HeavyFont } from "../../styles";
import Image from "next/image";
import Navigation from "../../components/Common/Navigation";
import CommentForm from "../../components/Community/CommentForm";
import { useSession } from "next-auth/react";
import BackIcon from "../../components/Common/BackIcon/BackIcon";

export default function PostPage() {
  const router = useRouter();

  //get user id
  const session = useSession();
  const userId = session?.data?.user?.id;

  //get the post id
  const { postId } = router.query;

  //get single post by the post id
  const { data: post } = useSWR(`/api/post?id=${postId}`);

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
      <Header>
        <BackIcon handleGoBack={() => router.push("/community")} />
        {post[0].name}
      </Header>
      <br></br>
      <br></br>
      <br></br>
      <ImageWrapper radius="2rem">
        <Image
          src={post[0].image}
          alt={post[0].name}
          width={200}
          height="0"
          style={{ width: "100", height: "auto" }}
        />
      </ImageWrapper>
      <HeavyFont>Knitter: {`${post[0].user[0].name}`}</HeavyFont>
      {comments.map((comment) => (
        <li key={comment._id}>
          {userId === comment.user[0]._id && (
            <button onClick={() => handleDeleteComment(comment._id)}>x</button>
          )}
          <span>{`${comment.user[0].name}:`}</span>
          <span>{comment.text}</span>
        </li>
      ))}
      <CommentForm postId={postId} updateComments={updateComments} />
      <Navigation />
    </Main>
  );
}
