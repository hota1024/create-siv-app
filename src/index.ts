import { Command, flags } from '@oclif/command'
import * as path from 'path'

import { BasicContextBuilder } from './CreateSivApp/Builders/Context/BasicContextBuilder'
import { CLICreateSivAppController } from './CreateSivApp/Models/CreateSivAppController/CLICreateSivAppController'

class CreateSivApp extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.string({ char: 'v', description: 'OpenSiv3D version' }),
    select: flags.boolean({
      char: 's',
      description: 'Show version select menu'
    }),
    open: flags.boolean({
      char: 'o',
      description: 'Open application in editor after created'
    })
  }

  static args = [{ name: 'appName' }]

  async run() {
    const { args, flags } = this.parse(CreateSivApp)
    const controller = new CLICreateSivAppController()

    const context = new BasicContextBuilder()
      .setController(controller)
      .setArgs(args)
      .setFlags(flags)
      .setCommand(this)
      .setCacheDirectoryPath(path.resolve(__dirname, '../siv3d-cache/'))
      .setTargetDirectory(__dirname)
      .build()

    await controller.create(context)
  }
}

export = CreateSivApp
