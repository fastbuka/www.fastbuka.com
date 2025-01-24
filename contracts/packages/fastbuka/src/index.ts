import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CC64LB72ZQVHXRWUI7BHZVNYQ4GHTHTRHSAD4LZX6XNOYILQ7B2MT4YO",
  }
} as const

export type DataKey = {tag: "Escrow", values: readonly [string]} | {tag: "Balance", values: readonly [string]} | {tag: "Allowance", values: readonly [AllowanceDataKey]} | {tag: "Admin", values: void} | {tag: "DisputedOrders", values: void} | {tag: "Customer", values: readonly [string]} | {tag: "CustomerRegId", values: readonly [string]} | {tag: "OrderCounter", values: void} | {tag: "Vendor", values: readonly [string]} | {tag: "Rider", values: readonly [string]};

export const Errors = {
  1: {message:"InvalidAmount"},

  2: {message:"InvalidStatus"},

  3: {message:"InvalidCaller"},

  4: {message:"InvalidConfirmationNumber"},

  5: {message:"OrderNotFound"},

  6: {message:"OrderNotReady"},

  7: {message:"InvalidStatusTransition"},

  8: {message:"UnauthorizedAccess"},

  9: {message:"VendorPaymentFailed"},

  10: {message:"DisputeAlreadyExists"},

  11: {message:"DisputeNotFound"},

  12: {message:"NotAdmin"},

  13: {message:"AlreadyResolved"},

  14: {message:"InsufficientBalance"},

  15: {message:"OrderNotDelivered"},

  16: {message:"CalculationError"},

  17: {message:"RiderPaymentFailed"},

  18: {message:"DepositPaymentFailed"},

  19: {message:"OrderAlreadyDelivered"},

  20: {message:"OrderNotCompleted"},

  21: {message:"OrderCompleted"},

  22: {message:"OrderNotPickedUp"},

  23: {message:"InsufficientFundsInContract"},

  24: {message:"AlreadyAdmin"},

  25: {message:"CustomerPaymentFailed"},

  26: {message:"NotACustomer"},

  27: {message:"OrderAlreadyCompleted"}
}
export enum OrderStatus {
  Waiting = 0,
  ReadyForPickup = 1,
  PickedUp = 2,
  Delivered = 3,
  Completed = 4,
  Cancelled = 5,
  Disputed = 6,
  Resolved = 7,
}

export type DisputeResolution = {tag: "CustomerFault", values: void} | {tag: "VendorFault", values: void} | {tag: "RiderFault", values: void};


export interface OrderCreatedEvent {
  amount: u128;
  count: u128;
  user: string;
  vendor: string;
}


export interface OrderStatusUpdatedEvent {
  new_status: OrderStatus;
  old_status: OrderStatus;
  order_id: u128;
}


export interface ConfirmationGeneratedEvent {
  order_id: u128;
  vendor: string;
}


export interface OrderPickedUpEvent {
  order_id: u128;
  rider: string;
}


export interface DisputeEvent {
  initiator: string;
  order_id: u128;
  reason: string;
}


export interface DisputeResolvedEvent {
  admin: string;
  order_id: u128;
  resolution: DisputeResolution;
}


export interface Order {
  amount: i128;
  confirmation_number: Option<u32>;
  created_at: u64;
  id: u128;
  rider: Option<string>;
  rider_fee: i128;
  status: OrderStatus;
  token: string;
  user: string;
  vendor: string;
}


export interface AllowanceValue {
  amount: i128;
  expiration_ledger: u32;
}


export interface AllowanceDataKey {
  from: string;
  spender: string;
}


export interface TokenMetadata {
  decimal: u32;
  name: string;
  symbol: string;
}


