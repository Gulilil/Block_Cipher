import { operatorXOR } from "@/utils/utils";
import { d_function, e_function } from "./hehehe";

export const encryptCFB = (arrBlocks: Array<string>, key: string) => {
  // Size 1 block = 128 bit, size r = 8 bit, brrti ada 128/8 = 16
  const r = 8;
  var res = [];
  let iv = generateIV();
  console.log(arrBlocks.length);
  // Iterasi seluruh block yang ada
  for (let i = 0; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];

    // Encrypt sebuah block
    var encryptedRegister = e_function(iv, key);

    // Bagi encryptedBlock dan plainBlock ke dalam beberapa array dengan r bits (sizenya pasti sama)
    const subEncryptedBlock = splitBlock(r, encryptedRegister);
    const subPlainBlock = splitBlock(r, currentBlock);

    // XOR sebuah encryptedBlock dengan sebuah plainBlock ini
    let temp = "";
    console.log(subEncryptedBlock.length, subPlainBlock.length);
    for (let j = 0; j < subPlainBlock.length; j++) {
      const resXOR = operatorXOR(subEncryptedBlock[j], subPlainBlock[j]);
      // Hapus 8 bit pertama dari iv(ikutin size 5)
      iv = iv.slice(8);
      // Tambahin resXOR di digit paling akhir
      iv += resXOR;
      temp += resXOR;
    }
    res.push(temp);
  }
  return res;
};

export const decryptCFB = (arrBlocks: Array<string>, key: string) => {
  // TO DO : Decryption Algo
  var res = [];
  const r = 8;
  let iv = generateIV();

  for (let i = 0; i < arrBlocks.length; i++) {
    var currentBlock = arrBlocks[i];
    var decryptedBlock = d_function(iv, key);
    console.log(decryptedBlock.length)
    var subDecryptedBlock = splitBlock(r, decryptedBlock);
    var subBlock = splitBlock(r, currentBlock);
    let temp = "";
    console.log(decryptedBlock.length, subBlock.length)
    for (let j = 0; j < subBlock.length; j++) {
      const resXOR = operatorXOR(subDecryptedBlock[j], subBlock[j]);
      iv = iv.slice(8);
      iv += subBlock[j];
      temp += resXOR;
    }
    res.push(temp);
  }
  return res;
};

const generateIV = () => {
  let result = "";
  for (let i = 0; i < 128; i++) {
    result += "0";
  }
  return result;
};

const splitBlock = (size: number, block: string) => {
  const result = [];
  for (let i = 0; i < block.length; i += size) {
    const subBlock = block.slice(i, i + size);
    result.push(subBlock);
  }
  return result;
};
