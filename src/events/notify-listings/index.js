
const arc = require('@architect/functions');
const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: AWS.config.region });

exports.handler = arc.events.subscribe(handler);


function emailBody(listings) {
  let body = `<!doctype html>
    <html>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>New Home Listings</title>
    <body class="" style="background-color: #ffffff; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <b>New Home Listings</b><br><br>`;

  for (const listing of listings) {
    body += `
      <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #ffffff; border-radius: 3px;">
        <tr style="padding: 20px;">
          <td>
            <a href="${listing.url}">${listing.property.Address.AddressText.split("|")[0]} - ${listing.property.Price}</a><br>
            Bedrooms: ${listing.building.Bedrooms}<br>
            Bathrooms: ${listing.building.BathroomTotal}<br>
            Lot Size: ${listing.land.SizeTotal}<br>
            House Size: ${listing.building.SizeInterior}<br>
            ${listing.description}
          </td>
        </tr>
      </table>
    `;
  }

  body += `</body></html>`;

  return body;
}

async function handler ({ listings }) {
  try {
    const emailTo = process.env.MAILTO;
    const fromAddr = process.env.FROMADDR;

    const params = {
      Destination: {
        ToAddresses: emailTo.split(","),
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailBody(listings)
          },
        },

        Subject: {
          Charset: "UTF-8",
          Data: "New Home Listings"
        },
      },
      Source: fromAddr,
    };
    // console.log(JSON.stringify(params, null, 2));
    return await ses.sendEmail(params).promise();
  } catch(err) {
    console.error(err);
  }
}
