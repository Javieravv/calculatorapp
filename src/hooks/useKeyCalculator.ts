// hook utilizado para controlar las teclas que se oprimen

import { useContext } from "react"
import { CalcContext } from "../store/contextCalc"

export const useKeyCalculator = () => {
    const { addStringCalc, delStringCalc, resetStringCalc, resolveStringCalc, state } = useContext(CalcContext)
    // Conforme a la tecla que se oprima, se hará una acción:
    // - números u operandos: disparar addStringCalc
    // - DEL: disparar deleteStringCalc, que borra último número
    // - RESET: disparar resetStringCalc
    // - = : disparar resolveStringCalc
    const handleChangeKey = (valueKey: string) => {
        // Ingresamos números
        if ((['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(valueKey) >= 0)) {
            addStringCalc(valueKey)
            return
        }

        // Si ingresamos un punto, verificamos que el último número de la cadena no contenga ya .
        // Si es 33.3 no puuede ingresarse 33.3.2, por ejemplo.
        if (valueKey === '.') {
            // Si la cadena es vacía e iniciamos con un ., entonces agregamos el 0 y el .
            if (state.valueResult === '0') {
                addStringCalc('0.')
                return
            }

            // No incluir más de un . decimal en el último número.
            const lastNumbert: string = state.valueResult.split(/[+\-*/]/).pop() || '';
            if (lastNumbert?.includes('.')) {
                return
            } else {
                // Si el anterior carácter es algún signo, entonces agregar 0.
                if (['+', '-', '/', '*'].indexOf(state.valueResult[state.valueResult.length - 1]) > -1) {
                    addStringCalc('0.')
                    return
                }
                // agrgamos el .
                addStringCalc(valueKey)
                return
            }
        }

        // Operandos ingresados
        if (['+', '-', 'x', '/', '*'].indexOf(valueKey) >= 0) {
            // Si la cadena es vacía e iniciamos con un signo, entonces agregamos el 0 y el símbolo
            if (state.valueResult === '0') {
                if (valueKey === 'x') { valueKey = '*' }
                addStringCalc('0' + valueKey)
                return
            }

            // Verificamos que el último dígito no sea el mismo operando ingresado.
            if (['+', '-', 'x', '/', '*'].indexOf(state.valueResult[state.valueResult.length - 1]) === -1) {
                if (valueKey === 'x') { valueKey = '*' }
                addStringCalc(valueKey)
            } else {
                delStringCalc()
                addStringCalc(valueKey)
            }

            return
        }

        // Tecla DEL
        if (valueKey === 'DEL' || valueKey.toUpperCase() === 'BACKSPACE') {
            if (!state.ctrlResult) {
                delStringCalc()
            }
        }

        // Tecla RESET
        if ((valueKey === 'RESET') || valueKey.toUpperCase() === 'DELETE') {
            resetStringCalc()
        }

        // Tecla =
        // Si el último carácter de la cadena es un signo o un número, entonces no hará nada.
        if (valueKey === '=' || valueKey.toUpperCase() === 'ENTER') {
            if (['+', '-', 'x', '/', '.', '*'].indexOf(state.valueResult[state.valueResult.length - 1]) === -1) {
                resolveStringCalc()
            }
        }
    }

    return { handleChangeKey }
}
