import axios from 'axios'
import { EventEmitter } from 'events'
import { Stream } from 'stream'
import { ITemplateDownloader } from '..'
import { DownloadedTemplate } from '../../Models/DownloadedTemplate'
import { Platform } from '../../Models/Platform'
import { SelectVersion } from '../../Models/SelectVersion'

export class WWWTemplateDownloader extends EventEmitter
  implements ITemplateDownloader {
  constructor(
    public readonly version: SelectVersion,
    private readonly platform: Platform
  ) {
    super()
  }

  async download() {
    const response = await axios.get<Stream>(
      `https://siv3d.jp/downloads/Siv3D/siv3d_v${this.version}_${this.platform}.zip`,
      {
        responseType: 'stream',
        onDownloadProgress: (progress: ProgressEvent) => {
          this.emit('progress', progress)
        }
      }
    )
    return new DownloadedTemplate(
      this.version,
      response.data,
      parseInt(response.headers['content-length'] as string, 10)
    )
  }
}
