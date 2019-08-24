/**
 * Reference: https://stackoverflow.com/questions/40201533/sort-version-dotted-number-strings-in-javascript?answertab=votes#tab-top
 */

import { ISelectVersionProvider } from '..'
import { CreateSivAppContext } from '../../..'
import { LocalVersionsProvider } from '../../LocalVersionsProvider'

export class LocalLatestVersionProvider implements ISelectVersionProvider {
  async get(context: CreateSivAppContext) {
    const versions = await new LocalVersionsProvider().get(context)

    return versions[versions.length - 1]
  }
}
