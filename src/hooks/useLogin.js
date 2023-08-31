
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { useEffect, useState } from "react"

export const useLogin = () => {
    const [isCancelled,setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending , setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)
        try {
           const res = await projectAuth.signInWithEmailAndPassword(email, password)
            //dispatch logout action

            dispatch({type:'LOGIN', payload: res.user})

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }

           

        } catch (error) {
            if(!isCancelled){

                console.log(error.message)
                setError(error.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return {login,error,isPending}
}