"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("./ValueObject");
/**
 * Entity ID is an immutable and unique object used to identiy Entity.
 *
 * @example
 * ```ts
 * class UserId extends EntityId<string> {}
 * class OrderId extends EntityId<number> {}
 * ```
 */
class EntityId extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value, occuredDate: new Date() });
    }
    get occuredDate() {
        return this.props.occuredDate;
    }
    get value() {
        return this.props.value;
    }
    toString() {
        const constructorName = this.constructor.name;
        return `${constructorName}(${String(this.props.value)})-${this.occuredDate.toISOString()}`;
    }
    toValue() {
        return this.props.value;
    }
    equals(entityId) {
        if (entityId === null || entityId === undefined) {
            return false;
        }
        if (!(entityId instanceof this.constructor)) {
            return false;
        }
        return entityId.value === this.value;
    }
}
exports.EntityId = EntityId;
//# sourceMappingURL=EntityId.js.map