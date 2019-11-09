"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Domain Event is an important event we need to handle in the system.
 *
 * @example
 * ```ts
 * class UserRegistered extends DomainEvent {
 *   userId: UserId,
 *   constructor(userId: UserId) {
 *     super();
 *     this.userId = userId;
 *   }
 * }
 *
 * ```
 */
class DomainEvent {
    constructor() {
        this.occuredOn = new Date();
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=DomainEvent.js.map