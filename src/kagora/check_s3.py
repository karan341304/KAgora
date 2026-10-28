"""
Quick script to verify AWS S3 credentials and permissions.

Run with: uv run check_s3.py

This checks that your .env credentials can upload to and delete from your S3 bucket
without needing to go through the full application flow.
"""

from io import BytesIO

from botocore.exceptions import BotoCoreError, ClientError

from kagora.config import settings
from kagora.image_utils import _get_s3_client


def check_s3_connection():
    s3 = _get_s3_client()

    print(f"Bucket: {settings.s3_bucket_name}")
    print(f"Region: {settings.s3_region}")
    print()

    test_key = "profile_pics/test.txt"

    # Test upload
    try:
        s3.upload_fileobj(
            BytesIO(b"test"),
            settings.s3_bucket_name,
            test_key,
            ExtraArgs={"ContentType": "text/plain"},
        )
        print("Upload: SUCCESS")
    except (BotoCoreError, ClientError) as e:
        print(f"Upload: FAILED - {e}")
        return

    # Test delete
    try:
        s3.delete_object(Bucket=settings.s3_bucket_name, Key=test_key)
        print("Delete: SUCCESS")
    except (BotoCoreError, ClientError) as e:
        print(f"Delete: FAILED - {e}")
        return

    print()
    print("All tests passed! Your S3 configuration is working.")


if __name__ == "__main__":
    check_s3_connection()