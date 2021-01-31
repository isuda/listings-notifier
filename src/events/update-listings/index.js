
const realtor = require('realtorca');
const arc = require('@architect/functions');

exports.handler = arc.events.subscribe(handler);

function parseListing(listing) {
  return {
    id: listing.MlsNumber,
    description: listing.PublicRemarks,
    building: listing.Building,
    property: listing.Property,
    land: listing.Land,
    url: `https://realtor.ca${listing.RelativeDetailsURL}`,
    photoUpdateDate: listing.PhotoChangeDateUTC
  }
}

async function handler () {
  try {
    const opts = realtor.optionsFromUrl(process.env.REALTOR_URL);

    const {Results: results} = await realtor.post(opts);

    const newListings = [];
    const listings = results.map(parseListing);

    const data = await arc.tables();

    for(const listing of listings) {
      const newListing = !(await data.listings.get({listingId: listing.id}));
      if (newListing) {
        newListings.push(listing);
      }
    }

    for (const newListing of newListings) {
      await data.listings.put({listingId: newListing.id})
    }

    await arc.events.publish({
      name: 'notify-listings',
      payload: {
        listings: newListings
      }
    });

  } catch(err) {
    console.error(err);
  }
}
