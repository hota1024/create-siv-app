import { Platform } from '../../Models/Platform'
import { IProvider } from '../../Utilities/Provider'

export interface IPlatformProvider extends IProvider<Platform> {}

export class UnsuporttedPlatformException extends Error {
  public name = 'UnsuporttedPlatformException'

  constructor(private readonly platform: string) {
    super()
  }

  toString() {
    return `${this.platform} is not suportted.`
  }
}
