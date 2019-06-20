var express = require('express');
var router = express.Router();
const sleep = (ts) => new Promise((res, rej) => setTimeout(res, ts));

/* GET home page. */
router.get('/api/search',async function (req, res, next) {
  
  await sleep(1500)
  const { text } = req.query
  if (text === '哈哈哈') {
    res.json({
      errMsg:'敏感词语',
      err: -2
    })
  }
  else{
    res.json({
      res: {
        text,
        number:Math.round(Math.random()*10000)
      },
      err: 0
    })
  }
  
});

module.exports = router;
