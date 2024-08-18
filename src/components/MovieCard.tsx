import { FaRegStar, FaStar } from "react-icons/fa"
import { MovieType } from "../types"
import { useState } from "react"

type PropsType = {
  movie: MovieType
}

export default function MovieCard({ movie }: PropsType) {

  const [isSaved, setIsSaved] = useState(!!localStorage.getItem(movie.title))

  const onSaveMovie = () => {
    localStorage.setItem(movie.title, JSON.stringify(movie))
    setIsSaved(true)
  }

  const onRemoveMovie = () => {
    localStorage.removeItem(movie.title)
    setIsSaved(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div>
          <img className="w-full lg:min-w-72 h-full max-h-[80vh] aspect-[2/3] object-cover object-center grayscale"
            src={movie.poster}
            alt={`Poster of ${movie.title}`}
          />
        </div>
        <div className="relative flex-grow p-6 text-sm md:text-base">
          <button className="absolute top-0 right-0 mt-4 mr-4 p-1 bg-transparent text-neutral-900 cursor-pointer"
            onClick={isSaved ? onRemoveMovie : onSaveMovie}
            title={isSaved ? "Remove movie from favourites" : "Save movie in favourites"}
            aria-pressed={isSaved ? "true" : "false"}
          >
            {isSaved ? <FaStar /> : <FaRegStar />}
          </button>
          <p className="text-xl font-semibold uppercase tracking-wide">{movie.title} ({movie.year})</p>
          <p className="mb-2 text-lg font-medium">{movie.genre.join(', ')}</p>
          <p className="mb-2 text-gray-500">Rating: {movie.rating}/10</p>
          <p className="mb-2 text-gray-500">Director: {movie.director}</p>
          <p className="mb-2 text-gray-500">Starring: {movie.actors.join(', ')}</p>
          <p className="mb-2 text-gray-500 line-clamp-3" title={movie.plot} aria-label={movie.plot}>{movie.plot}</p>
          <p className="mb-2 text-gray-500">Awards: {movie.awards}</p>
          <p className="mb-3 text-gray-500">Production: {movie.production}</p>
          <a
            href={movie.website}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit the official website for ${movie.title}`}
          >
            Official Website
          </a>
        </div>
      </div>
    </div>
  )
}