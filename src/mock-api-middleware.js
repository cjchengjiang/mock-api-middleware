const fs = require('fs');
const url = require('url');
const path = require('path');

function mockApiMiddleware(options) {
  return function(req, res, next) {
    const mockJsonPath = path.join(options.filePath + req.url + '.json');
    if(!!process.env.MOCK && fs.existsSync(mockJsonPath, 'utf-8')) {
      const jsonData = fs.readFileSync(mockJsonPath, 'utf-8');
      res.setHeader("Content-Type", "application/json");
      res.end(jsonData);
    } else {
      next();
    }
  }
}

module.exports = mockApiMiddleware;
