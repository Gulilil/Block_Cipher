import { encryptCBC, decryptCBC } from "./cbc";
import { encryptCFB, decryptCFB } from "./cfb";
import { BLOCK_SIZE, BYTE_SIZE, KEY_BLOCK_SIZE } from "../../utils/constant";
import { decryptCounter, encryptCounter } from "./counter";
import { encryptECB, decryptECB } from "./ecb";
import { encryptOFB, decryptOFB } from "./ofb";

const makeStringToBlocksArray = (text: string, isKey: boolean) => {
  var increment = isKey ? KEY_BLOCK_SIZE : BLOCK_SIZE;
  var blocks = [];
  for (let i = 0; i < text.length; i += increment) {
    const block = text.slice(i, i + increment);
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

const adjustKey = (key: string) => {
  if (key.length == KEY_BLOCK_SIZE) {
    return key;
  } else if (key.length < KEY_BLOCK_SIZE) {
    return key.padEnd(KEY_BLOCK_SIZE, "0");
  } else {
    return key.slice(0, KEY_BLOCK_SIZE);
  }
};

const adjustText = (text: string) => {
  var divider = Math.ceil(text.length/BLOCK_SIZE);
  var res = text.padEnd(divider * BLOCK_SIZE, " ")
  return res
}

export const encrypt = (text: string, key: string, mode: string) => {
  // console.log(text, text.length)
  text = adjustText(text);
  // console.log(text, text.length)
  var textBlocks = makeStringToBlocksArray(text, false);
  key = adjustKey(key);
  // Since key will only be 1 block, only use the first element
  var keyBlock = makeStringToBlocksArray(key, true)[0];

  textBlocks.forEach((block) => {
    console.log(block);
  });

  switch (mode) {
    case "ECB":
      textBlocks = encryptECB(textBlocks, keyBlock);
      break;
    case "CBC":
      textBlocks = encryptCBC(textBlocks, keyBlock);
      break;
    case "OFB":
      textBlocks = encryptOFB(textBlocks, keyBlock);
      break;
    case "CFB":
      textBlocks = encryptCFB(textBlocks, keyBlock);
      break;
    case "CTR":
      textBlocks = encryptCounter(textBlocks, keyBlock);
      break;
    default:
      textBlocks = [""];
  }

  // Convert Back the Array of Blocks to String
  var res = makeBlocksArrayToString(textBlocks);

  return res;
};

export const decrypt = (text: string, key: string, mode: string) => {
  // console.log(text, text.length)
  text = adjustText(text);
  // console.log(text, text.length)
  var textBlocks = makeStringToBlocksArray(text, false);
  key = adjustKey(key);
  // Since key will only be 1 block, only use the first element
  var keyBlock = makeStringToBlocksArray(key, true)[0];

  switch (mode) {
    case "ECB":
      textBlocks = decryptECB(textBlocks, keyBlock);
      break;
    case "CBC":
      textBlocks = decryptCBC(textBlocks, keyBlock);
      break;
    case "OFB":
      textBlocks = decryptOFB(textBlocks, keyBlock);
      break;
    case "CFB":
      textBlocks = decryptCFB(textBlocks, keyBlock);
      break;
    case "CTR":
      textBlocks = decryptCounter(textBlocks, keyBlock);
      break;
    default:
      textBlocks = [""];
  }

  // Convert Back the Array of Blocks to String
  var res = makeBlocksArrayToString(textBlocks);

  return res;
};
