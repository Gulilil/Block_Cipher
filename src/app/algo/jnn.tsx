import { S_BOX, MAX_ITERATION } from "@/app/utils/constant";
import { operatorXOR, splitBlock } from "@/app/utils/utils";

export const e_function = (input: string, key: string) => {
  const internalKeys = generateInternalKey(key, MAX_ITERATION);
  let leftSide = input.substring(0, input.length / 2);
  let rightSide = input.substring(input.length / 2, input.length);
  for (let i = 0; i < MAX_ITERATION; i++) {
    let prevRightSide = rightSide;
    let prevLeftSide = leftSide;

    let internalKey = internalKeys[i].substring(0, rightSide.length);
    if (i == 2 || i == 4 || i == 9 || i == 12) {
      internalKey = internalKeys[i].substring(
        rightSide.length,
        internalKeys[i].length
      );
    }

    let tempRightSide = substitutePlainText(leftShift(prevRightSide, 3));
    let resultRightSide = operatorXOR(internalKey, tempRightSide);

    leftSide = prevRightSide;
    rightSide = operatorXOR(resultRightSide, prevLeftSide);
  }
  return leftSide + rightSide;
};

export const d_function = (input: string, key: string) => {
  const internalKeys = generateInternalKey(key, MAX_ITERATION);
  let leftSide = input.substring(0, input.length / 2);
  let rightSide = input.substring(input.length / 2);
  for (let i = MAX_ITERATION - 1; i >= 0; i--) {
    let prevRightSide = rightSide;
    let prevLeftSide = leftSide;

    let internalKey = internalKeys[i].substring(0, rightSide.length);
    if (i == 2 || i == 4 || i == 9 || i == 12) {
      internalKey = internalKeys[i].substring(
        rightSide.length,
        internalKeys[i].length
      );
    }

    let tempLeftSide = substitutePlainText(leftShift(prevLeftSide, 3));
    let resultLeftSide = operatorXOR(internalKey, tempLeftSide);

    leftSide = operatorXOR(resultLeftSide, prevRightSide);
    rightSide = prevLeftSide;
  }
  return leftSide + rightSide;
};

const permutateMatrix = (permutateMatrix: number[], key: string) => {
  let result = "";
  for (let i = 0; i < permutateMatrix.length; i++) {
    result += key[permutateMatrix[i] - 1];
  }
  return result;
};

const leftShift = (key: string, shift: number) => {
  let newKey = key.slice(shift);
  return (newKey += key.substring(0, shift));
};

// const rightShift = (key: string, shift: number) => {
//   const length = key.length;
//   shift = shift % length;
//   let newKey = key.slice(-shift);
//   return (newKey += key.substring(0, length - shift));
// };

const generateInternalKey = (externalKey: string, round: number): string[] => {
  let internalKeys: string[] = [];
  const permutationMatrix = generatePermutateMatrix();
  for (let i = 0; i < round; i++) {
    const internalKey = permutateMatrix(permutationMatrix, externalKey);
    if (i == 1 || i == 2 || i == 9 || i == 16) {
      externalKey = leftShift(externalKey, 1);
    } else {
      externalKey = leftShift(externalKey, 2);
    }
    internalKeys.push(internalKey);
  }
  return internalKeys;
};

const generatePermutateMatrix = () => {
  const numbers = Array.from({ length: 128 }, (_, i) => i + 1);
  for (let i = 0; i < numbers.length; i += 16) {
    const segment = numbers.slice(i, i + 16).reverse();
    for (let j = 0; j < segment.length; j++) {
      numbers[i + j] = segment[j];
    }
  }
  return numbers;
};

const substitutePlainText = (input: string) => {
  let result = "";
  let smallerBlocks = splitBlock(8, input);
  for (let i = 0; i < smallerBlocks.length; i++) {
    let currentBlock = smallerBlocks[i];
    const index = parseInt(currentBlock, 2);
    result += S_BOX[index].toString(2).padStart(8, "0");
  }
  return result;
};

// const substituteCipherText = (input: string) => {
//   let result = "";
//   let smallerBlocks = splitBlock(8, input);
//   for (let i = 0; i < smallerBlocks.length; i++) {
//     let currentBlock = smallerBlocks[i];
//     const value = parseInt(currentBlock, 2);
//     let index = S_BOX.indexOf(value);
//     const binaryIndex = index.toString(2).padStart(8, "0");
//     result += binaryIndex;
//   }
//   return result;
// };
