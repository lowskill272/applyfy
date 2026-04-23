import { DomainEvent } from './DomainEvent.js'
import { Entity } from './Entity.js'

export abstract class AggregateRoot extends Entity {
  addDomainEvent(event: DomainEvent) {
    this.domainEvents.push(event)
  }
}
