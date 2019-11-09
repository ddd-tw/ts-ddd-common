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
export declare abstract class ValueObject<Props extends {}> {
    props: Readonly<Props>;
    constructor(props: Props);
    /**
     * Check equality by shallow equals of properties.
     * It can be override.
     */
    equals(obj?: ValueObject<Props>): boolean;
}
