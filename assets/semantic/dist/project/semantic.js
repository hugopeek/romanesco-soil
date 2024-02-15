/*
 * # Fomantic UI - 2.9.3
 * https://github.com/fomantic/Fomantic-UI
 * https://fomantic-ui.com/
 *
 * Copyright 2024 Contributors
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */
/*!
 * # Fomantic-UI 2.9.3 - Site
 * https://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */

(function ($, window, document) {
    'use strict';

    function isFunction(obj) {
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }

    window = window !== undefined && window.Math === Math
        ? window
        : globalThis;

    $.fn.site = function (parameters) {
        var
            time           = Date.now(),
            performance    = [],

            query          = arguments[0],
            methodInvoked  = typeof query === 'string',
            queryArguments = [].slice.call(arguments, 1),

            settings        = $.isPlainObject(parameters)
                ? $.extend(true, {}, $.site.settings, parameters)
                : $.extend({}, $.site.settings),

            namespace       = settings.namespace,
            error           = settings.error,

            moduleNamespace = 'module-' + namespace,

            $document       = $(document),
            $module         = $document,
            element         = this,
            instance        = $module.data(moduleNamespace),

            module,
            returnedValue
        ;
        module = {

            initialize: function () {
                module.instantiate();
            },

            instantiate: function () {
                module.verbose('Storing instance of site', module);
                instance = module;
                $module
                    .data(moduleNamespace, module)
                ;
            },

            normalize: function () {
                // keep the function for backward compatibility
                // eslint-disable-next-line no-useless-return
                return;
            },

            fix: {
                consoleClear: function () {
                    module.debug('Disabling programmatic console clearing');
                    window.console.clear = function () {};
                },
            },

            moduleExists: function (name) {
                return $.fn[name] !== undefined && $.fn[name].settings !== undefined;
            },

            enabled: {
                modules: function (modules) {
                    var
                        enabledModules = []
                    ;
                    modules = modules || settings.modules;
                    $.each(modules, function (index, name) {
                        if (module.moduleExists(name)) {
                            enabledModules.push(name);
                        }
                    });

                    return enabledModules;
                },
            },

            disabled: {
                modules: function (modules) {
                    var
                        disabledModules = []
                    ;
                    modules = modules || settings.modules;
                    $.each(modules, function (index, name) {
                        if (!module.moduleExists(name)) {
                            disabledModules.push(name);
                        }
                    });

                    return disabledModules;
                },
            },

            change: {
                setting: function (setting, value, modules, modifyExisting) {
                    modules = typeof modules === 'string'
                        ? (modules === 'all'
                            ? settings.modules
                            : [modules])
                        : modules || settings.modules;
                    modifyExisting = modifyExisting !== undefined
                        ? modifyExisting
                        : true;
                    $.each(modules, function (index, name) {
                        var
                            namespace = module.moduleExists(name)
                                ? $.fn[name].settings.namespace || false
                                : true,
                            $existingModules
                        ;
                        if (module.moduleExists(name)) {
                            module.verbose('Changing default setting', setting, value, name);
                            $.fn[name].settings[setting] = value;
                            if (modifyExisting && namespace) {
                                $existingModules = $(':data(module-' + namespace + ')');
                                if ($existingModules.length > 0) {
                                    module.verbose('Modifying existing settings', $existingModules);
                                    $existingModules[name]('setting', setting, value);
                                }
                            }
                        }
                    });
                },
                settings: function (newSettings, modules, modifyExisting) {
                    modules = typeof modules === 'string'
                        ? [modules]
                        : modules || settings.modules;
                    modifyExisting = modifyExisting !== undefined
                        ? modifyExisting
                        : true;
                    $.each(modules, function (index, name) {
                        var
                            $existingModules
                        ;
                        if (module.moduleExists(name)) {
                            module.verbose('Changing default setting', newSettings, name);
                            $.extend(true, $.fn[name].settings, newSettings);
                            if (modifyExisting && namespace) {
                                $existingModules = $(':data(module-' + namespace + ')');
                                if ($existingModules.length > 0) {
                                    module.verbose('Modifying existing settings', $existingModules);
                                    $existingModules[name]('setting', newSettings);
                                }
                            }
                        }
                    });
                },
            },

            enable: {
                console: function () {
                    module.console(true);
                },
                debug: function (modules, modifyExisting) {
                    modules = modules || settings.modules;
                    module.debug('Enabling debug for modules', modules);
                    module.change.setting('debug', true, modules, modifyExisting);
                },
                verbose: function (modules, modifyExisting) {
                    modules = modules || settings.modules;
                    module.debug('Enabling verbose debug for modules', modules);
                    module.change.setting('verbose', true, modules, modifyExisting);
                },
            },
            disable: {
                console: function () {
                    module.console(false);
                },
                debug: function (modules, modifyExisting) {
                    modules = modules || settings.modules;
                    module.debug('Disabling debug for modules', modules);
                    module.change.setting('debug', false, modules, modifyExisting);
                },
                verbose: function (modules, modifyExisting) {
                    modules = modules || settings.modules;
                    module.debug('Disabling verbose debug for modules', modules);
                    module.change.setting('verbose', false, modules, modifyExisting);
                },
            },

            console: function (enable) {
                if (enable) {
                    if (instance.cache.console === undefined) {
                        module.error(error.console);

                        return;
                    }
                    module.debug('Restoring console function');
                    window.console = instance.cache.console;
                } else {
                    module.debug('Disabling console function');
                    instance.cache.console = window.console;
                    window.console = {
                        clear: function () {},
                        error: function () {},
                        group: function () {},
                        groupCollapsed: function () {},
                        groupEnd: function () {},
                        info: function () {},
                        log: function () {},
                        table: function () {},
                        warn: function () {},
                    };
                }
            },

            destroy: function () {
                module.verbose('Destroying previous site for', $module);
                $module
                    .removeData(moduleNamespace)
                ;
            },

            cache: {},

            setting: function (name, value) {
                if ($.isPlainObject(name)) {
                    $.extend(true, settings, name);
                } else if (value !== undefined) {
                    settings[name] = value;
                } else {
                    return settings[name];
                }
            },
            internal: function (name, value) {
                if ($.isPlainObject(name)) {
                    $.extend(true, module, name);
                } else if (value !== undefined) {
                    module[name] = value;
                } else {
                    return module[name];
                }
            },
            debug: function () {
                if (settings.debug) {
                    if (settings.performance) {
                        module.performance.log(arguments);
                    } else {
                        module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                        module.debug.apply(console, arguments);
                    }
                }
            },
            verbose: function () {
                if (settings.verbose && settings.debug) {
                    if (settings.performance) {
                        module.performance.log(arguments);
                    } else {
                        module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                        module.verbose.apply(console, arguments);
                    }
                }
            },
            error: function () {
                module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                module.error.apply(console, arguments);
            },
            performance: {
                log: function (message) {
                    var
                        currentTime,
                        executionTime,
                        previousTime
                    ;
                    if (settings.performance) {
                        currentTime = Date.now();
                        previousTime = time || currentTime;
                        executionTime = currentTime - previousTime;
                        time = currentTime;
                        performance.push({
                            Element: element,
                            Name: message[0],
                            Arguments: [].slice.call(message, 1) || '',
                            'Execution Time': executionTime,
                        });
                    }
                    clearTimeout(module.performance.timer);
                    module.performance.timer = setTimeout(function () { module.performance.display(); }, 500);
                },
                display: function () {
                    var
                        title = settings.name + ':',
                        totalTime = 0
                    ;
                    time = false;
                    clearTimeout(module.performance.timer);
                    $.each(performance, function (index, data) {
                        totalTime += data['Execution Time'];
                    });
                    title += ' ' + totalTime + 'ms';
                    if (performance.length > 0) {
                        console.groupCollapsed(title);
                        if (console.table) {
                            console.table(performance);
                        } else {
                            $.each(performance, function (index, data) {
                                console.log(data.Name + ': ' + data['Execution Time'] + 'ms');
                            });
                        }
                        console.groupEnd();
                    }
                    performance = [];
                },
            },
            invoke: function (query, passedArguments, context) {
                var
                    object = instance,
                    maxDepth,
                    found,
                    response
                ;
                passedArguments = passedArguments || queryArguments;
                context = context || element;
                if (typeof query === 'string' && object !== undefined) {
                    query = query.split(/[ .]/);
                    maxDepth = query.length - 1;
                    $.each(query, function (depth, value) {
                        var camelCaseValue = depth !== maxDepth
                            ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                            : query
                        ;
                        if ($.isPlainObject(object[camelCaseValue]) && (depth !== maxDepth)) {
                            object = object[camelCaseValue];
                        } else if (object[camelCaseValue] !== undefined) {
                            found = object[camelCaseValue];

                            return false;
                        } else if ($.isPlainObject(object[value]) && (depth !== maxDepth)) {
                            object = object[value];
                        } else if (object[value] !== undefined) {
                            found = object[value];

                            return false;
                        } else {
                            module.error(error.method, query);

                            return false;
                        }
                    });
                }
                if (isFunction(found)) {
                    response = found.apply(context, passedArguments);
                } else if (found !== undefined) {
                    response = found;
                }
                if (Array.isArray(returnedValue)) {
                    returnedValue.push(response);
                } else if (returnedValue !== undefined) {
                    returnedValue = [returnedValue, response];
                } else if (response !== undefined) {
                    returnedValue = response;
                }

                return found;
            },
        };

        if (methodInvoked) {
            if (instance === undefined) {
                module.initialize();
            }
            module.invoke(query);
        } else {
            if (instance !== undefined) {
                module.destroy();
            }
            module.initialize();
        }

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };
    $.site = $.fn.site;

    $.site.settings = {

        name: 'Site',
        namespace: 'site',

        error: {
            console: 'Console cannot be restored, most likely it was overwritten outside of module',
            method: 'The method you called is not defined.',
        },

        debug: false,
        verbose: false,
        performance: true,

        modules: [
            'accordion',
            'api',
            'calendar',
            'checkbox',
            'dimmer',
            'dropdown',
            'embed',
            'flyout',
            'form',
            'modal',
            'nag',
            'popup',
            'progress',
            'rating',
            'search',
            'shape',
            'sidebar',
            'slider',
            'state',
            'sticky',
            'tab',
            'toast',
            'transition',
            'visibility',
        ],

        siteNamespace: 'site',
        namespaceStub: {
            cache: {},
            config: {},
            sections: {},
            section: {},
            utilities: {},
        },

    };

    // allows for selection of elements with data attributes
    $.extend($.expr.pseudos, {
        data: $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName);
            };
        }),
    });
})(jQuery, window, document);

/*!
 * # Fomantic-UI 2.9.3 - Accordion
 * https://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */

