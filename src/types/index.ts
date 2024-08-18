export type MovieGenreType = "Drama" | "Crime" | "Action" | "Romance" | "Adventure" | "Sci-Fi" | "Fantasy" | "Thriller" | "War" | "Mystery" | "History" | "Animation"

export type MovieType = {
  id: number
  title: string
  year: number
  genre: MovieGenreType[]
  rating: number
  director: string
  actors: string[]
  plot: string
  poster: string
  trailer: string
  runtime: number
  awards: string
  country: string
  language: string
  boxOffice: string
  production: string
  website: string
}

export type FilterType = Record<MovieGenreType, boolean>