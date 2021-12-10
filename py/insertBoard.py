import json
import boto3


''' Funzione che inserisce un progetto nella tabella Board del database '''
def lambda_handler(event, context):
    dynamodb = boto3.resource("dynamodb")
    tableBoards = dynamodb.Table("Board")

    s = event['body']
    body = json.loads(s)

    request = event['requestContext']
    board_id = request['requestId']

    title = body['title']
    expiration = body['expiration']
    description = body['description']
    attachment = body['attachment']

    try:
        tableBoards.put_item(
            Item={
                'id': board_id,
                'title': title,
                'expiration': expiration,
                'description': description,
                'attachment': attachment
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
            "body": json.dumps(str(event))
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