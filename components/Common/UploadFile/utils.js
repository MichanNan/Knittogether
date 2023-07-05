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
    ///FileReader类就是专门用来读文件的
    const reader = new FileReader();
    //开始读文件
    //readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串，
    reader.readAsDataURL(file);
    // 成功和失败返回对应的信息，reader.result一个base64，可以直接使用
    reader.onload = () => resolve(reader.result);
    // 失败返回失败的信息
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
