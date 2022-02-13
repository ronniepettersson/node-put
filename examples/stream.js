#!/usr/bin/env node

import Put from '../index.js';
Put()
    .word16be(0x6162)
    .word32le(0x66656463)
    .word8(0x67)
    .word8(0x0A)
    .write(process.stdout)
;
