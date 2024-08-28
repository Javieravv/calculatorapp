import { useEffect } from "react"
import { useKeyCalculator } from "../hooks/useKeyCalculator"
import Key from "./Key"

const KeysCalculator = () => {
    const { handleChangeKey } = useKeyCalculator()

    // Para capturar el teclado.
    useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {
            handleChangeKey(e.key)
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleChangeKey])

    return (
        <section
            className="keys-calc"
        >
            <article className="keys__values">
                <Key keytext={"7"} keyclass={"key key__value"} />
                <Key keytext={"8"} keyclass={"key key__value"} />
                <Key keytext={"9"} keyclass={"key key__value"} />
                <Key keytext={"DEL"} keyclass={"key key__del"} />
                <Key keytext={"4"} keyclass={"key key__value"} />
                <Key keytext={"5"} keyclass={"key key__value"} />
                <Key keytext={"6"} keyclass={"key key__value"} />
                <Key keytext={"+"} keyclass={"key key__value"} />
                <Key keytext={"1"} keyclass={"key key__value"} />
                <Key keytext={"2"} keyclass={"key key__value"} />
                <Key keytext={"3"} keyclass={"key key__value"} />
                <Key keytext={"-"} keyclass={"key key__value"} />
                <Key keytext={"."} keyclass={"key key__value"} />
                <Key keytext={"0"} keyclass={"key key__value"} />
                <Key keytext={"/"} keyclass={"key key__value"} />
                <Key keytext={"x"} keyclass={"key key__value"} />
            </article>
            <article className="keys__buttons">
                <Key keytext={"RESET"} keyclass={"keybutton key-reset"} />
                <Key keytext={"="} keyclass={"keybutton key-equal"} />
            </article>
        </section>
    )
}

export default KeysCalculator