import { ValueObject } from '../../../../shared/domain/ValueObject.js'
import { PasswordValidateError } from '../errors/PasswordValidateError.js'

export class Password extends ValueObject<string> {
  public constructor(password: string) {
    if (password.length < 8) {
      throw new PasswordValidateError()
    }
    super(password)
  }
}
