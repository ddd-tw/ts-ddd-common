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
export abstract class Entity<Id extends EntityId<unknown>, Props> {
  readonly id: Id;
  protected props: Props;

  constructor(id: Id, props: Props) {
    this.id = id;
    this.props = props;
  }

  /**
   * For testing usage
   */
  getProps() {
    return this.props;
  }

  equals(obj?: Entity<Id, Props>): boolean {
    if (obj == null || obj === undefined) {
      return false;
    }

    const isEntity = (v: unknown): v is Entity<Id, Props> => {
      return v instanceof Entity;
    };
    if (!isEntity(obj)) {
      return false;
    }

    return this.id.equals(obj.id);
  }
}
