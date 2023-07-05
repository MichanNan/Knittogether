import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

export default function PatternPage() {
  const router = useRouter();

  const { patternId } = router.query;
  console.log(patternId);
  useEffect(() => {
    handleDownload();
  });
  async function handleDownload() {
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

        let downFile = base64toFile(downloaded64, Pattern.patternName);
        console.log("downFile", downFile);
        const objectURL = window.URL.createObjectURL(downFile);
        // const iframe = document.getElementById("view");
        const embed = document.getElementById("view");
        // iframe.setAttribute("src", objectURL);
        embed.setAttribute("src", objectURL);

        //var link = document.createElement("a");
        //link.href = objectURL;
        //link.download = Pattern.patternName;
        //link.click();
        //window.URL.revokeObjectURL(objectURL);
      });

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
  }
  return (
    <>
      <Embed id="view"></Embed>
    </>
  );
}

const Embed = styled.iframe`
  width: 100%;
  height: 667px;
`;
