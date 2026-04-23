export class PasswordValidateError extends Error {
  constructor() {
    super('Invalid password format')
  }
}
