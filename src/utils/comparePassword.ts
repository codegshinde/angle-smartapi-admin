import { compare } from "bcryptjs";

export interface ComparePassword {
  (plain: string, hashed: string | any): Promise<boolean>;
}

/**
 * Compares a plain text password with a hashed password.
 *
 * @param {string} plain - The plain text password.
 * @param {string} hashed - The hashed password to compare against.
 * @throws {Error} If the authentication fails.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match.
 */
export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  try {
    const isMatched = await compare(plain, hashed);

    if (!isMatched) {
      throw new Error("Authentication failed. Please check your login credentials.");
    }

    return true;
  } catch (error) {
    throw error;
  }
}
