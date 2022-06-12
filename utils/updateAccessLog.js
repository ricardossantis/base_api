const AccessLog = require('../models/AccessLog');

const updateAccessLog = async (context) => {
  if (context.accessKey) {
    const accessLog = await (await AccessLog.findById(context.accessKey));

    accessLog.last_access = new Date();
    accessLog.save();
  }
};

module.exports = updateAccessLog;
