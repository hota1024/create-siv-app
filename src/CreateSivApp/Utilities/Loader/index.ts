import { CreateSivAppContext } from '../..'

export interface ILoader<T> {
  load(context?: CreateSivAppContext): Promise<T> | T
}
