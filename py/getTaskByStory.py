import json
import boto3
from boto3.dynamodb.conditions import Attr


''' Funzione che restituisce un task dato l'id della story corrispondente '''
def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
    table = dynamodb.Table("Task")

    try:

        response = table.scan(
            FilterExpression=Attr('story').eq(event['story'])
        )

        return {
            "isBase64Encoded": False,
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Methods": "DELETE,GET,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Origin": "*",  # Required for CORS support to work
            },
            "body": response['Items']
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
