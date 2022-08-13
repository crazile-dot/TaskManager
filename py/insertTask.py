import json
import boto3


''' Funzione che inserisce un task nella tabella Task del database '''
def lambda_handler(event, context):
    dynamodb = boto3.resource("dynamodb")
    tableTasks = dynamodb.Table("Task")

    s = event['body']
    body = json.loads(s)

    request = event['requestContext']
    task_id = request['requestId']

    title = body['title']
    task_state = body['task_state']
    story = body['story']

    try:
        tableTasks.put_item(
            Item={
                'id': task_id,
                'title': title,
                'task_state': task_state,
                'story': story
            }
        )

        return {
            "isBase64Encoded": False,
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Methods": "DELETE,GET,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Origin": "*",  # Required for CORS support to work
            },
            "body": json.dumps("Task successfully inserted!")
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
            "body": json.dumps("Not inserted")
        }