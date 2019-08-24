import { ISelectVersionProvider } from '..'
import { CreateSivAppContext } from '../../..'
import { FlagSelectVersionProvider } from '../FlagSelectVersionProvider'
import { InputSelectVersionProvider } from '../InputSelectVersionProvider'
import { LatestSelectVersionProvider } from '../LatestSelectVersionProvider'
import { LocalLatestVersionProvider } from '../LocalLatestVersionProvider'

export class CLISelectVersionProvider implements ISelectVersionProvider {
  async get(context: CreateSivAppContext) {
    const flag = new FlagSelectVersionProvider()
    const latest = new LatestSelectVersionProvider()
    const localLatest = new LocalLatestVersionProvider()
    const input = new InputSelectVersionProvider()

    if (context.flags.select) return input.get(context)
    if (context.flags.version) return flag.get(context)

    try {
      const version = await latest.get()
      return version
      // tslint:disable-next-line: no-unused
    } catch (error) {
      context.command.warn(
        `Use the latest local version because this device is not connected to the network.`
      )
      return localLatest.get(context)
    }
  }
}
