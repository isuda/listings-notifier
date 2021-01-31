
const arc = require('@architect/functions');

exports.handler = async function handler () {
  await arc.events.publish({
    name: 'update-listings',
    payload: {}
  });
};
