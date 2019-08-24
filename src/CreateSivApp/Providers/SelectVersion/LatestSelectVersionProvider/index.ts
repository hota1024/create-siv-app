import axios from 'axios'

import { ISelectVersionProvider } from '..'
import { ProcessPlatformProvider } from '../../Platform/ProcessPlatformProvider'

export class LatestSelectVersionProvider implements ISelectVersionProvider {
  async get() {
    const platform = new ProcessPlatformProvider().get()
    const response = await axios.get<string>(
      'https://raw.githubusercontent.com/Siv3D/OpenSiv3D/master/README.md'
    )

    const readme = response.data
    const exp = new RegExp(`\\| ${platform}.*\\| \\[\\*\\*(.*)\\*\\*\\]`)

    if (readme) {
      const matches = readme.match(exp)
      if (matches) {
        return matches[1]
      }
    }

    throw new Error('Latest version not found.')
  }
}
