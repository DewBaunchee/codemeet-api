export class Base64Encoder {

    public encode(plain: string): string {
        return Buffer.from(plain).toString("base64")
    }

    public decode(encoded: string): string {
        return Buffer.from(encoded, "base64").toString("ascii")
    }
}