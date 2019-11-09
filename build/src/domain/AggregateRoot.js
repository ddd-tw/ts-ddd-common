"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
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
class AggregateRoot extends Entity_1.Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
    }
    addDomainEvents(domainEvents) {
        this._domainEvents.push(...domainEvents);
    }
    clearEvents() {
        this._domainEvents = [];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=AggregateRoot.js.map