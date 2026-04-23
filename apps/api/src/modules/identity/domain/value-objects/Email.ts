import { ValueObject } from '../../../../shared/domain/ValueObject.js'
import { EmailValidateError } from '../errors/EmailValidateError.js'

export class Email extends ValueObject<string> {
  private static readonly REG_EXP: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/
  public constructor(email: string) {
    if (!Email.REG_EXP.test(email)) {
      throw new EmailValidateError()
    }
    super(email)
  }
}
