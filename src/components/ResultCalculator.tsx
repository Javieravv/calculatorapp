import { useContext, useEffect, useRef } from "react"
import { CalcContext } from "../store/contextCalc"

const ResultCalculator = () => {
    const resultCalcRef = useRef<HTMLInputElement>(null)
    const { state } = useContext(CalcContext)

    useEffect(() => {
        if (resultCalcRef.current) {
            resultCalcRef.current.scrollLeft = resultCalcRef.current.scrollWidth; // Desplaza hacia izquierda
        }
    }, [state.valueResult])
    

    return (
        <article className="result-calc">
            {/* <p className="text-resultcalc">{state.valueResult}</p> */}
            <input
                type="text"
                name="result"
                id="result"
                className="text-resultcalc"
                disabled={true}
                value={state.valueResult} 
                ref={resultCalcRef}
                onChange = { () => {}}
            />
        </article> 
    )
}

export default ResultCalculator
