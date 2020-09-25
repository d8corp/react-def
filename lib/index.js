'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var PropTypes = _interopDefault(require('prop-types'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var date = 'performance' in window ? window.performance : Date;
var Def = /** @class */ (function (_super) {
    __extends(Def, _super);
    function Def() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Def.start = function () {
        var _this = this;
        if (!this.timer && this.stack.size) {
            this.timer = setTimeout(function () {
                var redLine = date.now() + 17;
                while (_this.stack.size && date.now() < redLine) {
                    _this.render();
                }
                _this.timer = undefined;
                _this.start();
            });
        }
    };
    Def.render = function () {
        if (this.stack.size) {
            var nextDef = this.stack.values().next().value;
            this.currentDef = nextDef;
            this.stack.delete(nextDef);
            nextDef.forceUpdate();
        }
        else {
            this.currentDef = undefined;
        }
    };
    Def.prototype.componentWillUnmount = function () {
        Def.stack.delete(this);
    };
    Def.prototype.render = function () {
        if (this.props.once && this.displayed) {
            return this.props.children;
        }
        if (Def.currentDef === this) {
            this.displayed = true;
            return this.props.children;
        }
        Def.stack.add(this);
        Def.start();
        return this.props.placeholder;
    };
    Def.propTypes = {
        children: PropTypes.node.isRequired,
        placeholder: PropTypes.node
    };
    Def.defaultProps = {
        placeholder: null
    };
    Def.stack = new Set();
    return Def;
}(react.Component));

module.exports = Def;
