
module.exports = {
  identity: 'TopupRequest',
  attributes: {
      client: {model: 'client'},
      status: {type: 'string', enum: ['open', 'closed', 'process'], required: true},
      user: {model: 'User_client'},
      deleted: {
          type: 'boolean',
          required: true,
          defaultsTo: false
      }
      
  }
};

