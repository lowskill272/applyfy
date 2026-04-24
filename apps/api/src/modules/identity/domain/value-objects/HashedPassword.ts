import { ValueObject } from '../../../../shared/domain/ValueObject.js'

export class HashedPassword extends ValueObject<string> {
  public constructor(password: string) {
    super(password)
  }
}
