import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  ShipmozoConfig,
  ApiResponse,
  OrderPayload,
  PushOrderResponse,
  ReturnOrderPayload,
  AssignCourierPayload,
  AssignCourierResponse,
  SchedulePickupResponse,
  CancelOrderPayload,
  AutoAssignOrderResponse,
  LoginResponse,
  RateCalculatorPayload,
  PincodeServiceabilityPayload,
  ReturnReason,
  OrderLabel,
  TrackOrderResponse,
  CreateWarehousePayload,
  Warehouse
} from './types';

export class Shipmozo {
  private client: AxiosInstance;
  private publicKey: string;
  private privateKey: string;

  constructor(config: ShipmozoConfig) {
    this.publicKey = config.publicKey;
    this.privateKey = config.privateKey;
    
    const baseURL = config.baseUrl || 'https://shipping-api.com/app/api/v1';

    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'public-key': this.publicKey,
        'private-key': this.privateKey
      }
    });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request<ApiResponse<T>>(config);
      // The API returns 200 even for logical errors, so we check 'result'
      if (response.data.result === "0") {
        throw new Error(response.data.message || 'Unknown API Error');
      }
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
         // Handle cases where the server might return a non-2xx status but with the API error format
         const apiError = error.response.data as ApiResponse<any>;
         if (apiError.message) {
            throw new Error(apiError.message);
         }
      }
      throw error;
    }
  }

  /**
   * Checks whether the API is currently operational.
   */
  async info(): Promise<ApiResponse<{ Info: string }>> {
    return this.request<{ Info: string }>({
      method: 'GET',
      url: '/info'
    });
  }

  /**
   * Pushes order details to the Shipmozo panel.
   */
  async pushOrder(payload: OrderPayload): Promise<PushOrderResponse> {
    const response = await this.request<PushOrderResponse>({
      method: 'POST',
      url: '/push-order',
      data: payload
    });
    return response.data;
  }

  /**
   * Pushes return order details to the Shipmozo panel.
   */
  async pushReturnOrder(payload: ReturnOrderPayload): Promise<PushOrderResponse> {
    const response = await this.request<PushOrderResponse>({
      method: 'POST',
      url: '/push-return-order',
      data: payload
    });
    return response.data;
  }

  /**
   * Assigns a courier to an order.
   */
  async assignCourier(payload: AssignCourierPayload): Promise<AssignCourierResponse> {
    const response = await this.request<AssignCourierResponse>({
      method: 'POST',
      url: '/assign-courier',
      data: payload
    });
    return response.data;
  }

  /**
   * Schedules courier pickups for orders without automatic scheduling.
   */
  async schedulePickup(orderId: string): Promise<SchedulePickupResponse> {
    const response = await this.request<SchedulePickupResponse>({
      method: 'POST',
      url: '/schedule-pickup',
      data: { order_id: orderId }
    });
    return response.data;
  }

  /**
   * Cancels an existing order.
   */
  async cancelOrder(payload: CancelOrderPayload): Promise<{ order_id: string; reference_id: string }> {
    const response = await this.request<{ order_id: string; reference_id: string }>({
      method: 'POST',
      url: '/cancel-order',
      data: payload
    });
    return response.data;
  }

  /**
   * Automatically assigns a courier to an order based on settings.
   */
  async autoAssignOrder(orderId: string): Promise<AutoAssignOrderResponse> {
    const response = await this.request<AutoAssignOrderResponse>({
      method: 'POST',
      url: '/auto-assign-order',
      data: { order_id: orderId }
    });
    return response.data;
  }

  /**
   * Retrieves details of a specific order.
   */
  async getOrderDetail(orderId: string): Promise<any> {
    // Return type isn't fully detailed in docs, assuming generic object or extending OrderPayload
    const response = await this.request<any>({
      method: 'GET',
      url: `/get-order-detail/${orderId}`
    });
    return response.data;
  }

  /**
   * Authenticates a user (Alternative to providing keys in constructor if dynamically fetching).
   * Note: This returns keys, but this instance is already configured. 
   * Useful for initial setup flows.
   */
  async login(username: string, password: string): Promise<LoginResponse[]> {
    const response = await this.request<LoginResponse[]>({
      method: 'POST',
      url: '/login',
      data: { username, password }
    });
    return response.data;
  }

  /**
   * Calculates courier rates for a shipment.
   */
  async calculateRate(payload: RateCalculatorPayload): Promise<any> {
    // Response structure not explicitly detailed in OCR for successful calculation data, 
    // assuming it returns a list of rates or similar.
    const response = await this.request<any>({
      method: 'POST',
      url: '/rate-calculator',
      data: payload
    });
    return response.data;
  }

  /**
   * Checks if delivery is serviceable between given pincodes.
   */
  async checkPincodeServiceability(payload: PincodeServiceabilityPayload): Promise<{ serviceable: boolean }> {
    const response = await this.request<{ serviceable: boolean }>({
      method: 'POST',
      url: '/pincode-serviceability',
      data: payload
    });
    return response.data;
  }

  /**
   * Returns a list of reasons for returning an order.
   */
  async getReturnReasons(): Promise<ReturnReason[]> {
    const response = await this.request<ReturnReason[]>({
      method: 'GET',
      url: '/get-return-reason'
    });
    return response.data;
  }

  /**
   * Retrieves the shipping label as a base64-encoded PNG image.
   */
  async getOrderLabel(awbNumber: string): Promise<OrderLabel[]> {
    const response = await this.request<OrderLabel[]>({
      method: 'GET',
      url: `/get-order-label/${awbNumber}`
    });
    return response.data;
  }

  /**
   * Tracks the status of an order.
   */
  async trackOrder(awbNumber: string): Promise<TrackOrderResponse> {
    const response = await this.request<TrackOrderResponse>({
      method: 'GET',
      url: '/track-order',
      params: { awb_number: awbNumber }
    });
    return response.data;
  }

  /**
   * Creates a new warehouse.
   */
  async createWarehouse(payload: CreateWarehousePayload): Promise<{ warehouse_id: string }> {
    const response = await this.request<{ warehouse_id: string }>({
      method: 'POST',
      url: '/create-warehouse',
      data: payload
    });
    return response.data;
  }

  /**
   * Updates warehouse information for a specific order.
   */
  async updateWarehouse(orderId: string, warehouseId: number): Promise<{ order_id: string; reference_id: string }> {
    const response = await this.request<{ order_id: string; reference_id: string }>({
      method: 'POST',
      url: '/order/update-warehouse',
      data: { order_id: orderId, warehouse_id: warehouseId }
    });
    return response.data;
  }

  /**
   * Retrieves all warehouses.
   */
  async getWarehouses(): Promise<Warehouse[]> {
    const response = await this.request<Warehouse[]>({
      method: 'GET',
      url: '/get-warehouses'
    });
    return response.data;
  }
}
