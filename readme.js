/**
 * Tallbag-scan
 * ------------
 *
 * Tallbag operator that combines consecutive values from the same source.
 * It's essentially like array `.reduce`, but delivers a new accumulated value
 * for each value from the tallbag source. Works on either pullable or
 * listenable sources.
 *
 * `npm install tallbag-scan`
 *
 * Example:
 *
 *     const fromIter = require('callbag-from-iter');
 *     const iterate = require('callbag-iterate');
 *     const scan = require('tallbag-scan');
 *
 *     const iterSource = fromIter([1,2,3,4,5]);
 *     const scanned = scan((prev, x) => prev + x, 0)(iterSource);
 *
 *     scanned(0, iterate(x => console.log(x))); // 1
 *                                               // 3
 *                                               // 6
 *                                               // 10
 *                                               // 15
 */

const makeShadow = require('shadow-callbag').default;

function scan(reducer, seed) {
  let hasAcc = arguments.length === 2;
  return source => (start, sink) => {
    if (start !== 0) return;
    let acc = seed;
    let shadow;
    source(0, (t, d, s) => {
      if (t === 0) {
        shadow = makeShadow('scan', s);
        sink(t, d, shadow);
      }
      if (t === 1) {
        acc = hasAcc ? reducer(acc, d) : ((hasAcc = true), d);
        sink(1, acc);
      }
      if (t === 2) sink(t, d);
    });
  };
}

module.exports = scan;
