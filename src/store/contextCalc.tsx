import { useReducer, createContext, ReactElement } from 'react';

type StateType = {
    valueResult: string;
    ctrlResult: boolean;  // Controla si ya hay resultado.
    theme?: string;
}

const initState: StateType = { 
    valueResult: '0' ,
    ctrlResult: false,
    theme: 'yellow'
}

const enum REDUCER_ACTION_TYPE {
    ADD_STRING_VALUE,
    DEL_STRING_VALUE,
    RESET_STRING_VALUE,
    RESOLVE_STRING_VALUE,
    CHANGE_THEME
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD_STRING_VALUE:
            if (state.valueResult === '0' || state.valueResult === 'ERROR' || state.valueResult === 'Infinity' || state.valueResult === '-Infinity' ) {
                return { ...state, valueResult: action.payload || '' }
            }
            // Si ingresa un operando.
            if (['+', '-', 'x', '/', '.', '*'].indexOf(action.payload || '') >= 0) {
                return { ...state, 
                    valueResult: state.valueResult + action.payload,
                    ctrlResult: false
                }
            }
            // Si ingresan números o un punto.
            return { ...state, 
                valueResult: state.ctrlResult ? action.payload || '' :  state.valueResult + action.payload,
                ctrlResult: false
            }
            
        case REDUCER_ACTION_TYPE.DEL_STRING_VALUE:
            if (!state.ctrlResult) {
                return { ...state, valueResult: state.valueResult.slice(0, -1) }
            } else return state
        case REDUCER_ACTION_TYPE.RESET_STRING_VALUE:
            return {...state, valueResult: '0', ctrlResult: false}
        case REDUCER_ACTION_TYPE.RESOLVE_STRING_VALUE:
            try {
                const result = eval(state.valueResult).toString()
                return {...state, valueResult: result, ctrlResult: true}
            } catch (error) {
                console.log(error)
                const result = 'ERROR' 
                return {...state, valueResult: result, ctrlResult: true}
            }
        case REDUCER_ACTION_TYPE.CHANGE_THEME:
            return {...state, theme: action.payload}
        default:
            return state;
    }
}


// hook personalizado
const useCalcContext = (initState: StateType) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const addStringCalc = (value: string) => {
        dispatch({
            type: REDUCER_ACTION_TYPE.ADD_STRING_VALUE,
            payload: value
        }
        )
    }

    const delStringCalc = () => {
        dispatch({
            type: REDUCER_ACTION_TYPE.DEL_STRING_VALUE,
        })
    }

    const resetStringCalc = () => {
        dispatch({
            type: REDUCER_ACTION_TYPE.RESET_STRING_VALUE
        })
    }

    const resolveStringCalc = () => {
        dispatch({
            type: REDUCER_ACTION_TYPE.RESOLVE_STRING_VALUE
        })
    }

    const changeTheme = ( theme: string) => {
        dispatch({
            type: REDUCER_ACTION_TYPE.CHANGE_THEME,
            payload: theme
        })
    }

    return { state, addStringCalc, delStringCalc, resetStringCalc, resolveStringCalc, changeTheme }
}

type UseCalcContextType = ReturnType<typeof useCalcContext>

const initContextState: UseCalcContextType = {
    state: initState,
    addStringCalc: () => {},
    delStringCalc: () => {},
    resetStringCalc: () => {},
    resolveStringCalc: () => {},
    changeTheme: () => {},
}

// Creamos el contexto.
export const CalcContext = createContext<UseCalcContextType>(initContextState)

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined
}

// Creamos el provider.
export const CalcProvider = ({
    children
}: ChildrenType): ReactElement => {
    return (
        <CalcContext.Provider value={useCalcContext(initState)}>
            {children}
        </CalcContext.Provider>
    )
}

export default CalcProvider