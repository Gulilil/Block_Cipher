import { d_function, e_function } from "./jnn";

export const encryptECB = (arrBlocks: Array<string>, key: string) => {
  var res = [];

  for (let i = 0; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var encryptedBlock = e_function(currentBlock, key);
    res.push(encryptedBlock);
    console.log("current block", currentBlock);
    console.log("encrypted", encryptedBlock);
  }
  return res;
};

export const decryptECB = (arrBlocks: Array<string>, key: string) => {
  var res = [];

  for (let i = 0; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var decryptedBlock = d_function(currentBlock, key);
    res.push(decryptedBlock);
    console.log("current block", currentBlock);
    console.log("decrypted", decryptedBlock);
  }

  return res;
};
