import assert from "assert";
import Put from "../index.js";

//exports.stream = function () {

describe("stream write", function () {
  
    var written = 0;
    var stream = {
      write: function (buf) {
        it("should return false when not equal", function () {   
            assert.equal(buf.toString(), "abcdefg");
        });
        written++;
      },
    };

    Put()
      .word16be(256 * "a".charCodeAt(0) + "b".charCodeAt(0))
      .word32le(
        Math.pow(256, 0) * "c".charCodeAt(0) +
          Math.pow(256, 1) * "d".charCodeAt(0) +
          Math.pow(256, 2) * "e".charCodeAt(0) +
          Math.pow(256, 3) * "f".charCodeAt(0)
      )
      .word8("g".charCodeAt(0))
      .write(stream);

    it("should return false when not equal", function () {  
        assert.equal(written, 1);
    });    
});