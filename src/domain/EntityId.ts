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
export abstract class EntityId<Value> extends ValueObject<
  EntityIdProps<Value>
> {
  constructor(value: Value) {
    super({ value, occuredDate: new Date() });
  }

  get occuredDate(): Date {
    return this.props.occuredDate;
  }
  get value(): Value {
    return this.props.value;
  }

  toString(): string {
    const constructorName = this.constructor.name;
    return `${constructorName}(${String(
      this.props.value
    )})-${this.occuredDate.toISOString()}`;
  }

  toValue(): Value {
    return this.props.value;
  }

  equals(entityId: EntityId<Value>): boolean {
    if (entityId === null || entityId === undefined) {
      return false;
    }
    if (!(entityId instanceof this.constructor)) {
      return false;
    }
    return entityId.value === this.value;
  }
}
