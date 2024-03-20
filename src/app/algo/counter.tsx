import { operatorXOR } from "@/utils/utils";
import { BLOCK_SIZE, BYTE_SIZE } from "../../utils/constant";
import { JNN } from "./jnn";

export const encryptCounter = (arrBlocks: Array<string>, key: string) => {
  // TO DO : Encryption Algo
  var count = BLOCK_SIZE * arrBlocks.length;
  var res = [];
  const jnn = new JNN()
  for (let i = 0; i < arrBlocks.length; i++) {
    var countBinary = count.toString(2).padStart(BLOCK_SIZE * BYTE_SIZE, "0");
    var block = arrBlocks[i];

    var temp = jnn.encrypt(countBinary, key);

    // Adjustment
    if (block.length < temp.length) {
      temp = temp.slice(0, block.length);
    }
    var resBlock = operatorXOR(temp, block);
    res.push(resBlock);
    count++;
  }
  return res;
};

export const decryptCounter = (arrBlocks: Array<string>, key: string) => {
  // TO DO : Decryption Algo
  var count = BLOCK_SIZE * arrBlocks.length;
  var res = [];
  const jnn = new JNN()
  for (let i = 0; i < arrBlocks.length; i++) {
    var countBinary = count.toString(2).padStart(BLOCK_SIZE * BYTE_SIZE, "0");
    var block = arrBlocks[i];

    var temp = jnn.encrypt(countBinary, key);

    // Adjustment
    if (block.length < temp.length) {
      temp = temp.slice(0, block.length);
    }
    var resBlock = operatorXOR(temp, block);
    res.push(resBlock);
    count++;
  }
  return res;
};
