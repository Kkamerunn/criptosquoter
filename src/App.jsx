import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImageCripto from './assets/img/imagen-criptos.png'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [ currencies, setCurrencies ] = useState({})
  const [ quote, setQuotation ] = useState({})
  const [ download, setDownload ] = useState(false)

  useEffect(() => {
    if (Object.keys(currencies).length > 0) {
      const quoteCripto = async () => {
        setDownload(true)
        setQuotation({})
        const { currency, cripto } = currencies
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${currency}&api_key=de4f86ca219469f7ef4171531072a65198c76f3af2b35c3ab1ec2d72d4c26c2c`

        const response = await fetch(url)
        const result = await response.json()

        setQuotation(result.DISPLAY[cripto][currency])
        setDownload(false)
      }

      quoteCripto()
    }
  }, [currencies])

  return (
    <Container>
      <Image 
        src={ImageCripto}
        alt='Cripto Image'
      />
      <div>
        <Heading>Quote criptos instantly</Heading>
        <Form 
          setCurrencies={setCurrencies}
        />
        {download && <Spinner />}
        {quote.PRICE && <Result result={quote} />}
      </div>
    </Container>
  )
}

export default App
