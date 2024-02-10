import axios from "axios"
import { useCallback, useState } from "react"


export const useHttp = () => {

    const [process, setProcess] = useState('waiting')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true)
        setProcess('loading')
        try {
            const data = await axios({
                method: method,
                url: url,
                data: body,
                headers: headers
              })
              
              setLoading(false)
              return data
        } catch (e) {
            setProcess('error')
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])
    
    return {loading, request, error, clearError, process, setProcess}
}