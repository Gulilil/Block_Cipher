export const operatorXOR = (block1: string, block2: string) => {
  // Assume block1.length = block2.length
  var resBlock = "";
  for (var i = 0; i < block1.length; i++) {
    var charBinary1 = parseInt(block1[i]);
    var charBinary2 = parseInt(block2[i]);

    var resChar = charBinary1 ^ charBinary2;
    // console.log(charBinary1, charBinary2, resChar);
    resBlock += resChar;
  }
  return resBlock;
};
