import { EntityId } from './EntityId';
/**
 * Entity is an object with lifecycle and defined by its ID.
 *
 * ## Why explicit props?
 *
 * I want to leave the decision to the subclass on which properties getters and setters should be defined.
 *
 * @example
 * ```ts
 * class UserId extends EntityId<string> {}
 * interface UserProps {
 *   name: string;
 * }
 * class User extends Entity<UserId, UserProps> {
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
export declare abstract class Entity<Id extends EntityId<unknown>, Props> {
    readonly id: Id;
    protected props: Props;
    constructor(id: Id, props: Props);
    /**
     * For testing usage
     */
    getProps(): Props;
    equals(obj?: Entity<Id, Props>): boolean;
}
