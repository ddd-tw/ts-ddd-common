import { ValueObject } from './ValueObject';
interface EntityIdProps<Value> {
    value: Value;
    occuredDate: Date;
}
/**
 * Entity ID is an immutable and unique object used to identiy Entity.
 *
 * @example
 * ```ts
 * class UserId extends EntityId<string> {}
 * class OrderId extends EntityId<number> {}
 * ```
 */
export declare abstract class EntityId<Value> extends ValueObject<EntityIdProps<Value>> {
    constructor(value: Value);
    readonly occuredDate: Date;
    readonly value: Value;
    toString(): string;
    toValue(): Value;
    equals(entityId: EntityId<Value>): boolean;
}
export {};
