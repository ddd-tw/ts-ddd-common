"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityId_1 = require("../EntityId");
const AggregateRoot_1 = require("../AggregateRoot");
class TestEntityId extends EntityId_1.EntityId {
}
class TestAggregateRoot extends AggregateRoot_1.AggregateRoot {
    static create(id) {
        return new TestAggregateRoot(id, {});
    }
}
describe('Aggregate Root', () => {
    it('should be created', () => {
        const testEntityId = new TestEntityId('123456');
        const testAggregateRoot = TestAggregateRoot.create(testEntityId);
        expect(testAggregateRoot.id.equals(testEntityId)).toBeTruthy();
    });
});
//# sourceMappingURL=AggregateRoot.spec.js.map