export interface BranchResponse {
  id: number
  supermarketId: number
  city: string | null
  address: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface BranchListItem {
  id: number
  supermarketName: string
  city: string | null
  address: string | null
}
