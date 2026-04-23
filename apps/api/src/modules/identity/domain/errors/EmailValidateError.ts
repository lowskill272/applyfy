export class EmailValidateError extends Error {
  constructor() {
    super('Invalid email format')
  }
}
