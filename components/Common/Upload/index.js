import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ColoredFont, HeavyFont } from "../../../styles";

export default function Upload({
  setYarnImageUrl,
  isYarnEdit,
  editedYarnStock,
  projectImageUrl,
  setProjectImageUrl,
  isProjectEdit,
  existedProject,
  projectImageLoading,
  setProjectImageLoading,
  yarnImageLoading,
  setYarnImageLoading,
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
      setYarnImageUrl(initImage);
    }
    if (setProjectImageUrl) {
      setProjectImageUrl(initImage);
    }
  }, []);

  const [file, setFile] = useState(initImage);
  async function uploading(data) {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    );
    const resj = await res.json();

    return resj.url;
  }
  async function handleChange(e) {
    projectImageUrl ? setProjectImageLoading(true) : setYarnImageLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "project-image");
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

    const url = await uploading(data);

    setFile(url);
    if (setProjectImageUrl) {
      setProjectImageUrl(url);
      setProjectImageLoading(false);
    }

    if (setYarnImageUrl) {
      setYarnImageUrl(url);
      setYarnImageLoading(false);
    }
  }
  console.log(projectImageLoading);
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

      {projectImageUrl
        ? projectImageLoading && <p>Loading image...</p>
        : yarnImageLoading && <p>Loading image...</p>}

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
  line-height: 2rem;
  text-align: center;
  margin: 0 auto;
  box-shadow: 0.1rem 0.1rem 0.3rem #cccccc;
  font-weight: 100;
`;
const Input = styled.input`
  width: 11rem;
  height: 2rem;
  border: none;
  display: none;
`;
