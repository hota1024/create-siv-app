import Command from '@oclif/command'

import { ICreateSivAppController } from './Controller'

export interface CreateSivAppContext extends ICreateSivAppController {
  args: any
  flags: any
  command: Command
  cacheDirectoryPath: string
  targetDirectory: string
}
