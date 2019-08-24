import Command from '@oclif/command'

import { CreateSivAppContext } from '../../..'
import { ICreateSivAppController } from '../../../Controller'
import {
  BuilderValueNotSetException,
  IBuilder
} from '../../../Utilities/Builder'

export class BasicContextBuilder implements IBuilder<CreateSivAppContext> {
  private controller?: ICreateSivAppController
  private args?: any
  private flags?: any
  private command?: Command
  private cacheDirectoryPath?: string
  private targetDirectory?: string

  setController(controller: ICreateSivAppController) {
    this.controller = controller
    return this
  }

  setArgs(args: any) {
    this.args = args
    return this
  }

  setFlags(flags: any) {
    this.flags = flags
    return this
  }

  setCommand(command: Command) {
    this.command = command
    return this
  }

  setCacheDirectoryPath(cacheDirectoryPath: string) {
    this.cacheDirectoryPath = cacheDirectoryPath
    return this
  }

  setTargetDirectory(targetDirectory: string) {
    this.targetDirectory = targetDirectory
    return this
  }

  build() {
    if (!this.controller) throw new BuilderValueNotSetException('controller')
    if (!this.args) throw new BuilderValueNotSetException('args')
    if (!this.flags) throw new BuilderValueNotSetException('flags')
    if (!this.command) throw new BuilderValueNotSetException('command')
    if (!this.cacheDirectoryPath)
      throw new BuilderValueNotSetException('cacheDirectoryPath')
    if (!this.targetDirectory)
      throw new BuilderValueNotSetException('targetDirectory')

    const context: CreateSivAppContext = {
      ...this.controller,
      args: this.args,
      flags: this.flags,
      command: this.command,
      cacheDirectoryPath: this.cacheDirectoryPath,
      targetDirectory: this.targetDirectory
    }

    return context
  }
}
