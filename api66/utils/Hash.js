import crypto from 'crypto';

export const getSalt = () => {
    const size = process.env.SALT_SIZE
    return crypto.randomBytes(50).toString("base64url").substring(0,size)
}
export const hash =() =>{
    const pepper = process.env.PEPPER
    const hasing = crypto.createHash("sha512");
    const hash = hashing.update(salt+password+pepper).digest("Base64url")
    return salt+hashed
}