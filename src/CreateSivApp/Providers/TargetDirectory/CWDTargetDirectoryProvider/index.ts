import { ITargetDirectoryProvider } from '..'

export class CWDTargetDirectoryProvider implements ITargetDirectoryProvider {
  get() {
    return process.cwd()
  }
}
