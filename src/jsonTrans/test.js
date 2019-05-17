const fs = require('fs')
const path = require('path')
const JsonTrans = require('./jsonTrans.js')

let original = {
  a: 1,
  b: { c: 3 },
  d: [ { e: 5 }, { e: 5 } ]
}

let rule = {
  a1: 'a',
  b1: { rel: 'b', format: [{ c1: [{a1: 'a'}, {e1: 'b'}]},{c2: 'b', c21:'b.c'}] },
  c1: 'b.c',
  d1: { rel: 'd', format: { e1: 'b' } },
  xx: (org) => org.a + org.b.c
}

let res = JsonTrans(original, rule)

fs.writeFileSync(path.join(__dirname, './result.json'), JSON.stringify(res))
