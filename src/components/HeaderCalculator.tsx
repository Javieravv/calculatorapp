import { useEffect, useState } from "react"

const HeaderCalculator = () => {
    // const { state, changeTheme } = useContext(CalcContext)
    const [valuetheme, setValuetheme] = useState<string>()

    useEffect(() => {
        setValuetheme(localStorage.getItem('calculator-theme') || 'dark')
        const root = document.documentElement;
        root.setAttribute('data-theme', valuetheme || 'dark');
    }, [valuetheme])
    

    const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValuetheme(e.target.value)
        localStorage.setItem('calculator-theme', e.target.value)
        const root = document.documentElement;
        root.setAttribute('data-theme', e.target.value);
    }

    return (
        <article className="header-calc">
            <h2>calc</h2>
            <p className="header-text">theme</p>
            <div className="header-themes"> 
                <div>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                </div>
                <div>
                    <input type="radio" name="valuetheme" id="theme1" value="dark"  checked= {valuetheme  === 'dark'} onChange={handleTheme}/>
                    <input type="radio" name="valuetheme" id="theme2" value="light"  checked={valuetheme === 'light'} onChange={handleTheme}/>
                    <input type="radio" name="valuetheme" id="theme3" value="yellow" checked={valuetheme === 'yellow'} onChange={handleTheme}/>
                </div>
            </div>
        </article>
    )
}
 
export default HeaderCalculator