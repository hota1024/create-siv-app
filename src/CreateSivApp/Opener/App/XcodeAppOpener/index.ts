import { IAppOpener } from '..'
import { App } from '../../../Models/App'
import { Exec } from '../../../Utilities/Exec'

export class XcodeAppOpener implements IAppOpener {
  async open(app: App) {
    await Exec(`open ${app.path}/examples/empty/empty.xcodeproj`)
  }
}
