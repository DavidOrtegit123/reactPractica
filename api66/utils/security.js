import { createHash, randomBytes } from 'node:crypto';

export const getSalt = () => {
    const size = parseInt(process.env.SALT_SIZE) || 16;
    return randomBytes(size).toString("base64url");
}

export const hashPassword = (password, salt) => {
    const pepper = process.env.PEPPER || "PEPPER";
        const hash = createHash("sha512")
        .update(salt + password + pepper)
        .digest("base64url");
    
    return {
        salt,
        hashedPassword: hash
    };
}