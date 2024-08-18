import { FilterType, MovieType } from "../types"

const limit = 5

type PropsType = {
  query?: string
  cursor?: number
  filters: FilterType | null
}

// custom fetch function for inifinite query functionality
export default async function customFetchMovies({ cursor = 0, filters, query }: PropsType) {
  // data.json has data from https://freetestapi.com/api/v1/movies API
  const response = await fetch('/data.json')
  const data = await response.json() as MovieType[]

  let result = data

  if (query) {
    result = result.filter(movie => movie.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  }

  if (filters) {
    const selectedGenres = Object.entries(filters).filter(([_, isSelected]) => isSelected).map(([genre]) => genre)

    if (selectedGenres.length > 0) {
      const filteredResult: MovieType[] = []

      result.forEach(movie => {
        let isGenrePresent = false

        for (let i = 0; i < movie.genre.length; i++) {
          if (isGenrePresent)
            break
          const genre = movie.genre[i]

          for (let j = 0; j < selectedGenres.length; j++) {
            if (isGenrePresent)
              break
            const selectedGenre = selectedGenres[j]
            if (genre === selectedGenre)
              isGenrePresent = true
          }
        }
        if (isGenrePresent) {
          filteredResult.push(movie)
        }
      })
      result = filteredResult
    }
  }

  const startIndex = cursor * limit
  const endIndex = (cursor + 1) * limit
  result = result.slice(startIndex, endIndex)

  return result
}