(function ($, window, document) {
    'use strict';

    function isFunction(obj) {
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }

    window = window !== undefined && window.Math === Math
        ? window
        : globalThis;

    $.fn.accordion = function (parameters) {
        var
            $allModules     = $(this),

            time            = Date.now(),
            performance     = [],

            query           = arguments[0],
            methodInvoked   = typeof query === 'string',
            queryArguments  = [].slice.call(arguments, 1),

            returnedValue
        ;
        $allModules.each(function () {
            var
                settings        = $.isPlainObject(parameters)
                    ? $.extend(true, {}, $.fn.accordion.settings, parameters)
                    : $.extend({}, $.fn.accordion.settings),

                className       = settings.className,
                namespace       = settings.namespace,
                selector        = settings.selector,
                error           = settings.error,

                eventNamespace  = '.' + namespace,
                moduleNamespace = 'module-' + namespace,

                $module  = $(this),
                $title   = $module.find(selector.title),
                $content = $module.find(selector.content),

                element  = this,
                instance = $module.data(moduleNamespace),
                observer,
                module
            ;

            module = {

                initialize: function () {
                    module.debug('Initializing', $module);
                    module.bind.events();
                    if (settings.observeChanges) {
                        module.observeChanges();
                    }
                    module.instantiate();
                },

                instantiate: function () {
                    instance = module;
                    $module
                        .data(moduleNamespace, module)
                    ;
                },

                destroy: function () {
                    module.debug('Destroying previous instance', $module);
                    $module
                        .off(eventNamespace)
                        .removeData(moduleNamespace)
                    ;
                },

                refresh: function () {
                    $title = $module.find(selector.title);
                    $content = $module.find(selector.content);
                },

                observeChanges: function () {
                    if ('MutationObserver' in window) {
                        observer = new MutationObserver(function (mutations) {
                            module.debug('DOM tree modified, updating selector cache');
                            module.refresh();
                        });
                        observer.observe(element, {
                            childList: true,
                            subtree: true,
                        });
                        module.debug('Setting up mutation observer', observer);
                    }
                },

                bind: {
                    events: function () {
                        module.debug('Binding delegated events');
                        $module
                            .on(settings.on + eventNamespace, selector.trigger, module.event.click)
                        ;
                    },
                },

                event: {
                    click: function (event) {
                        if ($(event.target).closest(selector.ignore).length === 0) {
                            module.toggle.call(this);
                        }
                    },
                },

                toggle: function (query) {
                    var
                        $activeTitle = query !== undefined
                            ? (typeof query === 'number'
                                ? $title.eq(query)
                                : $(query).closest(selector.title))
                            : $(this).closest(selector.title),
                        $activeContent = $activeTitle.next($content),
                        isAnimating = $activeContent.hasClass(className.animating),
                        isActive    = $activeContent.hasClass(className.active),
                        isOpen      = isActive && !isAnimating,
                        isOpening   = !isActive && isAnimating
                    ;
                    module.debug('Toggling visibility of content', $activeTitle);
                    if (isOpen || isOpening) {
                        if (settings.collapsible) {
                            module.close.call($activeTitle);
                        } else {
                            module.debug('Cannot close accordion content collapsing is disabled');
                        }
                    } else {
                        module.open.call($activeTitle);
                    }
                },

                open: function (query) {
                    var
                        $activeTitle = query !== undefined
                            ? (typeof query === 'number'
                                ? $title.eq(query)
                                : $(query).closest(selector.title))
                            : $(this).closest(selector.title),
                        $activeContent = $activeTitle.next($content),
                        isAnimating = $activeContent.hasClass(className.animating),
                        isActive    = $activeContent.hasClass(className.active),
                        isOpen      = isActive || isAnimating
                    ;
                    if (isOpen) {
                        module.debug('Accordion already open, skipping', $activeContent);

                        return;
                    }
                    module.debug('Opening accordion content', $activeTitle);
                    settings.onOpening.call($activeContent);
                    settings.onChanging.call($activeContent);
                    if (settings.exclusive) {
                        module.closeOthers.call($activeTitle);
                    }
                    $activeTitle
                        .addClass(className.active)
                    ;
                    $activeContent
                        .stop(true, true)
                        .addClass(className.animating)
                    ;
                    if (settings.animateChildren) {
                        if ($.fn.transition !== undefined) {
                            $activeContent
                                .children()
                                .transition({
                                    animation: 'fade in',
                                    queue: false,
                                    useFailSafe: true,
                                    debug: settings.debug,
                                    verbose: settings.verbose,
                                    silent: settings.silent,
                                    duration: settings.duration,
                                    skipInlineHidden: true,
                                    onComplete: function () {
                                        $activeContent.children().removeClass(className.transition);
                                    },
                                })
                            ;
                        } else {
                            $activeContent
                                .children()
                                .stop(true, true)
                                .animate({
                                    opacity: 1,
                                }, settings.duration, module.resetOpacity);
                        }
                    }
                    $activeContent
                        .slideDown(settings.duration, settings.easing, function () {
                            $activeContent
                                .removeClass(className.animating)
                                .addClass(className.active)
                            ;
                            module.reset.display.call(this);
                            settings.onOpen.call(this);
                            settings.onChange.call(this);
                        })
                    ;
                },

                close: function (query) {
                    var
                        $activeTitle = query !== undefined
                            ? (typeof query === 'number'
                                ? $title.eq(query)
                                : $(query).closest(selector.title))
                            : $(this).closest(selector.title),
                        $activeContent = $activeTitle.next($content),
                        isAnimating    = $activeContent.hasClass(className.animating),
                        isActive       = $activeContent.hasClass(className.active),
                        isOpening      = !isActive && isAnimating,
                        isClosing      = isActive && isAnimating
                    ;
                    if ((isActive || isOpening) && !isClosing) {
                        module.debug('Closing accordion content', $activeContent);
                        settings.onClosing.call($activeContent);
                        settings.onChanging.call($activeContent);
                        $activeTitle
                            .removeClass(className.active)
                        ;
                        $activeContent
                            .stop(true, true)
                            .addClass(className.animating)
                        ;
                        if (settings.animateChildren) {
                            if ($.fn.transition !== undefined) {
                                $activeContent
                                    .children()
                                    .transition({
                                        animation: 'fade out',
                                        queue: false,
                                        useFailSafe: true,
                                        debug: settings.debug,
                                        verbose: settings.verbose,
                                        silent: settings.silent,
                                        duration: settings.duration,
                                        skipInlineHidden: true,
                                    })
                                ;
                            } else {
                                $activeContent
                                    .children()
                                    .stop(true, true)
                                    .animate({
                                        opacity: 0,
                                    }, settings.duration, module.resetOpacity);
                            }
                        }
                        $activeContent
                            .slideUp(settings.duration, settings.easing, function () {
                                $activeContent
                                    .removeClass(className.animating)
                                    .removeClass(className.active)
                                ;
                                module.reset.display.call(this);
                                settings.onClose.call(this);
                                settings.onChange.call(this);
                            })
                        ;
                    }
                },

                closeOthers: function (index) {
                    var
                        $activeTitle = index !== undefined
                            ? $title.eq(index)
                            : $(this).closest(selector.title),
                        $parentTitles    = $activeTitle.parents(selector.content).prev(selector.title),
                        $activeAccordion = $activeTitle.closest(selector.accordion),
                        activeSelector   = selector.title + '.' + className.active + ':visible',
                        activeContent    = selector.content + '.' + className.active + ':visible',
                        $openTitles,
                        $nestedTitles,
                        $openContents
                    ;
                    if (settings.closeNested) {
                        $openTitles = $activeAccordion.find(activeSelector).not($parentTitles);
                        $openContents = $openTitles.next($content);
                    } else {
                        $openTitles = $activeAccordion.find(activeSelector).not($parentTitles);
                        $nestedTitles = $activeAccordion.find(activeContent).find(activeSelector).not($parentTitles);
                        $openTitles = $openTitles.not($nestedTitles);
                        $openContents = $openTitles.next($content);
                    }
                    if ($openTitles.length > 0) {
                        module.debug('Exclusive enabled, closing other content', $openTitles);
                        $openTitles
                            .removeClass(className.active)
                        ;
                        $openContents
                            .removeClass(className.animating)
                            .stop(true, true)
                        ;
                        if (settings.animateChildren) {
                            if ($.fn.transition !== undefined) {
                                $openContents
                                    .children()
                                    .transition({
                                        animation: 'fade out',
                                        useFailSafe: true,
                                        debug: settings.debug,
                                        verbose: settings.verbose,
                                        silent: settings.silent,
                                        duration: settings.duration,
                                        skipInlineHidden: true,
                                    })
                                ;
                            } else {
                                $openContents
                                    .children()
                                    .stop(true, true)
                                    .animate({
                                        opacity: 0,
                                    }, settings.duration, module.resetOpacity);
                            }
                        }
                        $openContents
                            .slideUp(settings.duration, settings.easing, function () {
                                $(this).removeClass(className.active);
                                module.reset.display.call(this);
                            })
                        ;
                    }
                },

                reset: {

                    display: function () {
                        module.verbose('Removing inline display from element', this);
                        var $element = $(this);
                        $element.css('display', '');
                        if ($element.attr('style') === '') {
                            $element
                                .attr('style', '')
                                .removeAttr('style')
                            ;
                        }
                    },

                    opacity: function () {
                        module.verbose('Removing inline opacity from element', this);
                        var $element = $(this);
                        $element.css('opacity', '');
                        if ($element.attr('style') === '') {
                            $element
                                .attr('style', '')
                                .removeAttr('style')
                            ;
                        }
                    },

                },

                setting: function (name, value) {
                    module.debug('Changing setting', name, value);
                    if ($.isPlainObject(name)) {
                        $.extend(true, settings, name);
                    } else if (value !== undefined) {
                        if ($.isPlainObject(settings[name])) {
                            $.extend(true, settings[name], value);
                        } else {
                            settings[name] = value;
                        }
                    } else {
                        return settings[name];
                    }
                },
                internal: function (name, value) {
                    module.debug('Changing internal', name, value);
                    if (value !== undefined) {
                        if ($.isPlainObject(name)) {
                            $.extend(true, module, name);
                        } else {
                            module[name] = value;
                        }
                    } else {
                        return module[name];
                    }
                },
                debug: function () {
                    if (!settings.silent && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.debug.apply(console, arguments);
                        }
                    }
                },
                verbose: function () {
                    if (!settings.silent && settings.verbose && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.verbose.apply(console, arguments);
                        }
                    }
                },
                error: function () {
                    if (!settings.silent) {
                        module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                        module.error.apply(console, arguments);
                    }
                },
                performance: {
                    log: function (message) {
                        var
                            currentTime,
                            executionTime,
                            previousTime
                        ;
                        if (settings.performance) {
                            currentTime = Date.now();
                            previousTime = time || currentTime;
                            executionTime = currentTime - previousTime;
                            time = currentTime;
                            performance.push({
                                Name: message[0],
                                Arguments: [].slice.call(message, 1) || '',
                                Element: element,
                                'Execution Time': executionTime,
                            });
                        }
                        clearTimeout(module.performance.timer);
                        module.performance.timer = setTimeout(function () { module.performance.display(); }, 500);
                    },
                    display: function () {
                        var
                            title = settings.name + ':',
                            totalTime = 0
                        ;
                        time = false;
                        clearTimeout(module.performance.timer);
                        $.each(performance, function (index, data) {
                            totalTime += data['Execution Time'];
                        });
                        title += ' ' + totalTime + 'ms';
                        if (performance.length > 0) {
                            console.groupCollapsed(title);
                            if (console.table) {
                                console.table(performance);
                            } else {
                                $.each(performance, function (index, data) {
                                    console.log(data.Name + ': ' + data['Execution Time'] + 'ms');
                                });
                            }
                            console.groupEnd();
                        }
                        performance = [];
                    },
                },
                invoke: function (query, passedArguments, context) {
                    var
                        object = instance,
                        maxDepth,
                        found,
                        response
                    ;
                    passedArguments = passedArguments || queryArguments;
                    context = context || element;
                    if (typeof query === 'string' && object !== undefined) {
                        query = query.split(/[ .]/);
                        maxDepth = query.length - 1;
                        $.each(query, function (depth, value) {
                            var camelCaseValue = depth !== maxDepth
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query;
                            if ($.isPlainObject(object[camelCaseValue]) && (depth !== maxDepth)) {
                                object = object[camelCaseValue];
                            } else if (object[camelCaseValue] !== undefined) {
                                found = object[camelCaseValue];

                                return false;
                            } else if ($.isPlainObject(object[value]) && (depth !== maxDepth)) {
                                object = object[value];
                            } else if (object[value] !== undefined) {
                                found = object[value];

                                return false;
                            } else {
                                module.error(error.method, query);

                                return false;
                            }
                        });
                    }
                    if (isFunction(found)) {
                        response = found.apply(context, passedArguments);
                    } else if (found !== undefined) {
                        response = found;
                    }
                    if (Array.isArray(returnedValue)) {
                        returnedValue.push(response);
                    } else if (returnedValue !== undefined) {
                        returnedValue = [returnedValue, response];
                    } else if (response !== undefined) {
                        returnedValue = response;
                    }

                    return found;
                },
            };
            if (methodInvoked) {
                if (instance === undefined) {
                    module.initialize();
                }
                module.invoke(query);
            } else {
                if (instance !== undefined) {
                    instance.invoke('destroy');
                }
                module.initialize();
            }
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };

    $.fn.accordion.settings = {

        name: 'Accordion',
        namespace: 'accordion',

        silent: false,
        debug: false,
        verbose: false,
        performance: true,

        on: 'click', // event on title that opens accordion

        observeChanges: true, // whether accordion should automatically refresh on DOM insertion

        exclusive: true, // whether a single accordion content panel should be open at once
        collapsible: true, // whether accordion content can be closed
        closeNested: false, // whether nested content should be closed when a panel is closed
        animateChildren: true, // whether children opacity should be animated

        duration: 350, // duration of animation
        easing: 'easeOutQuad', // easing equation for animation

        onOpening: function () {}, // callback before open animation
        onClosing: function () {}, // callback before closing animation
        onChanging: function () {}, // callback before closing or opening animation

        onOpen: function () {}, // callback after open animation
        onClose: function () {}, // callback after closing animation
        onChange: function () {}, // callback after closing or opening animation

        error: {
            method: 'The method you called is not defined',
        },

        className: {
            active: 'active',
            animating: 'animating',
            transition: 'transition',
        },

        selector: {
            accordion: '.accordion',
            title: '.title',
            trigger: '.title',
            ignore: '.ui.dropdown',
            content: '.content',
        },

    };

    // Adds easing
    $.extend($.easing, {
        easeOutQuad: function (x) {
            return 1 - (1 - x) * (1 - x);
        },
    });
})(jQuery, window, document);

/*!
 * # Fomantic-UI 2.9.3 - Sidebar
 * https://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */

