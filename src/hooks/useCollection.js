import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query , _orderBy) => {
    const [ documents, setDocuments ] = useState(null)
    const [error , setError] = useState(null)

    //if we dont use a ref --. infinite loop in useEffect
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current


    useEffect(() => {
        let ref = projectFirestore.collection(collection)
        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }

        const unsubcribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })

            //update state
            setDocuments(results)
            setError(null)
        },(error)=> {
            console.log(error)
            setError('could not fetch the data')
        })

        //unsubcribe on unmount
        return () => unsubcribe()

    },[collection, query , orderBy])

    return {documents , error}

}