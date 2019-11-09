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
export declare abstract class DomainEvent {
    readonly occuredOn: Date;
    constructor();
}
