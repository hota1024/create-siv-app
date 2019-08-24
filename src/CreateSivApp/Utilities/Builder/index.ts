export interface IBuilder<T> {
  build(): Promise<T> | T
}

export class BuilderValueNotSetException extends Error {
  public name = 'BuilderValueNotSetException'

  constructor(private readonly valueName: string) {
    super()
  }

  toString() {
    return `${this.valueName} is not setted.`
  }
}
