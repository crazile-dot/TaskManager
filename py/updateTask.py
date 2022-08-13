import json
import boto3


''' Funzione che si occupa di aggiornare lo stato di un task '''
def lambda_handler(event, context):
    # Instanciating connection objects with DynamoDB using boto3 dependency
    dynamodb = boto3.resource('dynamodb')

    # Getting the table the table Temperatures object
    tableTasks = dynamodb.Table('Task')

    s = event['body']
    body = json.loads(s)
    params = event['pathParameters']

    task_id = params['task_id']
    title = body['title']
    story = body['story']
    task_state = body['task_state']

    # Putting a try/catch to log to user when some error occurs
    try:

        data = tableTasks.update_item(
            Key={
                'id': task_id
            },
            UpdateExpression="set title=:t, story=:s, task_state=:ts",
            ExpressionAttributeValues={
                ':t': title,
                ':s': story,
                ':ts': task_state
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
            "body": json.dumps("NO")
        }
