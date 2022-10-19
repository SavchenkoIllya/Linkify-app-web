export interface ICategories {
  categories: ICategory[]
}

export interface ICategory {
  _id?: string
  title?: string
  author?: string
  color?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}
