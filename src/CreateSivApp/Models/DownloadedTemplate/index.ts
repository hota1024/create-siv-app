import { Stream } from 'stream'
import { SelectVersion } from '../SelectVersion'

export class DownloadedTemplate {
  constructor(
    public readonly version: SelectVersion,
    public readonly stream: Stream,
    public readonly size: number
  ) {}
}
