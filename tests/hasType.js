const fs = require('fs');
const babel = require('babel-core');
const { resolve } = require('path');

module.exports = async (path, type, cb) => {
  let has = false;

  const checker = () => ({
    visitor: {
      [type](path) {
        has = true;
      },
    }
  });

  fs.readFile(resolve(`src/${path}`), function(err, data) {
    if(err) throw err;
    const src = data.toString();
    const out = babel.transform(src, {
      plugins: [checker]
    });
    cb(has);
  });
};

