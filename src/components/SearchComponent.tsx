import { useRef } from "react"

type PropsType = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  onSearch: (key: string) => void
}

export default function SearchComponent({ onSearch, query, setQuery }: PropsType) {

  const timeout = useRef<NodeJS.Timeout | null>(null)

  // handles search input change with debouncing
  const handleChange = (query: string) => {
    setQuery(query)
    if (timeout.current !== null) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(() => {
      onSearch(query)
    }, 400)
  }

  return (
    <div>
      <label htmlFor="movie-search" className="sr-only">
        Search for movies
      </label>
      <input
        type="text"
        id="movie-search"
        value={query}
        onChange={e => handleChange(e.target.value)}
        placeholder="🔍 Search movie here..."
        role="searchbox"
        aria-label="Search for movies"
      />
    </div>
  )
}