@app
listings

@events
notify-listings
update-listings

@scheduled
check-new-listings cron(0 1,16,19,22 ? * * *)

@tables
listings
  listingId *String

@macros
ses-permission
architect/macro-node-prune
