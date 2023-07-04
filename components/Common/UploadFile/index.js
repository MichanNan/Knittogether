import { Button } from "@mui/material";
import styled from "styled-components";

export default function UploadFile({}) {
  let patternId =
    ""; /****************************************************************************************************large string slice into strArr */

  function slice64String(str) {
    const numb = Math.ceil(str.length / 1000000);
    const strArr = [];
    for (let i = 0; i < numb; i++) {
      strArr.push(str.slice(i * 1000000, (i + 1) * 1000000));
    }
    return strArr;
  } /****************************************************************************************************download*******/
  async function handleDownload() {
    console.log("download", patternId);
    patternId = patternId ? patternId : "64a3135fcee80e505638d800";

    fetch(`/api/pattern?id=${patternId}`, {
      method: "get",
    })
      .then((response) => {
        //read ReadableStream response
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                } // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream)) // Create an object URL for the response
      .then((response) => response.blob())
      .then((blob) => {
        //console.log(blob)
        return blob.text();
      })
      .then((text) => {
        const Pattern = JSON.parse(text).body;
        console.log(Pattern);
        if (Pattern.totalChunkNumber) {
          if (Pattern.nextChunkId) {
          } else {
          }
        }
        const downloaded64 = Pattern.fileBase64String;
        debugger;
        let downFile = base64toFile(downloaded64, Pattern.patternName);
        console.log("downFile", downFile);
        const objectURL = window.URL.createObjectURL(downFile);
        const iframe = document.getElementById("download");
        iframe.setAttribute("src", objectURL);

        var link = document.createElement("a");
        link.href = objectURL;
        link.download = Pattern.patternName; // link.click();
        window.URL.revokeObjectURL(objectURL);
      });
  }

  let localFile;
  let localFileName;
  let local64;
  /****************************************************************************************************upload*************** */
  async function handleChange(e) {
    if (!e) {
      return;
    } //get file and transfer to base64 string
    localFile = e.target.files[0];
    local64 = await getBase64(localFile);
    localFileName = localFile.name; //display in iframe

    const objectURL = window.URL.createObjectURL(localFile);
    const iframe = document.getElementById("viewer");
    iframe.setAttribute("src", objectURL);
    window.URL.revokeObjectURL(objectURL); //if string is larger than 1mb, split into several substrings

    if (local64.length > 1000000) {
      const localArr =
        slice64String(local64); /*fileBase64String: { type: String },
      patternName: { type: String },
      totalChunks: { type: String },
      ChunkNumber: { type: String },
      previousChunkId: { type: String },
      */
      const totalChunks = localArr.length;

      let previousChunkId;
      let res;
      for (const index in localArr) {
        let data = {
          fileBase64String: localArr[index],
          patternName: localFileName,
          totalChunks: totalChunks,
          ChunkNumber: index,
        };
        if (previousChunkId) {
          data.previousChunkId = res.json().response._id;
        }
        res = await uploading(data);
      }
      previousChunkId = "";
      console.log(localArr);
    } else {
      //request.body < 1mb
      let data = {
        fileBase64String: local64,
        patternName: localFileName,
      };
      await uploading(data);
    }
  }

  async function uploading(data) {
    const res = await fetch("/api/pattern", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resj = await res.json();
    patternId = resj.response._id;
    return;
  }
  /***************************************************************************************************base64 transform */
  function getBase64(file) {
    if (!file) {
      return;
    }
    return new Promise((resolve, reject) => {
      ///FileReader类就是专门用来读文件的
      const reader = new FileReader(); //开始读文件 //readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串，
      reader.readAsDataURL(file); // 成功和失败返回对应的信息，reader.result一个base64，可以直接使用
      reader.onload = () => resolve(reader.result); // 失败返回失败的信息
      reader.onerror = (error) => reject(error);
    });
  }

  function base64toFile(dataurl, filename) {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let suffix = mime.split("/")[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `${filename}.${suffix}`, {
      type: mime,
    });
  }
  /***************************************************************************************************************Ravelery API */

  //   function testAPI() {
  //     remoteSearch("socks");
  //   }

  //   async function remoteSearch(searchContent) {
  //     const usernameKey = "read-300fa50d459f6c9c346c8725ebe18973";
  //     const passwordKey = "6gqf0V7oy7bo4WuLNo1liaQMmgcXZQr0W89CR275";

  //     const base = "https://api.ravelry.com";
  //     const url =
  //       base +
  //       "/patterns/search.json" +
  //       "?query=" +
  //       searchContent +
  //       "&query=free=true";

  //     let headers = new Headers();

  //     headers.set(
  //       "Authorization",
  //       "Basic " + Buffer.from(usernameKey + ":" + passwordKey).toString("base64")
  //     );
  //     fetch(url, {
  //       method: "GET",
  //       headers: headers,
  //     })
  //       .then((response) => response.json())
  //       .then((json) => console.log(json));
  //     console.log(process.env.MONGODB_URI);
  //   } /*******************************************************************************************************************return */
  return (
    <UploadedFile className="App">
      {/* <HeavyFont>
          <ColoredFont>Add Image:</ColoredFont>
        </HeavyFont> */}
      <Label htmlFor="file">Click here to Upload </Label>

      <Input
        id="file"
        name="file"
        width="20rem"
        height="2rem"
        type="file"
        accept=".pdf"
        onChange={handleChange}
      />
      {/*         <Button onClick={handleDownload}>Download</Button>     
        <Button onClick={testAPI}>TestAPI</Button>      */}

      {/*       <br />
            <iframe id="viewer" />
            <br />
            <iframe id="download" />    */}
    </UploadedFile>
  );
}

const UploadedFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
// const Wrapper = styled.div`
//   display: flex;
//   justify-content: start;
//   gap: 2rem;
// `;
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
