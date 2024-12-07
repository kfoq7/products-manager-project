'use client'

import { persistentMap } from '@nanostores/persistent'

export interface ProductCart {
  productId: number
  quantity: number
  price: number
}

export interface Cart {
  userId: number
  paymentMethodId: number
  products: ProductCart[]
}

const initialState: Cart = {
  userId: 0,
  paymentMethodId: 0,
  products: [],
}

export const cartStore = persistentMap<Cart>('cart', initialState, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const addProduct = (productId: number, price: number) => {
  const currentCart = cartStore.get()
  const existingProductIndex = currentCart.products.findIndex(
    product => product.productId === productId,
  )

  if (existingProductIndex !== -1) {
    const updatedProducts = [...currentCart.products]
    updatedProducts[existingProductIndex].quantity += 1
    cartStore.setKey('products', updatedProducts)
  } else {
    const newProduct = { productId, quantity: 1, price }
    cartStore.setKey('products', [...currentCart.products, newProduct])
  }
}

export const removeProduct = (productId: number) => {
  const currentCart = cartStore.get()
  const updatedProducts = currentCart.products.filter(
    product => product.productId !== productId,
  )

  cartStore.setKey('products', updatedProducts)
}

export const updatePaymentMethodId = (paymentMethodId: number) => {
  cartStore.setKey('paymentMethodId', paymentMethodId)
}
