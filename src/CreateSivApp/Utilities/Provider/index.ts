import { CreateSivAppContext } from '../..'

export interface IProvider<T> {
  get(context?: CreateSivAppContext): T | Promise<T>
}
