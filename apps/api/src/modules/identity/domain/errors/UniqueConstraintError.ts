export class UniqueConstraintError extends Error {
  constructor() {
    super('Invalid user unique constraint')
  }
}
