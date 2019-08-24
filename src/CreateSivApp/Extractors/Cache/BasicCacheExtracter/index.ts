import * as path from 'path'
import * as unzipper from 'unzipper'
import { CreateSivAppContext } from '../../..'
import { Cache } from '../../../Models/Cache'
import { TargetDirectory } from '../../../Models/TargetDirectory'
import {
  ReadDirectory,
  RemoveDirectory,
  Rename
} from '../../../Utilities/FileSystem'
import * as Str from '../../../Utilities/Str'
import { ICacheExtractor } from '../../Cache'

export class BasicCacheExtractor implements ICacheExtractor {
  constructor(
    private readonly targetDirectory: TargetDirectory,
    private readonly appName: string
  ) {}

  async extract(_context: CreateSivAppContext, cache: Cache) {
    const tempName = `create-siv-app-temp-${Str.Random(32)}`
    const tempPath = path.resolve(this.targetDirectory, tempName)

    try {
      await unzipper.Open.file(cache.path).then(zip =>
        zip.extract({
          path: tempPath
        })
      )
      const files = await ReadDirectory(tempPath)
      await Rename(
        path.resolve(tempPath, files[0]),
        path.resolve(
          this.targetDirectory,
          path.resolve(this.targetDirectory, this.appName)
        )
      )
    } finally {
      await RemoveDirectory(tempPath)
    }
  }
}
