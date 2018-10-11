/**
 * Simple userland heapdump generator using v8-profiler
 * Usage: require('[path_to]/heapdump').init('datadir')
 *
 * @module heapdump
 * @type {exports}
 */

const fs = require('fs');
const profiler = require('v8-profiler-node8');
const MB = 1024 * 1024;
let _datadir = null;
let nextMBThreshold = 0;

/**
 * Init and scheule heap dump runs
 *
 * @param datadir Folder to save the data to
 */
module.exports.init = function (datadir) {
  _datadir = datadir;
  setInterval(tickHeapDump, 500);
};

/**
 * Schedule a heapdump by the end of next tick
 */
function tickHeapDump() {
  setImmediate(function () {
    heapDump();
  });
}

/**
 * Creates a heap dump if the currently memory threshold is exceeded
 */
function heapDump() {
  var memMB = process.memoryUsage().rss / MB;

  if (memMB > nextMBThreshold) {
    console.log(memMB + '>' + nextMBThreshold);
    console.log('Current memory usage:', process.memoryUsage());
    nextMBThreshold += 50;
    var snap = profiler.takeSnapshot('profile');
    saveHeapSnapshot(snap, _datadir);
  }
}

/**
 * Saves a given snapshot
 *
 * @param snapshot Snapshot object
 * @param datadir Location to save to
 */
function saveHeapSnapshot(snapshot, datadir) {
  var buffer = '';
  var stamp = Date.now();
  snapshot.serialize(
    function iterator(data, length) {
      buffer += data;
    }, function complete() {
      var name = stamp + '.heapsnapshot';
      fs.writeFile(datadir + '/' + name , buffer, function () {
        console.log('Heap snapshot written to ' + name);
      });
    }
  );
}