(function ($, window, document) {
    'use strict';

    function isFunction(obj) {
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }

    window = window !== undefined && window.Math === Math
        ? window
        : globalThis;

    $.fn.sidebar = function (parameters) {
        var
            $allModules     = $(this),
            $window         = $(window),
            $document       = $(document),
            $body           = $('body'),
            $html           = $('html'),
            $head           = $('head'),

            time            = Date.now(),
            performance     = [],

            query           = arguments[0],
            methodInvoked   = typeof query === 'string',
            queryArguments  = [].slice.call(arguments, 1),
            contextCheck    = function (context, win) {
                var $context;
                if ([window, document].indexOf(context) >= 0) {
                    $context = $body;
                } else {
                    $context = $(win.document).find(context);
                    if ($context.length === 0) {
                        $context = win.frameElement ? contextCheck(context, win.parent) : $body;
                    }
                }

                return $context;
            },
            returnedValue;

        $allModules.each(function () {
            var
                settings        = $.isPlainObject(parameters)
                    ? $.extend(true, {}, $.fn.sidebar.settings, parameters)
                    : $.extend({}, $.fn.sidebar.settings),

                selector        = settings.selector,
                className       = settings.className,
                namespace       = settings.namespace,
                regExp          = settings.regExp,
                error           = settings.error,

                eventNamespace  = '.' + namespace,
                moduleNamespace = 'module-' + namespace,

                $module         = $(this),
                $context        = contextCheck(settings.context, window),
                isBody          = $context[0] === $body[0],

                $sidebars       = $module.children(selector.sidebar),
                $fixed          = $context.children(selector.fixed),
                $pusher         = $context.children(selector.pusher),
                $style,

                element         = this,
                instance        = $module.data(moduleNamespace),

                elementNamespace,
                id,
                currentScroll,
                initialBodyMargin = '',
                tempBodyMargin = '',
                hadScrollbar = false,

                module
            ;

            module = {

                initialize: function () {
                    module.debug('Initializing sidebar', parameters);

                    module.create.id();

                    // avoids locking rendering if initialized in onReady
                    if (settings.delaySetup) {
                        requestAnimationFrame(module.setup.layout);
                    } else {
                        module.setup.layout();
                    }

                    requestAnimationFrame(function () {
                        module.setup.cache();
                    });

                    module.instantiate();
                },

                instantiate: function () {
                    module.verbose('Storing instance of module', module);
                    instance = module;
                    $module
                        .data(moduleNamespace, module)
                    ;
                },

                create: {
                    id: function () {
                        id = (Math.random().toString(16) + '000000000').slice(2, 10);
                        elementNamespace = '.' + id;
                        module.verbose('Creating unique id for element', id);
                    },
                },

                destroy: function () {
                    module.verbose('Destroying previous module for', $module);
                    $module
                        .off(eventNamespace)
                        .removeData(moduleNamespace)
                    ;
                    // bound by uuid
                    $context.off(elementNamespace);
                    $window.off(elementNamespace);
                    $document.off(elementNamespace);
                },

                event: {
                    clickaway: function (event) {
                        if (settings.closable) {
                            var
                                clickedInPusher = $pusher.find(event.target).length > 0 || $pusher.is(event.target),
                                clickedContext  = $context.is(event.target)
                            ;
                            if (clickedInPusher) {
                                module.verbose('User clicked on dimmed page');
                                module.hide();
                            }
                            if (clickedContext) {
                                module.verbose('User clicked on dimmable context (scaled out page)');
                                module.hide();
                            }
                        }
                    },
                    touch: function (event) {
                        // event.stopPropagation();
                    },
                    containScroll: function (event) {
                        if (element.scrollTop <= 0) {
                            element.scrollTop = 1;
                        }
                        if ((element.scrollTop + element.offsetHeight) >= element.scrollHeight) {
                            element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
                        }
                    },
                    scroll: function (event) {
                        if ($(event.target).closest(selector.sidebar).length === 0) {
                            event.preventDefault();
                        }
                    },
                },

                bind: {
                    clickaway: function () {
                        module.verbose('Adding clickaway events to context', $context);
                        $context
                            .on('click' + elementNamespace, module.event.clickaway)
                            .on('touchend' + elementNamespace, module.event.clickaway)
                        ;
                    },
                    scrollLock: function () {
                        if (settings.scrollLock) {
                            module.debug('Disabling page scroll');
                            hadScrollbar = module.has.scrollbar();
                            if (hadScrollbar) {
                                module.save.bodyMargin();
                                module.set.bodyMargin();
                            }
                            $context.addClass(className.locked);
                        }
                        module.verbose('Adding events to contain sidebar scroll');
                        $document
                            .on('touchmove' + elementNamespace, module.event.touch)
                        ;
                        $module
                            .on('scroll' + eventNamespace, module.event.containScroll)
                        ;
                    },
                },
                unbind: {
                    clickaway: function () {
                        module.verbose('Removing clickaway events from context', $context);
                        $context.off(elementNamespace);
                    },
                    scrollLock: function () {
                        module.verbose('Removing scroll lock from page');
                        if (hadScrollbar) {
                            module.restore.bodyMargin();
                        }
                        $context.removeClass(className.locked);
                        $document.off(elementNamespace);
                        $module.off('scroll' + eventNamespace);
                    },
                },

                add: {
                    inlineCSS: function () {
                        var
                            width     = module.cache.width || $module.outerWidth(),
                            height    = module.cache.height || $module.outerHeight(),
                            isRTL     = module.is.rtl(),
                            direction = module.get.direction(),
                            distance  = {
                                left: width,
                                right: -width,
                                top: height,
                                bottom: -height,
                            },
                            style
                        ;

                        if (isRTL) {
                            module.verbose('RTL detected, flipping widths');
                            distance.left = -width;
                            distance.right = width;
                        }

                        style = '<style>';

                        if (direction === 'left' || direction === 'right') {
                            module.debug('Adding CSS rules for animation distance', width);
                            style += ''
                                + ' .ui.visible.' + direction + '.sidebar ~ .fixed,'
                                + ' .ui.visible.' + direction + '.sidebar ~ .pusher {'
                                + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);'
                                + ' }';
                        } else if (direction === 'top' || direction === 'bottom') {
                            style += ''
                                + ' .ui.visible.' + direction + '.sidebar ~ .fixed,'
                                + ' .ui.visible.' + direction + '.sidebar ~ .pusher {'
                                + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                                + ' }';
                        }

                        /* IE is only browser not to create context with transforms */
                        /* https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328 */
                        if (module.is.ie()) {
                            if (direction === 'left' || direction === 'right') {
                                module.debug('Adding CSS rules for animation distance', width);
                                style += ''
                                    + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher::after {'
                                    + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);'
                                    + ' }';
                            } else if (direction === 'top' || direction === 'bottom') {
                                style += ''
                                    + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher::after {'
                                    + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                                    + ' }';
                            }
                            /* opposite sides visible forces content overlay */
                            style += ''
                                + ' body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher::after,'
                                + ' body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher::after {'
                                + '           transform: translate3d(0, 0, 0);'
                                + ' }';
                        }
                        style += '</style>';
                        $style = $(style)
                            .appendTo($head)
                        ;
                        module.debug('Adding sizing css to head', $style);
                    },
                },

                refresh: function () {
                    module.verbose('Refreshing selector cache');
                    $context = contextCheck(settings.context, window);
                    module.refreshSidebars();
                    $pusher = $context.children(selector.pusher);
                    $fixed = $context.children(selector.fixed);
                    module.clear.cache();
                },

                refreshSidebars: function () {
                    module.verbose('Refreshing other sidebars');
                    $sidebars = $context.children(selector.sidebar);
                },

                repaint: function () {
                    module.verbose('Forcing repaint event');
                    element.style.display = 'none';
                    var ignored = element.offsetHeight;
                    element.scrollTop = element.scrollTop; // eslint-disable-line no-self-assign
                    element.style.display = '';
                },

                setup: {
                    cache: function () {
                        module.cache = {
                            width: $module.outerWidth(),
                            height: $module.outerHeight(),
                        };
                    },
                    layout: function () {
                        if ($context.children(selector.pusher).length === 0) {
                            module.debug('Adding wrapper element for sidebar');
                            module.error(error.pusher);
                            $pusher = $('<div class="pusher" />');
                            $context
                                .children()
                                .not(selector.omitted)
                                .not($sidebars)
                                .wrapAll($pusher)
                            ;
                            module.refresh();
                        }
                        if ($module.nextAll(selector.pusher).length === 0 || $module.nextAll(selector.pusher)[0] !== $pusher[0]) {
                            module.debug('Moved sidebar to correct parent element');
                            module.error(error.movedSidebar, element);
                            $module.detach().prependTo($context);
                            module.refresh();
                        }
                        module.clear.cache();
                        module.set.pushable();
                        module.set.direction();
                    },
                },

                attachEvents: function (selector, event) {
                    var
                        $toggle = $(selector)
                    ;
                    event = isFunction(module[event])
                        ? module[event]
                        : module.toggle;
                    if ($toggle.length > 0) {
                        module.debug('Attaching sidebar events to element', selector, event);
                        $toggle
                            .on('click' + eventNamespace, event)
                        ;
                    } else {
                        module.error(error.notFound, selector);
                    }
                },
                can: {
                    leftBodyScrollbar: function () {
                        if (module.cache.leftBodyScrollbar === undefined) {
                            module.cache.leftBodyScrollbar = module.is.rtl() && ((module.is.iframe && !module.is.firefox()) || module.is.safari() || module.is.edge() || module.is.ie());
                        }

                        return module.cache.leftBodyScrollbar;
                    },
                },
                save: {
                    bodyMargin: function () {
                        initialBodyMargin = $context.css((isBody ? 'margin-' : 'padding-') + (module.can.leftBodyScrollbar() ? 'left' : 'right'));
                        var
                            bodyMarginRightPixel = parseInt(initialBodyMargin.replace(/[^\d.]/g, ''), 10),
                            bodyScrollbarWidth = isBody ? window.innerWidth - document.documentElement.clientWidth : $context[0].offsetWidth - $context[0].clientWidth
                        ;
                        tempBodyMargin = bodyMarginRightPixel + bodyScrollbarWidth;
                    },
                },
                show: function (callback) {
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    if (module.is.hidden()) {
                        if (settings.onShow.call(element) === false) {
                            module.verbose('Show callback returned false cancelling show');

                            return;
                        }
                        if (settings.overlay) {
                            module.error(error.overlay);
                            settings.transition = 'overlay';
                        }
                        module.refresh();
                        if (module.othersActive()) {
                            module.debug('Other sidebars currently visible');
                            if (settings.exclusive) {
                                // if not overlay queue animation after hide
                                if (settings.transition !== 'overlay') {
                                    module.hideOthers(module.show);

                                    return;
                                }

                                module.hideOthers();
                            } else {
                                settings.transition = 'overlay';
                            }
                        }
                        module.set.dimmerStyles();
                        module.pushPage(function () {
                            callback.call(element);
                            settings.onVisible.call(element);
                        });
                        settings.onChange.call(element);
                    } else {
                        module.debug('Sidebar is already visible');
                    }
                },

                hide: function (callback) {
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    if ((module.is.visible() || module.is.animating()) && settings.onHide.call(element) !== false) {
                        module.debug('Hiding sidebar', callback);
                        module.refreshSidebars();
                        module.pullPage(function () {
                            callback.call(element);
                            settings.onHidden.call(element);
                        });
                        settings.onChange.call(element);
                    }
                },

                othersAnimating: function () {
                    return $sidebars.not($module).filter('.' + className.animating).length > 0;
                },
                othersVisible: function () {
                    return $sidebars.not($module).filter('.' + className.visible).length > 0;
                },
                othersActive: function () {
                    return module.othersVisible() || module.othersAnimating();
                },

                hideOthers: function (callback) {
                    var
                        $otherSidebars = $sidebars.not($module).filter('.' + className.visible),
                        sidebarCount   = $otherSidebars.length,
                        callbackCount  = 0
                    ;
                    callback = callback || function () {};
                    $otherSidebars
                        .sidebar('hide', function () {
                            callbackCount++;
                            if (callbackCount === sidebarCount) {
                                callback();
                            }
                        })
                    ;
                },

                toggle: function () {
                    module.verbose('Determining toggled direction');
                    if (module.is.hidden()) {
                        module.show();
                    } else {
                        module.hide();
                    }
                },

                pushPage: function (callback) {
                    var
                        transition = module.get.transition(),
                        $transition = transition === 'overlay' || module.othersActive()
                            ? $module
                            : $pusher,
                        animate,
                        dim,
                        transitionEnd
                    ;
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    if (settings.returnScroll) {
                        currentScroll = (isBody ? $window : $context).scrollTop();
                    }
                    if (settings.transition === 'scale down') {
                        module.scrollToTop();
                    }
                    module.bind.scrollLock();
                    module.set.transition(transition);
                    module.repaint();
                    animate = function () {
                        module.bind.clickaway();
                        module.add.inlineCSS();
                        module.set.animating();
                        module.set.visible();
                    };
                    dim = function () {
                        module.set.dimmed();
                    };
                    transitionEnd = function (event) {
                        if (event.target === $transition[0]) {
                            $transition.off('transitionend' + elementNamespace, transitionEnd);
                            module.remove.animating();
                            callback.call(element);
                        }
                    };
                    $transition.off('transitionend' + elementNamespace);
                    $transition.on('transitionend' + elementNamespace, transitionEnd);
                    requestAnimationFrame(animate);
                    if (settings.dimPage && !module.othersVisible()) {
                        requestAnimationFrame(dim);
                    }
                },

                pullPage: function (callback) {
                    var
                        transition = module.get.transition(),
                        $transition = transition === 'overlay' || module.othersActive()
                            ? $module
                            : $pusher,
                        animate,
                        transitionEnd
                    ;
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    module.verbose('Removing context push state', module.get.direction());

                    module.unbind.clickaway();
                    module.unbind.scrollLock();

                    animate = function () {
                        module.set.transition(transition);
                        module.set.animating();
                        if (settings.dimPage && !module.othersVisible()) {
                            module.set.closing();
                        }
                        module.remove.visible();
                    };
                    transitionEnd = function (event) {
                        if (event.target === $transition[0]) {
                            $transition.off('transitionend' + elementNamespace, transitionEnd);
                            module.remove.animating();
                            module.remove.closing();
                            module.remove.transition();
                            module.remove.inlineCSS();
                            if (transition === 'scale down' || settings.returnScroll) {
                                module.scrollBack();
                            }
                            if (settings.dimPage && !module.othersVisible()) {
                                $pusher.removeClass(className.dimmed);
                            }
                            callback.call(element);
                        }
                    };
                    $transition.off('transitionend' + elementNamespace);
                    $transition.on('transitionend' + elementNamespace, transitionEnd);
                    requestAnimationFrame(animate);
                },

                scrollToTop: function () {
                    module.verbose('Scrolling to top of page to avoid animation issues');
                    $module.scrollTop(0);
                    (isBody ? $window : $context)[0].scrollTo(0, 0);
                },

                scrollBack: function () {
                    module.verbose('Scrolling back to original page position');
                    (isBody ? $window : $context)[0].scrollTo(0, currentScroll);
                },

                clear: {
                    cache: function () {
                        module.verbose('Clearing cached dimensions');
                        module.cache = {};
                    },
                },

                set: {
                    bodyMargin: function () {
                        var position = module.can.leftBodyScrollbar() ? 'left' : 'right';
                        $context.css((isBody ? 'margin-' : 'padding-') + position, tempBodyMargin + 'px');
                        $context.find(selector.bodyFixed.replace('right', position)).each(function () {
                            var
                                el = $(this),
                                attribute = el.css('position') === 'fixed' ? 'padding-' + position : position
                            ;
                            el.css(attribute, 'calc(' + el.css(attribute) + ' + ' + tempBodyMargin + 'px)');
                        });
                    },
                    dimmerStyles: function () {
                        if (settings.blurring) {
                            $pusher.addClass(className.blurring);
                        } else {
                            $pusher.removeClass(className.blurring);
                        }
                    },

                    // container
                    pushed: function () {
                        $context.addClass(className.pushed);
                    },
                    pushable: function () {
                        $context.addClass(className.pushable);
                    },

                    // pusher
                    dimmed: function () {
                        $pusher.addClass(className.dimmed);
                    },

                    // sidebar
                    active: function () {
                        $module.addClass(className.active);
                    },
                    animating: function () {
                        $module.addClass(className.animating);
                    },
                    closing: function () {
                        $pusher.addClass(className.closing);
                    },
                    transition: function (transition) {
                        transition = transition || module.get.transition();
                        $module.addClass(transition);
                    },
                    direction: function (direction) {
                        direction = direction || module.get.direction();
                        $module.addClass(className[direction]);
                    },
                    visible: function () {
                        $module.addClass(className.visible);
                    },
                    overlay: function () {
                        $module.addClass(className.overlay);
                    },
                },
                remove: {

                    inlineCSS: function () {
                        module.debug('Removing inline css styles', $style);
                        if ($style && $style.length > 0) {
                            $style.remove();
                        }
                    },

                    // context
                    pushed: function () {
                        $context.removeClass(className.pushed);
                    },
                    pushable: function () {
                        $context.removeClass(className.pushable);
                    },

                    // sidebar
                    active: function () {
                        $module.removeClass(className.active);
                    },
                    animating: function () {
                        $module.removeClass(className.animating);
                    },
                    closing: function () {
                        $pusher.removeClass(className.closing);
                    },
                    transition: function (transition) {
                        transition = transition || module.get.transition();
                        $module.removeClass(transition);
                    },
                    direction: function (direction) {
                        direction = direction || module.get.direction();
                        $module.removeClass(className[direction]);
                    },
                    visible: function () {
                        $module.removeClass(className.visible);
                    },
                    overlay: function () {
                        $module.removeClass(className.overlay);
                    },
                },
                restore: {
                    bodyMargin: function () {
                        var position = module.can.leftBodyScrollbar() ? 'left' : 'right';
                        $context.css((isBody ? 'margin-' : 'padding-') + position, initialBodyMargin);
                        $context.find(selector.bodyFixed.replace('right', position)).each(function () {
                            var
                                el = $(this),
                                attribute = el.css('position') === 'fixed' ? 'padding-' + position : position
                            ;
                            el.css(attribute, '');
                        });
                    },
                },
                get: {
                    direction: function () {
                        if ($module.hasClass(className.top)) {
                            return className.top;
                        }
                        if ($module.hasClass(className.right)) {
                            return className.right;
                        }
                        if ($module.hasClass(className.bottom)) {
                            return className.bottom;
                        }

                        return className.left;
                    },
                    transition: function () {
                        var
                            direction = module.get.direction(),
                            transition
                        ;
                        transition = module.is.mobile()
                            ? (settings.mobileTransition === 'auto'
                                ? settings.defaultTransition.mobile[direction]
                                : settings.mobileTransition)
                            : (settings.transition === 'auto'
                                ? settings.defaultTransition.computer[direction]
                                : settings.transition);
                        module.verbose('Determined transition', transition);

                        return transition;
                    },
                },
                has: {
                    scrollbar: function () {
                        return isBody || $context.css('overflow-y') !== 'hidden';
                    },
                },
                is: {
                    safari: function () {
                        if (module.cache.isSafari === undefined) {
                            module.cache.isSafari = /constructor/i.test(window.HTMLElement) || !!window.ApplePaySession;
                        }

                        return module.cache.isSafari;
                    },
                    edge: function () {
                        if (module.cache.isEdge === undefined) {
                            module.cache.isEdge = !!window.setImmediate && !module.is.ie();
                        }

                        return module.cache.isEdge;
                    },
                    firefox: function () {
                        if (module.cache.isFirefox === undefined) {
                            module.cache.isFirefox = !!window.InstallTrigger;
                        }

                        return module.cache.isFirefox;
                    },
                    iframe: function () {
                        return !(self === top);
                    },
                    ie: function () {
                        if (module.cache.isIE === undefined) {
                            var
                                isIE11 = !window.ActiveXObject && 'ActiveXObject' in window,
                                isIE = 'ActiveXObject' in window
                            ;
                            module.cache.isIE = isIE11 || isIE;
                        }

                        return module.cache.isIE;
                    },

                    mobile: function () {
                        var
                            userAgent    = navigator.userAgent,
                            isMobile     = userAgent.match(regExp.mobile)
                        ;
                        if (isMobile) {
                            module.verbose('Browser was found to be mobile', userAgent);

                            return true;
                        }

                        module.verbose('Browser is not mobile, using regular transition', userAgent);

                        return false;
                    },
                    hidden: function () {
                        return !module.is.visible();
                    },
                    visible: function () {
                        return $module.hasClass(className.visible);
                    },
                    // alias
                    open: function () {
                        return module.is.visible();
                    },
                    closed: function () {
                        return module.is.hidden();
                    },
                    vertical: function () {
                        return $module.hasClass(className.top);
                    },
                    animating: function () {
                        return $context.hasClass(className.animating);
                    },
                    rtl: function () {
                        if (module.cache.isRTL === undefined) {
                            module.cache.isRTL = $module.attr('dir') === 'rtl' || $module.css('direction') === 'rtl' || $body.attr('dir') === 'rtl' || $body.css('direction') === 'rtl' || $context.attr('dir') === 'rtl' || $context.css('direction') === 'rtl';
                        }

                        return module.cache.isRTL;
                    },
                },

                setting: function (name, value) {
                    module.debug('Changing setting', name, value);
                    if ($.isPlainObject(name)) {
                        $.extend(true, settings, name);
                    } else if (value !== undefined) {
                        if ($.isPlainObject(settings[name])) {
                            $.extend(true, settings[name], value);
                        } else {
                            settings[name] = value;
                        }
                    } else {
                        return settings[name];
                    }
                },
                internal: function (name, value) {
                    if ($.isPlainObject(name)) {
                        $.extend(true, module, name);
                    } else if (value !== undefined) {
                        module[name] = value;
                    } else {
                        return module[name];
                    }
                },
                debug: function () {
                    if (!settings.silent && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.debug.apply(console, arguments);
                        }
                    }
                },
                verbose: function () {
                    if (!settings.silent && settings.verbose && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.verbose.apply(console, arguments);
                        }
                    }
                },
                error: function () {
                    if (!settings.silent) {
                        module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                        module.error.apply(console, arguments);
                    }
                },
                performance: {
                    log: function (message) {
                        var
                            currentTime,
                            executionTime,
                            previousTime
                        ;
                        if (settings.performance) {
                            currentTime = Date.now();
                            previousTime = time || currentTime;
                            executionTime = currentTime - previousTime;
                            time = currentTime;
                            performance.push({
                                Name: message[0],
                                Arguments: [].slice.call(message, 1) || '',
                                Element: element,
                                'Execution Time': executionTime,
                            });
                        }
                        clearTimeout(module.performance.timer);
                        module.performance.timer = setTimeout(function () { module.performance.display(); }, 500);
                    },
                    display: function () {
                        var
                            title = settings.name + ':',
                            totalTime = 0
                        ;
                        time = false;
                        clearTimeout(module.performance.timer);
                        $.each(performance, function (index, data) {
                            totalTime += data['Execution Time'];
                        });
                        title += ' ' + totalTime + 'ms';
                        if (performance.length > 0) {
                            console.groupCollapsed(title);
                            if (console.table) {
                                console.table(performance);
                            } else {
                                $.each(performance, function (index, data) {
                                    console.log(data.Name + ': ' + data['Execution Time'] + 'ms');
                                });
                            }
                            console.groupEnd();
                        }
                        performance = [];
                    },
                },
                invoke: function (query, passedArguments, context) {
                    var
                        object = instance,
                        maxDepth,
                        found,
                        response
                    ;
                    passedArguments = passedArguments || queryArguments;
                    context = context || element;
                    if (typeof query === 'string' && object !== undefined) {
                        query = query.split(/[ .]/);
                        maxDepth = query.length - 1;
                        $.each(query, function (depth, value) {
                            var camelCaseValue = depth !== maxDepth
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query
                            ;
                            if ($.isPlainObject(object[camelCaseValue]) && (depth !== maxDepth)) {
                                object = object[camelCaseValue];
                            } else if (object[camelCaseValue] !== undefined) {
                                found = object[camelCaseValue];

                                return false;
                            } else if ($.isPlainObject(object[value]) && (depth !== maxDepth)) {
                                object = object[value];
                            } else if (object[value] !== undefined) {
                                found = object[value];

                                return false;
                            } else {
                                module.error(error.method, query);

                                return false;
                            }
                        });
                    }
                    if (isFunction(found)) {
                        response = found.apply(context, passedArguments);
                    } else if (found !== undefined) {
                        response = found;
                    }
                    if (Array.isArray(returnedValue)) {
                        returnedValue.push(response);
                    } else if (returnedValue !== undefined) {
                        returnedValue = [returnedValue, response];
                    } else if (response !== undefined) {
                        returnedValue = response;
                    }

                    return found;
                },
            };

            if (methodInvoked) {
                if (instance === undefined) {
                    module.initialize();
                }
                module.invoke(query);
            } else {
                if (instance !== undefined) {
                    module.invoke('destroy');
                }
                module.initialize();
            }
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };

    $.fn.sidebar.settings = {

        name: 'Sidebar',
        namespace: 'sidebar',

        silent: false,
        debug: false,
        verbose: false,
        performance: true,

        transition: 'auto',
        mobileTransition: 'auto',

        defaultTransition: {
            computer: {
                left: 'uncover',
                right: 'uncover',
                top: 'overlay',
                bottom: 'overlay',
            },
            mobile: {
                left: 'uncover',
                right: 'uncover',
                top: 'overlay',
                bottom: 'overlay',
            },
        },

        context: 'body',
        exclusive: false,
        closable: true,
        dimPage: true,
        scrollLock: false,
        returnScroll: false,
        delaySetup: false,

        onChange: function () {},
        onShow: function () {},
        onHide: function () {},

        onHidden: function () {},
        onVisible: function () {},

        className: {
            active: 'active',
            animating: 'animating',
            blurring: 'blurring',
            closing: 'closing',
            dimmed: 'dimmed',
            locked: 'locked',
            pushable: 'pushable',
            pushed: 'pushed',
            right: 'right',
            top: 'top',
            left: 'left',
            bottom: 'bottom',
            visible: 'visible',
        },

        selector: {
            bodyFixed: '> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar, > .ui.fixed.nag, > .ui.fixed.nag > .close',
            fixed: '.fixed',
            omitted: 'script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed',
            pusher: '.pusher',
            sidebar: '.ui.sidebar',
        },

        regExp: {
            mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g,
        },

        error: {
            method: 'The method you called is not defined.',
            pusher: 'Had to add pusher element. For optimal performance make sure body content is inside a pusher element',
            movedSidebar: 'Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag',
            overlay: 'The overlay setting is no longer supported, use animation: overlay',
            notFound: 'There were no elements that matched the specified selector',
        },

    };
})(jQuery, window, document);

