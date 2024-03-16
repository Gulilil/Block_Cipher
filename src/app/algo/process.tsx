import { encryptCBC, decryptCBC } from "./cbc";
import { encryptCFB, decryptCFB } from "./cfb";
import { decryptCounter, encryptCounter } from "./counter";
import { encryptECB, decryptECB } from "./ecb";
import { encryptOFB, decryptOFB } from "./ofb";

const BLOCK_SIZE = 16; //128 bits = 16 bytes
// const BLOCK_SIZE = 32; //256 bits = 32 bytes
const BYTE_SIZE = 8; // 1 byte = 8 bit
const IRETATION = 16;

const makeStringToBlocksArray = (text: string) => {
  var blocks = [];
  for (let i = 0; i < text.length; i += BLOCK_SIZE) {
    const block = text.slice(i, i + BLOCK_SIZE);
    const binaryBlock = block
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(BYTE_SIZE, "0"))
      .join("");
    blocks.push(binaryBlock);
  }
  return blocks;
};

const makeBlocksArrayToString = (blocks: Array<String>) => {
  var string = "";
  for (let i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    for (let i = 0; i < block.length; i += BYTE_SIZE) {
      const charBinary = block.slice(i, i + BYTE_SIZE);
      const char = String.fromCharCode(parseInt(charBinary, 2));
      string += char;
    }
  }
  return string;
};

export const encrypt = (text: string, key: string, mode: string) => {
  var textBlocks = makeStringToBlocksArray(text);
  textBlocks.forEach((block) => {
    console.log(block);
  });
  var keyBlocks = makeStringToBlocksArray(key);

  switch (mode) {
    case "ECB":
      textBlocks = encryptECB(textBlocks, key);
      break;
    case "CBC":
      textBlocks = encryptCBC(textBlocks, key);
      break;
    case "OFB":
      textBlocks = encryptOFB(textBlocks, key);
      break;
    case "CFB":
      textBlocks = encryptCFB(textBlocks, key);
      break;
    case "Counter":
      textBlocks = encryptCounter(textBlocks, key);
      break;
    default:
      textBlocks = [""];
  }

  // Convert Back the Array of Blocks to String
  var res = makeBlocksArrayToString(textBlocks);

  return res;
};

export const decrypt = (text: string, key: string, mode: string) => {
  var textBlocks = makeStringToBlocksArray(text);
  var keyBlocks = makeStringToBlocksArray(key);

  switch (mode) {
    case "ECB":
      textBlocks = decryptECB(textBlocks, key);
      break;
    case "CBC":
      textBlocks = decryptCBC(textBlocks, key);
      break;
    case "OFB":
      textBlocks = decryptOFB(textBlocks, key);
      break;
    case "CFB":
      textBlocks = decryptCFB(textBlocks, key);
      break;
    case "Counter":
      textBlocks = decryptCounter(textBlocks, key);
      break;
    default:
      textBlocks = [""];
  }

  // Convert Back the Array of Blocks to String
  var res = makeBlocksArrayToString(textBlocks);

  return res;
};
