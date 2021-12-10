import json
import boto3


''' Funzione che aggiorna gli attributi di un progetto '''
def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Board')

    s = event['body']
    body = json.loads(s)
    params = event['pathParameters']

    project_id = params['board_id']
    title = body['title']
    expiration = body['expiration']
    description = body['description']
    attachment = body['attachment']

    try:
        data = table.update_item(
            Key={
                'id': project_id
            },
            UpdateExpression="set title=:t, expiration=:e, description=:d, attachment=:a",
            ExpressionAttributeValues={
                ':t': title,
                ':e': expiration,
                ':d': description,
                ':a': attachment
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
