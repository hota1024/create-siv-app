import cli from 'cli-ux'
import * as inquirer from 'inquirer'

import { ISelectVersionProvider } from '..'
import { CreateSivAppContext } from '../../..'
import { LocalVersionsProvider } from '../../LocalVersionsProvider'

export class InputSelectVersionProvider implements ISelectVersionProvider {
  async get(context: CreateSivAppContext) {
    const versions = await new LocalVersionsProvider().get(context)

    const responses = await inquirer.prompt([
      {
        name: 'version',
        message: 'select OpenSiv3D version',
        type: 'list',
        choices: [
          ...versions.map(version => ({
            name: version
          })),
          {
            name: 'custom',
            value: undefined
          }
        ]
      }
    ])

    if (responses.version) return responses.version

    return cli.prompt(`What's the version of OpenSiv3D?(ex: 0.4.0)`)
  }
}
