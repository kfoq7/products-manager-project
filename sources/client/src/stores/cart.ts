'use client'

import { persistentMap } from '@nanostores/persistent'

export interface ProductCart {
  productId: number
  quantity: number
  totalPrice: number
}

export interface Cart {
  userId: number
  paymentMethodId: number
  totalPrice: number
  paymentDetails: ProductCart[]
}

const initialState: Cart = {
  userId: 1,
  paymentMethodId: 0,
  totalPrice: 0,
  paymentDetails: [],
}

export const cartStore = persistentMap<Cart>('cart', initialState, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const addProduct = (productId: number, productPrice: number) => {
  const currentCart = cartStore.get()

  const existingProductIndex = currentCart.paymentDetails.findIndex(
    product => product.productId === productId,
  )

  let updatedPaymentDetails = [...currentCart.paymentDetails]

  if (existingProductIndex !== -1) {
    const existingProduct = updatedPaymentDetails[existingProductIndex]
    updatedPaymentDetails[existingProductIndex] = {
      ...existingProduct,
      quantity: existingProduct.quantity + 1,
      totalPrice: parseFloat(
        (existingProduct.totalPrice + productPrice).toFixed(2),
      ),
    }
  } else {
    const newProduct = { productId, quantity: 1, totalPrice: productPrice }
    updatedPaymentDetails = [...updatedPaymentDetails, newProduct]
  }

  const newTotalPrice = updatedPaymentDetails.reduce(
    (sum, product) => sum + product.totalPrice,
    0,
  )

  cartStore.set({
    ...currentCart,
    paymentDetails: updatedPaymentDetails,
    totalPrice: parseFloat(newTotalPrice.toFixed(2)),
  })
}

export const removeProduct = (productId: number) => {
  const currentCart = cartStore.get()
  const updatedpaymentDetails = currentCart.paymentDetails.filter(
    product => product.productId !== productId,
  )

  const newTotalPrice = updatedpaymentDetails.reduce(
    (sum, product) => sum + product.totalPrice,
    0,
  )

  cartStore.set({
    ...currentCart,
    paymentDetails: updatedpaymentDetails,
    totalPrice: parseFloat(newTotalPrice.toFixed(2)),
  })
}

export const updatePaymentMethodId = (paymentMethodId: number) => {
  cartStore.setKey('paymentMethodId', paymentMethodId)
}

export const increaseQuantity = (productId: number, productPrice: number) => {
  const currentCart = cartStore.get()
  const updatedpaymentDetails = currentCart.paymentDetails.map(product => {
    if (product.productId === productId) {
      return {
        ...product,
        quantity: product.quantity + 1,
        totalPrice: parseFloat((product.totalPrice + productPrice).toFixed(2)),
      }
    }
    return product
  })

  const newTotalPrice = updatedpaymentDetails.reduce(
    (sum, product) => sum + product.totalPrice,
    0,
  )

  cartStore.set({
    ...currentCart,
    paymentDetails: updatedpaymentDetails,
    totalPrice: parseFloat(newTotalPrice.toFixed(2)),
  })
}

export const decreaseQuantity = (productId: number, productPrice: number) => {
  const currentCart = cartStore.get()
  let updatedpaymentDetails = currentCart.paymentDetails.map(product => {
    if (product.productId === productId && product.quantity > 1) {
      return {
        ...product,
        quantity: product.quantity - 1,
        totalPrice: product.totalPrice - productPrice,
      }
    }
    return product
  })

  updatedpaymentDetails = updatedpaymentDetails.filter(
    product => product.quantity > 0,
  )

  const newTotalPrice = updatedpaymentDetails.reduce(
    (sum, product) => sum + product.totalPrice,
    0,
  )

  cartStore.set({
    ...currentCart,
    paymentDetails: updatedpaymentDetails,
    totalPrice: parseFloat(newTotalPrice.toFixed(2)),
  })
}
