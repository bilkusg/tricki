/*****************************************************************************
 *
 * Copyright (c) 2004-2007 Guido Wesdorp. All rights reserved.
 *
 * This software is distributed under the terms of the JSBase
 * License. See LICENSE.txt for license text.
 *
 *****************************************************************************/

var global = this;
global.array = new function() {
    var array = this;

    this.equals = function equals(var1, var2) {
        if (var1 != var2 &&
                (!(var1 instanceof Array && var2 instanceof Array) ||
                    misclib.repr(var1) != misclib.repr(var2)) &&
                (!(var1 instanceof Date && var2 instanceof Date) ||
                    var1.getTime() != var2.getTime())) {
            return false;
        };
        return true;
    };

    this.contains = function(a, element, objectequality) {
        /* see if some value is in a */
        // DEPRECATED!!! use array.indexOf instead
        return (this.indexOf(a, element, !objectequality) > -1);
    };

    this.indexOf = function(a, element, compareValues) {
        for (var i=0; i < a.length; i++) {
            if (!compareValues) {
                if (element === a[i]) {
                    return i;
                };
            } else {
                if (this.equals(element, a[i])) {
                    return i;
                };
            };
        };
        return -1;
    };

    this.remove = function(a, el) {
        var index = this.indexOf(a, el);
        if (index == -1) {
            var repr = '' + el;
            if (global.exception) {
                throw(new exception.ValueError(repr));
            } else {
                throw('el ' + repr + ' not found');
            };
        };
        var newa = [];
        for (var i=0; i < a.length; i++) {
            if (i != index) {
                newa.push(a[i]);
            };
        };
        return newa;
    };

    this.removeDoubles = function(a) {
        var ret = [];
        for (var i=0; i < a.length; i++) {
            if (!this.contains(ret, a[i])) {
                ret.push(a[i]);
            };
        };
        return ret;
    };

    this.map = function(a, func, inplace) {
        /* apply 'func' to each element in the array (in-place!!) */
        var ret = [];
        if (inplace) {
            ret = a;
        };
        for (var i=0; i < a.length; i++) {
            var value = func(a[i]);
            ret[i] = value;
        };
        return ret;
    };

    this.reversed = function(a) {
        var ret = [];
        for (var i = a.length; i > 0; i--) {
            ret.push(a[i - 1]);
        };
        return ret;
    };

    this.StopIteration = function(message) {
        if (message !== undefined) {
            this._initialize('StopIteration', message);
        };
    };

    if (global.exception) {
        this.StopIteration.prototype = global.exception.Exception;
    };

    var Iterator = this.Iterator = function(a) {
        if (a) {
            this._initialize(a);
        };
    };

    Iterator._initialize = function(a) {
        this._array = a;
        this._i = 0;
    };

    Iterator.next = function() {
        if (this._i >= this._array.length) {
            this._i = 0;
            throw(this.StopIteration('no more items'));
        };
        return this._i++;
    };

    this.iterate = function(a) {
        /*  iterate through array 'a'

            this returns the n-th item of array 'a', where n is the number of
            times this function has been called on 'a' before

            when the items are all visited, the function resets the counter and
            starts from the start

            note that this annotates the array with information about iteration
            using the attribute '__iter_index__', remove this or set to 0 to
            reset

            this does not work well with arrays that have 'undefined' as one of
            their values!!
        */
        if (!a.__iter_index__) {
            a.__iter_index__ = 0;
        } else if (a.__iter_index__ >= a.length) {
            a.__iter_index__ = undefined;
            return undefined;
        };
        return a[a.__iter_index__++];
    };
}();
