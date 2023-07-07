import Image from "next/image";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { HeavyFont, LightFont } from "../../../styles";

import ReactTimeAgo from "react-time-ago";

export default function PostContent({ name, image, user, createdAt }) {
  const date = new Date(createdAt);
  const timestamp = date.getTime();
  return (
    <PostItem>
      <PostTitle>{name}</PostTitle>

      <Image
        src={image}
        alt={name}
        width={300}
        height="0"
        style={{ width: "100%", height: "auto" }}
      ></Image>
      <PostInfo>
        <HeavyFont>{`Knitter: ${user[0].name}`}</HeavyFont>
        <Likes>
          <FontAwesomeIcon icon={faHeart} />
        </Likes>
        <LightFont>
          <ReactTimeAgo date={timestamp} timeStyle={"twitter"} /> ago
        </LightFont>
      </PostInfo>
    </PostItem>
  );
}

const PostItem = styled.div`
  width: 80%;
  margin: 0 auto;
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
  margin-left: 5rem;
  color: var(--color-orange);
`;
