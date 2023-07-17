import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { currencies } from "../data/currencies";
import Error from "./Error";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({ setCurrencies }) => {

    const [ criptos, setCriptos ] = useState([])
    const [ error, setError ] = useState(false)

    const [ currency, SelectMonedas ] = useSelectMonedas('Pick your currency', currencies)
    const [ cripto, SelectCriptos ] = useSelectMonedas('Pick your favorite cripto', criptos)

    useEffect(() => {
        const requestAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=de4f86ca219469f7ef4171531072a65198c76f3af2b35c3ab1ec2d72d4c26c2c'
            const response = await fetch(url)
            const { Data } = await response.json()
            
            const arrayCriptos = Data.map(cripto => {
                const objectCripto = {
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }

                return objectCripto
            })

            setCriptos(arrayCriptos)
        }
        requestAPI()
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()

        if ([currency, cripto].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setCurrencies({
            currency,
            cripto
        })
    }

    return (
        <>
            {error && <Error>All fields are require</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptos />
        
                <InputSubmit
                    type="submit"
                    value="quote"
                />
            </form>
        </>
    )
}

export default Form