import { DomainEvent } from './DomainEvent';
import { EntityId } from '../EntityId';
import { AggregateRoot } from '../AggregateRoot';
declare type DomainEventHandler<T> = (event: T) => void;
export declare class DomainEventPublisher {
    private static instance;
    private handlersMap;
    private constructor();
    static getInstance(): DomainEventPublisher;
    register<T extends DomainEvent>(eventClassName: string, eventHandler: DomainEventHandler<T>): void;
    publishForAggregate<Id extends EntityId<unknown>, Props>(aggregate: AggregateRoot<Id, Props>): void;
    clearHandlers(): void;
    private publish;
    private publishAll;
}
export {};
