export interface IOpener<T> {
  open(value: T): Promise<void> | void
}
