import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const useErrors=(errors=[])=>{
    useEffect(()=>{
        errors.forEach(({isError,error})=>{
            if(isError){
                toast.error(error?.data?.message||"Something went wrong")
            }
        })
    },[errors])
}

const asyncMutation = (mutationHook) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null); // corrected setter function
    const [mutate] = mutationHook(); // assuming mutationHook is a hook returning a mutation function
  
    const executeMutation = async (toastMessage, ...args) => {
      setIsLoading(true);
      const toastId = toast.loading(toastMessage || "Uploading data");
  
      try {
        const res = await mutate(...args); // call mutate with the arguments
  
        if (res.data) {
          toast.success(res?.data?.message || "Request successful", { _id: toastId });
          setData(res.data); // set the returned data to state
        } else {
          toast.error(res?.error?.data?.message || "Something went wrong", { _id: toastId });
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", { _id: toastId });
      } finally {
        setIsLoading(false); // set loading to false regardless of success or failure
      }
    };
  
    return [isLoading, data, executeMutation]; // corrected return value to return data instead of setData
  };

const useSocketEvents=(socket,handlers)=>{
  useEffect(()=>{
    Object.entries(handlers).forEach(([event,handler])=>{
      socket.on(event,handler)
    })
    return()=>{
      Object.entries(handlers).forEach(([event,handler])=>{
        socket.off(event,handler)
      })
    }
    
  },[])
}

export {useErrors,asyncMutation,useSocketEvents}