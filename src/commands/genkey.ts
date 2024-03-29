import { generateKeyPairSync } from "crypto";
import { writeFileSync } from "fs";
import path from "path";

const { privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem"
    },
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem"
    }
})
const privateKeyPath = path.join(__dirname, "privateKey.pem");
writeFileSync(privateKeyPath, privateKey);