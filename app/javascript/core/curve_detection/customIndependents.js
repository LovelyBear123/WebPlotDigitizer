/*
    WebPlotDigitizer - https://automeris.io/WebPlotDigitizer

    Copyright 2010-2020 Ankit Rohatgi <ankitrohatgi@hotmail.com>

    This file is part of WebPlotDigitizer.

    WebPlotDigitizer is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WebPlotDigitizer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with WebPlotDigitizer.  If not, see <http://www.gnu.org/licenses/>.
*/

var wpd = wpd || {};

// Simple curve extraction with interpolation, but at user provided independents (x, theta etc.)
wpd.CustomIndependents = class {
    constructor() {
        this._xvals = [];
        this._ymin = 0;
        this._ymax = 0;
        this._smoothing = 0;
        this._wasRun = false;
    }

    deserialize(obj) {
        this._xvals = obj.xvals;
        this._ymin = obj.ymin;
        this._ymax = obj.ymax;
        this._smoothing = obj.smoothing;
        this._wasRun = true;
    }

    setParams(params) {
        this._xvals = params.xvals;
        this._ymin = params.ymin;
        this._ymax = params.ymax;
        this._smoothing = params.smoothing;
    }

    getParams() {
        return {
            xvals: this._xvals,
            ymin: this._ymin,
            ymax: this._ymax,
            smoothing: this._smoothing
        };
    }

    getParamList(axes) {
        return {
            xvals: ["X vals", "Units", this._xvals],
            ymin: ["Y min", "Units", this._ymin],
            ymax: ["Y max", "Units", this._ymax],
            smoothing: ["Smoothing", "Units", this._smoothing]
        };
    }

    serialize() {
        return this._wasRun ? {
            algoType: "CustomIndependents",
            xvals: this._xvals,
            ymin: this._ymin,
            ymax: this._ymax,
            smoothing: this._smoothing
        } : null;
    }

    // convert string input from user to sorted array
    parseVals(vals) {
        // e.g. convert "[1.2, 3.4, 100]" to an array [1.2, 3.4, 100]
        let valArray = vals.replace("[","").replace("]","").split(",").map(v => parseFloat(v)).filter(v => !isNaN(v));        
        valArray.sort();
        return valArray;
    }

    run(autoDetector, dataSeries, axes) {
        this._wasRun = true;
        dataSeries.clearAll();

        // is log-scale?
        let isLogX = axes.isLogX();
        let isLogY = axes.isLogY();

        // dates?

        // TODO: log scale, dates
        
          // just use the spline to get values at the parsed values
        let parsedVals = this.parseVals(this._xvals);
        if (parsedVals == null || parsedVals.length == 0) {
            return;
        }
        
        // visit every pixel along x, scan along y to get data point pixel

        // fit a spline

        // get value for parsed values

        let yvals = (new Array(parsedVals.length)).fill(NaN);
        for (let valIdx = 0; valIdx < parsedVals.length; valIdx++) {
            // search between ymin and ymax for a data point?
            // if not found then return NaN
        }
    }
};