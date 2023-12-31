import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

export default function PatternPage() {
  const router = useRouter();

  const { patternId } = router.query;

  useEffect(() => {
    handleDownload();
  });

  async function handleDownload() {
    let id = patternId;
    let multiFile = {};

    fetch(`/api/pattern?id=${id}`, {
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
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      // Create an object URL for the response
      .then((response) => response.blob())
      .then((blob) => {
        return blob.text();
      })
      .then((text) => {
        let downloaded64 = "";
        const Pattern = JSON.parse(text).body;
        let patternName = Pattern.patternName;
        console.log(Pattern);
        if (Pattern.totalChunks) {
          //file > 1 mb
          /*******************************************************************************for loop to connect strings */
          console.log("multi");
          const fetchPromises = [];
          for (const item of Pattern.chunks) {
            const fetchPromise = fetch(`/api/pattern?id=${item}`, {
              method: "get",
            })
              .then((response) => {
                //read ReadableStream response
                console.log("reader");
                const reader = response.body.getReader();
                return new ReadableStream({
                  start(controller) {
                    return pump();
                    function pump() {
                      return reader.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                          console.log("readeableStream done");
                          controller.close();
                          return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                      });
                    }
                  },
                });
              })
              .then((stream) => new Response(stream))
              // Create an object URL for the response
              .then((response) => response.blob())
              .then((blob) => {
                console.log("blob", blob);
                return blob.text();
              })
              .then((text) => {
                const singlePattern = JSON.parse(text).body;

                multiFile[item] = singlePattern.fileBase64String;
              });

            fetchPromises.push(fetchPromise);
          }
          Promise.all(fetchPromises)
            .then(() => {
              console.log("chatgpt");
              console.log(multiFile);
              for (const item of Pattern.chunks) {
                console.log(item);
                //console.log(multiFile[item])
                downloaded64 += multiFile[item];
                console.log(downloaded64.length);
              }
              downLoadToFile(downloaded64, patternName);
            })
            .catch((error) => {});
        } else {
          // < 1mb file
          downloaded64 = Pattern.fileBase64String;
          downLoadToFile(downloaded64, patternName);
        }
      });
  }

  async function downLoadToFile(downloaded64, patternName) {
    console.log(downloaded64);

    let downFile = base64toFile(downloaded64, patternName);
    console.log("downFile", downFile);
    const objectURL = window.URL.createObjectURL(downFile);
    const iframe = document.getElementById("view");
    iframe.setAttribute("src", objectURL);

    var link = document.createElement("a");
    link.href = objectURL;
    link.download = patternName;

    window.URL.revokeObjectURL(objectURL);
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
  return (
    <Wrapper>
      <Iframe id="view"></Iframe>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 667px;
`;
