import { useRef, useState, useCallback } from 'react'
import useCharacterSearch from './useCharacterSearch'

function App() {

  const [pageNumber, setPageNumber] = useState(1)
  const observer = useRef()
  
  const {
    loading,
    error,
    characters,
    hasMore, 
    hasFetched
  } = useCharacterSearch(pageNumber)
  
  const lastCharacterRef = useCallback( node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver ( entries => {
      if (entries[0].isIntersecting && hasMore) {
        hasFetched.current = false
        setPageNumber(pageNumber => pageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])



  return (
    <>
    <header className='bg-orange-700'>
      <h1 className='text-center text-5xl p-10'>
        Naruto character page
      </h1>
    </header>
    <main className='bg-orange-700 m-0 p-0'>
      <div className='max-w-7xl mx-auto'>

        {characters?.map((item, index) => {
          if (characters.length === index + 1) {
            return <div ref={lastCharacterRef} className='bg-neutral-100 border border-neutral-900 p-5 flex mb-5 rounded-lg' key={item.id}>
                <img className='w-16' src={item.images[0]} alt={item.name} />
              <span className='flex items-center pl-10 font-extrabold'>{item.name}</span>
            </div>
          } else {
            return <div className='bg-neutral-100 border border-neutral-900 p-5 flex mb-5 rounded-lg' key={item.id}>
                <img className='w-16' src={item.images[0]} alt={item.name} />
              <span className='flex items-center pl-10'>{item.name}</span>
            </div>
          }
          })
        }

      </div>
      <div>{loading && '...Loading'}</div>
      <div>{error && '...Error'}</div>
    </main>
    </>
  )
}

export default App


{/* <select name="selector" id="selector" onChange={(e) => handleGroup(e.target.value) }>
          <option value="character">Characters</option>
          <option value="clan">Clans</option>
          <option value="kara">Kara</option>
          <option value="kekkei-genkai">Kekkeigenkai</option>
          <option value="tailed-beast">Tailed beasts</option>
          <option value="team">Teams</option>
          <option value="village">Villages</option>
          <option value="akatsuki">Akatsuki</option>
        </select> */}