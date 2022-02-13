#!/usr/bin/env node

import Put from '../index.js';
var stringBuffer = Buffer.from("pow");
var buf = Put()
    .word16be(1337)
    .word8(1)
    .pad(5)
    .put(stringBuffer)
    .word32le(9000)
    .buffer()
;
console.log(buf);
