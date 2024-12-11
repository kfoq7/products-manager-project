export interface Item {
  id: number
  quantity: number
  price: number
}

export interface Order {
  id: number
  total: number
  status: string
  items: Item[]
}

export interface CreateItem {
  productId: number
  quantity: number
  price: number
}

export interface CreateOrder {
  userId: number
  total: number
  items: CreateItem[]
}
