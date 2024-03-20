export const downloadFile = (result : string, filename : string) => {
  const element = document.createElement("a");
  const output = [];
  for (let i = 0; i < result.length; i++) {
    output.push(result.charCodeAt(i));
  }
  const fileOutput = new Blob([new Uint8Array(output)]);
  element.href = URL.createObjectURL(fileOutput);
  console.log(element.href);
  if (filename === "") {
    element.download = "result.txt";
  } else {
    element.download = "result_" + filename;
  }
  // document.body.appendChild(element);
  element.click();
};