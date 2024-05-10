import { categoryType } from '@/types/category'

export type productType = {
  id: string
  name: string
  amount: number
  price: number
  image: string
  category_id: string
  category: categoryType
  description: Text
  created_at: Date
  updated_at: Date
}
