import { DomainEvent } from '../../../../shared/domain/DomainEvent.js'

export class UserCreatedEvent extends DomainEvent {
  constructor(userId: string) {
    super(userId)
  }
}
