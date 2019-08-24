import { CreateSivAppContext } from '..'

export interface ICreateSivAppController {
  create(context?: CreateSivAppContext): Promise<void>
}
