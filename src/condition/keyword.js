let Range = require('../esRange.js');
module.exports = function() {
    this.term = (field, value) => {
        if (typeof field !== 'string' || value === undefined) {
            throw new Error('arguments type error');
        }

        this.count++;
        if (Object.prototype.toString.call(value).indexOf('Array') >= 0) {
            this.must.push({
                'terms': {
                    [field]: value
                }
            })
        } else {
            this.must.push({
                'term': {
                    [field]: value
                }
            });
        }
        return this;
    };

    this.exists = (field) => {
        if (typeof field !== 'string') {
            throw new Error('arguments type error');
        }
        this.count++;
        this.must.push({
            'exists': {
                'field': field
            }
        })
        return this;
    }

    const rangeByParam = (field, from, to, equalFrom, equalTo) => {
        if (from === undefined || to === undefined) {
            throw new Error('arguments type error');
        }
        if (from === null && to === null) {
            throw new Error("from and to could not be null both");
        }
        this.count++;
        let param = {
            [field]: {}
        };
        if (from !== null) {
            let condition = "gt" + (!!equalFrom ? "e" : "");
            param[field][condition] = from;
        }
        if (to != null) {
            let condition = "lt" + (!!equalTo ? "e" : "");
            param[field][condition] = to;
        }
        this.must.push({
            'range': param
        });
        return this;
    };

    const rangeByESRange = (field, range) => {
        let rangeParam = range.valueOf();
        if (Object.keys(rangeParam).length == 0) {
            throw new Error("from and to could not be null both");
        }
        let param = {
            [field]: rangeParam
        };
        this.count++;
        this.must.push({
            'range': param
        });
        return this;
    }

    this.range = (field, from, to, equalFrom, equalTo) => {
        if (typeof field !== 'string') {
            throw new Error('arguments type error');
        }
        if (from instanceof Range) {
            return rangeByESRange(field, from);
        } else {
            return rangeByParam(field, from, to, equalFrom, equalTo);
        }
    };


    this.prefix = (field, value) => {
        if (typeof field !== 'string' || value === undefined) {
            throw new Error('arguments type error');
        }

        this.count++;
        this.must.push({
            'prefix': {
                [field]: value
            }
        })
        return this;
    }
    this.wildcard = (field, value) => {
        if (typeof field !== 'string' || value === undefined) {
            throw new Error('arguments type error');
        }

        this.count++;
        this.must.push({
            'wildcard': {
                [field]: value
            }
        })
        return this;
    }
    this.fuzzy = (field, value) => {
        if (typeof field !== 'string' || value === undefined) {
            throw new Error('arguments type error');
        }

        this.count++;
        this.must.push({
            'wildcard': {
                [field]: value
            }
        })
        return this;
    }
};