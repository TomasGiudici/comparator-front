import { useState } from 'react'
import { BranchCard } from '../components/branch/BranchCard'
import { useBranchList } from '../hooks/useBranchList'
import './BranchSelectionPage.css'

export function BranchSelectionPage() {
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null)
  const { branches, isLoading, hasError } = useBranchList()

  function handleConfirm() {
    if (selectedBranchId === null) return
    console.info('Sucursal seleccionada:', selectedBranchId)
  }

  return (
    <main className="branch-selection">
      <div className="branch-selection__container">
        <button type="button" className="back-button" aria-label="Volver" onClick={() => window.history.back()}>
          <span aria-hidden="true">←</span>
        </button>
        <h1 className="branch-selection__title">¿EN CUÁL SUPER TE ENCONTRÁS?</h1>

        <section className="branch-selection__content" aria-live="polite">
          {isLoading && <p className="status-message">Cargando sucursales…</p>}
          {hasError && <p className="status-message status-message--error">No se pudieron cargar las sucursales.</p>}
          {!isLoading && !hasError && branches.length === 0 && (
            <p className="status-message">No hay sucursales disponibles.</p>
          )}
          {!isLoading && !hasError && branches.length > 0 && (
            <div className="branch-list">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} isSelected={selectedBranchId === branch.id} onSelect={setSelectedBranchId} />
              ))}
            </div>
          )}
        </section>

        <div className="branch-selection__actions">
          <button type="button" className="action-button action-button--confirm" disabled={selectedBranchId === null} onClick={handleConfirm}>
            Confirmar
          </button>
          <button type="button" className="action-button action-button--secondary">Ver otros</button>
        </div>
      </div>
    </main>
  )
}
