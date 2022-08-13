import json
import boto3


''' Funzione che inserisce una story nella tabella Story del database '''
def lambda_handler(event, context):
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("Story")

    s = event['body']
    body = json.loads(s)

    request = event['requestContext']
    story_id = request['requestId']

    title = body['title']
    expiration = body['expiration']
    description = body['description']
    project_id = body['project_id']
    score = body['score']
    story_state = body['story_state']
    priority = body['priority']

    try:
        table.put_item(
            Item={
                'id': story_id,
                'title': title,
                'expiration': expiration,
                'description': description,
                'project_id': project_id,
                'score': score,
                'story_state': story_state,
                'priority': priority
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
            "body": json.dumps("Successfully inserted")
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