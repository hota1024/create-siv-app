import { Cache } from '../../Models/Cache'
import { DownloadedTemplate } from '../../Models/DownloadedTemplate'
import { ICacher } from '../../Utilities/Cacher'

export interface IDownloadedTemplateCacher
  extends ICacher<DownloadedTemplate, Cache> {}
