# Shipmozo SDK

A Node.js SDK for the Shipmozo API, allowing easy integration for order management, shipping, and tracking.

## Installation

```bash
npm install shipmozo-sdk
```

## Usage

### Initialization

```typescript
import { Shipmozo } from 'shipmozo-sdk';

const client = new Shipmozo({
  publicKey: 'YOUR_PUBLIC_KEY',
  privateKey: 'YOUR_PRIVATE_KEY'
});
```

### Creating an Order (Standard)

```typescript
const order = await client.pushOrder({
  order_id: "ORD-001",
  order_date: "2023-10-27",
  consignee_name: "John Doe",
  consignee_phone: 9876543210,
  consignee_address_line_one: "123 Main St",
  consignee_pin_code: 110001,
  consignee_city: "New Delhi",
  consignee_state: "Delhi",
  product_detail: [
    {
      name: "T-Shirt",
      sku_number: "TSH-001",
      quantity: 1,
      unit_price: 500
    }
  ],
  payment_type: "PREPAID",
  weight: 500,
  length: 10,
  width: 10,
  height: 5,
  warehouse_id: "WH-123"
});
```

### Creating an MPS Order (Multi-Piece Shipment)

This SDK supports MPS orders where `dimensions` is an array of box details and `type_of_package` includes "MPS".

```typescript
const mpsOrder = await client.pushOrder({
  order_id: "MPS-001",
  order_date: "2025-08-04",
  consignee_name: "Ranvijay",
  consignee_phone: 8090908090,
  consignee_address_line_one: "Sector 49",
  consignee_pin_code: "122018",
  consignee_city: "Gurugram",
  consignee_state: "Haryana",
  product_detail: [
    {
      name: "Chair",
      sku_number: "121345",
      quantity: "4",
      unit_price: 5000
    }
  ],
  payment_type: "PREPAID",
  weight: 2000,
  warehouse_id: "64832",
  type_of_package: ["B2B", "MPS"],
  dimensions: [
    {
      no_of_box: "3",
      length: "10",
      width: "15",
      height: "20"
    },
    {
      no_of_box: "15",
      length: 30,
      width: 13,
      height: 20
    }
  ]
});
```

### Other Methods

*   `info()`: Check API status.
*   `pushReturnOrder(payload)`: Create a return order.
*   `assignCourier(payload)`: Manually assign a courier.
*   `schedulePickup(orderId)`: Schedule a pickup.
*   `cancelOrder(payload)`: Cancel an order.
*   `autoAssignOrder(orderId)`: Auto-assign courier.
*   `getOrderDetail(orderId)`: Fetch order details.
*   `calculateRate(payload)`: Get shipping rates.
*   `checkPincodeServiceability(payload)`: Check if a pincode is serviceable.
*   `getReturnReasons()`: List valid return reasons.
*   `getOrderLabel(awbNumber)`: Get the shipping label (Base64).
*   `trackOrder(awbNumber)`: Track shipment.
*   `createWarehouse(payload)`: Create a new warehouse.
*   `updateWarehouse(orderId, warehouseId)`: Update order warehouse.
*   `getWarehouses()`: List all warehouses.
