var Cofree = require('../cofree'),
    Option = require('daggy').taggedSum({
        Some: ['x'],
        None: []
    }),
    nel = Cofree(
        1,
        Option.Some(
            Cofree(
                2,
                Option.Some(
                    Cofree(
                        3,
                        Option.None
                    )
                )
            )
        )
    );

Option.of = Option.Some;
Option.prototype.map = function(f) {
    return this.cata({
        Some: function(x) {
            return Option.Some(f(x));
        },
        None: function() {
            return Option.None;
        }
    });
};
Option.prototype.traverse = function(f, p) {
    return this.cata({
        Some: function(x) {
            return Option.Some(f(x));
        },
        None: function() {
            return p.of(Option.None);
        }
    });
};
Option.prototype.ap = function(b) {
    return this.cata({
        Some: function(x) {
            return b.map(x);
        },
        None: function() {
            return Option.None;
        }
    });
};

function nelArray(xs) {
    return [xs.a].concat(xs.f.cata({
        Some: function(x) {
            return nelArray(x);
        },
        None: function() {
            return [];
        }
    }));
}

exports.testExtend = function(test) {
    test.deepEqual(
        nelArray(nel.extend(function(c) {
            return nelArray(c);
        })),
        [
            [1, 2, 3],
            [2, 3],
            [3]
        ]
    );
    test.done();
};

exports.testExtract = function(test) {
    test.equal(
        nel.extract(),
        1
    );
    test.done();
};

exports.testMap = function(test) {
    test.deepEqual(
        nelArray(nel.map(function(x) {
            return x * 20;
        })),
        [20, 40, 60]
    );
    test.done();
};

exports.testTraverse = function(test) {
    var traversed = nel.traverse(Option.Some, Option);
    test.deepEqual(traversed.map(nelArray), Option.Some([1, 2, 3]));
    test.done();
};
