const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/stream', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('URL required');

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (url.endsWith('.ts')) {
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(`#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXTINF:10.0,
${url}
#EXT-X-ENDLIST`);
  } else {
    request({ url, encoding: null }).pipe(res);
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));