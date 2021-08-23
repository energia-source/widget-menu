(function (window) {

    class Cluster {
        constructor(menu, id) {
            this.menu = menu;
            this.id = id;

            this.elements = {};
        }

        getMenu() {
            return this.menu;
        }
        getID() {
            return this.id;
        }
        setLabel(text) {
            let label = this.getLabel(), node = document.createTextNode(text);
            label.innerText = '';
            label.appendChild(node);
            return this;
        }
        getLabel() {
            if (this.elements.hasOwnProperty('label')) return this.elements.label;
            this.elements.label = document.createElement('label');
            this.elements.label.className = 'label';
            return this.elements.label;
        }
        getLabelWrapper() {
            if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
            let label = this.getLabel();
            this.elements.wrapper = document.createElement('div');
            this.elements.wrapper.className = 'wrapper';
            this.elements.wrapper.appendChild(label);
            return this.elements.wrapper;
        }
        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            let wrapper = this.getLabelWrapper();
            this.elements.container = document.createElement('div');
            this.elements.container.className = 'cluster';
            this.elements.container.appendChild(wrapper);
            return this.elements.container;
        }
        out() {
            return this.getContainer();
        }
    }

    class Item {

        static icon() {
            return 'healing';
        }
        static default() {
            return 'developer\\widget\\menu\\item\\default';
        }

        constructor(menu) {
            this.menu = menu;
            this.elements = {};
        }

        getMenu() {
            return this.menu;
        }
        setHref(href) {
            this.getContainer().setAttribute('href', href);
            return this;
        }
        getIcon() {
            if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
            let icon = this.constructor.icon();
            this.elements.icon = Menu.getIcon(icon);
            return this.elements.icon;
        }
        setIcon(data) {
            this.elements.icon = Menu.getIcon(data);
            return this;
        }
        getLabel() {
            if (this.elements.hasOwnProperty('label')) return this.elements.label;
            let node = document.createTextNode(this.constructor.default());
            this.elements.label = document.createElement('label');
            this.elements.label.className = 'label';
            this.elements.label.appendChild(node);
            return this.elements.label;
        }
        setLabel(text) {
            let label = this.getLabel(), node = document.createTextNode(text);
            label.innerText = '';
            label.appendChild(node);
            return this;
        }
        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            let icon = this.getIcon(), label = this.getLabel();
            this.elements.container = document.createElement('a');
            this.elements.container.className = 'waves-effect ellipsis';
            this.elements.container.appendChild(icon);
            this.elements.container.appendChild(label);
            return this.elements.container;
        }
        out() {
            return this.getContainer();
        }
    }

    class Preloader {

        constructor(menu) {
            this.menu = menu;
            this.elements = {};
        }

        getMenu() {
            return this.menu;
        }
        getPreloader() {
            if (this.elements.hasOwnProperty('preloader')) return this.elements.preloader;
            this.elements.preloader = document.createElement('div');
            this.elements.preloader.className = 'preloader';
            return this.elements.preloader;
        }
        getSpinner() {
            if (this.elements.hasOwnProperty('spinner')) return this.elements.spinner;
            this.elements.spinner = document.createElement('div');
            this.elements.spinner.className = 'spinner';

            for (let item = 0; item < 3; item++) {
                let bounce = document.createElement('div');
                bounce.className = 'bounce-' + item;
                this.elements.spinner.appendChild(bounce);
            }

            return this.elements.spinner;
        }
        showSpinner() {
            let spinner = this.getSpinner();
            this.getPreloader().appendChild(spinner);
            return this;
        }
        hideSpinner() {
            let spinner = this.getSpinner();
            Menu.removeElementDOM(spinner);
            return this;
        }
        show() {
            let preloader = this.getPreloader();
            this.getMenu().getModules().appendChild(preloader);
            return this;
        }
        hide() {
            let preloader = this.getPreloader();
            Menu.removeElementDOM(preloader);
            return this;
        }
        status() {
            return this.getPreloader().parentNode !== null;
        }
    }

    class Menu {

        static handle() {
            return 'data-handle-event';
        }
        static regex() {
            return '^data\:';
        }
        static storage() {
            return 'widget' + '/' + 'menu';
        }

        constructor() {
            this.elements = {};
            this.elements.list = [];
            this.elements.clusters = {};
            this.elements.preloader = new Preloader(this);

            this.xhr = {
                url: null,
                construct: new XMLHttpRequest(),
                navigator: null,
                event: {}
            };
            this.xhr.construct.onreadystatechange = this.result.bind(this);
        }

        getList() {
            return this.elements.list;
        }
        getClusters() {
            return this.elements.clusters;
        }
        getPreloader() {
            return this.elements.preloader;
        }
        getXHR() {
            return this.xhr.construct;
        }
        setRequestUrl(url) {
            this.xhr.url = url;
            return this;
        }
        getRequestUrl() {
            return this.xhr.url;
        }
        setCallback(func) {
            this.xhr.event.callback = func;
            return this;
        }
        getCallback() {
            if (this.xhr.event.hasOwnProperty('callback')) return this.xhr.event.callback;
            return null;
        }
        setNavigator(navigator) {
            this.xhr.navigator = navigator;
            return this;
        }
        getNavigator() {
            return this.xhr.navigator;
        }
        setNearElement(element) {
            this.elements.near = element;
            return this;
        }
        getNearElement() {
            return this.elements.near;
        }
        setHeader(object) {
            if (this.elements.hasOwnProperty('header')) this.constructor.removeElementDOM(this.elements.header);
            let node = document.createTextNode(object.label);
            this.elements.header = document.createElement('div');
            this.elements.header.className = 'header ellipsis';

            if (object.hasOwnProperty('icon')) {
                let icon = this.constructor.getIcon(object.icon);
                this.elements.header.appendChild(icon);
            }

            this.elements.header.appendChild(node);
            this.getContainer().appendChild(this.elements.header);
            this.getModules().classList.add('addheader');

            return this;
        }
        getHeader() {
            if (this.elements.hasOwnProperty('header')) return this.elements.header;
            return null;
        }
        getModules() {
            if (this.elements.hasOwnProperty('modules')) return this.elements.modules;
            this.elements.modules = document.createElement('div');
            this.elements.modules.className = 'modules';
            this.elements.modules.setAttribute(this.constructor.handle(), ':hover');
            this.elements.modules.addEventListener('mouseenter', this, false);
            this.elements.modules.addEventListener('mouseleave', this, false);
            return this.elements.modules;
        }
        getFooter() {
            if (this.elements.hasOwnProperty('footer')) return this.elements.footer;
            let toggle = this.getToggle();
            this.elements.footer = document.createElement('div');
            this.elements.footer.className = 'footer ellipsis';
            this.elements.footer.appendChild(toggle);
            return this.elements.footer;
        }
        getToggle() {
            if (this.elements.hasOwnProperty('toggle')) return this.elements.toggle;
            let icon = this.constructor.getIcon('keyboard_capslock');
            this.elements.toggle = document.createElement('a');
            this.elements.toggle.appendChild(icon);
            this.elements.toggle.setAttribute(this.constructor.handle(), ':toggle');
            this.elements.toggle.addEventListener('click', this, false);
            return this.elements.toggle;
        }
        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            let modules = this.getModules(), footer = this.getFooter();
            this.elements.container = document.createElement('nav');
            this.elements.container.id = 'menu';
            this.elements.container.appendChild(modules);
            this.elements.container.appendChild(footer);

            let closed = localStorage.getItem(this.constructor.storage());
            if (closed === 'crush') this.crush();

            return this.elements.container;
        }
        pushModules(items) {
            let grouping = this.getClusters();
            for (let item = 0; item < items.length; item++) {
                if (!items[item].hasOwnProperty('cluster')
                    || typeof items[item].cluster !== 'string'
                    || 0 === items[item].cluster.length
                    || grouping.hasOwnProperty(items[item].cluster)) continue;

                grouping[items[item].cluster] = new Cluster(this, items[item].cluster);
                grouping[items[item].cluster].setLabel(items[item].cluster);
                this.getModules().appendChild(grouping[items[item].cluster].out());
            }

            let list = this.getList();
            for (let item = 0; item < items.length; item++) {
                if (!items[item].hasOwnProperty('href')) continue;

                let attach = !items[item].hasOwnProperty('cluster') || !grouping.hasOwnProperty(items[item].cluster) ? this.getModules() : grouping[items[item].cluster].out();
                let element = new Item(this);

                if (typeof items[item].icon === 'string') element.setIcon(items[item].icon);
                if (typeof items[item].label === 'string') element.setLabel(items[item].label);

                element.setHref(items[item].href);
                attach.appendChild(element.out());
                list.push(element);
            }
            return this;
        }
        out() {
            return this.getContainer();
        }
        request(callback) {
            this.setCallback(callback);
            this.getPreloader().showSpinner().show();
            let xhr = this.getXHR(), url = this.getRequestUrl();
            xhr.open('POST', url, !0);
            let navigator = this.getNavigator(), form_data = new FormData();
            form_data.append('navigator', navigator);
            xhr.send(form_data);
        }
        result() {
            let xhr = this.getXHR();

            if (XMLHttpRequest.DONE !== xhr.readyState
                || 200 !== xhr.status) return;

            this.getPreloader().hide();

            let json;
            try {
                json = JSON.parse(xhr.responseText);
            }
            catch (message) {
                json = {
                    'status': false,
                    'notice': message
                };
            }

            let callback = this.getCallback();
            if (typeof callback === 'function') callback.call(this, json);
        }
        handleEvent(event) {
            let attribute = this.constructor.closestAttribute(event.target, this.constructor.handle());
            if (attribute === null) return;

            let attribute_split = attribute.split(/\s+/);
            for (let item = 0; item < attribute_split.length; item++) {
                let execute = attribute_split[item].split(String.fromCharCode(58));
                if (execute.length !== 2) break;
                if (execute[0] === event.type || 0 === execute[0].length) {
                    if (typeof this[execute[1]] !== 'function') continue;

                    this[execute[1]].call(this, event);
                }
            }
        }
        open() {
            let near = this.getNearElement();
            if (near instanceof HTMLElement) near.classList.remove('menu-crush');
            localStorage.removeItem(this.constructor.storage(), 'crush');
            this.getContainer().classList.remove('crush');
        }
        crush() {
            let near = this.getNearElement();
            if (near instanceof HTMLElement) near.classList.add('menu-crush');
            localStorage.setItem(this.constructor.storage(), 'crush');
            this.getContainer().classList.add('crush');
        }
        status() {
            return this.getContainer().classList.contains('crush');
        }
        toggle() {
            let method = this.status() ? 'open' : 'crush';
            this[method].call(this);
        }
        hover() {
            let status = this.status();
            if (status === true) this.getContainer().classList.toggle('preview');
        }
        static closestAttribute(target, attribute, html) {
            if (typeof attribute === 'undefined'
                || !attribute.length) return null;

            let result = null, element = target;

            do {
                let tagname = element.tagName.toLowerCase();
                if (tagname === 'body') return null;

                result = element.getAttribute(attribute);
                if (result !== null) {
                    result = result.toString();
                    if (result.length) break;
                }

                element = element.parentNode;
            } while (element !== null
                || typeof element === 'undefined');

            if (typeof html === 'undefined'
                || html !== true) return result;

            return element;
        }
        static removeElementDOM(element) {
            let parent = element === null || typeof element === 'undefined' || typeof element.parentNode === 'undefined' ? null : element.parentNode;
            if (parent === null) return false;
            parent.removeChild(element);
            return true;
        }
        static getIcon(data) {
            let regex = new RegExp(Menu.regex());
            if (regex.test(data)) {
                let icon = document.createElement('img');
                icon.src = data;
                return icon;
            }

            let icon = document.createElement('i');
            icon.className = 'material-icons';
            icon.innerText = data;
            return icon;
        }
    }

    window.Menu = Menu;
    window.Menu.Cluster = Cluster;
    window.Menu.Item = Item;
    window.Menu.Preloader = Preloader;

})(window);