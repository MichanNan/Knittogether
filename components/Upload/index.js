import Image from "next/image";
import { useState } from "react";

async function uploading(data) {
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dw4kyffua/image/upload",
    {
      method: "post",
      body: data,
    }
  );
  const resj = await res.json();
  console.log(resj);

  return resj.url;
}

export default function Upload() {
  const [file, setFile] = useState("");
  async function handleChange(e) {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "project-image");
    data.append("cloud_name", "dw4kyffua");

    const url = await uploading(data);
    console.log(url);
    setFile(url);
  }

  return (
    <div className="App">
      <h4>Add Image:</h4>
      <input type="file" onChange={handleChange} />
      {file && (
        <Image src={file} alt="project-image" width={350} height={350} />
      )}
    </div>
  );
}
