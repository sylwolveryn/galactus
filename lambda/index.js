const sanitizer = require('./sanitizer')
const dynamo = require('./dynamoDB')

const { sanitize } = sanitizer
const { upsert } = dynamo

exports.handler = async (event) => {
    const { name, eha, code } = JSON.parse(event.body)

    console.log(`##########
galactus service start
name: ${name}
eha: ${eha}
code: ${code}
############`)
    const sName = sanitize(name)
    const sEha = sanitize(eha)
    const sCode = sanitize(code)

    console.log(`##########
sname: ${sName}
seha: ${sEha}
scode: ${sCode}
############`)

    await upsert({eha, code, name})

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    }
    return response
}
