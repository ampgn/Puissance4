import * as Crypto from 'crypto'
import { readFileSync } from 'fs';

const algo = "SHA256";
let privateKey;

if (process.env.PRIVATE_KEY) {
    // Utiliser la clé privée à partir de la variable d'environnement sur Heroku
    privateKey = JSON.parse(process.env.PRIVATE_KEY);
} else {
    // Charger la clé privée à partir du fichier privatekey.pem en développement
    privateKey = readFileSync('privatekey.pem');
}

export function sign (str: string): string {
    return Crypto.sign(algo, Buffer.from(str), privateKey).toString("base64");
}

export function verify (str: string, signature: string): boolean {
    return Crypto.verify(algo, Buffer.from(str), privateKey, Buffer.from(signature, 'base64'));
}