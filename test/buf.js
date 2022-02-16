import assert from "assert";
import Put from "../index.js";
import Binary from "binary";

describe("String buffer combination test", function () {
  var stringBuffer = Buffer.from("pow");
  var buf = Put()
    .word16be(1337)
    .word8(1)
    .pad(5)
    .put(stringBuffer)
    .word32le(9000)
    .word64le(3)
    .word64be(4)
    .buffer();

  describe("Buffer length", function () {
    it("buffer should be " + (2 + 1 + 5 + 3 + 4 + 8 + 8), function () {
      assert.equal(buf.length, 2 + 1 + 5 + 3 + 4 + 8 + 8);
    });
  });

  var bs = [].slice.call(buf);

  describe("word16be", function () {
    it("should return false when not equal", function () {
      // word16be(1337)
      assert.deepEqual(bs.slice(0, 2), [0x05, 0x39]);
    });
  });

  describe("word8", function () {
    it("should return false when not equal", function () {
      // word8(1)
      assert.deepEqual(bs.slice(2, 3), [0x01]);
    });
  });

  describe("pad", function () {
    it("should return false when not equal", function () {
      // pad(5)
      assert.deepEqual(bs.slice(3, 8), [0x00, 0x00, 0x00, 0x00, 0x00]);
    });
  });

  describe("put(new Buffer('pow', 'ascii'))", function () {
    it("should return false when not equal", function () {
      // put(new Buffer('pow', 'ascii'))
      assert.deepEqual(bs.slice(8, 11), [0x70, 0x6f, 0x77]);
    });
  });

  describe("word32le", function () {
    it("should return false when not equal", function () {
      // word32le(9000)
      assert.deepEqual(bs.slice(11, 15), [0x28, 0x23, 0x00, 0x00]);
    });
  });

  describe("word64le", function () {
    it("should return false when not equal", function () {
      // word64le(3)
      assert.deepEqual(
        bs.slice(15, 23),
        [0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
      );
    });
  });

  describe("word16be", function () {
    it("should return false when not equal", function () {
      // word64be(4)
      assert.deepEqual(
        bs.slice(23, 31),
        [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04]
      );
    });
  });
});

describe("word [8|16|32|64] [le|be]", function () {
  ["le", "be"].forEach(function (end) {
    [8, 16, 32].forEach(function (n) {
      var max = Math.pow(2, n);
      var step = Math.max(1, Math.floor(max / 1000));

      describe("word" + n + end, function () {
        it("should return false when not equal", function () {
          for (var i = 0; i < max; i += step) {
            var buf = Put()["word" + n + end](i).buffer();
            var j = Binary.parse(buf)["word" + n + end]("j").vars.j;
            assert.deepEqual(i, j);
          }
        });
      });
    });
  });


describe("word64be", function () {
  it("should return false when not equal", function () {
    var buf = Put().word64be(1).buffer();
    assert.deepEqual([].slice.call(buf), [0, 0, 0, 0, 0, 0, 0, 1]);
  });
});

describe("word64le", function () {
  it("should return false when not equal", function () {
    var buf = Put().word64le(1).buffer();
    assert.deepEqual([].slice.call(buf), [1, 0, 0, 0, 0, 0, 0, 0]);
  });
});
});
