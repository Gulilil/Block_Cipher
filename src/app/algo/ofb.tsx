import { generateIV, operatorXOR, splitBlock } from "../utils/utils";
import { JNN } from "./jnn";

export const encryptOFB = (arrBlocks: Array<string>, key: string) => {
  const r = 8;
  let iv = generateIV();
  let res: string[] = [];
  const jnn = new JNN()
  for (let i = 0; i < arrBlocks.length; i++) {
    let plainTextBlock = arrBlocks[i];
    let encryptedRegister = jnn.encrypt(iv, key);
    const subPlainTextBlock = splitBlock(r, plainTextBlock);
    const subEncryptedBlock = splitBlock(r, encryptedRegister);
    let temp = "";
    for (let j = 0; j < subPlainTextBlock.length; j++) {
      const resXOR = operatorXOR(subEncryptedBlock[j], subPlainTextBlock[j]);
      iv = iv.slice(1);
      iv += subEncryptedBlock[j];
      temp += resXOR;
    }
    res.push(temp);
  }
  return res;
};

export const decryptOFB = (arrBlocks: Array<string>, key: string) => {
  const r = 8;
  let iv = generateIV();
  let res: string[] = [];
  const jnn = new JNN()

  for (let i = 0; i < arrBlocks.length; i++) {
    let cipherTextBlock = arrBlocks[i];
    let decryptedRegister = jnn.encrypt(iv, key);

    const subCipherTextBlock = splitBlock(r, cipherTextBlock);
    const subDecryptedBlock = splitBlock(r, decryptedRegister);
    let temp = "";
    for (let j = 0; j < subCipherTextBlock.length; j++) {
      const resXOR = operatorXOR(subCipherTextBlock[j], subDecryptedBlock[j]);
      iv = iv.slice(1);
      iv += subDecryptedBlock[j];
      temp += resXOR;
    }
    res.push(temp);
  }
  return res;
};
