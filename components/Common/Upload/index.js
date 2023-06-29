import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ColoredFont, HeavyFont } from "../../../styles";

export default function Upload({
  setYarnImageUrl,
  isYarnEdit,
  editedYarnStock,
  setProjectImageUrl,
  isProjectEdit,
  existedProject,
}) {
  let initImage = "";

  if (setYarnImageUrl) {
    if (isYarnEdit) {
      initImage = editedYarnStock.image;
    } else {
      initImage = "/yarn.jpeg";
    }
  }

  if (setProjectImageUrl) {
    if (isProjectEdit) {
      initImage = existedProject.image;
    } else {
      initImage = "/knitting.jpeg";
    }
  }

  useEffect(() => {
    if (setYarnImageUrl) {
      setYarnImageUrl("/yarn.jpeg");
    }
    if (setProjectImageUrl) {
      setProjectImageUrl("/knitting.jpeg");
    }
  }, []);

  const [file, setFile] = useState(initImage);
  async function uploading(data) {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dw4kyffua/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const resj = await res.json();

    return resj.url;
  }
  async function handleChange(e) {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "project-image");
    data.append("cloud_name", "dw4kyffua");

    const url = await uploading(data);

    setFile(url);
    if (setProjectImageUrl) {
      setProjectImageUrl(url);
    }

    if (setYarnImageUrl) {
      setYarnImageUrl(url);
    }
  }

  return (
    <UploadedFile className="App">
      <Wrapper>
        <HeavyFont>
          <ColoredFont>Add Image:</ColoredFont>
        </HeavyFont>
        <Label htmlFor="file">Click here to Upload </Label>
        <Input
          id="file"
          name="file"
          width="20rem"
          height="2rem"
          type="file"
          onChange={handleChange}
        />
      </Wrapper>
      {file && (
        <Image src={file} alt="project-image" width={200} height={150} />
      )}
    </UploadedFile>
  );
}
const UploadedFile = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const Label = styled.label`
  width: 9rem;
  height: 2rem;
  /* background-color: #f5f5f5; */
  /* border-radius: 0.5rem; */
  line-height: 2rem;
  text-align: center;
  margin: 0 auto;
  /* border: solid 0.1rem #e07008; */

  box-shadow: 0.1rem 0.1rem 0.3rem #cccccc;
  font-weight: 100;
`;
const Input = styled.input`
  width: 11rem;
  height: 2rem;
  border: none;
  display: none;
`;
