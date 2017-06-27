module.exports.Cookie = ({ co = '' }) => {
  this.cookies = {};
  co.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    this.cookies[parts[0].trim()] = (parts[1] || '').trim();
  });

  this.get = (key) => {
    return this.cookies[key] ? this.cookies[key] : {};
  };
};
