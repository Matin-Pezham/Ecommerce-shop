import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
  CheckoutOrder,
  CheckoutState,
  CustomerInfo,
  DeliveryMethod,
  PaymentMethod,
  ShippingAddress,
  CheckoutStep,
} from '@/features/checkout/types'

const initialState: CheckoutState = {
  customerInfo: {
    fullName: '',
    phone: '',
    email: '',
  },
  shippingAddress: {
    province: '',
    city: '',
    postalCode: '',
    fullAddress: '',
  },
  deliveryMethod: null,
  paymentMethod: null,
  notes: '',
  currentStep: 'shipping',
  lastOrderId: null,
  submittedOrders: [],
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCustomerInfo: (state, action: PayloadAction<Partial<CustomerInfo>>) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload }
    },
    setShippingAddress: (state, action: PayloadAction<Partial<ShippingAddress>>) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload }
    },
    setDeliveryMethod: (state, action: PayloadAction<DeliveryMethod>) => {
      state.deliveryMethod = action.payload
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload
    },
    setCheckoutNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload
    },
    setCheckoutStep: (state, action: PayloadAction<CheckoutStep>) => {
      state.currentStep = action.payload
    },
    submitCheckoutOrder: (state, action: PayloadAction<CheckoutOrder>) => {
      state.submittedOrders.unshift(action.payload)
      state.lastOrderId = action.payload.id
      state.currentStep = 'shipping'
      state.paymentMethod = null
      state.notes = ''
    },
    resetCheckoutFlow: (state) => {
      state.customerInfo = initialState.customerInfo
      state.shippingAddress = initialState.shippingAddress
      state.deliveryMethod = null
      state.paymentMethod = null
      state.notes = ''
      state.currentStep = 'shipping'
    },
  },
})

export const {
  setCustomerInfo,
  setShippingAddress,
  setDeliveryMethod,
  setPaymentMethod,
  setCheckoutNotes,
  setCheckoutStep,
  submitCheckoutOrder,
  resetCheckoutFlow,
} = checkoutSlice.actions

export default checkoutSlice.reducer
