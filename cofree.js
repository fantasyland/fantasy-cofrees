var daggy = require('daggy'),
    Cofree = daggy.tagged('a', 'f');

// Methods
Cofree.prototype.map = function(g) {
    return Cofree(g(this.a), this.f.map(function(cf) {
        return cf.map(g);
    }));
};

Cofree.prototype.extract = function() {
    return this.a;
};

Cofree.prototype.extend = function(g) {
    return Cofree(g(this), this.f.map(function(c) {
        return c.extend(g);
    }));
};
Cofree.prototype.traverse = function(g, p) {
    function go(h) {
        return g(h.a).map(function(x) {
            return function(i) {
                return Cofree(x, i);
            };
        }).ap(h.f.traverse(go, p));
    }
    return go(this);
};

// Export
if(typeof module != 'undefined')
    module.exports = Cofree;
