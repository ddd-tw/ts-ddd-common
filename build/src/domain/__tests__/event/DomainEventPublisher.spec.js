"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityId_1 = require("../../EntityId");
const AggregateRoot_1 = require("../../AggregateRoot");
const DomainEventPublisher_1 = require("../../event/DomainEventPublisher");
const DomainEvent_1 = require("../../event/DomainEvent");
class OrderId extends EntityId_1.EntityId {
}
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PROCESSING"] = 0] = "PROCESSING";
    OrderStatus[OrderStatus["CLOSED"] = 1] = "CLOSED";
})(OrderStatus || (OrderStatus = {}));
class OrderClosedEvent extends DomainEvent_1.DomainEvent {
    constructor(orderId) {
        super();
        this.orderId = orderId;
    }
}
class Order extends AggregateRoot_1.AggregateRoot {
    static getClosedOrder(orderId) {
        return new Order(new OrderId(orderId), {
            status: OrderStatus.CLOSED,
        });
    }
    static placeOrder(orderId) {
        return new Order(new OrderId(orderId), {
            status: OrderStatus.PROCESSING,
        });
    }
    get status() {
        return this.props.status;
    }
    closeOrder() {
        if (this.props.status === OrderStatus.PROCESSING) {
            this.props.status = OrderStatus.CLOSED;
            this.addDomainEvent(new OrderClosedEvent(this.id));
            // DomainEventPublisher.getInstance().publish(new OrderClosedEvent(this.id));
        }
    }
}
describe('Domain Events Publisher', () => {
    beforeEach(() => {
        DomainEventPublisher_1.DomainEventPublisher.getInstance().clearHandlers();
    });
    describe('Given a domain model', () => {
        it('should publish a domain event and the event should be handled', () => {
            const orderIdStr = '123456789';
            const order = Order.placeOrder(orderIdStr);
            const mockHandler = jest.fn((event) => {
                const { orderId } = event;
                expect(orderId.equals(order.id)).toBeTruthy();
            });
            DomainEventPublisher_1.DomainEventPublisher.getInstance().register(OrderClosedEvent.name, mockHandler);
            order.closeOrder();
            DomainEventPublisher_1.DomainEventPublisher.getInstance().publishForAggregate(order);
            expect(order.status).toBe(OrderStatus.CLOSED);
            expect(mockHandler).toHaveBeenCalledTimes(1);
            const calledEventOrderId = mockHandler.mock.calls[0][0].orderId;
            expect(calledEventOrderId.value).toBe(orderIdStr);
        });
        it('should not publish any domain since command failed', () => {
            const order = Order.getClosedOrder('123456789');
            const mockHandler = jest.fn((event) => { });
            DomainEventPublisher_1.DomainEventPublisher.getInstance().register(OrderClosedEvent.name, mockHandler);
            order.closeOrder();
            DomainEventPublisher_1.DomainEventPublisher.getInstance().publishForAggregate(order);
            expect(order.status).toBe(OrderStatus.CLOSED);
            expect(mockHandler).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=DomainEventPublisher.spec.js.map