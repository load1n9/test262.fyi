#!/bin/sh

# clone test262
git clone https://github.com/tc39/test262.git --depth 1
cd test262

# install test262 harness (https://github.com/bterlson/test262-harness)
npm install -g test262-harness

echo running test262...
test262-harness --host-type="$1" --host-path="$2" --reporter=json --reporter-keys=file,result --threads=4 "test/**/*.js" > ../results.json