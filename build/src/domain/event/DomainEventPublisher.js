"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainEventPublisher {
    constructor() {
        this.handlersMap = {};
    }
    static getInstance() {
        if (!DomainEventPublisher.instance) {
            DomainEventPublisher.instance = new DomainEventPublisher();
        }
        return DomainEventPublisher.instance;
    }
    register(eventClassName, eventHandler) {
        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = [
                eventHandler,
            ];
        }
        else {
            this.handlersMap[eventClassName].push(eventHandler);
        }
    }
    publishForAggregate(aggregate) {
        const events = aggregate.domainEvents;
        this.publishAll(events);
        aggregate.clearEvents();
    }
    clearHandlers() {
        this.handlersMap = {};
    }
    publish(event) {
        const eventClassName = event.constructor.name;
        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            const handlers = this.handlersMap[eventClassName];
            for (const handler of handlers) {
                handler(event);
            }
        }
    }
    publishAll(events) {
        for (const event of events) {
            this.publish(event);
        }
    }
}
exports.DomainEventPublisher = DomainEventPublisher;
//# sourceMappingURL=DomainEventPublisher.js.map