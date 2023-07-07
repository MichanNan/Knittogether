import Image from "next/image";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { HeavyFont, LightFont } from "../../../styles";

import ReactTimeAgo from "react-time-ago";

import useSWR from "swr";
import css from "styled-jsx/css";
import { useEffect } from "react";
import { Light } from "@mui/icons-material";

export default function PostContent({
  name,
  image,
  user,
  createdAt,
  likesCount,
  _id: postId,
}) {
  const date = new Date(createdAt);
  const timestamp = date.getTime();

  const { data: likes, mutate: updateLikes } = useSWR("/api/like");
  const { mutate } = useSWR("/api/post");

  useEffect(() => {
    mutate();
  }, [likesCount, toggleLike]);

  async function toggleLike() {
    const response = await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    updateLikes();
  }

  const likedPost = likes?.map((post) => {
    return post.post[0];
  });

  return (
    <PostItem>
      <TitleContainer>
        <PostTitle>{name}</PostTitle>
        <Time>
          <ReactTimeAgo date={timestamp} timeStyle={"twitter"} /> ago
        </Time>
      </TitleContainer>
      <Image
        src={image}
        alt={name}
        width={300}
        height="0"
        style={{ width: "100%", height: "auto" }}
      ></Image>
      <PostInfo>
        <HeavyFont>{`Knitter: ${user[0].name}`}</HeavyFont>
        <Likes onClick={toggleLike} likedPost={likedPost} postId={postId}>
          <FontAwesomeIcon icon={faHeart} />
          <p>{likesCount}</p>
        </Likes>
      </PostInfo>
    </PostItem>
  );
}

const PostItem = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  position: relative;
`;
const Time = styled(LightFont)`
  position: absolute;
  top: 0.4rem;
  right: 0;
`;
const PostTitle = styled(LightFont)`
  font-size: 1.5rem;
  text-align: center;

  margin-bottom: 0.3rem;
`;
const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
`;

const Likes = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin-left: 3rem;
  ${({ likedPost, postId }) => {
    if (!likedPost) {
      return css`
        color: var(--color-black);
      `;
    } else {
      if (likedPost.includes(postId)) {
        return css`
          color: var(--color-orange);
        `;
      } else {
        return css`
          color: var(--color-black);
        `;
      }
    }
  }}
`;
