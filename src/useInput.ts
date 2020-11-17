import { ChangeEvent, useCallback, useState } from "react"

const useInput  = (initialState= '')=>{
    const [value, setValue] = useState(initialState)
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
        []
    )
      return {
        value,
        onChange
      }

}
export default useInput