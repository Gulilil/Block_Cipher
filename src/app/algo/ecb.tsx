import { d_function, e_function } from "./jnn";

export const encryptECB = (arrBlocks: Array<string>, key: string) => {
  // TO DO : Encryption Algo
  let res: string[] = [];
  console.log("Ini plain blocks : ", arrBlocks[0]);
  for (let i = 0; i < arrBlocks.length; i++) {
    let plainText = arrBlocks[i];
    res.push(e_function(plainText, key));
  }
  console.log("Ini res : ", res[0]);
  return res;
};

export const decryptECB = (arrBlocks: Array<string>, key: string) => {
  // TO DO : Decryption Algo
  let res: string[] = [];
  console.log(arrBlocks[0]);
  for (let i = 0; i < arrBlocks.length; i++) {
    let plainText = arrBlocks[i];
    res.push(d_function(plainText, key));
  }
  return res;
};
