import fs from "fs"
import CryptoJS from "crypto-js";

const secretKey = "12345"; // Use a strong password here
const envData = fs.readFileSync(".env", "utf8");

// Encrypt
const encrypted = CryptoJS.AES.encrypt(envData, secretKey).toString();

// Save to .env.enc
fs.writeFileSync(".env.enc", encrypted);
console.log("✅ .env file encrypted to .env.enc");
