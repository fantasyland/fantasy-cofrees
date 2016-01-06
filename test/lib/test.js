'use strict';

const λ = require('fantasy-check/src/adapters/nodeunit');
const functor = require('fantasy-check/src/laws/functor');
    
const daggy = require('daggy');

const {isInstanceOf} = require('fantasy-helpers');
const {constant, identity} = require('fantasy-combinators');

const Identity = require('fantasy-identities');
const Option = require('fantasy-options');

const Cofree = require('../../fantasy-cofrees');

const isIdentity = isInstanceOf(Identity);
const isCofree = isInstanceOf(Cofree);
const isIdentityOf = isInstanceOf(identityOf);

Identity.prototype.traverse = function(f, p) {
    return p.of(f(this.x));
};

function identityOf(type) {
    const self = this.getInstance(this, identityOf);
    self.type = type;
    return self;
}

function leftOf(type) {
    const self = this.getInstance(this, leftOf);
    self.type = type;
    return self;
}

function rightOf(type) {
    const self = this.getInstance(this, rightOf);
    self.type = type;
    return self;
}

const λʹ = λ
    .property('functor', functor)
    .property('Cofree', Cofree)
    .property('Option', Option)
    .property('Identity', Identity)
    .property('isIdentity', isIdentity)
    .property('identityOf', identityOf)
    .method('arb', isIdentityOf, function(a, b) {
        return Identity.of(this.arb(a.type, b - 1));
    });

// Export
if(typeof module != 'undefined')
    module.exports = λʹ;
