import { createSignal } from 'solid-js'
import styles from './App.module.css'

function App() {
    const [name, setName] = createSignal('')
    const [eha, setEha] = createSignal('')
    const [code, setCode] = createSignal('')
    const [errorMessage, setErrorMessage] = createSignal('')
    const [errorRetry, setErrorRetry] = createSignal(0)

    const handleSubmit = async ( event ) => {
        event.preventDefault()

        const rawResponse = await fetch('https://d2gixz63tranhqsldnfpo6hqwi0lgejn.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            body: {
                name: name(),
                eha: eha(),
                code: code(),
            }
        })
        const response = await rawResponse.json()
        console.log(response)
        if (response.indexOf('Teapot') >= 0) {
            setErrorRetry(errorRetry()+1)
            errorRetry() > 3
                ? setErrorMessage('Try to write your own async function in the console: var handleSubmit = async () { .... don\'t forget to set the body as a JSON. Or use Postman, or curl, or... butterflies.}')
                : setErrorMessage('Ohh no, the handleSubmit function is missing the JSON.stringify api call.. it won\'t be able to reach out to Galactus service!')
        }
    }

    const handleNameUpdate = (value) => setName(value)
    const handleEhaUpdate = (value) => setEha(value)
    const handleCodeUpdate = (value) => setCode(value)

    return (
        <div class={ styles.App }>
            <header class={ styles.header }>
                <h2>
                    Welcome to Galactus Service
                </h2>
                <h2>
                    {errorMessage()}
                </h2>
                <form onSubmit={ handleSubmit }>
                    <label for='name'>Név</label><br/>
                    <input type='text'
                           id='name'
                           placeholder='Deadpool'
                           onChange={(event) => { handleNameUpdate(event.currentTarget.value) } }
                    ></input><br/>

                    <label for='eha'>Neptum kód</label><br/>
                    <input type='text'
                           id='eha'
                           placeholder='asd.me'
                           onChange={(event) => { handleEhaUpdate(event.currentTarget.value) } }
                    ></input><br/>

                    <label for='code'>Kód</label><br/>
                    <input type='text'
                           id='code'
                           placeholder='Wakanda'
                           onChange={(event) => { handleCodeUpdate(event.currentTarget.value) } }
                    ></input><br/>

                    <input type='submit' value='Submit'> </input>
                </form>
            </header>
        </div>
    )
}

export default App
