import json
import boto3


''' Funzione che restituisce una story dato il suo id '''
def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
    table = dynamodb.Table("Story")

    try:

        response = table.get_item(
            Key=
            {
                'id': event['story_id']
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
            "body": response['Item']
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
            "body": json.dumps("Not found")
        }