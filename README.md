![npm](https://img.shields.io/npm/dw/heapsnapshot.js.svg)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

# heapdump.js
A tool to take a heap snapshot via V8 profiler, which is inspired by [Understanding Garbage Collection and hunting Memory Leaks in Node.js](https://www.dynatrace.com/news/blog/understanding-garbage-collection-and-hunting-memory-leaks-in-node-js/)
## required
- Node.js >= 6.4.0
- OSX: This code is only pass-test on OSX platform

## usage
add this code to the start
```javascript
require('heapsnapshot.js').init()
```
heapsnapshot.init([dataDir][,options])
- `dataDir` <string>  the path of folder for heap snapshot file. *Default*:`.`
- `options` <object>
  - `interval`  <number>  the interval millisecond to check the usage of memory. *Default*:`500`
  - `step`: <number>  the distance between two adjacent threshold. *Default*:`50`
  - `threshold`: <number> the initial threshold.  *Default*:`0`
