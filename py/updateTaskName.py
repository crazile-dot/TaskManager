import json
import boto3


''' Funzione che si occupa di aggiornare il nome di un task '''
def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    tableTasks = dynamodb.Table('Task')

    s = event['body']
    body = json.loads(s)
    params = event['pathParameters']

    task_id = params['task_id']
    title = body['title']

    try:

        data = tableTasks.update_item(
            Key={
                'id': task_id
            },
            UpdateExpression="set title=:t",
            ExpressionAttributeValues={
                ':t': title,
            },
            ReturnValues="UPDATED_NEW"
        )

        return {
            "isBase64Encoded": False,
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Methods": "DELETE,GET,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Origin": "*",  # Required for CORS support to work
            },
            "body": json.dumps("Task successfully updated")
        }

    except Exception as e:
        print(e)
        return {
            "isBase64Encoded": False,
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Methods": "DELETE,GET,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Origin": "*",  # Required for CORS support to work
            },
            "body": json.dumps(str(event))
        }
