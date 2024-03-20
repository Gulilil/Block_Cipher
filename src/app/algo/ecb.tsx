import { JNN } from "./jnn";

export const encryptECB = (arrBlocks: Array<string>, key: string) => {
  var res = [];
  let jnn = new JNN()
  for (let i = 0; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var encryptedBlock =jnn.encrypt(currentBlock, key);
    res.push(encryptedBlock);
  } 
  return res;
};

export const decryptECB = (arrBlocks: Array<string>, key: string) => {
  var res = [];
  let jnn = new JNN()

  for (let i = 0; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var decryptedBlock = jnn.decrypt(currentBlock, key);
    res.push(decryptedBlock);
  }

  return res;
};
