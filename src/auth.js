const CookieManager = require('./cookie.js');
const pad = require('pad');
const querystring = require('querystring');

const isAuthenticated = ({
  cookie,
  phpSessionId,
  redisClient,
}) => {
  if (phpSessionId == null) {
    const cookieManager = new CookieManager.Cookie(cookie);
    phpSessionId = cookieManager.get('PHPSESSID'); // eslint-disable-line no-param-reassign
  }

  const sessionId = querystring.unescape(phpSessionId);

  return new Promise((resolve, reject) => {
    redisClient.get(`sessions/${sessionId}`, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      if (!(result)) {
        reject(new Error('Not Authenticated'));
        return;
      }

      const session = JSON.parse(result);

      if (session == null || typeof session.USER_ID === 'undefined') {
        reject(new Error('Not Authenticated'));
        return;
      }

      session.ACTIVE_PROFILE_ID = pad(10, session.ACTIVE_PROFILE_ID, '0');
      resolve(session);
    });
  });
};

exports.isAuthenticated = isAuthenticated;