/*!
 * # Fomantic-UI 2.9.3 - Sticky
 * https://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */

(function ($, window, document) {
    'use strict';

    function isFunction(obj) {
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }

    window = window !== undefined && window.Math === Math
        ? window
        : globalThis;

    $.fn.sticky = function (parameters) {
        var
            $allModules    = $(this),
            $document      = $(document),

            time           = Date.now(),
            performance    = [],

            query          = arguments[0],
            methodInvoked  = typeof query === 'string',
            queryArguments = [].slice.call(arguments, 1),
            contextCheck   = function (context, win) {
                var $context;
                if ([window, document].indexOf(context) >= 0) {
                    $context = $(context);
                } else {
                    $context = $(win.document).find(context);
                    if ($context.length === 0) {
                        $context = win.frameElement ? contextCheck(context, win.parent) : window;
                    }
                }

                return $context;
            },
            returnedValue
        ;

        $allModules.each(function () {
            var
                settings              = $.isPlainObject(parameters)
                    ? $.extend(true, {}, $.fn.sticky.settings, parameters)
                    : $.extend({}, $.fn.sticky.settings),

                className             = settings.className,
                namespace             = settings.namespace,
                error                 = settings.error,

                eventNamespace        = '.' + namespace,
                moduleNamespace       = 'module-' + namespace,

                $module               = $(this),
                $window               = $(window),
                $scroll               = contextCheck(settings.scrollContext, window),
                $container,
                $context,

                instance              = $module.data(moduleNamespace),

                element         = this,

                documentObserver,
                observer,
                module
            ;

            module = {

                initialize: function () {
                    module.determineContainer();
                    module.determineContext();
                    module.verbose('Initializing sticky', settings, $container);

                    module.save.positions();
                    module.checkErrors();
                    module.bind.events();

                    if (settings.observeChanges) {
                        module.observeChanges();
                    }
                    module.instantiate();
                },

                instantiate: function () {
                    module.verbose('Storing instance of module', module);
                    instance = module;
                    $module
                        .data(moduleNamespace, module)
                    ;
                },

                destroy: function () {
                    module.verbose('Destroying previous instance');
                    module.reset();
                    if (documentObserver) {
                        documentObserver.disconnect();
                    }
                    if (observer) {
                        observer.disconnect();
                    }
                    $window
                        .off('load' + eventNamespace, module.event.load)
                        .off('resize' + eventNamespace, module.event.resize)
                    ;
                    $scroll
                        .off('scrollchange' + eventNamespace, module.event.scrollchange)
                    ;
                    $module.removeData(moduleNamespace);
                },

                observeChanges: function () {
                    if ('MutationObserver' in window) {
                        documentObserver = new MutationObserver(module.event.documentChanged);
                        observer = new MutationObserver(module.event.changed);
                        documentObserver.observe(document, {
                            childList: true,
                            subtree: true,
                        });
                        observer.observe(element, {
                            childList: true,
                            subtree: true,
                        });
                        observer.observe($context[0], {
                            childList: true,
                            subtree: true,
                        });
                        module.debug('Setting up mutation observer', observer);
                    }
                },

                determineContainer: function () {
                    $container = settings.container ? contextCheck(settings.container, window) : $module.offsetParent();
                },

                determineContext: function () {
                    $context = settings.context ? contextCheck(settings.context, window) : $container;
                    if ($context.length === 0) {
                        module.error(error.invalidContext, settings.context, $module);
                    }
                },

                checkErrors: function () {
                    if (module.is.hidden()) {
                        module.error(error.visible, $module);
                    }
                    if (module.cache.element.height > module.cache.context.height) {
                        module.reset();
                        module.error(error.elementSize, $module);
                    }
                },

                bind: {
                    events: function () {
                        $window
                            .on('load' + eventNamespace, module.event.load)
                            .on('resize' + eventNamespace, module.event.resize)
                        ;
                        // pub/sub pattern
                        $scroll
                            .off('scroll' + eventNamespace)
                            .on('scroll' + eventNamespace, module.event.scroll)
                            .on('scrollchange' + eventNamespace, module.event.scrollchange)
                        ;
                    },
                },

                event: {
                    changed: function (mutations) {
                        clearTimeout(module.timer);
                        module.timer = setTimeout(function () {
                            module.verbose('DOM tree modified, updating sticky menu', mutations);
                            module.refresh();
                        }, 100);
                    },
                    documentChanged: function (mutations) {
                        [].forEach.call(mutations, function (mutation) {
                            if (mutation.removedNodes) {
                                [].forEach.call(mutation.removedNodes, function (node) {
                                    if (node === element || $(node).find(element).length > 0) {
                                        module.debug('Element removed from DOM, tearing down events');
                                        module.destroy();
                                    }
                                });
                            }
                        });
                    },
                    load: function () {
                        module.verbose('Page contents finished loading');
                        requestAnimationFrame(module.refresh);
                    },
                    resize: function () {
                        module.verbose('Window resized');
                        requestAnimationFrame(module.refresh);
                    },
                    scroll: function () {
                        requestAnimationFrame(function () {
                            $scroll.triggerHandler('scrollchange' + eventNamespace, $scroll.scrollTop());
                        });
                    },
                    scrollchange: function (event, scrollPosition) {
                        module.stick(scrollPosition);
                        settings.onScroll.call(element);
                    },
                },

                refresh: function (hardRefresh) {
                    module.reset();
                    if (!settings.context) {
                        module.determineContext();
                    }
                    if (hardRefresh) {
                        module.determineContainer();
                    }
                    module.save.positions();
                    module.stick();
                    settings.onReposition.call(element);
                },

                supports: {
                    sticky: function () {
                        var
                            $element = $('<div/>')
                        ;
                        $element.addClass(className.supported);

                        return $element.css('position').match('sticky');
                    },
                },

                save: {
                    lastScroll: function (scroll) {
                        module.lastScroll = scroll;
                    },
                    elementScroll: function (scroll) {
                        module.elementScroll = scroll;
                    },
                    positions: function () {
                        var
                            scrollContext = {
                                height: $scroll.height(),
                            },
                            element = {
                                margin: {
                                    top: parseInt($module.css('margin-top'), 10),
                                    bottom: parseInt($module.css('margin-bottom'), 10),
                                },
                                offset: $module.offset(),
                                width: $module.outerWidth(),
                                height: $module.outerHeight(),
                            },
                            context = {
                                offset: $context.offset(),
                                height: $context.outerHeight(),
                            }
                        ;
                        if (!module.is.standardScroll()) {
                            module.debug('Non-standard scroll. Removing scroll offset from element offset');

                            scrollContext.top = $scroll.scrollTop();
                            scrollContext.left = $scroll.scrollLeft();

                            element.offset.top += scrollContext.top;
                            context.offset.top += scrollContext.top;
                            element.offset.left += scrollContext.left;
                            context.offset.left += scrollContext.left;
                        }
                        module.cache = {
                            fits: (element.height + settings.offset) <= scrollContext.height,
                            sameHeight: element.height === context.height,
                            scrollContext: {
                                height: scrollContext.height,
                            },
                            element: {
                                margin: element.margin,
                                top: element.offset.top - element.margin.top,
                                left: element.offset.left,
                                width: element.width,
                                height: element.height,
                                bottom: element.offset.top + element.height,
                            },
                            context: {
                                top: context.offset.top,
                                height: context.height,
                                bottom: context.offset.top + context.height,
                            },
                        };
                        module.set.containerSize();

                        module.stick();
                        module.debug('Caching element positions', module.cache);
                    },
                },

                get: {
                    direction: function (scroll) {
                        var
                            direction = 'down'
                        ;
                        scroll = scroll || $scroll.scrollTop();
                        if (module.lastScroll && module.lastScroll > scroll) {
                            direction = 'up';
                        }

                        return direction;
                    },
                    scrollChange: function (scroll) {
                        scroll = scroll || $scroll.scrollTop();

                        return module.lastScroll
                            ? scroll - module.lastScroll
                            : 0;
                    },
                    currentElementScroll: function () {
                        if (module.elementScroll) {
                            return module.elementScroll;
                        }

                        return module.is.top()
                            ? Math.abs(parseInt($module.css('top'), 10)) || 0
                            : Math.abs(parseInt($module.css('bottom'), 10)) || 0;
                    },

                    elementScroll: function (scroll) {
                        scroll = scroll || $scroll.scrollTop();
                        var
                            element        = module.cache.element,
                            scrollContext  = module.cache.scrollContext,
                            delta          = module.get.scrollChange(scroll),
                            maxScroll      = element.height - scrollContext.height + settings.offset,
                            elementScroll  = module.get.currentElementScroll(),
                            possibleScroll = elementScroll + delta
                        ;
                        if (module.cache.fits || possibleScroll < 0) {
                            elementScroll = 0;
                        } else if (possibleScroll > maxScroll) {
                            elementScroll = maxScroll;
                        } else {
                            elementScroll = possibleScroll;
                        }

                        return elementScroll;
                    },
                },

                remove: {
                    lastScroll: function () {
                        delete module.lastScroll;
                    },
                    elementScroll: function () {
                        delete module.elementScroll;
                    },
                    minimumSize: function () {
                        $container
                            .css('min-height', '')
                        ;
                    },
                    offset: function () {
                        $module.css('margin-top', '');
                    },
                },

                set: {
                    offset: function () {
                        module.verbose('Setting offset on element', settings.offset);
                        $module
                            .css('margin-top', settings.offset)
                        ;
                    },
                    containerSize: function () {
                        var
                            tagName = $container[0].tagName
                        ;
                        if (tagName === 'HTML' || tagName === 'body') {
                            module.determineContainer();
                        } else {
                            var tallestHeight = Math.max(module.cache.context.height, module.cache.element.height);
                            if (tallestHeight - $container.outerHeight() > settings.jitter) {
                                module.debug('Context is taller than container. Specifying exact height for container', module.cache.context.height);
                                $container.css({
                                    height: tallestHeight,
                                });
                            } else {
                                $container.css({
                                    height: '',
                                });
                            }
                            if (Math.abs($container.outerHeight() - module.cache.context.height) > settings.jitter) {
                                module.debug('Context has padding, specifying exact height for container', module.cache.context.height);
                                $container.css({
                                    height: module.cache.context.height,
                                });
                            }
                        }
                    },
                    minimumSize: function () {
                        var
                            element   = module.cache.element
                        ;
                        $container
                            .css('min-height', element.height)
                        ;
                    },
                    scroll: function (scroll) {
                        module.debug('Setting scroll on element', scroll);
                        if (module.elementScroll === scroll) {
                            return;
                        }
                        if (module.is.top()) {
                            $module
                                .css('bottom', '')
                                .css('top', -scroll + 'px')
                            ;
                        }
                        if (module.is.bottom()) {
                            $module
                                .css('top', '')
                                .css('bottom', scroll + 'px')
                            ;
                        }
                    },
                    size: function () {
                        if (module.cache.element.height !== 0 && module.cache.element.width !== 0) {
                            element.style.setProperty('width', module.cache.element.width + 'px', 'important');
                            element.style.setProperty('height', module.cache.element.height + 'px', 'important');
                        }
                    },
                },

                is: {
                    standardScroll: function () {
                        return $scroll[0] === window;
                    },
                    top: function () {
                        return $module.hasClass(className.top);
                    },
                    bottom: function () {
                        return $module.hasClass(className.bottom);
                    },
                    initialPosition: function () {
                        return !module.is.fixed() && !module.is.bound();
                    },
                    hidden: function () {
                        return !$module.is(':visible');
                    },
                    bound: function () {
                        return $module.hasClass(className.bound);
                    },
                    fixed: function () {
                        return $module.hasClass(className.fixed);
                    },
                },

                stick: function (scrollPosition) {
                    var
                        cachedPosition = scrollPosition || $scroll.scrollTop(),
                        cache          = module.cache,
                        fits           = cache.fits,
                        sameHeight     = cache.sameHeight,
                        element        = cache.element,
                        scrollContext  = cache.scrollContext,
                        context        = cache.context,
                        offset         = module.is.bottom() && settings.pushing
                            ? settings.bottomOffset
                            : settings.offset,
                        scroll         = {
                            top: cachedPosition + offset,
                            bottom: cachedPosition + offset + scrollContext.height,
                        },
                        elementScroll  = fits
                            ? 0
                            : module.get.elementScroll(scroll.top),

                        // shorthand
                        doesntFit      = !fits,
                        elementVisible = element.height !== 0
                    ;
                    if (elementVisible && !sameHeight) {
                        if (module.is.initialPosition()) {
                            if (scroll.top >= context.bottom) {
                                module.debug('Initial element position is bottom of container');
                                module.bindBottom();
                            } else if (scroll.top > element.top) {
                                if ((element.height + scroll.top - elementScroll) >= context.bottom && element.height < context.height) {
                                    module.debug('Initial element position is bottom of container');
                                    module.bindBottom();
                                } else {
                                    module.debug('Initial element position is fixed');
                                    module.fixTop();
                                }
                            }
                        } else if (module.is.fixed()) {
                            if (module.is.top()) {
                                if (scroll.top <= element.top) {
                                    module.debug('Fixed element reached top of container');
                                    module.setInitialPosition();
                                } else if ((element.height + scroll.top - elementScroll) >= context.bottom) {
                                    module.debug('Fixed element reached bottom of container');
                                    module.bindBottom();
                                } else if (doesntFit) { // scroll element if larger than screen
                                    module.set.scroll(elementScroll);
                                    module.save.lastScroll(scroll.top);
                                    module.save.elementScroll(elementScroll);
                                }
                            } else if (module.is.bottom()) {
                                if ((scroll.bottom - element.height) <= element.top) { // top edge
                                    module.debug('Bottom fixed rail has reached top of container');
                                    module.setInitialPosition();
                                } else if (scroll.bottom >= context.bottom) { // bottom edge
                                    module.debug('Bottom fixed rail has reached bottom of container');
                                    module.bindBottom();
                                } else if (doesntFit) { // scroll element if larger than screen
                                    module.set.scroll(elementScroll);
                                    module.save.lastScroll(scroll.top);
                                    module.save.elementScroll(elementScroll);
                                }
                            }
                        } else if (module.is.bottom()) {
                            if (scroll.top <= element.top) {
                                module.debug('Jumped from bottom fixed to top fixed, most likely used home/end button');
                                module.setInitialPosition();
                            } else {
                                if (settings.pushing) {
                                    if (module.is.bound() && scroll.bottom <= context.bottom) {
                                        module.debug('Fixing bottom attached element to bottom of browser.');
                                        module.fixBottom();
                                    }
                                } else {
                                    if (module.is.bound() && (scroll.top <= context.bottom - element.height)) {
                                        module.debug('Fixing bottom attached element to top of browser.');
                                        module.fixTop();
                                    }
                                }
                            }
                        }
                    }
                },

                bindTop: function () {
                    module.debug('Binding element to top of parent container');
                    module.remove.offset();
                    if (settings.setSize) {
                        module.set.size();
                    }
                    $module
                        .css({
                            left: '',
                            top: '',
                            marginBottom: '',
                        })
                        .removeClass(className.fixed)
                        .removeClass(className.bottom)
                        .addClass(className.bound)
                        .addClass(className.top)
                    ;
                    settings.onTop.call(element);
                    settings.onUnstick.call(element);
                },
                bindBottom: function () {
                    module.debug('Binding element to bottom of parent container');
                    module.remove.offset();
                    if (settings.setSize) {
                        module.set.size();
                    }
                    $module
                        .css({
                            left: '',
                            top: '',
                        })
                        .removeClass(className.fixed)
                        .removeClass(className.top)
                        .addClass(className.bound)
                        .addClass(className.bottom)
                    ;
                    settings.onBottom.call(element);
                    settings.onUnstick.call(element);
                },

                setInitialPosition: function () {
                    module.debug('Returning to initial position');
                    module.unfix();
                    module.unbind();
                },

                fixTop: function () {
                    module.debug('Fixing element to top of page');
                    if (settings.setSize) {
                        module.set.size();
                    }
                    module.set.minimumSize();
                    module.set.offset();
                    $module
                        .css({
                            left: module.cache.element.left,
                            bottom: '',
                            marginBottom: '',
                        })
                        .removeClass(className.bound)
                        .removeClass(className.bottom)
                        .addClass(className.fixed)
                        .addClass(className.top)
                    ;
                    settings.onStick.call(element);
                },

                fixBottom: function () {
                    module.debug('Sticking element to bottom of page');
                    if (settings.setSize) {
                        module.set.size();
                    }
                    module.set.minimumSize();
                    module.set.offset();
                    $module
                        .css({
                            left: module.cache.element.left,
                            bottom: '',
                            marginBottom: '',
                        })
                        .removeClass(className.bound)
                        .removeClass(className.top)
                        .addClass(className.fixed)
                        .addClass(className.bottom)
                    ;
                    settings.onStick.call(element);
                },

                unbind: function () {
                    if (module.is.bound()) {
                        module.debug('Removing container bound position on element');
                        module.remove.offset();
                        $module
                            .removeClass(className.bound)
                            .removeClass(className.top)
                            .removeClass(className.bottom)
                        ;
                    }
                },

                unfix: function () {
                    if (module.is.fixed()) {
                        module.debug('Removing fixed position on element');
                        module.remove.minimumSize();
                        module.remove.offset();
                        $module
                            .removeClass(className.fixed)
                            .removeClass(className.top)
                            .removeClass(className.bottom)
                        ;
                        settings.onUnstick.call(element);
                    }
                },

                reset: function () {
                    module.debug('Resetting elements position');
                    module.unbind();
                    module.unfix();
                    module.resetCSS();
                    module.remove.offset();
                    module.remove.lastScroll();
                },

                resetCSS: function () {
                    $module
                        .css({
                            width: '',
                            height: '',
                        })
                    ;
                    $container
                        .css({
                            height: '',
                        })
                    ;
                },

                setting: function (name, value) {
                    if ($.isPlainObject(name)) {
                        $.extend(true, settings, name);
                    } else if (value !== undefined) {
                        settings[name] = value;
                    } else {
                        return settings[name];
                    }
                },
                internal: function (name, value) {
                    if ($.isPlainObject(name)) {
                        $.extend(true, module, name);
                    } else if (value !== undefined) {
                        module[name] = value;
                    } else {
                        return module[name];
                    }
                },
                debug: function () {
                    if (!settings.silent && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.debug.apply(console, arguments);
                        }
                    }
                },
                verbose: function () {
                    if (!settings.silent && settings.verbose && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.verbose.apply(console, arguments);
                        }
                    }
                },
                error: function () {
                    if (!settings.silent) {
                        module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                        module.error.apply(console, arguments);
                    }
                },
                performance: {
                    log: function (message) {
                        var
                            currentTime,
                            executionTime,
                            previousTime
                        ;
                        if (settings.performance) {
                            currentTime = Date.now();
                            previousTime = time || currentTime;
                            executionTime = currentTime - previousTime;
                            time = currentTime;
                            performance.push({
                                Name: message[0],
                                Arguments: [].slice.call(message, 1) || '',
                                Element: element,
                                'Execution Time': executionTime,
                            });
                        }
                        clearTimeout(module.performance.timer);
                        module.performance.timer = setTimeout(function () { module.performance.display(); }, 0);
                    },
                    display: function () {
                        var
                            title = settings.name + ':',
                            totalTime = 0
                        ;
                        time = false;
                        clearTimeout(module.performance.timer);
                        $.each(performance, function (index, data) {
                            totalTime += data['Execution Time'];
                        });
                        title += ' ' + totalTime + 'ms';
                        if (performance.length > 0) {
                            console.groupCollapsed(title);
                            if (console.table) {
                                console.table(performance);
                            } else {
                                $.each(performance, function (index, data) {
                                    console.log(data.Name + ': ' + data['Execution Time'] + 'ms');
                                });
                            }
                            console.groupEnd();
                        }
                        performance = [];
                    },
                },
                invoke: function (query, passedArguments, context) {
                    var
                        object = instance,
                        maxDepth,
                        found,
                        response
                    ;
                    passedArguments = passedArguments || queryArguments;
                    context = context || element;
                    if (typeof query === 'string' && object !== undefined) {
                        query = query.split(/[ .]/);
                        maxDepth = query.length - 1;
                        $.each(query, function (depth, value) {
                            var camelCaseValue = depth !== maxDepth
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query
                            ;
                            if ($.isPlainObject(object[camelCaseValue]) && (depth !== maxDepth)) {
                                object = object[camelCaseValue];
                            } else if (object[camelCaseValue] !== undefined) {
                                found = object[camelCaseValue];

                                return false;
                            } else if ($.isPlainObject(object[value]) && (depth !== maxDepth)) {
                                object = object[value];
                            } else if (object[value] !== undefined) {
                                found = object[value];

                                return false;
                            } else {
                                module.error(error.method, query);

                                return false;
                            }
                        });
                    }
                    if (isFunction(found)) {
                        response = found.apply(context, passedArguments);
                    } else if (found !== undefined) {
                        response = found;
                    }
                    if (Array.isArray(returnedValue)) {
                        returnedValue.push(response);
                    } else if (returnedValue !== undefined) {
                        returnedValue = [returnedValue, response];
                    } else if (response !== undefined) {
                        returnedValue = response;
                    }

                    return found;
                },
            };

            if (methodInvoked) {
                if (instance === undefined) {
                    module.initialize();
                }
                module.invoke(query);
            } else {
                if (instance !== undefined) {
                    instance.invoke('destroy');
                }
                module.initialize();
            }
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };

    $.fn.sticky.settings = {

        name: 'Sticky',
        namespace: 'sticky',

        silent: false,
        debug: false,
        verbose: true,
        performance: true,

        // whether to stick in the opposite direction on scroll up
        pushing: false,

        context: false,
        container: false,

        // Context to watch scroll events
        scrollContext: window,

        // Offset to adjust scroll
        offset: 0,

        // Offset to adjust scroll when attached to bottom of screen
        bottomOffset: 0,

        // will only set container height if difference between context and container is larger than this number
        jitter: 5,

        // set width of sticky element when it is fixed to page (used to make sure 100% width is maintained if no fixed size set)
        setSize: true,

        // Whether to automatically observe changes with Mutation Observers
        observeChanges: false,

        // Called when position is recalculated
        onReposition: function () {},

        // Called on each scroll
        onScroll: function () {},

        // Called when element is stuck to viewport
        onStick: function () {},

        // Called when element is unstuck from viewport
        onUnstick: function () {},

        // Called when element reaches top of context
        onTop: function () {},

        // Called when element reaches bottom of context
        onBottom: function () {},

        error: {
            visible: 'Element is hidden, you must call refresh after element becomes visible. Use silent setting to suppress this warning in production.',
            method: 'The method you called is not defined.',
            invalidContext: 'Context specified does not exist',
            elementSize: 'Sticky element is larger than its container, cannot create sticky.',
        },

        className: {
            bound: 'bound',
            fixed: 'fixed',
            supported: 'native',
            top: 'top',
            bottom: 'bottom',
        },

    };
})(jQuery, window, document);

