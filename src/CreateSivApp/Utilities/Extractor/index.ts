import { CreateSivAppContext } from '../..'

export interface IExtractor<T, R = any> {
  extract(context: CreateSivAppContext, value: T): Promise<R> | R
}
