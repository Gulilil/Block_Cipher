import { generateIV, operatorXOR } from "@/utils/utils";
import { d_function, e_function } from "./hehehe";

export const encryptCBC = (arrBlocks: Array<string>, key: string) => {
  var res = [];
  var temp = "";
  let iv = generateIV();

  // XOR IV with the first block
  var firstEncryptedBlock = operatorXOR(arrBlocks[0], iv);
  // Encrypt XOR-ed block with the key
  firstEncryptedBlock = e_function(firstEncryptedBlock, key);
  // Save to temp and push to the result
  temp = firstEncryptedBlock;
  res.push(firstEncryptedBlock);

  for(let i = 1; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var xorBlock = operatorXOR(currentBlock, temp);
    var encryptedBlock = e_function(xorBlock, key);
    temp = encryptedBlock;
    res.push(encryptedBlock);
  }

  return res;
}

export const decryptCBC = (arrBlocks: Array<string>, key: string) => {
  var res = [];
  let iv = generateIV();

  for(let i = 0; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var decryptedBlock = d_function(currentBlock, key);
    decryptedBlock = operatorXOR(decryptedBlock, iv);
    res.push(decryptedBlock);
  }

  return res;
}
