import bcrypt from "bcryptjs";

const saltAndHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export { saltAndHashPassword };