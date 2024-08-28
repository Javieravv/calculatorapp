import Calculator from './components/Calculator'
import { CalcProvider } from './store/contextCalc'


function App() {
    return (
        <section className='calculator-container'>
            <CalcProvider>
                <Calculator />
            </CalcProvider>
        </section>
    )
}

export default App
