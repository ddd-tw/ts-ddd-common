"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class TestRepository {
    nextId() {
        return new TestEntityId('');
    }
    constructor() {
        this.tests = [];
    }
    exist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tests.some(test => test.id.equals(id));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tests.find(test => test.id.equals(id));
        });
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.exist(entity.id)) {
                const targetIndex = this.tests.findIndex(test => test.id.equals(entity.id));
                this.tests.splice(targetIndex, 1, entity);
            }
            else {
                this.tests.push(entity);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.exist(id)) {
                const targetIndex = this.tests.findIndex(test => test.id.equals(id));
                this.tests.splice(targetIndex, 1);
            }
        });
    }
}
describe('Repository', () => {
    const idValue = '123456';
    const testEntityId = new TestEntityId(idValue);
    const testEntity = TestAggregateRoot.create(testEntityId);
    const repo = new TestRepository();
    it('should create successfully', () => __awaiter(this, void 0, void 0, function* () {
        repo.save(testEntity);
        expect(repo.tests.length).toBe(1);
        const foundEntity = yield repo.getById(testEntityId);
        expect(foundEntity).toBe(testEntity);
        const existed = yield repo.exist(testEntityId);
        expect(existed).toBeTruthy();
        yield repo.remove(testEntityId);
        expect(repo.tests.length).toBe(0);
    }));
});
//# sourceMappingURL=GenericRepository.spec.js.map