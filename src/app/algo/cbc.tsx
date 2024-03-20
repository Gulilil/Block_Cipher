import { generateIV, operatorXOR } from "@/app/utils/utils";
import { JNN } from "./jnn";

export const encryptCBC = (arrBlocks: Array<string>, key: string) => {
  var res = [];
  var temp = "";
  let iv = generateIV();
  const jnn = new JNN()
  // XOR IV with the first block
  var firstEncryptedBlock = operatorXOR(arrBlocks[0], iv);
  // Encrypt XOR-ed block with the key
  firstEncryptedBlock = jnn.encrypt(firstEncryptedBlock, key);
  // Save to temp and push to the result
  temp = firstEncryptedBlock;
  res.push(firstEncryptedBlock);

  for (let i = 1; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var xorBlock = operatorXOR(currentBlock, temp);
    var encryptedBlock = jnn.encrypt(xorBlock, key);
    temp = encryptedBlock;
    res.push(encryptedBlock);
  }

  return res;
};

export const decryptCBC = (arrBlocks: Array<string>, key: string) => {
  var res = [];
  let iv = generateIV();
  const jnn = new JNN()

  var firstBlock = arrBlocks[0];
  var decryptedBlock = jnn.decrypt(firstBlock, key);
  decryptedBlock = operatorXOR(decryptedBlock, iv);
  res.push(decryptedBlock);
  var lastBlock = firstBlock;

  for (let i = 1; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var decryptedBlock = jnn.decrypt(currentBlock, key);
    decryptedBlock = operatorXOR(decryptedBlock, lastBlock);
    var lastBlock = currentBlock;
    res.push(decryptedBlock);
  }

  return res;
};
