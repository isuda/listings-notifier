 /**
  * Starter macro template
  *
  * @param {object} arc - Parsed `app.arc` value
  * @param {object} sam - Generated CloudFormation template
  * @param {string} stage - Deployment target runtime environment 'staging' or 'production'
  * @returns {object} Modified CloudFormation template
  */
 module.exports = async function(arc, sam, stage='staging', inventory) {
  const { inv } = inventory;

  // Bail if no env vars are configured for this environment
  const envVars = inv._project.env && inv._project.env[stage];

  sam.Resources.Role.Properties.Policies.push({
    PolicyName: "ArcSESPolicy",
    PolicyDocument: {
      Statement: [{
        Effect: "Allow",
        Action: [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ],
        Resource: [{
          "Fn::Sub": [
            "arn:${AWS::Partition}:ses:${AWS::Region}:${AWS::AccountId}:identity/${identityName}",
            {
              identityName: envVars.FROMADDR
            }
          ]
        }]
      }]
    }
  });

  return sam;
}
