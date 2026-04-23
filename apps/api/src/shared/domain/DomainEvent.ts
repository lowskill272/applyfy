export abstract class DomainEvent {
  protected eventId: string
  protected occurredAt: Date
  protected aggregateId: string

  protected constructor(aggregateId: string) {
    this.eventId = crypto.randomUUID()
    this.occurredAt = new Date()
    this.aggregateId = aggregateId
  }

  public getEventId(): string {
    return this.eventId
  }

  public getOccurredAt(): Date {
    return this.occurredAt
  }

  public getAggregateId(): string {
    return this.aggregateId
  }
}
