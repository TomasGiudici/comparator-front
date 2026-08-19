import { apiGet } from './api'
import type { BranchResponse } from '../types/branch.types'

export function getBranches(signal?: AbortSignal) {
  return apiGet<BranchResponse[]>('/branches', signal)
}
