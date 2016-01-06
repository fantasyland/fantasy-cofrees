const Cofree = require('../fantasy-cofrees');
const Option = require('fantasy-options');

const nel = Cofree(
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

function nelArray(xs) {
    return [xs.a].concat(xs.f.cata({
        Some: (x) => nelArray(x),
        None: () => []
    }));
}

exports.testExtend = function(test) {
    test.deepEqual(
        nelArray(nel.extend((c) => nelArray(c))),
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
        nelArray(nel.map((x) => x * 20)),
        [20, 40, 60]
    );
    test.done();
};

exports.testTraverse = function(test) {
    const traversed = nel.traverse(Option.Some, Option);
    test.deepEqual(traversed.map(nelArray), Option.Some([1, 2, 3]));
    test.done();
};
