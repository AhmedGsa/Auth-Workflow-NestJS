import * as bcrypt from 'bcryptjs'
export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}