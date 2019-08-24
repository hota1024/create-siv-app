import { CreateSivAppContext } from '../..'

export interface IDownloader<T> {
  download(context?: CreateSivAppContext): Promise<T> | T
}
