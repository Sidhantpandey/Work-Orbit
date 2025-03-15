import fs from "fs";
import CryptoJS from "crypto-js";

// Read the encrypted .env.enc file
const encryptedEnv = fs.readFileSync(".env.enc", "utf8");

// Your secret key (move this to env or CLI arg in production)
const secretKey = "12345";

// Decrypt the file
const decryptedEnv = CryptoJS.AES.decrypt(encryptedEnv, secretKey).toString(CryptoJS.enc.Utf8);

// Write the decrypted content back to .env
fs.writeFileSync(".env", decryptedEnv, "utf8");

console.log("Encrypted content loaded:", encryptedEnv.slice(0, 50));
console.log("Decrypted result preview:", decryptedEnv.slice(0, 50));

