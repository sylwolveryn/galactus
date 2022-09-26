import { createSignal } from 'solid-js'
import styles from './App.module.css'

function App() {
    const [name, setName] = createSignal('')
    const [eha, setEha] = createSignal('')
    const [code, setCode] = createSignal('')

    const handleSubmit = async ( event ) => {
        event.preventDefault()

        const rawResponse = await fetch('https://d2gixz63tranhqsldnfpo6hqwi0lgejn.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            body: JSON.stringify({
                name: name(),
                eha: eha(),
                code: code(),
            })
        })
        const response = await rawResponse.json()
        console.log(response)
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
                <form onSubmit={ handleSubmit }>
                    <label for='name'>Név</label><br/>
                    <input type='text'
                           id='name'
                           placeholder='Deadpool'
                           onChange={(event) => { handleNameUpdate(event.currentTarget.value) } }
                    ></input><br/>

                    <label for='eha'>eha</label><br/>
                    <input type='text'
                           id='eha'
                           placeholder='asd.me'
                           onChange={(event) => { handleEhaUpdate(event.currentTarget.value) } }
                    ></input><br/>

                    <label for='code'>kód</label><br/>
                    <input type='text'
                           id='code'
                           placeholder='Gwenpool'
                           onChange={(event) => { handleCodeUpdate(event.currentTarget.value) } }
                    ></input><br/>

                    <input type='submit' value='Submit'> </input>
                </form>
            </header>
        </div>
    )
}

export default App
