import { d_function, e_function } from "./jnn";

export const encryptECB = (arrBlocks: Array<string>, key: string): Array<string> => {
  const res: Array<string> = [];

  for (let i = 0; i < arrBlocks.length; i++) {
    const currentBlock = arrBlocks[i];
    const encryptedBlock = e_function(currentBlock, key);
    res.push(encryptedBlock);
  } 
  
  return res;
};

export const decryptECB = (arrBlocks: Array<string>, key: string): Array<string> => {
  const res: Array<string> = [];
  
  for (let i = 0; i < arrBlocks.length; i++) {
    const currentBlock = arrBlocks[i];
    const decryptedBlock = d_function(currentBlock, key);
    res.push(decryptedBlock);
  }

  return res;
};
