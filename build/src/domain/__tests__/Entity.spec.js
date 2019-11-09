"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityId_1 = require("../EntityId");
const Entity_1 = require("../Entity");
class TestEntityId extends EntityId_1.EntityId {
}
class TestEntity extends Entity_1.Entity {
    changeAll(params) {
        this.setName(params.name);
        this.setEmail(params.email);
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    setName(name) {
        if (name === '') {
            throw new Error('');
        }
        this.props.name = name;
    }
    setEmail(email) {
        if (email === '' || !email.includes('@')) {
            throw new Error('');
        }
        this.props.email = email;
    }
    static create(params) {
        return new TestEntity(new TestEntityId(params.id), {
            name: params.name,
            email: params.email,
        });
    }
}
describe('Entity', () => {
    const name = 'test';
    const email = 'test@mail.com';
    const idValue = '123456';
    const testEntityId = new TestEntityId(idValue);
    const testEntity = TestEntity.create({ id: idValue, name, email });
    it('should be created with correct values', () => {
        expect(testEntity.id.equals(testEntityId)).toBeTruthy();
    });
    it('should be mutable', () => {
        const newName = 'test2';
        const newEmail = 'test2@mail.com';
        testEntity.changeAll({
            name: newName,
            email: newEmail,
        });
        const receviedProps = testEntity.getProps();
        expect(receviedProps.name).toBe(newName);
        expect(receviedProps.email).toBe(newEmail);
    });
    it('should have equality', () => {
        const testEntity = TestEntity.create({ id: idValue, name, email });
        const testEntityWithDifferentId = TestEntity.create({
            id: '654321',
            name,
            email,
        });
        expect(testEntity.equals(testEntity)).toBeTruthy();
        expect(testEntityWithDifferentId.equals(testEntity)).toBeFalsy();
        expect(testEntity.equals()).toBeFalsy();
    });
});
//# sourceMappingURL=Entity.spec.js.map