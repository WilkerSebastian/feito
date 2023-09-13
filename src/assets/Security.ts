import aesjs from "aes-js"

export default class Security {

    public static async decriptografar(cifra:string) {

        const key = aesjs.utils.hex.toBytes(process.env.KEY as string)
    
        const iv = aesjs.utils.hex.toBytes(process.env.IV as string)
    
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
    
        const cifraBytes = aesjs.utils.hex.toBytes(cifra)

        return aesjs.utils.utf8.fromBytes(aesCtr.decrypt(cifraBytes))

    }
 
    public static async criptografar(conteudo:string) {

        const key = aesjs.utils.hex.toBytes(process.env.KEY as string)
    
        const iv = aesjs.utils.hex.toBytes(process.env.IV as string)
    
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
    
        const countBytes = aesjs.utils.utf8.toBytes(conteudo)
    
        return aesjs.utils.hex.fromBytes(aesCtr.encrypt(countBytes))
    
    }

}