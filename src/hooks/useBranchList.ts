import { useEffect, useState } from 'react'
import { getBranches } from '../services/branch.service'
import { getSupermarkets } from '../services/supermarket.service'
import type { BranchListItem } from '../types/branch.types'

interface BranchListState {
  branches: BranchListItem[]
  isLoading: boolean
  hasError: boolean
}

export function useBranchList(): BranchListState {
  const [state, setState] = useState<BranchListState>({ branches: [], isLoading: true, hasError: false })

  useEffect(() => {
    const controller = new AbortController()

    async function loadBranches() {
      try {
        const [branches, supermarkets] = await Promise.all([
          getBranches(controller.signal),
          getSupermarkets(controller.signal),
        ])
        const activeSupermarkets = new Map(
          supermarkets.filter(({ active }) => active).map(({ id, name }) => [id, name]),
        )
        const availableBranches = branches.flatMap<BranchListItem>((branch) => {
          const supermarketName = activeSupermarkets.get(branch.supermarketId)
          return branch.active && supermarketName
            ? [{ id: branch.id, supermarketName, city: branch.city, address: branch.address }]
            : []
        })

        setState({ branches: availableBranches, isLoading: false, hasError: false })
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setState({ branches: [], isLoading: false, hasError: true })
        }
      }
    }

    void loadBranches()
    return () => controller.abort()
  }, [])

  return state
}
