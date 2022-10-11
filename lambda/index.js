const sanitizer = require('./sanitizer')
const dynamo = require('./dynamoDB')

const { sanitize } = sanitizer
const { upsert } = dynamo

exports.handler = async (event) => {
    let { name, eha, code } = JSON.parse(event.body)

    if( code !== 'CSS') {
        console.log(`INVALID_CODE: ${JSON.stringify(event.body)}`)
        return {
            statusCode: 200,
            body: JSON.stringify('Invalid code, pls try the right one!'),
        }
    }

    name = sanitize(name)
    eha = sanitize(eha)
    code = sanitize(code)

    console.log({name, eha, code})

    await upsert({name, eha, code})

    const response = {
        statusCode: 200,
        body: JSON.stringify('Galactus service is happy. Thank you for reaching out to it\'s API'),
    }
    return response
}
