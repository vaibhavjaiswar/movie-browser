import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import MovieBrowser from './MovieBrowser'

function App() {
  return (
    <div className='min-h-screen flex flex-col justify-normal items-stretch'>
      <Header />
      <main className='flex-grow bg-neutral-100 text-neutral-900'>
        <MovieBrowser />
      </main>
      <Footer />
    </div>
  )
}

export default App