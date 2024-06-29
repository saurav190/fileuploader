import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export function encryptData(data: string): string {
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  return encrypted;
}

export function decryptData(encryptedData: string): string {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return decrypted;
}
