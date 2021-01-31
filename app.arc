@app
listings

@events
notify-listings
update-listings

@scheduled
check-new-listings cron(0 8,11,14,17 ? * * *)

@tables
listings
  listingId *String
