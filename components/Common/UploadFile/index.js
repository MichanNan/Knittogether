import { useState } from "react";
import styled from "styled-components";
import { slice64String, getBase64, uploading } from "./utils";

export default function UploadFile({
  setPatternId,
  isEdit,
  oldPattern,
  loading,
  setLoading,
}) {
  const initialPattern = oldPattern?.body === null ? "" : oldPattern?.body;
  const [pattern, setPattern] = useState({});
  const [existedPattern, setExistedPattern] = useState(initialPattern);
  console.log(oldPattern);
  let showUploadInfo = "";

  if (isEdit) {
    setPatternId(initialPattern);
    if (Object.keys(existedPattern).length !== 0) {
      showUploadInfo = existedPattern?.patternName
        ? existedPattern?.patternName
        : existedPattern?.response?.patternName;
    } else {
      showUploadInfo = "no pattern for this project";
    }
  } else {
    if (Object.keys(pattern).length === 0) {
      showUploadInfo = "No file uploaded!";
    } else {
      showUploadInfo = `${pattern.response.patternName} uploaded successful`;
    }
  }
  let patternId = "";
  /****************************************************************************************************download*******/

  let localFile;
  let localFileName;
  let local64;
  /****************************************************************************************************upload*************** */

  async function handleChange(e) {
    if (!e) {
      return;
    }
    setLoading(true);
    //get file and transfer to base64 string
    localFile = e.target.files[0];
    local64 = await getBase64(localFile);
    localFileName = localFile?.name;

    //display in iframe
    const objectURL = window.URL.createObjectURL(localFile);
    const iframe = document.getElementById("viewer");
    //iframe.setAttribute("src", objectURL);
    window.URL.revokeObjectURL(objectURL);

    //if string is larger than 1mb, split into several substrings
    if (local64.length > 1000000) {
      const localArr = slice64String(local64);
      const totalChunks = localArr.length;

      let idArr = [];

      for (const index in localArr) {
        let data = {
          patternName: localFileName,
          fileBase64String: localArr[index],
          totalChunks: totalChunks,
          ChunkNumber: index,
        };
        const res = await uploading(data);
        idArr.push(res.response._id);
      }
      console.log(localArr);

      let data = {
        patternName: localFileName,
        chunks: idArr,
        totalChunks: totalChunks,
      };

      const res = await uploading(data);

      patternId = res.response._id;

      setPatternId(res.response._id);
      isEdit ? setExistedPattern(res) : setPattern(res);
    } else {
      //request.body < 1mb
      let data = {
        fileBase64String: local64,
        patternName: localFileName,
      };
      const res = await uploading(data);

      setPatternId(res.response._id);
      setLoading(false);
      isEdit ? setExistedPattern(res) : setPattern(res);
    }
  }

  return (
    <UploadedFile className="App">
      <Label htmlFor="pdfFile">Click here to Upload</Label>

      <Input
        id="pdfFile"
        name="file"
        width="20rem"
        height="2rem"
        type="file"
        accept=".pdf"
        onChange={handleChange}
      />
      {loading && <p>Loading pattern...</p>}
      <p> {showUploadInfo}</p>
    </UploadedFile>
  );
}

const UploadedFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Label = styled.label`
  width: 12rem;
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
