import { DomainEvent } from './DomainEvent.js'

export abstract class Entity {
  protected domainEvents: DomainEvent[] = []
  protected constructor(protected readonly id: string) {}

  equals(other: Entity): boolean {
    return this.id === other.id
  }

  pullEvents(): DomainEvent[] {
    return this.domainEvents.splice(0)
  }
}
