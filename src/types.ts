export interface ShipmozoConfig {
  publicKey: string;
  privateKey: string;
  baseUrl?: string;
}

export interface ApiResponse<T = any> {
  result: "1" | "0";
  message: string;
  data: T;
}

export interface ProductDetail {
  name: string;
  sku_number: string;
  quantity: number | string;
  discount?: string;
  hsn?: string;
  unit_price: number;
  product_category?: string;
}

export interface Dimension {
  no_of_box: string | number;
  length: string | number;
  width: string | number;
  height: string | number;
}

export interface OrderPayload {
  order_id: string;
  order_date: string; // YYYY-MM-DD
  order_type?: string;
  consignee_name: string;
  consignee_phone: number | string;
  consignee_alternate_phone?: number | string;
  consignee_email?: string;
  consignee_address_line_one: string;
  consignee_address_line_two?: string;
  consignee_pin_code: number | string;
  consignee_city: string;
  consignee_state: string;
  product_detail: ProductDetail[];
  payment_type: "PREPAID" | "COD";
  cod_amount?: string;
  weight: number; // in grams
  
  // Standard Dimensions
  length?: number;
  width?: number;
  height?: number;

  // MPS / Rate Calculator Dimensions
  dimensions?: Dimension[];

  warehouse_id: string;
  gst_ewaybill_number?: string;
  gstin_number?: string;
  
  // Supports "SPS" or ["B2B", "MPS"]
  type_of_package?: string | string[];
  rov_type?: string; // e.g. "ROV_OWNER"
  order_amount?: number;
  shipment_type?: string; // e.g., "FORWARD", "RETURN"
}

export interface PushOrderResponse {
  Info?: string;
  order_id: string;
  reference_id: string;
}

export interface ReturnOrderPayload {
  order_id: string;
  order_date: string;
  order_type?: string;
  pickup_name: string;
  pickup_phone: number | string;
  pickup_email?: string;
  pickup_address_line_one: string;
  pickup_address_line_two?: string;
  pickup_pin_code: number | string;
  pickup_city: string;
  pickup_state: string;
  product_detail: ProductDetail[];
  payment_type: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  warehouse_id?: string;
  return_reason_id: number;
  customer_request: string; // e.g., "REFUND"
  reason_comment?: string;
}

export interface AssignCourierPayload {
  order_id: string;
  courier_id: number;
}

export interface AssignCourierResponse {
  order_id: string;
  reference_id: string;
  courier: string;
}

export interface SchedulePickupResponse {
  order_id: string;
  reference_id: string;
  courier: string;
  awb_number: string;
  lr_number: string;
}

export interface CancelOrderPayload {
  order_id: string;
  awb_number: number | string;
}

export interface AutoAssignOrderResponse {
  order_id: string;
  reference_id: string;
  awb_number: string;
  courier_company: string;
  courier_company_service: string;
}

export interface LoginResponse {
  name: string;
  public_key: string;
  private_key: string;
}

export interface RateCalculatorPayload {
  order_id?: string;
  pickup_pincode: number | string;
  delivery_pincode: number | string;
  payment_type: "PREPAID" | "COD";
  shipment_type: string;
  order_amount: number;
  type_of_package: string;
  rov_type: string;
  cod_amount?: string;
  weight: number;
  dimensions: Dimension[];
}

export interface PincodeServiceabilityPayload {
  pickup_pincode: number | string;
  delivery_pincode: number | string;
}

export interface ReturnReason {
  id: number;
  title: string;
}

export interface OrderLabel {
  label: string; // base64
  created_at: string;
}

export interface TrackOrderResponse {
  order_id: string;
  reference_id: string;
  awb_number: string;
  courier: string;
  expected_delivery_date: string | null;
  current_status: string;
  status_time: string | null;
  scan_detail: any[];
}

export interface CreateWarehousePayload {
  address_title: string;
  name?: string;
  phone?: number | string;
  alternate_phone?: number | string;
  email?: string;
  address_line_one: string;
  address_line_two?: string;
  pin_code: number | string;
}

export interface Warehouse {
  id: number;
  default: string;
  address_title: string;
  name: string;
  email: string;
  phone: string;
  alt_phone: string;
  address_line_one: string;
  address_line_two: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  status: string;
}
