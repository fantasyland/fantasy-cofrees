'use strict';

const λ = require('./lib/test');
const functor = λ.functor;
const identity = λ.identity;
const Option = λ.Option;
const Cofree = λ.Cofree;
const Identity = λ.Identity;

function of(a) {
    return Cofree(a, Option.None);
}

function run(a) {
    return a.a;
}

exports.cofree = {

    // Functor tests
    'All (Functor)': functor.laws(λ)(of, run),
    'Identity (Functor)': functor.identity(λ)(of, run),
    'Composition (Functor)': functor.composition(λ)(of, run)
};
