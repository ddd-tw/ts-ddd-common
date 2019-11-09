"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class Entity {
    constructor(id, props) {
        this.id = id;
        this.props = props;
    }
    /**
     * For testing usage
     */
    getProps() {
        return this.props;
    }
    equals(obj) {
        if (obj == null || obj === undefined) {
            return false;
        }
        const isEntity = (v) => {
            return v instanceof Entity;
        };
        if (!isEntity(obj)) {
            return false;
        }
        return this.id.equals(obj.id);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map