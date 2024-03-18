import { e_function } from "./hehehe";

export const encryptECB = (arrBlocks: Array<string>, key: string) => {
  // TO DO : Encryption Algo
  var res = [""];
  let result = e_function(arrBlocks[0], key)
  return res;
};

export const decryptECB = (arrBlocks: Array<string>, key: string) => {
  // TO DO : Decryption Algo
  var res = [""];
  return res;
};
