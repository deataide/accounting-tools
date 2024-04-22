export interface EncryptInput {
    password: string;
}

export interface DecryptInput {
    hashedPassword: string;
    attemptPassword: string
}


export abstract class EncryptAdapter {
    abstract encrypt(input: EncryptInput): Promise<string | null>;
    abstract compareCrypt(input: DecryptInput): Promise<true | null>;
}