/*!
 * # Fomantic-UI 2.9.3 - Transition
 * https://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */

(function ($, window, document) {
    'use strict';

    function isFunction(obj) {
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }

    window = window !== undefined && window.Math === Math
        ? window
        : globalThis;

    $.fn.transition = function () {
        var
            $allModules     = $(this),

            time            = Date.now(),
            performance     = [],

            moduleArguments = arguments,
            query           = moduleArguments[0],
            queryArguments  = [].slice.call(arguments, 1),
            methodInvoked   = typeof query === 'string',

            returnedValue
        ;
        $allModules.each(function (index) {
            var
                $module  = $(this),
                element  = this,

                // set at run time
                settings,
                instance,

                error,
                className,
                metadata,

                moduleNamespace,
                eventNamespace,
                module
            ;

            module = {

                initialize: function () {
                    // get full settings
                    settings = module.get.settings.apply(element, moduleArguments);

                    // shorthand
                    className = settings.className;
                    error = settings.error;
                    metadata = settings.metadata;

                    // define namespace
                    eventNamespace = '.' + settings.namespace;
                    moduleNamespace = 'module-' + settings.namespace;
                    instance = $module.data(moduleNamespace) || module;

                    if (methodInvoked) {
                        methodInvoked = module.invoke(query);
                    }

                    // method not invoked, lets run an animation
                    if (methodInvoked === false) {
                        module.verbose('Converted arguments into settings object', settings);
                        if (settings.interval) {
                            module.delay(settings.interval);
                        } else {
                            module.animate();
                        }
                        module.instantiate();
                    }
                },

                instantiate: function () {
                    module.verbose('Storing instance of module', module);
                    instance = module;
                    $module
                        .data(moduleNamespace, instance)
                    ;
                },

                destroy: function () {
                    module.verbose('Destroying previous module for', element);
                    $module
                        .removeData(moduleNamespace)
                    ;
                },

                refresh: function () {
                    module.verbose('Refreshing display type on next animation');
                    delete module.displayType;
                },

                forceRepaint: function () {
                    module.verbose('Forcing element repaint');
                    var
                        $parentElement = $module.parent(),
                        $nextElement = $module.next()
                    ;
                    if ($nextElement.length === 0) {
                        $module.detach().appendTo($parentElement);
                    } else {
                        $module.detach().insertBefore($nextElement);
                    }
                },

                repaint: function () {
                    module.verbose('Repainting element');
                    var
                        fakeAssignment = element.offsetWidth
                    ;
                },

                delay: function (interval) {
                    var
                        direction = module.get.animationDirection(),
                        shouldReverse,
                        delay
                    ;
                    if (!direction) {
                        direction = module.can.transition()
                            ? module.get.direction()
                            : 'static';
                    }
                    interval = interval !== undefined
                        ? interval
                        : settings.interval;
                    shouldReverse = settings.reverse === 'auto' && direction === className.outward;
                    delay = shouldReverse || settings.reverse === true
                        ? ($allModules.length - index) * interval
                        : index * interval;
                    module.debug('Delaying animation by', delay);
                    setTimeout(function () { module.animate(); }, delay);
                },

                animate: function (overrideSettings) {
                    settings = overrideSettings || settings;

                    module.debug('Preparing animation', settings.animation);
                    if (module.is.animating()) {
                        if (settings.queue) {
                            if (!settings.allowRepeats && module.has.direction() && module.is.occurring() && module.queuing !== true) {
                                module.debug('Animation is currently occurring, preventing queueing same animation', settings.animation);
                            } else {
                                module.queue(settings.animation);
                            }

                            return false;
                        }
                        if (!settings.allowRepeats && module.is.occurring()) {
                            module.debug('Animation is already occurring, will not execute repeated animation', settings.animation);

                            return false;
                        }

                        module.debug('New animation started, completing previous early', settings.animation);
                        instance.complete();
                    }
                    if (module.can.animate()) {
                        module.set.animating(settings.animation);
                    } else {
                        module.error(error.noAnimation, settings.animation, element);
                    }
                },

                reset: function () {
                    module.debug('Resetting animation to beginning conditions');
                    module.remove.animationCallbacks();
                    module.restore.conditions();
                    module.remove.animating();
                },

                queue: function (animation) {
                    module.debug('Queueing animation of', animation);
                    module.queuing = true;
                    $module
                        .one('animationend.queue' + eventNamespace, function () {
                            module.queuing = false;
                            module.repaint();
                            module.animate.apply(this, settings);
                        })
                    ;
                },

                complete: function (event) {
                    if (event && event.target === element) {
                        event.stopPropagation();
                    }
                    module.debug('Animation complete', settings.animation);
                    module.remove.completeCallback();
                    module.remove.failSafe();
                    if (!module.is.looping()) {
                        if (module.is.outward()) {
                            module.verbose('Animation is outward, hiding element');
                            module.restore.conditions();
                            module.hide();
                        } else if (module.is.inward()) {
                            module.verbose('Animation is inward, showing element');
                            module.restore.conditions();
                            module.show();
                        } else {
                            module.verbose('Static animation completed');
                            module.restore.conditions();
                            settings.onComplete.call(element);
                        }
                    }
                },

                force: {
                    visible: function () {
                        var
                            style          = $module.attr('style'),
                            userStyle      = module.get.userStyle(style),
                            displayType    = module.get.displayType(),
                            overrideStyle  = userStyle + 'display: ' + displayType + ' !important;',
                            inlineDisplay  = $module[0].style.display,
                            mustStayHidden = !displayType || (inlineDisplay === 'none' && settings.skipInlineHidden) || $module[0].tagName.match(/(script|link|style)/i)
                        ;
                        if (mustStayHidden) {
                            module.remove.transition();

                            return false;
                        }
                        module.verbose('Overriding default display to show element', displayType);
                        $module
                            .attr('style', overrideStyle)
                        ;

                        return true;
                    },
                    hidden: function () {
                        var
                            style          = $module.attr('style'),
                            currentDisplay = $module.css('display'),
                            emptyStyle     = style === undefined || style === ''
                        ;
                        if (currentDisplay !== 'none' && !module.is.hidden()) {
                            module.verbose('Overriding default display to hide element');
                            $module
                                .css('display', 'none')
                            ;
                        } else if (emptyStyle) {
                            $module
                                .removeAttr('style')
                            ;
                        }
                    },
                },

                has: {
                    direction: function (animation) {
                        var
                            hasDirection = false
                        ;
                        animation = animation || settings.animation;
                        if (typeof animation === 'string') {
                            animation = animation.split(' ');
                            $.each(animation, function (index, word) {
                                if (word === className.inward || word === className.outward) {
                                    hasDirection = true;
                                }
                            });
                        }

                        return hasDirection;
                    },
                    inlineDisplay: function () {
                        var
                            style = $module.attr('style') || ''
                        ;

                        return Array.isArray(style.match(/display.*?;/, ''));
                    },
                },

                set: {
                    animating: function (animation) {
                        // remove previous callbacks
                        module.remove.completeCallback();

                        // determine exact animation
                        animation = animation || settings.animation;
                        var animationClass = module.get.animationClass(animation);

                        // save animation class in cache to restore class names
                        module.save.animation(animationClass);

                        if (module.force.visible()) {
                            module.remove.hidden();
                            module.remove.direction();

                            module.start.animation(animationClass);
                        }
                    },
                    duration: function (animationName, duration) {
                        duration = duration || settings.duration;
                        duration = typeof duration === 'number'
                            ? duration + 'ms'
                            : duration;
                        if (duration || duration === 0) {
                            module.verbose('Setting animation duration', duration);
                            $module
                                .css({
                                    'animation-duration': duration,
                                })
                            ;
                        }
                    },
                    direction: function (direction) {
                        direction = direction || module.get.direction();
                        if (direction === className.inward) {
                            module.set.inward();
                        } else {
                            module.set.outward();
                        }
                    },
                    looping: function () {
                        module.debug('Transition set to loop');
                        $module
                            .addClass(className.looping)
                        ;
                    },
                    hidden: function () {
                        $module
                            .addClass(className.transition)
                            .addClass(className.hidden)
                        ;
                    },
                    inward: function () {
                        module.debug('Setting direction to inward');
                        $module
                            .removeClass(className.outward)
                            .addClass(className.inward)
                        ;
                    },
                    outward: function () {
                        module.debug('Setting direction to outward');
                        $module
                            .removeClass(className.inward)
                            .addClass(className.outward)
                        ;
                    },
                    visible: function () {
                        $module
                            .addClass(className.transition)
                            .addClass(className.visible)
                        ;
                    },
                },

                start: {
                    animation: function (animationClass) {
                        animationClass = animationClass || module.get.animationClass();
                        module.debug('Starting tween', animationClass);
                        $module
                            .addClass(animationClass)
                            .one('animationend.complete' + eventNamespace, module.complete)
                        ;
                        if (settings.useFailSafe) {
                            module.add.failSafe();
                        }
                        module.set.duration(settings.duration);
                        settings.onStart.call(element);
                    },
                },

                save: {
                    animation: function (animation) {
                        if (!module.cache) {
                            module.cache = {};
                        }
                        module.cache.animation = animation;
                    },
                    displayType: function (displayType) {
                        if (displayType !== 'none') {
                            $module.data(metadata.displayType, displayType);
                        }
                    },
                    transitionExists: function (animation, exists) {
                        $.fn.transition.exists[animation] = exists;
                        module.verbose('Saving existence of transition', animation, exists);
                    },
                },

                restore: {
                    conditions: function () {
                        var
                            animation = module.get.currentAnimation()
                        ;
                        if (animation) {
                            $module
                                .removeClass(animation)
                            ;
                            module.verbose('Removing animation class', module.cache);
                        }
                        module.remove.duration();
                    },
                },

                add: {
                    failSafe: function () {
                        var
                            duration = module.get.duration()
                        ;
                        module.timer = setTimeout(function () {
                            $module.triggerHandler('animationend');
                        }, duration + settings.failSafeDelay);
                        module.verbose('Adding fail safe timer', module.timer);
                    },
                },

                remove: {
                    animating: function () {
                        $module.removeClass(className.animating);
                    },
                    animationCallbacks: function () {
                        module.remove.queueCallback();
                        module.remove.completeCallback();
                    },
                    queueCallback: function () {
                        $module.off('.queue' + eventNamespace);
                    },
                    completeCallback: function () {
                        $module.off('.complete' + eventNamespace);
                    },
                    display: function () {
                        $module.css('display', '');
                    },
                    direction: function () {
                        $module
                            .removeClass(className.inward)
                            .removeClass(className.outward)
                        ;
                    },
                    duration: function () {
                        $module
                            .css('animation-duration', '')
                        ;
                    },
                    failSafe: function () {
                        module.verbose('Removing fail safe timer', module.timer);
                        if (module.timer) {
                            clearTimeout(module.timer);
                        }
                    },
                    hidden: function () {
                        $module.removeClass(className.hidden);
                    },
                    visible: function () {
                        $module.removeClass(className.visible);
                    },
                    looping: function () {
                        module.debug('Transitions are no longer looping');
                        if (module.is.looping()) {
                            module.reset();
                            $module
                                .removeClass(className.looping)
                            ;
                        }
                    },
                    transition: function () {
                        $module
                            .removeClass(className.transition)
                            .removeClass(className.visible)
                            .removeClass(className.hidden)
                        ;
                    },
                },
                get: {
                    settings: function (animation, duration, onComplete) {
                        if (typeof animation === 'object') { // single settings object
                            return $.extend(true, {}, $.fn.transition.settings, animation);
                        }
                        if (typeof onComplete === 'function') { // all arguments provided
                            return $.extend({}, $.fn.transition.settings, {
                                animation: animation,
                                onComplete: onComplete,
                                duration: duration,
                            });
                        }
                        if (typeof duration === 'string' || typeof duration === 'number') { // only duration provided
                            return $.extend({}, $.fn.transition.settings, {
                                animation: animation,
                                duration: duration,
                            });
                        }
                        if (typeof duration === 'object') { // duration is actually settings object
                            return $.extend({}, $.fn.transition.settings, duration, {
                                animation: animation,
                            });
                        }
                        if (typeof duration === 'function') { // duration is actually callback
                            return $.extend({}, $.fn.transition.settings, {
                                animation: animation,
                                onComplete: duration,
                            });
                        }

                        // only animation provided
                        return $.extend({}, $.fn.transition.settings, {
                            animation: animation,
                        });
                    },
                    animationClass: function (animation) {
                        var
                            animationClass = animation || settings.animation,
                            directionClass = module.can.transition() && !module.has.direction()
                                ? module.get.direction() + ' '
                                : ''
                        ;

                        return className.animating + ' '
                            + className.transition + ' '
                            + directionClass
                            + animationClass;
                    },
                    currentAnimation: function () {
                        return module.cache && module.cache.animation !== undefined
                            ? module.cache.animation
                            : false;
                    },
                    currentDirection: function () {
                        return module.is.inward()
                            ? className.inward
                            : className.outward;
                    },
                    direction: function () {
                        return module.is.hidden() || !module.is.visible()
                            ? className.inward
                            : className.outward;
                    },
                    animationDirection: function (animation) {
                        var
                            direction
                        ;
                        animation = animation || settings.animation;
                        if (typeof animation === 'string') {
                            animation = animation.split(' ');
                            // search animation name for out/in class
                            $.each(animation, function (index, word) {
                                if (word === className.inward) {
                                    direction = className.inward;
                                } else if (word === className.outward) {
                                    direction = className.outward;
                                }
                            });
                        }
                        // return found direction
                        if (direction) {
                            return direction;
                        }

                        return false;
                    },
                    duration: function (duration) {
                        duration = duration || settings.duration;
                        if (duration === false) {
                            duration = $module.css('animation-duration') || 0;
                        }

                        return typeof duration === 'string'
                            ? (duration.indexOf('ms') > -1
                                ? parseFloat(duration)
                                : parseFloat(duration) * 1000)
                            : duration;
                    },
                    displayType: function (shouldDetermine) {
                        shouldDetermine = shouldDetermine !== undefined
                            ? shouldDetermine
                            : true;
                        if (settings.displayType) {
                            return settings.displayType;
                        }
                        if (shouldDetermine && $module.data(metadata.displayType) === undefined) {
                            var currentDisplay = $module.css('display');
                            if (currentDisplay === '' || currentDisplay === 'none') {
                                // create fake element to determine display state
                                module.can.transition(true);
                            } else {
                                module.save.displayType(currentDisplay);
                            }
                        }

                        return $module.data(metadata.displayType);
                    },
                    userStyle: function (style) {
                        style = style || $module.attr('style') || '';

                        return style.replace(/display.*?;/, '');
                    },
                    transitionExists: function (animation) {
                        return $.fn.transition.exists[animation];
                    },
                },

                can: {
                    transition: function (forced) {
                        var
                            animation         = settings.animation,
                            transitionExists  = module.get.transitionExists(animation),
                            displayType       = module.get.displayType(false),
                            elementClass,
                            tagName,
                            $clone,
                            currentAnimation,
                            inAnimation,
                            directionExists
                        ;
                        if (transitionExists === undefined || forced) {
                            module.verbose('Determining whether animation exists');
                            elementClass = $module.attr('class');
                            tagName = $module.prop('tagName');

                            $clone = $('<' + tagName + ' />').addClass(elementClass).insertAfter($module);
                            currentAnimation = $clone
                                .addClass(animation)
                                .removeClass(className.inward)
                                .removeClass(className.outward)
                                .addClass(className.animating)
                                .addClass(className.transition)
                                .css('animationName')
                            ;
                            $clone.detach().insertAfter($module);
                            inAnimation = $clone
                                .addClass(className.inward)
                                .css('animationName')
                            ;
                            if (!displayType) {
                                $clone.detach().insertAfter($module);
                                displayType = $clone
                                    .attr('class', elementClass)
                                    .removeAttr('style')
                                    .removeClass(className.hidden)
                                    .removeClass(className.visible)
                                    .show()
                                    .css('display')
                                ;
                                module.verbose('Determining final display state', displayType);
                                module.save.displayType(displayType);
                            }

                            $clone.remove();
                            if (currentAnimation !== inAnimation) {
                                module.debug('Direction exists for animation', animation);
                                directionExists = true;
                            } else if (currentAnimation === 'none' || !currentAnimation) {
                                module.debug('No animation defined in css', animation);

                                return;
                            } else {
                                module.debug('Static animation found', animation, displayType);
                                directionExists = false;
                            }
                            module.save.transitionExists(animation, directionExists);
                        }

                        return transitionExists !== undefined
                            ? transitionExists
                            : directionExists;
                    },
                    animate: function () {
                        // can transition does not return a value if animation does not exist
                        return module.can.transition() !== undefined;
                    },
                },

                is: {
                    animating: function () {
                        return $module.hasClass(className.animating);
                    },
                    inward: function () {
                        return $module.hasClass(className.inward);
                    },
                    outward: function () {
                        return $module.hasClass(className.outward);
                    },
                    looping: function () {
                        return $module.hasClass(className.looping);
                    },
                    occurring: function (animation) {
                        animation = animation || settings.animation;
                        animation = '.' + animation.replace(' ', '.');

                        return $module.filter(animation).length > 0;
                    },
                    visible: function () {
                        return $module.is(':visible');
                    },
                    hidden: function () {
                        return $module.css('visibility') === 'hidden';
                    },
                    supported: function () {
                        // keep method for backward compatibility until 2.10.0
                        return true;
                    },
                },

                hide: function () {
                    if (settings.onHide.call(element) === false) {
                        module.verbose('Hide callback returned false cancelling hide');

                        return false;
                    }
                    module.verbose('Hiding element');
                    if (module.is.animating()) {
                        module.reset();
                    }
                    element.blur(); // IE will trigger focus change if element is not blurred before hiding
                    module.remove.display();
                    module.remove.visible();
                    settings.onBeforeHide.call(element, module.hideNow);
                },

                hideNow: function () {
                    module.set.hidden();
                    module.force.hidden();
                    settings.onHidden.call(element);
                    settings.onComplete.call(element);
                },

                show: function (display) {
                    if (module.force.visible() && settings.onShow.call(element) !== false) {
                        module.verbose('Showing element', display);
                        module.remove.hidden();
                        settings.onBeforeShow.call(element, module.showNow);
                    }
                },

                showNow: function () {
                    module.set.visible();
                    settings.onVisible.call(element);
                    settings.onComplete.call(element);
                },

                toggle: function () {
                    if (module.is.visible()) {
                        module.hide();
                    } else {
                        module.show();
                    }
                },

                stop: function () {
                    module.debug('Stopping current animation');
                    $module.triggerHandler('animationend');
                },

                stopAll: function () {
                    module.debug('Stopping all animation');
                    module.remove.queueCallback();
                    $module.triggerHandler('animationend');
                },

                clear: {
                    queue: function () {
                        module.debug('Clearing animation queue');
                        module.remove.queueCallback();
                    },
                },

                enable: function () {
                    module.verbose('Starting animation');
                    $module.removeClass(className.disabled);
                },

                disable: function () {
                    module.debug('Stopping animation');
                    $module.addClass(className.disabled);
                },

                setting: function (name, value) {
                    module.debug('Changing setting', name, value);
                    if ($.isPlainObject(name)) {
                        $.extend(true, settings, name);
                    } else if (value !== undefined) {
                        if ($.isPlainObject(settings[name])) {
                            $.extend(true, settings[name], value);
                        } else {
                            settings[name] = value;
                        }
                    } else {
                        return settings[name];
                    }
                },
                internal: function (name, value) {
                    if ($.isPlainObject(name)) {
                        $.extend(true, module, name);
                    } else if (value !== undefined) {
                        module[name] = value;
                    } else {
                        return module[name];
                    }
                },
                debug: function () {
                    if (!settings.silent && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.debug.apply(console, arguments);
                        }
                    }
                },
                verbose: function () {
                    if (!settings.silent && settings.verbose && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.verbose.apply(console, arguments);
                        }
                    }
                },
                error: function () {
                    if (!settings.silent) {
                        module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                        module.error.apply(console, arguments);
                    }
                },
                performance: {
                    log: function (message) {
                        var
                            currentTime,
                            executionTime,
                            previousTime
                        ;
                        if (settings.performance) {
                            currentTime = Date.now();
                            previousTime = time || currentTime;
                            executionTime = currentTime - previousTime;
                            time = currentTime;
                            performance.push({
                                Name: message[0],
                                Arguments: [].slice.call(message, 1) || '',
                                Element: element,
                                'Execution Time': executionTime,
                            });
                        }
                        clearTimeout(module.performance.timer);
                        module.performance.timer = setTimeout(function () { module.performance.display(); }, 500);
                    },
                    display: function () {
                        var
                            title = settings.name + ':',
                            totalTime = 0
                        ;
                        time = false;
                        clearTimeout(module.performance.timer);
                        $.each(performance, function (index, data) {
                            totalTime += data['Execution Time'];
                        });
                        title += ' ' + totalTime + 'ms';
                        if ($allModules.length > 1) {
                            title += ' (' + $allModules.length + ')';
                        }
                        if (performance.length > 0) {
                            console.groupCollapsed(title);
                            if (console.table) {
                                console.table(performance);
                            } else {
                                $.each(performance, function (index, data) {
                                    console.log(data.Name + ': ' + data['Execution Time'] + 'ms');
                                });
                            }
                            console.groupEnd();
                        }
                        performance = [];
                    },
                },
                // modified for transition to return invoke success
                invoke: function (query, passedArguments, context) {
                    var
                        object = instance,
                        maxDepth,
                        found,
                        response
                    ;
                    passedArguments = passedArguments || queryArguments;
                    context = context || element;
                    if (typeof query === 'string' && object !== undefined) {
                        query = query.split(/[ .]/);
                        maxDepth = query.length - 1;
                        $.each(query, function (depth, value) {
                            var camelCaseValue = depth !== maxDepth
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query;
                            if ($.isPlainObject(object[camelCaseValue]) && (depth !== maxDepth)) {
                                object = object[camelCaseValue];
                            } else if (object[camelCaseValue] !== undefined) {
                                found = object[camelCaseValue];

                                return false;
                            } else if ($.isPlainObject(object[value]) && (depth !== maxDepth)) {
                                object = object[value];
                            } else if (object[value] !== undefined) {
                                found = object[value];

                                return false;
                            } else {
                                return false;
                            }
                        });
                    }
                    if (isFunction(found)) {
                        response = found.apply(context, passedArguments);
                    } else if (found !== undefined) {
                        response = found;
                    }

                    if (Array.isArray(returnedValue)) {
                        returnedValue.push(response);
                    } else if (returnedValue !== undefined) {
                        returnedValue = [returnedValue, response];
                    } else if (response !== undefined) {
                        returnedValue = response;
                    }

                    return found !== undefined
                        ? found
                        : false;
                },
            };
            module.initialize();
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };

    // Records if CSS transition is available
    $.fn.transition.exists = {};

    $.fn.transition.settings = {

        // module info
        name: 'Transition',

        // hide all output from this component regardless of other settings
        silent: false,

        // debug content outputted to console
        debug: false,

        // verbose debug output
        verbose: false,

        // performance data output
        performance: true,

        // event namespace
        namespace: 'transition',

        // delay between animations in group
        interval: 0,

        // whether group animations should be reversed
        reverse: 'auto',

        // animation callback event
        onStart: function () {},
        onComplete: function () {},
        onShow: function () {},
        onBeforeShow: function (callback) {
            callback.call(this);
        },
        onVisible: function () {},
        onHide: function () {},
        onHidden: function () {},
        onBeforeHide: function (callback) {
            callback.call(this);
        },

        // whether timeout should be used to ensure callback fires in cases animationend does not
        useFailSafe: true,

        // delay in ms for fail safe
        failSafeDelay: 100,

        // whether EXACT animation can occur twice in a row
        allowRepeats: false,

        // Override final display type on visible
        displayType: false,

        // animation duration
        animation: 'fade',
        duration: false,

        // new animations will occur after previous ones
        queue: true,

        // whether initially inline hidden objects should be skipped for transition
        skipInlineHidden: false,

        metadata: {
            displayType: 'display',
        },

        className: {
            animating: 'animating',
            disabled: 'disabled',
            hidden: 'hidden',
            inward: 'in',
            loading: 'loading',
            looping: 'looping',
            outward: 'out',
            transition: 'transition',
            visible: 'visible',
        },

        // possible errors
        error: {
            noAnimation: 'Element is no longer attached to DOM. Unable to animate.  Use silent setting to suppress this warning in production.',
        },

    };
})(jQuery, window, document);

