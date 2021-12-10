import json
import boto3


''' Funzione che aggiorna gli attributi di una story '''
def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Story')

    s = event['body']
    body = json.loads(s)
    params = event['pathParameters']

    story_id = params['story_id']
    title = body['title']
    expiration = body['expiration']
    description = body['description']
    project_id = body['project_id']
    score = body['score']
    story_state = body['story_state']
    priority = body['priority']

    try:
        data = table.update_item(
            Key={
                'id': story_id
            },
            UpdateExpression="set title=:t, expiration=:e, description=:d, project_id=:p, score=:s, story_state=:ss, priority=:pr",
            ExpressionAttributeValues={
                ':t': title,
                ':e': expiration,
                ':d': description,
                ':p': project_id,
                ':s': score,
                ':ss': story_state,
                ':pr': priority
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
            "body": json.dumps("Story successfully updated!")
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
            "body": json.dumps(str(e))
        }
