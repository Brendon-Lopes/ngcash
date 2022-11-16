import bcrypt from 'bcrypt'

class PasswordHandler {
  public static async hash (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  public static async compare (
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}

export default PasswordHandler
