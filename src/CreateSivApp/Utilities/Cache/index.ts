import * as path from 'path'
import { TemplateVersion } from '../../Models/TemplateVersion'
import { IsFileExists } from '../FileSystem'

export async function CheckCache(
  cacheDirectoryPath: string,
  version: TemplateVersion
) {
  return IsFileExists(path.resolve(cacheDirectoryPath, version + '.zip'))
}
