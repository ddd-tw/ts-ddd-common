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
export declare abstract class AggregateRoot<Id extends EntityId<unknown>, Props> extends Entity<Id, Props> {
    private _domainEvents;
    readonly domainEvents: DomainEvent[];
    protected addDomainEvent(domainEvent: DomainEvent): void;
    protected addDomainEvents(domainEvents: DomainEvent[]): void;
    clearEvents(): void;
}
