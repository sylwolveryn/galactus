const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

const upsert = async ({name, eha, code}) => {
    console.log('dynamo upsert start')

    const params = {
        TableName: 'galactus-v2',
        Item: {
            name,
            eha,
            code,
            timestamp: new Date().getTime(),
        }
    }
    const response = await ddb.put(params).promise()
    console.log(`upsert to Galactus dynamoDB done. Response: ${JSON.stringify(response, null, 4)}`)

    return response
}

module.exports = {
    upsert,
}