interface LiteralObject {
  [index: string]: unknown;
}

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
export abstract class ValueObject<Props extends {}> {
  props: Readonly<Props>;

  constructor(props: Props) {
    this.props = Object.freeze(props);
  }

  /**
   * Check equality by shallow equals of properties.
   * It can be override.
   */
  equals(obj?: ValueObject<Props>): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }
    if (obj.props === undefined) {
      return false;
    }
    const shallowObjectEqual = (
      props1: LiteralObject,
      props2: LiteralObject
    ) => {
      const keys1 = Object.keys(props2);
      const keys2 = Object.keys(props1);

      if (keys1.length !== keys2.length) {
        return false;
      }
      interface EqualLike<T> {
        equals(obj: T): boolean;
      }
      return keys1.every(key => {
        if (!props2.hasOwnProperty(key)) {
          return false;
        }
        const v1 = props2[key];
        const v2 = props2[key];

        if (
          (v1 as EqualLike<typeof v1>).hasOwnProperty('equals') &&
          (v2 as EqualLike<typeof v2>).hasOwnProperty('equals')
        ) {
          return (v1 as EqualLike<typeof v1>).equals(
            v2 as EqualLike<typeof v2>
          );
        }
        return v1 === v2;
      });
    };
    return shallowObjectEqual(this.props, obj.props);
  }
}
