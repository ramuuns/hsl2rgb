#!/usr/bin/env node

var fs = require("fs");
var argv = require('optimist').argv;

function convert(file) {

    var f = fs.readFileSync(file,"utf8");

    function hue2rgb(p, q, t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    function replaceHsl(m, a, h, s, l) {
        var r,g,b;
        h = parseInt(h,10)/360;
        s = parseInt(s,10)/100;
        l = parseInt(l,10)/100;
        if ( s === 0 ) {
            r = g = b = l;
        } else {
            var q = l < 0.5 ?  l * (1 + s) : l+s - l*s;
            var p = 2*l - q;
            r = hue2rgb(p,q,h+1/3);
            g = hue2rgb(p,q,h);
            b = hue2rgb(p,q,h - 1/3);
        }
        r = Math.round(r*255);
        g = Math.round(g*255);
        b = Math.round(b*255);
        return "rgb"+a+"("+r+","+g+","+b;
    }

    var newf = f.replace(/hsl(a?)\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/g, replaceHsl);
    //console.log(newf);
    return newf;
};


if ( argv._ ) {
    argv._.forEach(function(file){
        console.log(convert(file));
    });
}