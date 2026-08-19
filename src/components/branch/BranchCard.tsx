import type { BranchListItem } from '../../types/branch.types'

interface BranchCardProps {
  branch: BranchListItem
  isSelected: boolean
  onSelect: (id: number) => void
}

export function BranchCard({ branch, isSelected, onSelect }: BranchCardProps) {
  const location = branch.address ?? branch.city ?? 'Dirección no disponible'

  return (
    <button
      type="button"
      className={`branch-card${isSelected ? ' branch-card--selected' : ''}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(branch.id)}
    >
      <span className="branch-card__name">{branch.supermarketName}</span>
      <span className="branch-card__location">{location}</span>
    </button>
  )
}
