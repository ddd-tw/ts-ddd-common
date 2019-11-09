import { Entity } from './Entity';
import { EntityId } from './EntityId';
import { DomainEvent } from './event/DomainEvent';

/**
 * Aggregate Root is an Entity selected to be the representative of an aggregate.
 *
 * @example
 * ```ts
 * class UserId extends EntityId<string> {}
 * interface UserProps {
 *   name: string;
 * }
 * class User extends AggregateRoot<UserId, UserProps> {
 *   get name() {
 *     return this.props.name;
 *   }
 *   changeName(name: string) {
 *     this.props.name = name
 *   }
 * }
 * const user = new User(new UserId('1'), { name: 'Dan' })
 * ```
 */
export abstract class AggregateRoot<
  Id extends EntityId<unknown>,
  Props
> extends Entity<Id, Props> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  protected addDomainEvents(domainEvents: DomainEvent[]): void {
    this._domainEvents.push(...domainEvents);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }
}
