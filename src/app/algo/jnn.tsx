import { S_BOX } from "@/utils/constant";
import { operatorXOR, shiftLeft, splitBlock } from "@/utils/utils";

export class JNN {
  private round: number = 16;
  encrypt = (input: string, key: string) => {
    const internalKeys = this.generateInternalKey(key, ROUND);
    let leftSide = input.substring(0, input.length / 2);
    let rightSide = input.substring(input.length / 2, input.length);
    for (let i = 0; i < this.round; i++) {
      const prevRightSide = rightSide;
      const prevLeftSide = leftSide;
      let internalKey = internalKeys[i].substring(0, rightSide.length);
      if (i == 2 || i == 4 || i == 9 || i == 12) {
        internalKey = internalKeys[i].substring(
          rightSide.length,
          internalKeys[i].length
        );
      }
      let substitutedPlainText = this.substitutePlainText(
        shiftLeft(prevRightSide, 3)
      );
      let result = operatorXOR(internalKey, substitutedPlainText);
      leftSide = prevRightSide;
      rightSide = operatorXOR(result, prevLeftSide);
    }
    return leftSide + rightSide;
  };

  decrypt = (input: string, key: string) => {
    const internalKeys = this.generateInternalKey(key, ROUND);
    console.log("Decrypt internal keys :", internalKeys);
    let leftSide = input.substring(0, input.length / 2);
    let rightSide = input.substring(input.length / 2);
    for (let i = this.round - 1; i >= 0; i--) {
      const prevRightSide = rightSide;
      const prevLeftSide = leftSide;
      let internalKey = internalKeys[i].substring(0, rightSide.length);
      if (i == 2 || i == 4 || i == 9 || i == 12) {
        internalKey = internalKeys[i].substring(
          rightSide.length,
          internalKeys[i].length
        );
      }
      let substitutedPlainText = this.substituteCipherText(
        this.rightShift(prevRightSide, 3)
      );
      let result = operatorXOR(internalKey, substitutedPlainText);
      rightSide = prevLeftSide;
      leftSide = operatorXOR(result, prevRightSide);
    }
    return leftSide + rightSide;
  };

  permutateMatrix = (permutateMatrix: number[], key: string) => {
    let result = "";
    for (let i = 0; i < permutateMatrix.length; i++) {
      result += key[permutateMatrix[i] - 1];
    }
    return result;
  };

  leftShift = (key: string, shift: number) => {
    let newKey = key.slice(shift);
    return (newKey += key.substring(0, shift));
  };

  rightShift = (key: string, shift: number) => {
    const length = key.length;
    shift = shift % length;
    let newKey = key.slice(-shift);
    return (newKey += key.substring(0, length - shift));
  };

  generateInternalKey = (externalKey: string, round: number): string[] => {
    let internalKeys: string[] = [];
    const permutationMatrix = this.generatePermutateMatrix();
    for (let i = 0; i < round; i++) {
      const internalKey = this.permutateMatrix(permutationMatrix, externalKey);
      if (i == 1 || i == 2 || i == 9 || i == 16) {
        externalKey = this.leftShift(externalKey, 1);
      } else {
        externalKey = this.leftShift(externalKey, 2);
      }
      internalKeys.push(internalKey);
    }
    return internalKeys;
  };

  generatePermutateMatrix = () => {
    const numbers = Array.from({ length: 128 }, (_, i) => i + 1);
    for (let i = 0; i < numbers.length; i += 16) {
      const segment = numbers.slice(i, i + 16).reverse();
      for (let j = 0; j < segment.length; j++) {
        numbers[i + j] = segment[j];
      }
    }
    return numbers;
  };

  substitutePlainText = (input: string) => {
    let result = "";
    let smallerBlocks = splitBlock(8, input);
    for (let i = 0; i < smallerBlocks.length; i++) {
      let currentBlock = smallerBlocks[i];
      const index = parseInt(currentBlock, 2);
      result += S_BOX[index].toString(2).padStart(8, "0");
    }
    return result;
  };

  substituteCipherText = (input: string) => {
    let result = "";
    let smallerBlocks = splitBlock(8, input);
    for (let i = 0; i < smallerBlocks.length; i++) {
      let currentBlock = smallerBlocks[i];
      const value = parseInt(currentBlock, 2);
      let index = S_BOX.indexOf(value);
      const binaryIndex = index.toString(2).padStart(8, "0");
      result += binaryIndex;
    }
    return result;
  };
}
const ROUND = 16;
