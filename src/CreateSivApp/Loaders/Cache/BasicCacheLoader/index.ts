import { ICacheLoader } from '..'
import { CreateSivAppContext } from '../../..'
import { Cache } from '../../../Models/Cache'
import * as path from 'path'
import { SelectVersion } from '../../../Models/SelectVersion'

export class BasicCacheLoader implements ICacheLoader {
  constructor(private readonly version: SelectVersion) {}

  async load(context: CreateSivAppContext) {
    return new Cache(
      this.version,
      path.resolve(context.cacheDirectoryPath, `${this.version}.zip`)
    )
  }
}
