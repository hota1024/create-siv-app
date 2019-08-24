import { CreateSivAppContext } from '../..'

export interface ICacher<T, R = any> {
  cache(context: CreateSivAppContext, value: T): Promise<R> | R
}
