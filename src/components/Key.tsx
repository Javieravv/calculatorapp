//Componente para mostrar las teclas de la calculadora

import { FC } from "react";
import { useKeyCalculator } from "../hooks/useKeyCalculator";

interface KeyProps {
    keytext: string;
    keyclass: string;
}

const Key: FC<KeyProps> = ({ keytext, keyclass }) => {
    const { handleChangeKey } = useKeyCalculator()

    const handleClickKey = (valueKey: string) => {
        handleChangeKey(valueKey)
    }

    return (
        <div
            className={keyclass}
            onClick={() => handleClickKey(keytext)}
        >
            {keytext}
        </div>
    )
}

export default Key