/*!
 * # Fomantic-UI 2.9.3 - Visibility
 * https://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */

(function ($, window, document) {
    'use strict';

    function isFunction(obj) {
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }

    window = window !== undefined && window.Math === Math
        ? window
        : globalThis;

    $.fn.visibility = function (parameters) {
        var
            $allModules    = $(this),

            time           = Date.now(),
            performance    = [],

            query          = arguments[0],
            methodInvoked  = typeof query === 'string',
            queryArguments = [].slice.call(arguments, 1),
            contextCheck   = function (context, win) {
                var $context;
                if ([window, document].indexOf(context) >= 0) {
                    $context = $(context);
                } else {
                    $context = $(win.document).find(context);
                    if ($context.length === 0) {
                        $context = win.frameElement ? contextCheck(context, win.parent) : window;
                    }
                }

                return $context;
            },
            returnedValue,

            moduleCount    = $allModules.length,
            loadedCount    = 0
        ;

        $allModules.each(function () {
            var
                settings        = $.isPlainObject(parameters)
                    ? $.extend(true, {}, $.fn.visibility.settings, parameters)
                    : $.extend({}, $.fn.visibility.settings),

                className       = settings.className,
                namespace       = settings.namespace,
                error           = settings.error,
                metadata        = settings.metadata,

                eventNamespace  = '.' + namespace,
                moduleNamespace = 'module-' + namespace,

                $window         = $(window),

                $module         = $(this),
                $context        = contextCheck(settings.context, window),

                $placeholder,

                instance        = $module.data(moduleNamespace),

                element         = this,
                disabled        = false,

                contextObserver,
                observer,
                module
            ;

            module = {

                initialize: function () {
                    module.debug('Initializing', settings);

                    module.setup.cache();

                    if (module.should.trackChanges()) {
                        if (settings.type === 'image') {
                            module.setup.image();
                        }
                        if (settings.type === 'fixed') {
                            module.setup.fixed();
                        }

                        if (settings.observeChanges) {
                            module.observeChanges();
                        }
                        module.bind.events();
                    }

                    module.save.position();
                    if (!module.is.visible()) {
                        module.error(error.visible, $module);
                    }

                    if (settings.initialCheck) {
                        module.checkVisibility();
                    }
                    module.instantiate();
                },

                instantiate: function () {
                    module.debug('Storing instance', module);
                    $module
                        .data(moduleNamespace, module)
                    ;
                    instance = module;
                },

                destroy: function () {
                    module.verbose('Destroying previous module');
                    if (observer) {
                        observer.disconnect();
                    }
                    if (contextObserver) {
                        contextObserver.disconnect();
                    }
                    $window
                        .off('load' + eventNamespace, module.event.load)
                        .off('resize' + eventNamespace, module.event.resize)
                    ;
                    $context
                        .off('scroll' + eventNamespace, module.event.scroll)
                        .off('scrollchange' + eventNamespace, module.event.scrollchange)
                    ;
                    if (settings.type === 'fixed') {
                        module.resetFixed();
                        module.remove.placeholder();
                    }
                    $module
                        .off(eventNamespace)
                        .removeData(moduleNamespace)
                    ;
                },

                observeChanges: function () {
                    if ('MutationObserver' in window) {
                        contextObserver = new MutationObserver(module.event.contextChanged);
                        observer = new MutationObserver(module.event.changed);
                        contextObserver.observe(document, {
                            childList: true,
                            subtree: true,
                        });
                        observer.observe(element, {
                            childList: true,
                            subtree: true,
                        });
                        module.debug('Setting up mutation observer', observer);
                    }
                },

                bind: {
                    events: function () {
                        module.verbose('Binding visibility events to scroll and resize');
                        if (settings.refreshOnLoad) {
                            $window
                                .on('load' + eventNamespace, module.event.load)
                            ;
                        }
                        $window
                            .on('resize' + eventNamespace, module.event.resize)
                        ;
                        // pub/sub pattern
                        $context
                            .off('scroll' + eventNamespace)
                            .on('scroll' + eventNamespace, module.event.scroll)
                            .on('scrollchange' + eventNamespace, module.event.scrollchange)
                        ;
                    },
                },

                event: {
                    changed: function (mutations) {
                        module.verbose('DOM tree modified, updating visibility calculations');
                        module.timer = setTimeout(function () {
                            module.verbose('DOM tree modified, updating sticky menu');
                            module.refresh();
                        }, 100);
                    },
                    contextChanged: function (mutations) {
                        [].forEach.call(mutations, function (mutation) {
                            if (mutation.removedNodes) {
                                [].forEach.call(mutation.removedNodes, function (node) {
                                    if (node === element || $(node).find(element).length > 0) {
                                        module.debug('Element removed from DOM, tearing down events');
                                        module.destroy();
                                    }
                                });
                            }
                        });
                    },
                    resize: function () {
                        module.debug('Window resized');
                        if (settings.refreshOnResize) {
                            requestAnimationFrame(module.refresh);
                        }
                    },
                    load: function () {
                        module.debug('Page finished loading');
                        requestAnimationFrame(module.refresh);
                    },
                    // publishes scrollchange event on one scroll
                    scroll: function () {
                        if (settings.throttle) {
                            clearTimeout(module.timer);
                            module.timer = setTimeout(function () {
                                $context.triggerHandler('scrollchange' + eventNamespace, [$context.scrollTop()]);
                            }, settings.throttle);
                        } else {
                            requestAnimationFrame(function () {
                                $context.triggerHandler('scrollchange' + eventNamespace, [$context.scrollTop()]);
                            });
                        }
                    },
                    // subscribes to scrollchange
                    scrollchange: function (event, scrollPosition) {
                        module.checkVisibility(scrollPosition);
                    },
                },

                precache: function (images, callback) {
                    if (!Array.isArray(images)) {
                        images = [images];
                    }
                    var
                        imagesLength  = images.length,
                        loadedCounter = 0,
                        cache         = [],
                        cacheImage    = document.createElement('img'),
                        handleLoad    = function () {
                            loadedCounter++;
                            if (loadedCounter >= images.length) {
                                if (isFunction(callback)) {
                                    callback();
                                }
                            }
                        }
                    ;
                    while (imagesLength--) {
                        cacheImage = document.createElement('img');
                        cacheImage.addEventListener('load', handleLoad);
                        cacheImage.addEventListener('error', handleLoad);
                        cacheImage.src = images[imagesLength];
                        cache.push(cacheImage);
                    }
                },

                enableCallbacks: function () {
                    module.debug('Allowing callbacks to occur');
                    disabled = false;
                },

                disableCallbacks: function () {
                    module.debug('Disabling all callbacks temporarily');
                    disabled = true;
                },

                should: {
                    trackChanges: function () {
                        if (methodInvoked) {
                            module.debug('One time query, no need to bind events');

                            return false;
                        }
                        module.debug('Callbacks being attached');

                        return true;
                    },
                },

                setup: {
                    cache: function () {
                        module.cache = {
                            occurred: {},
                            screen: {},
                            element: {},
                        };
                    },
                    image: function () {
                        var
                            src = $module.data(metadata.src)
                        ;
                        if (src) {
                            module.verbose('Lazy loading image', src);
                            settings.once = true;
                            settings.observeChanges = false;

                            // show when top visible
                            settings.onOnScreen = function () {
                                module.debug('Image on screen', element);
                                module.precache(src, function () {
                                    module.set.image(src, function () {
                                        loadedCount++;
                                        if (loadedCount === moduleCount) {
                                            settings.onAllLoaded.call(this);
                                        }
                                        settings.onLoad.call(this);
                                    });
                                });
                            };
                        }
                    },
                    fixed: function () {
                        module.debug('Setting up fixed');
                        settings.once = false;
                        settings.observeChanges = false;
                        settings.initialCheck = true;
                        settings.refreshOnLoad = true;
                        if (!parameters.transition) {
                            settings.transition = false;
                        }
                        module.create.placeholder();
                        module.debug('Added placeholder', $placeholder);
                        settings.onTopPassed = function () {
                            module.debug('Element passed, adding fixed position', $module);
                            module.show.placeholder();
                            module.set.fixed();
                            if (settings.transition) {
                                if ($.fn.transition !== undefined) {
                                    $module.transition(settings.transition, settings.duration);
                                }
                            }
                        };
                        settings.onTopPassedReverse = function () {
                            module.debug('Element returned to position, removing fixed', $module);
                            module.hide.placeholder();
                            module.remove.fixed();
                        };
                    },
                },

                create: {
                    placeholder: function () {
                        module.verbose('Creating fixed position placeholder');
                        $placeholder = $module
                            .clone(false)
                            .css('display', 'none')
                            .addClass(className.placeholder)
                            .insertAfter($module)
                        ;
                    },
                },

                show: {
                    placeholder: function () {
                        module.verbose('Showing placeholder');
                        $placeholder
                            .css('display', 'block')
                            .css('visibility', 'hidden')
                        ;
                    },
                },
                hide: {
                    placeholder: function () {
                        module.verbose('Hiding placeholder');
                        $placeholder
                            .css('display', 'none')
                            .css('visibility', '')
                        ;
                    },
                },

                set: {
                    fixed: function () {
                        module.verbose('Setting element to fixed position');
                        $module
                            .addClass(className.fixed)
                            .css({
                                position: 'fixed',
                                top: settings.offset + 'px',
                                left: 'auto',
                                zIndex: settings.zIndex,
                            })
                        ;
                        settings.onFixed.call(element);
                    },
                    image: function (src, callback) {
                        $module
                            .attr('src', src)
                        ;
                        if (settings.transition) {
                            if ($.fn.transition !== undefined) {
                                if ($module.hasClass(className.visible)) {
                                    module.debug('Transition already occurred on this image, skipping animation');

                                    return;
                                }
                                $module.transition(settings.transition, settings.duration, callback);
                            } else {
                                $module.fadeIn(settings.duration, callback);
                            }
                        } else {
                            $module.show();
                        }
                    },
                },

                is: {
                    onScreen: function () {
                        var
                            calculations   = module.get.elementCalculations()
                        ;

                        return calculations.onScreen;
                    },
                    offScreen: function () {
                        var
                            calculations   = module.get.elementCalculations()
                        ;

                        return calculations.offScreen;
                    },
                    visible: function () {
                        if (module.cache && module.cache.element) {
                            return !(module.cache.element.width === 0 && module.cache.element.offset.top === 0);
                        }

                        return false;
                    },
                    verticallyScrollableContext: function () {
                        var
                            overflowY = $context[0] !== window
                                ? $context.css('overflow-y')
                                : false
                        ;

                        return overflowY === 'auto' || overflowY === 'scroll';
                    },
                    horizontallyScrollableContext: function () {
                        var
                            overflowX = $context[0] !== window
                                ? $context.css('overflow-x')
                                : false
                        ;

                        return overflowX === 'auto' || overflowX === 'scroll';
                    },
                },

                refresh: function () {
                    module.debug('Refreshing constants (width/height)');
                    if (settings.type === 'fixed') {
                        module.resetFixed();
                    }
                    module.reset();
                    module.save.position();
                    if (settings.checkOnRefresh) {
                        module.checkVisibility();
                    }
                    settings.onRefresh.call(element);
                },

                resetFixed: function () {
                    module.remove.fixed();
                    module.remove.occurred();
                },

                reset: function () {
                    module.verbose('Resetting all cached values');
                    if ($.isPlainObject(module.cache)) {
                        module.cache.screen = {};
                        module.cache.element = {};
                    }
                },

                checkVisibility: function (scroll) {
                    module.verbose('Checking visibility of element', module.cache.element);

                    if (!disabled && module.is.visible()) {
                        // save scroll position
                        module.save.scroll(scroll);

                        // update calculations derived from scroll
                        module.save.calculations();

                        // percentage
                        module.passed();

                        // reverse (must be first)
                        module.passingReverse();
                        module.topVisibleReverse();
                        module.bottomVisibleReverse();
                        module.topPassedReverse();
                        module.bottomPassedReverse();

                        // one time
                        module.onScreen();
                        module.offScreen();
                        module.passing();
                        module.topVisible();
                        module.bottomVisible();
                        module.topPassed();
                        module.bottomPassed();

                        // on update callback
                        if (settings.onUpdate) {
                            settings.onUpdate.call(element, module.get.elementCalculations());
                        }
                    }
                },

                passed: function (amount, newCallback) {
                    var
                        calculations   = module.get.elementCalculations()
                    ;
                    // assign callback
                    if (amount && newCallback) {
                        settings.onPassed[amount] = newCallback;
                    } else if (amount !== undefined) {
                        return module.get.pixelsPassed(amount) > calculations.pixelsPassed;
                    } else if (calculations.passing) {
                        $.each(settings.onPassed, function (amount, callback) {
                            if (calculations.bottomVisible || calculations.pixelsPassed > module.get.pixelsPassed(amount)) {
                                module.execute(callback, amount);
                            } else if (!settings.once) {
                                module.remove.occurred(callback);
                            }
                        });
                    }
                },

                onScreen: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onOnScreen,
                        callbackName = 'onScreen'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for onScreen', newCallback);
                        settings.onOnScreen = newCallback;
                    }
                    if (calculations.onScreen) {
                        module.execute(callback, callbackName);
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback !== undefined) {
                        return calculations.onOnScreen;
                    }
                },

                offScreen: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onOffScreen,
                        callbackName = 'offScreen'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for offScreen', newCallback);
                        settings.onOffScreen = newCallback;
                    }
                    if (calculations.offScreen) {
                        module.execute(callback, callbackName);
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback !== undefined) {
                        return calculations.onOffScreen;
                    }
                },

                passing: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onPassing,
                        callbackName = 'passing'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for passing', newCallback);
                        settings.onPassing = newCallback;
                    }
                    if (calculations.passing) {
                        module.execute(callback, callbackName);
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback !== undefined) {
                        return calculations.passing;
                    }
                },

                topVisible: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onTopVisible,
                        callbackName = 'topVisible'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for top visible', newCallback);
                        settings.onTopVisible = newCallback;
                    }
                    if (calculations.topVisible) {
                        module.execute(callback, callbackName);
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback === undefined) {
                        return calculations.topVisible;
                    }
                },

                bottomVisible: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onBottomVisible,
                        callbackName = 'bottomVisible'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for bottom visible', newCallback);
                        settings.onBottomVisible = newCallback;
                    }
                    if (calculations.bottomVisible) {
                        module.execute(callback, callbackName);
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback === undefined) {
                        return calculations.bottomVisible;
                    }
                },

                topPassed: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onTopPassed,
                        callbackName = 'topPassed'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for top passed', newCallback);
                        settings.onTopPassed = newCallback;
                    }
                    if (calculations.topPassed) {
                        module.execute(callback, callbackName);
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback === undefined) {
                        return calculations.topPassed;
                    }
                },

                bottomPassed: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onBottomPassed,
                        callbackName = 'bottomPassed'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for bottom passed', newCallback);
                        settings.onBottomPassed = newCallback;
                    }
                    if (calculations.bottomPassed) {
                        module.execute(callback, callbackName);
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback === undefined) {
                        return calculations.bottomPassed;
                    }
                },

                passingReverse: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onPassingReverse,
                        callbackName = 'passingReverse'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for passing reverse', newCallback);
                        settings.onPassingReverse = newCallback;
                    }
                    if (!calculations.passing) {
                        if (module.get.occurred('passing')) {
                            module.execute(callback, callbackName);
                        }
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback !== undefined) {
                        return !calculations.passing;
                    }
                },

                topVisibleReverse: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onTopVisibleReverse,
                        callbackName = 'topVisibleReverse'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for top visible reverse', newCallback);
                        settings.onTopVisibleReverse = newCallback;
                    }
                    if (!calculations.topVisible) {
                        if (module.get.occurred('topVisible')) {
                            module.execute(callback, callbackName);
                        }
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback === undefined) {
                        return !calculations.topVisible;
                    }
                },

                bottomVisibleReverse: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onBottomVisibleReverse,
                        callbackName = 'bottomVisibleReverse'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for bottom visible reverse', newCallback);
                        settings.onBottomVisibleReverse = newCallback;
                    }
                    if (!calculations.bottomVisible) {
                        if (module.get.occurred('bottomVisible')) {
                            module.execute(callback, callbackName);
                        }
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback === undefined) {
                        return !calculations.bottomVisible;
                    }
                },

                topPassedReverse: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onTopPassedReverse,
                        callbackName = 'topPassedReverse'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for top passed reverse', newCallback);
                        settings.onTopPassedReverse = newCallback;
                    }
                    if (!calculations.topPassed) {
                        if (module.get.occurred('topPassed')) {
                            module.execute(callback, callbackName);
                        }
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback === undefined) {
                        return !calculations.onTopPassed;
                    }
                },

                bottomPassedReverse: function (newCallback) {
                    var
                        calculations = module.get.elementCalculations(),
                        callback     = newCallback || settings.onBottomPassedReverse,
                        callbackName = 'bottomPassedReverse'
                    ;
                    if (newCallback) {
                        module.debug('Adding callback for bottom passed reverse', newCallback);
                        settings.onBottomPassedReverse = newCallback;
                    }
                    if (!calculations.bottomPassed) {
                        if (module.get.occurred('bottomPassed')) {
                            module.execute(callback, callbackName);
                        }
                    } else if (!settings.once) {
                        module.remove.occurred(callbackName);
                    }
                    if (newCallback === undefined) {
                        return !calculations.bottomPassed;
                    }
                },

                execute: function (callback, callbackName) {
                    var
                        calculations = module.get.elementCalculations(),
                        screen       = module.get.screenCalculations()
                    ;
                    callback = callback || false;
                    if (callback) {
                        if (settings.continuous) {
                            module.debug('Callback being called continuously', callbackName, calculations);
                            callback.call(element, calculations, screen);
                        } else if (!module.get.occurred(callbackName)) {
                            module.debug('Conditions met', callbackName, calculations);
                            callback.call(element, calculations, screen);
                        }
                    }
                    module.save.occurred(callbackName);
                },

                remove: {
                    fixed: function () {
                        module.debug('Removing fixed position');
                        $module
                            .removeClass(className.fixed)
                            .css({
                                position: '',
                                top: '',
                                left: '',
                                zIndex: '',
                            })
                        ;
                        settings.onUnfixed.call(element);
                    },
                    placeholder: function () {
                        module.debug('Removing placeholder content');
                        if ($placeholder) {
                            $placeholder.remove();
                        }
                    },
                    occurred: function (callback) {
                        if (callback) {
                            var
                                occurred = module.cache.occurred
                            ;
                            if (occurred[callback] !== undefined && occurred[callback] === true) {
                                module.debug('Callback can now be called again', callback);
                                module.cache.occurred[callback] = false;
                            }
                        } else {
                            module.cache.occurred = {};
                        }
                    },
                },

                save: {
                    calculations: function () {
                        module.verbose('Saving all calculations necessary to determine positioning');
                        module.save.direction();
                        module.save.screenCalculations();
                        module.save.elementCalculations();
                    },
                    occurred: function (callback) {
                        if (callback) {
                            if (module.cache.occurred[callback] === undefined || (module.cache.occurred[callback] !== true)) {
                                module.verbose('Saving callback occurred', callback);
                                module.cache.occurred[callback] = true;
                            }
                        }
                    },
                    scroll: function (scrollPosition) {
                        scrollPosition = scrollPosition + settings.offset || $context.scrollTop() + settings.offset;
                        module.cache.scroll = scrollPosition;
                    },
                    direction: function () {
                        var
                            scroll     = module.get.scroll(),
                            lastScroll = module.get.lastScroll(),
                            direction
                        ;
                        if (scroll > lastScroll && lastScroll) {
                            direction = 'down';
                        } else if (scroll < lastScroll && lastScroll) {
                            direction = 'up';
                        } else {
                            direction = 'static';
                        }
                        module.cache.direction = direction;

                        return module.cache.direction;
                    },
                    elementPosition: function () {
                        var
                            element = module.cache.element,
                            screen  = module.get.screenSize()
                        ;
                        module.verbose('Saving element position');
                        // (quicker than $.extend)
                        element.fits = element.height < screen.height;
                        element.offset = $module.offset();
                        element.width = $module.outerWidth();
                        element.height = $module.outerHeight();
                        // compensate for scroll in context
                        if (module.is.verticallyScrollableContext()) {
                            element.offset.top += $context.scrollTop() - $context.offset().top;
                        }
                        if (module.is.horizontallyScrollableContext()) {
                            element.offset.left += $context.scrollLeft() - $context.offset().left;
                        }
                        // store
                        module.cache.element = element;

                        return element;
                    },
                    elementCalculations: function () {
                        var
                            screen     = module.get.screenCalculations(),
                            element    = module.get.elementPosition()
                        ;
                        // offset
                        if (settings.includeMargin) {
                            element.margin = {};
                            element.margin.top = parseInt($module.css('margin-top'), 10);
                            element.margin.bottom = parseInt($module.css('margin-bottom'), 10);
                            element.top = element.offset.top - element.margin.top;
                            element.bottom = element.offset.top + element.height + element.margin.bottom;
                        } else {
                            element.top = element.offset.top;
                            element.bottom = element.offset.top + element.height;
                        }

                        // visibility
                        element.topPassed = screen.top >= element.top;
                        element.bottomPassed = screen.top >= element.bottom;
                        element.topVisible = (screen.bottom >= element.top) && !element.topPassed;
                        element.bottomVisible = (screen.bottom >= element.bottom) && !element.bottomPassed;
                        element.pixelsPassed = 0;
                        element.percentagePassed = 0;

                        // meta calculations
                        element.onScreen = (element.topVisible || element.passing) && !element.bottomPassed;
                        element.passing = element.topPassed && !element.bottomPassed;
                        element.offScreen = !element.onScreen;

                        // passing calculations
                        if (element.passing) {
                            element.pixelsPassed = screen.top - element.top;
                            element.percentagePassed = (screen.top - element.top) / element.height;
                        }
                        module.cache.element = element;
                        module.verbose('Updated element calculations', element);

                        return element;
                    },
                    screenCalculations: function () {
                        var
                            scroll = module.get.scroll()
                        ;
                        module.save.direction();
                        module.cache.screen.top = scroll;
                        module.cache.screen.bottom = scroll + module.cache.screen.height;

                        return module.cache.screen;
                    },
                    screenSize: function () {
                        module.verbose('Saving window position');
                        module.cache.screen = {
                            height: $context.height(),
                        };
                    },
                    position: function () {
                        module.save.screenSize();
                        module.save.elementPosition();
                    },
                },

                get: {
                    pixelsPassed: function (amount) {
                        var
                            element = module.get.elementCalculations()
                        ;
                        if (amount.search('%') > -1) {
                            return element.height * (parseInt(amount, 10) / 100);
                        }

                        return parseInt(amount, 10);
                    },
                    occurred: function (callback) {
                        return module.cache.occurred !== undefined
                            ? module.cache.occurred[callback] || false
                            : false;
                    },
                    direction: function () {
                        if (module.cache.direction === undefined) {
                            module.save.direction();
                        }

                        return module.cache.direction;
                    },
                    elementPosition: function () {
                        if (module.cache.element === undefined) {
                            module.save.elementPosition();
                        }

                        return module.cache.element;
                    },
                    elementCalculations: function () {
                        if (module.cache.element === undefined) {
                            module.save.elementCalculations();
                        }

                        return module.cache.element;
                    },
                    screenCalculations: function () {
                        if (module.cache.screen === undefined) {
                            module.save.screenCalculations();
                        }

                        return module.cache.screen;
                    },
                    screenSize: function () {
                        if (module.cache.screen === undefined) {
                            module.save.screenSize();
                        }

                        return module.cache.screen;
                    },
                    scroll: function () {
                        if (module.cache.scroll === undefined) {
                            module.save.scroll();
                        }

                        return module.cache.scroll;
                    },
                    lastScroll: function () {
                        if (module.cache.screen === undefined) {
                            module.debug('First scroll event, no last scroll could be found');

                            return false;
                        }

                        return module.cache.screen.top;
                    },
                },

                setting: function (name, value) {
                    if ($.isPlainObject(name)) {
                        $.extend(true, settings, name);
                    } else if (value !== undefined) {
                        settings[name] = value;
                    } else {
                        return settings[name];
                    }
                },
                internal: function (name, value) {
                    if ($.isPlainObject(name)) {
                        $.extend(true, module, name);
                    } else if (value !== undefined) {
                        module[name] = value;
                    } else {
                        return module[name];
                    }
                },
                debug: function () {
                    if (!settings.silent && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.debug.apply(console, arguments);
                        }
                    }
                },
                verbose: function () {
                    if (!settings.silent && settings.verbose && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.verbose.apply(console, arguments);
                        }
                    }
                },
                error: function () {
                    if (!settings.silent) {
                        module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                        module.error.apply(console, arguments);
                    }
                },
                performance: {
                    log: function (message) {
                        var
                            currentTime,
                            executionTime,
                            previousTime
                        ;
                        if (settings.performance) {
                            currentTime = Date.now();
                            previousTime = time || currentTime;
                            executionTime = currentTime - previousTime;
                            time = currentTime;
                            performance.push({
                                Name: message[0],
                                Arguments: [].slice.call(message, 1) || '',
                                Element: element,
                                'Execution Time': executionTime,
                            });
                        }
                        clearTimeout(module.performance.timer);
                        module.performance.timer = setTimeout(function () { module.performance.display(); }, 500);
                    },
                    display: function () {
                        var
                            title = settings.name + ':',
                            totalTime = 0
                        ;
                        time = false;
                        clearTimeout(module.performance.timer);
                        $.each(performance, function (index, data) {
                            totalTime += data['Execution Time'];
                        });
                        title += ' ' + totalTime + 'ms';
                        if (performance.length > 0) {
                            console.groupCollapsed(title);
                            if (console.table) {
                                console.table(performance);
                            } else {
                                $.each(performance, function (index, data) {
                                    console.log(data.Name + ': ' + data['Execution Time'] + 'ms');
                                });
                            }
                            console.groupEnd();
                        }
                        performance = [];
                    },
                },
                invoke: function (query, passedArguments, context) {
                    var
                        object = instance,
                        maxDepth,
                        found,
                        response
                    ;
                    passedArguments = passedArguments || queryArguments;
                    context = context || element;
                    if (typeof query === 'string' && object !== undefined) {
                        query = query.split(/[ .]/);
                        maxDepth = query.length - 1;
                        $.each(query, function (depth, value) {
                            var camelCaseValue = depth !== maxDepth
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query
                            ;
                            if ($.isPlainObject(object[camelCaseValue]) && (depth !== maxDepth)) {
                                object = object[camelCaseValue];
                            } else if (object[camelCaseValue] !== undefined) {
                                found = object[camelCaseValue];

                                return false;
                            } else if ($.isPlainObject(object[value]) && (depth !== maxDepth)) {
                                object = object[value];
                            } else if (object[value] !== undefined) {
                                found = object[value];

                                return false;
                            } else {
                                module.error(error.method, query);

                                return false;
                            }
                        });
                    }
                    if (isFunction(found)) {
                        response = found.apply(context, passedArguments);
                    } else if (found !== undefined) {
                        response = found;
                    }
                    if (Array.isArray(returnedValue)) {
                        returnedValue.push(response);
                    } else if (returnedValue !== undefined) {
                        returnedValue = [returnedValue, response];
                    } else if (response !== undefined) {
                        returnedValue = response;
                    }

                    return found;
                },
            };

            if (methodInvoked) {
                if (instance === undefined) {
                    module.initialize();
                }
                instance.save.scroll();
                instance.save.calculations();
                module.invoke(query);
            } else {
                if (instance !== undefined) {
                    instance.invoke('destroy');
                }
                module.initialize();
            }
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };

    $.fn.visibility.settings = {

        name: 'Visibility',
        namespace: 'visibility',

        debug: false,
        verbose: false,
        performance: true,

        // whether to use mutation observers to follow changes
        observeChanges: true,

        // check position immediately on init
        initialCheck: true,

        // whether to refresh calculations after all page images load
        refreshOnLoad: true,

        // whether to refresh calculations after page resize event
        refreshOnResize: true,

        // should call callbacks on refresh event (resize, etc)
        checkOnRefresh: true,

        // callback should only occur one time
        once: true,

        // callback should fire continuously when evaluates to true
        continuous: false,

        // offset to use with scroll top
        offset: 0,

        // whether to include margin in elements position
        includeMargin: false,

        // scroll context for visibility checks
        context: window,

        // visibility check delay in ms (defaults to animationFrame)
        throttle: false,

        // special visibility type (image, fixed)
        type: false,

        // z-index to use with visibility 'fixed'
        zIndex: '10',

        // image only animation settings
        transition: 'fade in',
        duration: 1000,

        // array of callbacks for percentage
        onPassed: {},

        // standard callbacks
        onOnScreen: false,
        onOffScreen: false,
        onPassing: false,
        onTopVisible: false,
        onBottomVisible: false,
        onTopPassed: false,
        onBottomPassed: false,

        // reverse callbacks
        onPassingReverse: false,
        onTopVisibleReverse: false,
        onBottomVisibleReverse: false,
        onTopPassedReverse: false,
        onBottomPassedReverse: false,

        // special callbacks for image
        onLoad: function () {},
        onAllLoaded: function () {},

        // special callbacks for fixed position
        onFixed: function () {},
        onUnfixed: function () {},

        // utility callbacks
        onUpdate: false, // disabled by default for performance
        onRefresh: function () {},

        metadata: {
            src: 'src',
        },

        className: {
            fixed: 'fixed',
            placeholder: 'constraint',
            visible: 'visible',
        },

        error: {
            method: 'The method you called is not defined.',
            visible: 'Element is hidden, you must call refresh after element becomes visible',
        },

    };
})(jQuery, window, document);