export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin, decimal, name, symbol}: {admin: string, decimal: u32, name: string, symbol: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  mint: ({to, amount}: {to: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a allowance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  allowance: ({from, spender}: {from: string, spender: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a approve transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  approve: ({from, spender, amount, expiration_ledger}: {from: string, spender: string, amount: i128, expiration_ledger: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  balance: ({id}: {id: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  transfer: ({from, to, amount}: {from: string, to: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a transfer_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  transfer_from: ({spender, from, to, amount}: {spender: string, from: string, to: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a burn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  burn: ({from, amount}: {from: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a burn_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  burn_from: ({spender, from, amount}: {spender: string, from: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a decimals transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  decimals: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a name transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  name: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a symbol transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  symbol: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_admins transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_admins: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<string>>>

  /**
   * Construct and simulate a add_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_admin: ({caller, new_admin}: {caller: string, new_admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a remove_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_admin: ({caller, admin_to_remove}: {caller: string, admin_to_remove: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_all_disputed_orders transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_all_disputed_orders: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<u128>>>

  /**
   * Construct and simulate a resolve_dispute transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  resolve_dispute: ({order_id, resolution, admin}: {order_id: u128, resolution: DisputeResolution, admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_order_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_order_count: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u128>>

  /**
   * Construct and simulate a create_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_order: ({user, token, vendor, total_amount, rider_fee}: {user: string, token: string, vendor: string, total_amount: i128, rider_fee: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u128>>>

  /**
   * Construct and simulate a get_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_order: ({order_id}: {order_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Order>>>

  /**
   * Construct and simulate a user_confirms_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  user_confirms_order: ({order_id, customer}: {order_id: u128, customer: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_all_orders transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_all_orders: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Array<Order>>>>

  /**
   * Construct and simulate a get_confirmation_number_rider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_confirmation_number_rider: ({order_id}: {order_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a pickup_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  pickup_order: ({order_id, rider}: {order_id: u128, rider: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a rider_confirms_delivery transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  rider_confirms_delivery: ({order_id}: {order_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a rider_raise_dispute transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  rider_raise_dispute: ({order_id, address, reason}: {order_id: u128, address: string, reason: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_confirmation_number_customer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_confirmation_number_customer: ({customer, order_id}: {customer: string, order_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a check_order_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  check_order_status: ({customer, order_id}: {customer: string, order_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<OrderStatus>>>

  /**
   * Construct and simulate a customer_raise_dispute transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  customer_raise_dispute: ({order_id, address, reason}: {order_id: u128, address: string, reason: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a update_order_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_order_status: ({order_id, vendor}: {order_id: u128, vendor: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a get_vendor_pending_orders transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_vendor_pending_orders: ({vendor}: {vendor: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Array<Order>>>>

  /**
   * Construct and simulate a generate_confirmation_number transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  generate_confirmation_number: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAANX19jb25zdHJ1Y3RvcgAAAAAAAAEAAAAAAAAABWFkbWluAAAAAAAAEwAAAAA=",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACgAAAAEAAAAAAAAABkVzY3JvdwAAAAAAAQAAABAAAAABAAAAAAAAAAdCYWxhbmNlAAAAAAEAAAATAAAAAQAAAAAAAAAJQWxsb3dhbmNlAAAAAAAAAQAAB9AAAAAQQWxsb3dhbmNlRGF0YUtleQAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAORGlzcHV0ZWRPcmRlcnMAAAAAAAEAAAAAAAAACEN1c3RvbWVyAAAAAQAAABMAAAABAAAAAAAAAA1DdXN0b21lclJlZ0lkAAAAAAAAAQAAABMAAAAAAAAAAAAAAAxPcmRlckNvdW50ZXIAAAABAAAAAAAAAAZWZW5kb3IAAAAAAAEAAAATAAAAAQAAAAAAAAAFUmlkZXIAAAAAAAABAAAAEw==",
        "AAAABAAAAAAAAAAAAAAADUZhc3RCdWthRXJyb3IAAAAAAAAbAAAAAAAAAA1JbnZhbGlkQW1vdW50AAAAAAAAAQAAAAAAAAANSW52YWxpZFN0YXR1cwAAAAAAAAIAAAAAAAAADUludmFsaWRDYWxsZXIAAAAAAAADAAAAAAAAABlJbnZhbGlkQ29uZmlybWF0aW9uTnVtYmVyAAAAAAAABAAAAAAAAAANT3JkZXJOb3RGb3VuZAAAAAAAAAUAAAAAAAAADU9yZGVyTm90UmVhZHkAAAAAAAAGAAAAAAAAABdJbnZhbGlkU3RhdHVzVHJhbnNpdGlvbgAAAAAHAAAAAAAAABJVbmF1dGhvcml6ZWRBY2Nlc3MAAAAAAAgAAAAAAAAAE1ZlbmRvclBheW1lbnRGYWlsZWQAAAAACQAAAAAAAAAURGlzcHV0ZUFscmVhZHlFeGlzdHMAAAAKAAAAAAAAAA9EaXNwdXRlTm90Rm91bmQAAAAACwAAAAAAAAAITm90QWRtaW4AAAAMAAAAAAAAAA9BbHJlYWR5UmVzb2x2ZWQAAAAADQAAAAAAAAATSW5zdWZmaWNpZW50QmFsYW5jZQAAAAAOAAAAAAAAABFPcmRlck5vdERlbGl2ZXJlZAAAAAAAAA8AAAAAAAAAEENhbGN1bGF0aW9uRXJyb3IAAAAQAAAAAAAAABJSaWRlclBheW1lbnRGYWlsZWQAAAAAABEAAAAAAAAAFERlcG9zaXRQYXltZW50RmFpbGVkAAAAEgAAAAAAAAAVT3JkZXJBbHJlYWR5RGVsaXZlcmVkAAAAAAAAEwAAAAAAAAART3JkZXJOb3RDb21wbGV0ZWQAAAAAAAAUAAAAAAAAAA5PcmRlckNvbXBsZXRlZAAAAAAAFQAAAAAAAAAQT3JkZXJOb3RQaWNrZWRVcAAAABYAAAAAAAAAG0luc3VmZmljaWVudEZ1bmRzSW5Db250cmFjdAAAAAAXAAAAAAAAAAxBbHJlYWR5QWRtaW4AAAAYAAAAAAAAABVDdXN0b21lclBheW1lbnRGYWlsZWQAAAAAAAAZAAAAAAAAAAxOb3RBQ3VzdG9tZXIAAAAaAAAAAAAAABVPcmRlckFscmVhZHlDb21wbGV0ZWQAAAAAAAAb",
        "AAAAAwAAAAAAAAAAAAAAC09yZGVyU3RhdHVzAAAAAAgAAAAAAAAAB1dhaXRpbmcAAAAAAAAAAAAAAAAOUmVhZHlGb3JQaWNrdXAAAAAAAAEAAAAAAAAACFBpY2tlZFVwAAAAAgAAAAAAAAAJRGVsaXZlcmVkAAAAAAAAAwAAAAAAAAAJQ29tcGxldGVkAAAAAAAABAAAAAAAAAAJQ2FuY2VsbGVkAAAAAAAABQAAAAAAAAAIRGlzcHV0ZWQAAAAGAAAAAAAAAAhSZXNvbHZlZAAAAAc=",
        "AAAAAgAAAAAAAAAAAAAAEURpc3B1dGVSZXNvbHV0aW9uAAAAAAAAAwAAAAAAAAAAAAAADUN1c3RvbWVyRmF1bHQAAAAAAAAAAAAAAAAAAAtWZW5kb3JGYXVsdAAAAAAAAAAAAAAAAApSaWRlckZhdWx0AAA=",
        "AAAAAQAAAAAAAAAAAAAAEU9yZGVyQ3JlYXRlZEV2ZW50AAAAAAAABAAAAAAAAAAGYW1vdW50AAAAAAAKAAAAAAAAAAVjb3VudAAAAAAAAAoAAAAAAAAABHVzZXIAAAATAAAAAAAAAAZ2ZW5kb3IAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAAF09yZGVyU3RhdHVzVXBkYXRlZEV2ZW50AAAAAAMAAAAAAAAACm5ld19zdGF0dXMAAAAAB9AAAAALT3JkZXJTdGF0dXMAAAAAAAAAAApvbGRfc3RhdHVzAAAAAAfQAAAAC09yZGVyU3RhdHVzAAAAAAAAAAAIb3JkZXJfaWQAAAAK",
        "AAAAAQAAAAAAAAAAAAAAGkNvbmZpcm1hdGlvbkdlbmVyYXRlZEV2ZW50AAAAAAACAAAAAAAAAAhvcmRlcl9pZAAAAAoAAAAAAAAABnZlbmRvcgAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAEk9yZGVyUGlja2VkVXBFdmVudAAAAAAAAgAAAAAAAAAIb3JkZXJfaWQAAAAKAAAAAAAAAAVyaWRlcgAAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAADERpc3B1dGVFdmVudAAAAAMAAAAAAAAACWluaXRpYXRvcgAAAAAAABMAAAAAAAAACG9yZGVyX2lkAAAACgAAAAAAAAAGcmVhc29uAAAAAAAQ",
        "AAAAAQAAAAAAAAAAAAAAFERpc3B1dGVSZXNvbHZlZEV2ZW50AAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAhvcmRlcl9pZAAAAAoAAAAAAAAACnJlc29sdXRpb24AAAAAB9AAAAARRGlzcHV0ZVJlc29sdXRpb24AAAA=",
        "AAAAAQAAAAAAAAAAAAAABU9yZGVyAAAAAAAACgAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAABNjb25maXJtYXRpb25fbnVtYmVyAAAAA+gAAAAEAAAAAAAAAApjcmVhdGVkX2F0AAAAAAAGAAAAAAAAAAJpZAAAAAAACgAAAAAAAAAFcmlkZXIAAAAAAAPoAAAAEwAAAAAAAAAJcmlkZXJfZmVlAAAAAAAACwAAAAAAAAAGc3RhdHVzAAAAAAfQAAAAC09yZGVyU3RhdHVzAAAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGdmVuZG9yAAAAAAAT",
        "AAAAAQAAAAAAAAAAAAAADkFsbG93YW5jZVZhbHVlAAAAAAACAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEWV4cGlyYXRpb25fbGVkZ2VyAAAAAAAABA==",
        "AAAAAQAAAAAAAAAAAAAAEEFsbG93YW5jZURhdGFLZXkAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAAT",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABAAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAdkZWNpbWFsAAAAAAQAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAZzeW1ib2wAAAAAABAAAAAA",
        "AAAAAAAAAAAAAAAEbWludAAAAAIAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAJYWxsb3dhbmNlAAAAAAAAAgAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAEAAAAL",
        "AAAAAAAAAAAAAAAHYXBwcm92ZQAAAAAEAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEWV4cGlyYXRpb25fbGVkZ2VyAAAAAAAABAAAAAA=",
        "AAAAAAAAAAAAAAAHYmFsYW5jZQAAAAABAAAAAAAAAAJpZAAAAAAAEwAAAAEAAAAL",
        "AAAAAAAAAAAAAAAIdHJhbnNmZXIAAAADAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
        "AAAAAAAAAAAAAAANdHJhbnNmZXJfZnJvbQAAAAAAAAQAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAEYnVybgAAAAIAAAAAAAAABGZyb20AAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAJYnVybl9mcm9tAAAAAAAAAwAAAAAAAAAHc3BlbmRlcgAAAAATAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
        "AAAAAAAAAAAAAAAIZGVjaW1hbHMAAAAAAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAEbmFtZQAAAAAAAAABAAAAEA==",
        "AAAAAAAAAAAAAAAGc3ltYm9sAAAAAAAAAAAAAQAAABA=",
        "AAAAAAAAAAAAAAAKZ2V0X2FkbWlucwAAAAAAAAAAAAEAAAPqAAAAEw==",
        "AAAAAAAAAAAAAAAJYWRkX2FkbWluAAAAAAAAAgAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAluZXdfYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANRmFzdEJ1a2FFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAMcmVtb3ZlX2FkbWluAAAAAgAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAA9hZG1pbl90b19yZW1vdmUAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADUZhc3RCdWthRXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAXZ2V0X2FsbF9kaXNwdXRlZF9vcmRlcnMAAAAAAAAAAAEAAAPqAAAACg==",
        "AAAAAAAAAAAAAAAPcmVzb2x2ZV9kaXNwdXRlAAAAAAMAAAAAAAAACG9yZGVyX2lkAAAACgAAAAAAAAAKcmVzb2x1dGlvbgAAAAAH0AAAABFEaXNwdXRlUmVzb2x1dGlvbgAAAAAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANRmFzdEJ1a2FFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAPZ2V0X29yZGVyX2NvdW50AAAAAAAAAAABAAAACg==",
        "AAAAAAAAAAAAAAAMY3JlYXRlX29yZGVyAAAABQAAAAAAAAAEdXNlcgAAABMAAAAAAAAABXRva2VuAAAAAAAAEwAAAAAAAAAGdmVuZG9yAAAAAAATAAAAAAAAAAx0b3RhbF9hbW91bnQAAAALAAAAAAAAAAlyaWRlcl9mZWUAAAAAAAALAAAAAQAAA+kAAAAKAAAH0AAAAA1GYXN0QnVrYUVycm9yAAAA",
        "AAAAAAAAAAAAAAAJZ2V0X29yZGVyAAAAAAAAAQAAAAAAAAAIb3JkZXJfaWQAAAAKAAAAAQAAA+kAAAfQAAAABU9yZGVyAAAAAAAH0AAAAA1GYXN0QnVrYUVycm9yAAAA",
        "AAAAAAAAAAAAAAATdXNlcl9jb25maXJtc19vcmRlcgAAAAACAAAAAAAAAAhvcmRlcl9pZAAAAAoAAAAAAAAACGN1c3RvbWVyAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADUZhc3RCdWthRXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAOZ2V0X2FsbF9vcmRlcnMAAAAAAAAAAAABAAAD6QAAA+oAAAfQAAAABU9yZGVyAAAAAAAH0AAAAA1GYXN0QnVrYUVycm9yAAAA",
        "AAAAAAAAAAAAAAAdZ2V0X2NvbmZpcm1hdGlvbl9udW1iZXJfcmlkZXIAAAAAAAABAAAAAAAAAAhvcmRlcl9pZAAAAAoAAAABAAAD6QAAAAQAAAfQAAAADUZhc3RCdWthRXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAMcGlja3VwX29yZGVyAAAAAgAAAAAAAAAIb3JkZXJfaWQAAAAKAAAAAAAAAAVyaWRlcgAAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1GYXN0QnVrYUVycm9yAAAA",
        "AAAAAAAAAAAAAAAXcmlkZXJfY29uZmlybXNfZGVsaXZlcnkAAAAAAQAAAAAAAAAIb3JkZXJfaWQAAAAKAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANRmFzdEJ1a2FFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAATcmlkZXJfcmFpc2VfZGlzcHV0ZQAAAAADAAAAAAAAAAhvcmRlcl9pZAAAAAoAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAAAAAAGcmVhc29uAAAAAAAQAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANRmFzdEJ1a2FFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAgZ2V0X2NvbmZpcm1hdGlvbl9udW1iZXJfY3VzdG9tZXIAAAACAAAAAAAAAAhjdXN0b21lcgAAABMAAAAAAAAACG9yZGVyX2lkAAAACgAAAAEAAAPpAAAABAAAB9AAAAANRmFzdEJ1a2FFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAASY2hlY2tfb3JkZXJfc3RhdHVzAAAAAAACAAAAAAAAAAhjdXN0b21lcgAAABMAAAAAAAAACG9yZGVyX2lkAAAACgAAAAEAAAPpAAAH0AAAAAtPcmRlclN0YXR1cwAAAAfQAAAADUZhc3RCdWthRXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAWY3VzdG9tZXJfcmFpc2VfZGlzcHV0ZQAAAAAAAwAAAAAAAAAIb3JkZXJfaWQAAAAKAAAAAAAAAAdhZGRyZXNzAAAAABMAAAAAAAAABnJlYXNvbgAAAAAAEAAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADUZhc3RCdWthRXJyb3IAAAA=",
        "AAAAAAAAAAAAAAATdXBkYXRlX29yZGVyX3N0YXR1cwAAAAACAAAAAAAAAAhvcmRlcl9pZAAAAAoAAAAAAAAABnZlbmRvcgAAAAAAEwAAAAEAAAPpAAAABAAAB9AAAAANRmFzdEJ1a2FFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAZZ2V0X3ZlbmRvcl9wZW5kaW5nX29yZGVycwAAAAAAAAEAAAAAAAAABnZlbmRvcgAAAAAAEwAAAAEAAAPpAAAD6gAAB9AAAAAFT3JkZXIAAAAAAAfQAAAADUZhc3RCdWthRXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAcZ2VuZXJhdGVfY29uZmlybWF0aW9uX251bWJlcgAAAAAAAAABAAAABA==",
        "AAAAAQAAAAAAAAAAAAAADVRva2VuTWV0YWRhdGEAAAAAAAADAAAAAAAAAAdkZWNpbWFsAAAAAAQAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAZzeW1ib2wAAAAAABA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        mint: this.txFromJSON<null>,
        allowance: this.txFromJSON<i128>,
        approve: this.txFromJSON<null>,
        balance: this.txFromJSON<i128>,
        transfer: this.txFromJSON<null>,
        transfer_from: this.txFromJSON<null>,
        burn: this.txFromJSON<null>,
        burn_from: this.txFromJSON<null>,
        decimals: this.txFromJSON<u32>,
        name: this.txFromJSON<string>,
        symbol: this.txFromJSON<string>,
        get_admins: this.txFromJSON<Array<string>>,
        add_admin: this.txFromJSON<Result<void>>,
        remove_admin: this.txFromJSON<Result<void>>,
        get_all_disputed_orders: this.txFromJSON<Array<u128>>,
        resolve_dispute: this.txFromJSON<Result<void>>,
        get_order_count: this.txFromJSON<u128>,
        create_order: this.txFromJSON<Result<u128>>,
        get_order: this.txFromJSON<Result<Order>>,
        user_confirms_order: this.txFromJSON<Result<void>>,
        get_all_orders: this.txFromJSON<Result<Array<Order>>>,
        get_confirmation_number_rider: this.txFromJSON<Result<u32>>,
        pickup_order: this.txFromJSON<Result<void>>,
        rider_confirms_delivery: this.txFromJSON<Result<void>>,
        rider_raise_dispute: this.txFromJSON<Result<void>>,
        get_confirmation_number_customer: this.txFromJSON<Result<u32>>,
        check_order_status: this.txFromJSON<Result<OrderStatus>>,
        customer_raise_dispute: this.txFromJSON<Result<void>>,
        update_order_status: this.txFromJSON<Result<u32>>,
        get_vendor_pending_orders: this.txFromJSON<Result<Array<Order>>>,
        generate_confirmation_number: this.txFromJSON<u32>
  }
}