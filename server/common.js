/**
 * Created by youngmoon on 1/4/15.
 */
var colors = require('tracer/node_modules/colors');
var logging = require('tracer').colorConsole({
  format : "({{file}}:{{line}}) : {{message}}",
  filters: {
    log: colors.white,
    debug: colors.red
  }
});


Common = {
  log: logging.log,
  debug: logging.debug
};

module.exports = Common;