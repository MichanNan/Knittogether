/****************************************************************************************************large string slice into strArr */
export function slice64String(str) {
  const numb = Math.ceil(str.length / 1000000);
  const strArr = [];
  for (let i = 0; i < numb; i++) {
    strArr.push(str.slice(i * 1000000, (i + 1) * 1000000));
  }
  return strArr;
}

/***************************************************************************************************base64 transform */
export function getBase64(file) {
  if (!file) {
    return;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
}
/****************************************************************************************************upload*************** */

export async function uploading(data) {
  return new Promise((resolve) => {
    fetch("/api/pattern", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((text) => resolve(text));
  });
}
