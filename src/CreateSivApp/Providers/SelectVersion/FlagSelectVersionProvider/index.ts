import { ISelectVersionProvider } from '..'
import { CreateSivAppContext } from '../../..'

export class FlagSelectVersionProvider implements ISelectVersionProvider {
  get(context: CreateSivAppContext) {
    return context.flags.version
  }
}
