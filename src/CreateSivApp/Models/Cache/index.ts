import { SelectVersion } from '../SelectVersion'

export interface ICache {}

export class Cache implements ICache {
  constructor(
    public readonly version: SelectVersion,
    public readonly path: string
  ) {}
}
