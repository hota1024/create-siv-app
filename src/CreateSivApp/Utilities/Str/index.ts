export const Random = (
  length: number,
  chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
) => {
  let str = ''

  for (let i = 0; i < length; ++i)
    str += chars[Math.floor(Math.random() * chars.length)]

  return str
}
