import useSWR from "swr";
import { Main } from "../../styles";
import Header from "../../components/Common/Heading";
import styled from "styled-components";
import PostContent from "../../components/Community/PostContent";
import Navigation from "../../components/Common/Navigation";

export default function Community() {
  const { data: posts, mutate } = useSWR("/api/post");
  if (!posts) {
    return;
  }
  console.log(posts);
  return (
    <Main>
      <Header>Community</Header>
      <PostContainer>
        {posts.map((post) => {
          return <PostContent key={post._id} {...post} />;
        })}
      </PostContainer>
      <Navigation />
    </Main>
  );
}
const PostContainer = styled.div`
  margin-top: 4rem;
`;
