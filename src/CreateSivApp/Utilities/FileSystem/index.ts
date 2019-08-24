import * as fs from 'fs'
import { promisify } from 'util'

export const ReadDirectory = promisify(fs.readdir)

export const StatFile = promisify(fs.stat)

export const IsFileExists = async (path: fs.PathLike) => {
  try {
    await StatFile(path)
    return true
  } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
}

export const CopyFile = async (target: fs.PathLike, to: fs.PathLike) => {
  fs.createReadStream(target).pipe(fs.createWriteStream(to))
}

export const Rename = promisify(fs.rename)

export const RemoveDirectory = promisify(fs.rmdir)
