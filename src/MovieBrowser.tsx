import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Filter from "./components/Filter"
import MovieCard from "./components/MovieCard"
import SearchComponent from "./components/SearchComponent"
import { FilterType, MovieGenreType, MovieType } from "./types"
import { MovieGenreArray } from "./utils/constants"
import customFetchMovies from "./utils/customFetchMovies"

export default function MovieBrowser() {

  const [movies, setMovies] = useState<MovieType[]>([])
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<FilterType | null>(null)
  const [loading, setLoading] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [isCursorAtEnd, setIsCursorAtEnd] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // fetch movies when user types in search input key with current filters
  const handleSearch = async (key: string) => {
    setLoading(true)
    setCursor(0)
    setIsCursorAtEnd(false)
    const data = await customFetchMovies({ filters, query: key })
    setMovies(data)
    setLoading(false)
  }

  // fetches & append next page of movies for infinite query with current filters & query
  const handleLoadMore = async () => {
    const data = await customFetchMovies({ cursor: cursor + 1, filters, query })
    if (data.length === 0) {
      setIsCursorAtEnd(true)
      return
    }
    setCursor(cursor => cursor + 1)
    setMovies([...movies, ...data])
  }

  // update filters state with user check/uncheck any filter item
  const handleFilterChange = (genre: MovieGenreType, checked: boolean) => {
    if (filters) {
      filters[genre] = checked
      setFilters({ ...filters })
    }
  }

  // fetch movies according to applied filter state & current query
  const handleFilterApply = async () => {
    setLoading(true)
    setCursor(0)
    setIsCursorAtEnd(false)
    const data = await customFetchMovies({ filters, query })
    setMovies(data)
    setLoading(false)
    setIsFilterOpen(false)
  }

  // closes the fliter modal
  const handleFilterClose = () => {
    setIsFilterOpen(false)
    handleFilterApply()
  }

  useEffect(() => {
    // fetch movies data
    const fetchMovies = async () => {
      setLoading(true)
      setCursor(0)
      setIsCursorAtEnd(false)
      const data = await customFetchMovies({ filters, query })
      setMovies(data)
      setLoading(false)
    }
    fetchMovies()

    // initialize filter state to no filter selected
    const initialFilter = {} as FilterType
    MovieGenreArray.forEach(genre => {
      initialFilter[genre] = false
    })
    setFilters(initialFilter)
  }, [])

  return (
    <div className="global-responsive-px xl:px-12 py-4">
      <div className="mb-4 flex flex-col sm:flex-row justify-normal items-stretch sm:justify-between sm:items-center gap-2">
        <h2 className="text-2xl text-center">Movie List</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <SearchComponent onSearch={handleSearch} query={query} setQuery={setQuery} />
          <button
            aria-expanded={isFilterOpen}
            aria-controls="filter-modal"
            aria-label="Filter movies by genre"
            onClick={() => setIsFilterOpen(toggle => !toggle)}
          >
            Filter
          </button>
          {
            isFilterOpen && (
              createPortal(
                <Filter
                  id="filter-modal"
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                  onClose={handleFilterClose}
                  onApply={handleFilterApply}
                />,
                document.body
              )
            )
          }
        </div>
      </div>
      {
        loading ? (
          <p className="py-2 text-center">Loading...</p>
        ) : (
          <>
            {
              movies.length === 0 ? (
                <p className="py-2 text-center" aria-live="polite">No movies available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
                  {
                    movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
                  }
                </div>
              )}
            <div className="mt-4 text-center">
              {
                movies.length !== 0 && (
                  isCursorAtEnd
                    ? <p className="text-sm text-neutral-500">End of the list</p>
                    : <button onClick={handleLoadMore} aria-label="Load more movies">Load More</button>
                )
              }
            </div>
          </>
        )
      }
    </div>
  )
}