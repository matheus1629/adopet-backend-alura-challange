export const checkBufferType = (buffer) => {
  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const jpegHeader = Buffer.from([255, 216, 255]);

  let bufferType;
  if (buffer.slice(0, pngHeader.length).equals(pngHeader)) {
    bufferType = "PNG";
  } else if (buffer.slice(0, jpegHeader.length).equals(jpegHeader)) {
    bufferType = "JPG";
  } else {
    bufferType = "invalid";
  }

  return bufferType
};

export const bufferToBase64 =(buffer)=>{
  let prefixBase64;
  const bufferType = checkBufferType(buffer);

  if (bufferType === "PNG") {
    prefixBase64 = "data:image/png;base64,";
  } else if (bufferType === "JPG") {
    prefixBase64 = "data:image/jpg;base64,";
  } else {
    return null;
  }

 return prefixBase64 + buffer.toString("base64");
}
