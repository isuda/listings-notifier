# New Listings Notifier

This serverless app will send emails for new listings based on a URL in Realtor.ca

Requirements

Need to create AWS Policy named `SendSESEmail` attached to the IAM role that will excecute the lambdas with the following JSON:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "*"
    }
  ]
}
```
