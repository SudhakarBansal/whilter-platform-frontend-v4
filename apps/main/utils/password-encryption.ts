import JSEncrypt from 'jsencrypt';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY;

export const RSA_ENCRYPT = (message: string) => {
    console.log("Encrypting message:", message);
    const publicKey = PUBLIC_KEY || '';
    if (!publicKey) {
        throw new Error("Public key is not defined");
    }
    if (!message) {
        throw new Error("Message to encrypt cannot be empty");
    }
    console.log("Public Key:", publicKey);
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    const encryptedMessage = jsEncrypt.encrypt(message);
    if (!encryptedMessage) {
        throw new Error("Encryption failed");
    }
    return encryptedMessage;
};

const encryptPassword = (password: string): string => {
    if (!password) {
        throw new Error("Password cannot be empty");
    }
    return RSA_ENCRYPT(password);
};


export default encryptPassword;
 