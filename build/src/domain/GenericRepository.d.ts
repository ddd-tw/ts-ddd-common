import { AggregateRoot } from './AggregateRoot';
import { EntityId } from './EntityId';
export interface GenericRepository<Id extends EntityId<unknown>, A extends AggregateRoot<Id, {}>> {
    nextId(): Id;
    exist(id: Id): Promise<boolean>;
    getById(id: Id): Promise<A | undefined>;
    save(entity: A): Promise<void>;
    remove(id: Id): Promise<void>;
}
