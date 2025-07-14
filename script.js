(function(){
    function bindApply(a, b, c) {
        return a.call.apply(a.bind, arguments);
    }

    function bindFallback(a, b, c) {
        if (!a) throw Error();
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return function() {
                var innerArgs = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(innerArgs, args);
                return a.apply(b, innerArgs);
            };
        }
        return function() {
            return a.apply(b, arguments);
        };
    }

    function p(a, b, c) {
        p = (Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") !== -1)
            ? bindApply
            : bindFallback;
        return p.apply(null, arguments);
    }

    var now = Date.now || function() { return +new Date; };

    function Context(a, b) {
        this.window = a;
        this.document = b || a;
        this.dom = this.document;
    }

    var supportsFontFace = !!window.FontFace;

    function createElement(ctx, tag, attrs, text) {
        var el = ctx.dom.createElement(tag);
        if (attrs) {
            for (var key in attrs) {
                if (attrs.hasOwnProperty(key)) {
                    if (key === "style") {
                        el.style.cssText = attrs[key];
                    } else {
                        el.setAttribute(key, attrs[key]);
                    }
                }
            }
        }
        if (text) {
            el.appendChild(ctx.dom.createTextNode(text));
        }
        return el;
    }

    function insertBeforeFirst(ctx, tag, element) {
        var ref = ctx.dom.getElementsByTagName(tag)[0] || document.documentElement;
        ref.insertBefore(element, ref.lastChild);
    }

    function removeElement(el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }

    function addClasses(el, add, remove) {
        var classes = el.className.split(/\s+/);
        add = add || [];
        remove = remove || [];

        add.forEach(function(c) {
            if (classes.indexOf(c) === -1) {
                classes.push(c);
            }
        });

        classes = classes.filter(function(c) {
            return remove.indexOf(c) === -1;
        });

        el.className = classes.join(" ").trim();
    }

    function hasClass(el, className) {
        return el.className.split(/\s+/).indexOf(className) !== -1;
    }

    function getProtocol(ctx) {
        var p = ctx.document.location.protocol;
        if (p === "about:") {
            p = ctx.window.location.protocol;
        }
        return (p === "https:") ? "https:" : "http:";
    }

    function getHostname(ctx) {
        return ctx.document.location.hostname || ctx.window.location.hostname;
    }

    function loadStylesheet(ctx, url, callback) {
        var link = createElement(ctx, "link", { rel: "stylesheet", href: url, media: "all" });
        var loaded = false;
        var error = false;

        if (supportsFontFace) {
            link.onload = function() { loaded = true; done(); };
            link.onerror = function() { loaded = true; error = true; done(); };
        } else {
            setTimeout(function() { loaded = true; done(); }, 0);
        }

        function done() {
            if (callback) callback(error ? new Error("Stylesheet failed to load") : null);
        }

        insertBeforeFirst(ctx, "head", link);
    }

    function loadScript(ctx, url, callback, timeout) {
        var head = ctx.dom.getElementsByTagName("head")[0];
        if (!head) return null;

        var script = createElement(ctx, "script", { src: url });
        var done = false;

        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                done = true;
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
                callback && callback();
            }
        };

        head.appendChild(script);
        setTimeout(function() {
            if (!done) {
                done = true;
                callback && callback(new Error("Script load timeout"));
            }
        }, timeout || 5000);

        return script;
    }

    // Font loading logic omitted for brevity...

    var WebFontConfig = window.WebFontConfig || {};

    function loadWebFonts() {
        // Implementation of WebFont.load based on configuration
        // ...
    }

    // Expose API
    var WebFont = {
        load: p(function(config) {
            loadWebFonts(config);
        }, window)
    };

    if (typeof define === 'function' && define.amd) {
        define(function() { return WebFont; });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = WebFont;
    } else {
        window.WebFont = WebFont;
        if (window.WebFontConfig) {
            WebFont.load(window.WebFontConfig);
        }
    }
})();
document.addEventListener('DOMContentLoaded', function () {
    const buttonLink = document.querySelector('.bake72__button');

    if (buttonLink) {
      buttonLink.addEventListener('mousedown', function () {
        buttonLink.classList.add('clicked');
      });

      buttonLink.addEventListener('mouseup', function () {
        buttonLink.classList.remove('clicked');
      });

      buttonLink.addEventListener('mouseleave', function () {
      buttonLink.classList.remove('clicked');
      });
      buttonLink.addEventListener('touchstart', function () {
      buttonLink.classList.add('clicked');
      });

      buttonLink.addEventListener('touchend', function () {
      buttonLink.classList.remove('clicked');
      });
    }
  });
  