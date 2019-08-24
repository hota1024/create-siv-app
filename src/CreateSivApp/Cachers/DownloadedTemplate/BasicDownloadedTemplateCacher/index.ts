import { EventEmitter } from 'events'
import * as fs from 'fs'
import * as path from 'path'
import * as progress from 'progress-stream'
import { IDownloadedTemplateCacher } from '..'
import { CreateSivAppContext } from '../../..'
import { Cache } from '../../../Models/Cache'
import { DownloadedTemplate } from '../../../Models/DownloadedTemplate'

export class BasicDownloadedTemplateCacher extends EventEmitter
  implements IDownloadedTemplateCacher {
  async cache(context: CreateSivAppContext, template: DownloadedTemplate) {
    const cachePath = path.resolve(
      context.cacheDirectoryPath,
      `${template.version}.zip`
    )
    const progressStream = progress({
      length: template.size
    })
    progressStream.on('progress', progress => this.emit('progress', progress))
    const stream = template.stream
      .pipe(progressStream)
      .pipe(fs.createWriteStream(cachePath))

    return new Promise<Cache>((resolve, reject) => {
      stream.on('finish', () => resolve(new Cache(template.version, cachePath)))
      stream.on('error', reject)
    })
  }
}
