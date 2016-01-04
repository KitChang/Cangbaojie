
module.exports = {
  identity: 'TopupRequest',
  attributes: {
      client: {model: 'client'},
      status: {type: 'string', enum: ['open', 'closed', 'process'], required: true}
  }
};

