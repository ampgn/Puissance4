import { generateKeyPairSync } from "crypto";
import { writeFileSync } from "fs";

const { privateKey } = generateKeyPairSync("rsa", {
    modulusLenght: 2048,
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem"
    }
})

writeFileSync("privateKey.pem", privateKey)