import { useEffect, useState, useRef } from "react"

export default function useCharacterSearch(pageNumber, resetFetch) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [characters, setCharacters] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const hasFetched = useRef(false)

    const url = `https://narutodb.xyz/api/character?page=${pageNumber}&limit=20`

    const fetchUrl = () => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setCharacters(prevCharacters => {
            return [...prevCharacters, ...data.characters]
            })
            setHasMore(data.characters.length > 0)
            setLoading(false)
        })
        .catch(err => setError(true))
    }
    
    useEffect(() => {
        if (hasFetched.current) return;

        setLoading(true),
        setError(false)
        fetchUrl()
        hasFetched.current = true;
      },[pageNumber])

      return { loading, error, characters, hasMore, 
        hasFetched 
    }
}

