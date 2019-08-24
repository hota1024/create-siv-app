import { CreateSivAppContext } from '../..'
import { SelectVersion } from '../../Models/SelectVersion'
import { ReadDirectory } from '../../Utilities/FileSystem'
import { IProvider } from '../../Utilities/Provider'

export interface ILocalVersionsProvider extends IProvider<SelectVersion[]> {}

export class LocalVersionsProvider implements ILocalVersionsProvider {
  async get(context: CreateSivAppContext) {
    const files = await ReadDirectory(context.cacheDirectoryPath)
    const versions = files
      .map(file => file.replace(/\.zip$/, ''))
      .filter(file => file.match(/\d*\.\d*\.\d*/))

    return versions
  }
}
