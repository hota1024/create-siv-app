import { IPlatformProvider, UnsuporttedPlatformException } from '..'

export class ProcessPlatformProvider implements IPlatformProvider {
  get() {
    const processPlatform = process.platform

    if (processPlatform === 'darwin') return 'macOS'
    if (processPlatform === 'linux') return 'linux'

    throw new UnsuporttedPlatformException(processPlatform)
  }
}
