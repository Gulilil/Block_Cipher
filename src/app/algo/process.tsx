import { encryptCBC, decryptCBC } from "./cbc";
import { encryptCFB, decryptCFB } from "./cfb";
import { encryptECB, decryptECB } from "./ecb";
import { encryptOFB, decryptOFB } from "./ofb";

export const encrypt = (text: string, key: string, mode: string) => {
  var res;
  switch (mode) {
    case "ECB":
      res = encryptECB(text, key);
      break;
    case "CBC":
      res = encryptCBC(text, key);
      break;
    case "OFB":
      res = encryptOFB(text, key);
      break;
    case "CFB":
      res = encryptCFB(text, key);
      break;
    default:
      res = "";
  }
  return res;
};

export const decrypt = (text: string, key: string, mode: string) => {
  var res;
  switch (mode) {
    case "ECB":
      res = decryptECB(text, key);
      break;
    case "CBC":
      res = decryptCBC(text, key);
      break;
    case "OFB":
      res = decryptOFB(text, key);
      break;
    case "CFB":
      res = decryptCFB(text, key);
      break;
    default:
      res = "";
  }
  return res;
};
