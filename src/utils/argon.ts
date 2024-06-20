import * as argon from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  return argon.hash(password);
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return argon.verify(hash, password);
};