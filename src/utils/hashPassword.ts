import { hash } from "bcryptjs";

export interface HashPassword {
  (password: string): Promise<string>;
}

export async function hashPassword(password: string): Promise<string> {
  try {
    const hashed = await hash(password, 10);
    return hashed;
  } catch (error) {
    throw error;
  }
}
