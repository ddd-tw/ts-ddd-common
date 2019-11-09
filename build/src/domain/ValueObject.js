"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Value Object is an immutable object and defined by its properties.
 *
 * ## Why explicit props?
 *
 * I want to leave the decision to the subclass on which properties getters and setters should be defined.
 *
 * @example
 * ```ts
 * interface FullNameProps {
 *   first: string;
 *   middle: string;
 *   last: string;
 * }
 * class FullName extends ValueObject<Props> {}
 * const name = new FullName({ first: 'Dan', middle: 'JJ', last: 'Brown' });
 * ```
 */
class ValueObject {
    constructor(props) {
        this.props = Object.freeze(props);
    }
    /**
     * Check equality by shallow equals of properties.
     * It can be override.
     */
    equals(obj) {
        if (obj === null || obj === undefined) {
            return false;
        }
        if (obj.props === undefined) {
            return false;
        }
        const shallowObjectEqual = (props1, props2) => {
            const keys1 = Object.keys(props2);
            const keys2 = Object.keys(props1);
            if (keys1.length !== keys2.length) {
                return false;
            }
            return keys1.every(key => props2.hasOwnProperty(key) && props2[key] === props1[key]);
        };
        return shallowObjectEqual(this.props, obj.props);
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=ValueObject.js.map