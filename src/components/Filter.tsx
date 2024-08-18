import { useEffect } from "react"
import { FilterType, MovieGenreType } from "../types"
import { MovieGenreArray } from "../utils/constants"
import { FaTimes } from "react-icons/fa"

type PropsType = {
  id: string
  filters: FilterType | null
  handleFilterChange: (genre: MovieGenreType, checked: boolean) => void
  onClose: () => void
  onApply: () => void
}

export default function Filter({ id, filters, handleFilterChange, onClose, onApply }: PropsType) {

  // Focus management when the modal opens
  useEffect(() => {
    const modal = document.getElementById(id)
    if (modal) {
      modal.focus()
    }
  }, [id])

  return (
    <div
      id={id}
      className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex flex-row-reverse overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
    >
      <div className="relative max-w-96 min-h-full p-6 bg-neutral-100">
        <h2 className="mb-4 text-2xl" id={`${id}-title`} >Filter</h2>
        <button
          className="absolute top-0 right-0 m-4 px-0.5 py-0.5 bg-transparent text-black"
          onClick={onClose}
          aria-label="Close filter"
          autoFocus
        >
          <FaTimes />
        </button>
        <h3 className="mb-1">Genre:</h3>
        <div className="flex flex-wrap sm:justify-between items-center" style={{ gap: '2px 12px' }}>
          {
            MovieGenreArray.map(genre => (
              <label key={genre} className="py-1 select-none">
                <input
                  type="checkbox"
                  checked={filters ? filters[genre] : false}
                  onChange={(e) => handleFilterChange(genre, e.target.checked)}
                />
                &nbsp;&nbsp;
                {genre}
              </label>
            ))
          }
        </div>
        <button className="mt-2" onClick={onApply}>Apply</button>
      </div>
    </div>
  )
}