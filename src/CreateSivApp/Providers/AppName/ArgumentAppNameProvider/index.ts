import { IAppNameProvider } from '..'
import { CreateSivAppContext } from '../../..'

export class ArgumentAppNameProvider implements IAppNameProvider {
  get(context: CreateSivAppContext) {
    return context.args.appName
  }
}
