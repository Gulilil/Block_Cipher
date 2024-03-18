// Original Algorithm

import { operatorXOR } from "@/utils/utils";

export const e_function = (input: string, key: string) => {
  // TO DO : Make E Function
  // In the mean time, is made using XOR
  const dummyKey =
    "0001001100110100010101110111100110011011101111001101111111110001";
  console.log(dummyKey.length);
  var res = operatorXOR(input, key);
  let internalKeys = generateInternalKey(dummyKey, 16);
  return res;
};

export const d_function = (input: string, key: string) => {
  // TO DO : Make D Function
  // In the mean time, is made using XOR

  var res = operatorXOR(input, key);
  return res;
};

const initialPermutation = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];

const secondPermutation = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];

const permutateKey = (permutateMatrix: number[], key: string) => {
  let result = "";
  console.log("Lengthnya : ", permutateMatrix.length, key.length);
  for (let i = 0; i < permutateMatrix.length; i++) {
    result += key[permutateMatrix[i] - 1];
  }
  return result;
};

const leftShift = (key: string, shift: number) => {
  let newKey = key.slice(shift);
  return (newKey += key.substring(0, shift));
};

const generateInternalKey = (externalKey: string, round: number): string[] => {
  let internalKeys: string[] = [];
  let permutatedExternalKey = permutateKey(initialPermutation, externalKey);
  let c = permutatedExternalKey.substring(0, 28);
  let d = permutatedExternalKey.substring(28, 56);
  for (let i = 1; i <= round; i++) {
    let shift = 2;
    if (i === 1 || i === 2 || i === 9 || i === 16) {
      shift = 1;
    }
    c = leftShift(c, shift);
    d = leftShift(d, shift);
    const internalKey = permutateKey(secondPermutation, c + d)
    internalKeys.push(internalKey)
  }
  return internalKeys;
};
