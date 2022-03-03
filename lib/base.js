(function (window) {

    class Cluster {

        /**
         * Create a new JavaScript menu object
         * @param menu - The menu object that the menu item is a part of.
         * @param id - The id of the menu item.
         */
        constructor(menu, id) {
            this.menu = menu;
            this.id = id;

            this.elements = {};
        }

        /**
         * Get the menu from the constructor
         * @returns The menu property.
         */

        getMenu() {
            return this.menu;
        }

        /**
         * Get the ID of the current object
         * @returns The id of the object.
         */

        getID() {
            return this.id;
        }

        /**
         * * Set the label of the button to the given text
         * @param text - The text to be displayed in the label.
         * @returns The `setLabel` method returns the `this` object.
         */

        setLabel(text) {
            let label = this.getLabel(), node = document.createTextNode(text);
            label.innerText = '';
            label.appendChild(node);
            return this;
        }

        /**
         * Create a label element if it doesn't already exist
         * @returns The label element.
         */

        getLabel() {
            if (this.elements.hasOwnProperty('label')) return this.elements.label;
            this.elements.label = document.createElement('label');
            this.elements.label.className = 'label';
            return this.elements.label;
        }

        /**
         * * Create a wrapper element for the label
         * @returns The label element.
         */

        getLabelWrapper() {
            if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
            let label = this.getLabel();
            this.elements.wrapper = document.createElement('div');
            this.elements.wrapper.className = 'wrapper';
            this.elements.wrapper.appendChild(label);
            return this.elements.wrapper;
        }

        /**
         * Create a container element for the label wrapper
         * @returns The container element.
         */

        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            let wrapper = this.getLabelWrapper();
            this.elements.container = document.createElement('div');
            this.elements.container.className = 'cluster';
            this.elements.container.appendChild(wrapper);
            return this.elements.container;
        }

        /**
         * Get the container element for the current widget
         * @returns The container element.
         */

        out() {
            return this.getContainer();
        }
    }

    class Item {

        /**
         * `static icon()` returns the icon name for the class
         * @returns The icon name.
         */

        static icon() {
            return 'healing';
        }

        /**
         * *The default function returns the value 'developer\widget\menu\item\default'*
         * 
         * The default function is called when the menu item is not found in the menu item map
         * @returns The string 'developer\widget\menu\item\default'
         */

        static default() {
            return 'developer\\widget\\menu\\item\\default';
        }

        /**
         * Create a new instance of the Item class
         * @param menu - The menu object that the menu item is to be added to.
         */

        constructor(menu) {
            this.menu = menu;
            this.elements = {};
        }

        /**
         * Get the menu from the database
         * @returns The menu property.
         */

        getMenu() {
            return this.menu;
        }

        /**
         * Set the href attribute of the anchor tag
         * @param href - The URL to which the link will navigate.
         * @returns The element.
         */

        setHref(href) {
            this.getContainer().setAttribute('href', href);
            return this;
        }

        /**
         * Get the icon for the menu item
         * @returns The icon for the menu item.
         */

        getIcon() {
            if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
            let icon = this.constructor.icon();
            this.elements.icon = window.Menu.getIcon(icon);
            return this.elements.icon;
        }

        /**
         * * Set the icon for the menu item
         * @param data - The data to be used to create the menu item.
         * @returns Nothing.
         */

        setIcon(data) {
            this.elements.icon = window.Menu.getIcon(data);
            return this;
        }

        /**
         * *Create a label element if it doesn't exist, and return it.*
         * @returns The label element.
         */

        getLabel() {
            if (this.elements.hasOwnProperty('label')) return this.elements.label;
            let node = document.createTextNode(this.constructor.default());
            this.elements.label = document.createElement('label');
            this.elements.label.className = 'label';
            this.elements.label.appendChild(node);
            return this.elements.label;
        }

        /**
         * * Set the label of the current node to the given text
         * @param text - The text to be displayed in the label.
         * @returns The `setLabel` method returns the `this` object.
         */

        setLabel(text) {
            let label = this.getLabel(), node = document.createTextNode(text);
            label.innerText = '';
            label.appendChild(node);
            return this;
        }

        /**
         * * Create a container element for the icon and label
         * @returns The container element.
         */

        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            let icon = this.getIcon(), label = this.getLabel();
            this.elements.container = document.createElement('a');
            this.elements.container.className = 'waves-effect ellipsis';
            this.elements.container.appendChild(icon);
            this.elements.container.appendChild(label);
            return this.elements.container;
        }

        /**
         * Get the container of the current cell
         * @returns The container element.
         */

        out() {
            return this.getContainer();
        }
    }

    class Preloader {

        /**
         * Create a new instance of the Preloader class
         * @param menu - The menu object that the menu item is to be added to.
         */

        constructor(menu) {
            this.menu = menu;
            this.elements = {};
        }

        /**
         * Get the menu from the database
         * @returns The menu property.
         */

        getMenu() {
            return this.menu;
        }

        /**
         * Create a div element with the class name "preloader" if it doesn't already exist
         * @returns The preloader element.
         */

        getPreloader() {
            if (this.elements.hasOwnProperty('preloader')) return this.elements.preloader;
            this.elements.preloader = document.createElement('div');
            this.elements.preloader.className = 'preloader';
            return this.elements.preloader;
        }

        /**
         * Create a spinner element if it doesn't exist, and return it
         * @returns The spinner element.
         */

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

        /**
         * Create a spinner and append it to the preloader
         * @returns Nothing.
         */

        showSpinner() {
            let spinner = this.getSpinner();
            this.getPreloader().appendChild(spinner);
            return this;
        }

        /**
         * Hide the spinner.
         * @returns Nothing.
         */

        hideSpinner() {
            let spinner = this.getSpinner();
            window.Menu.removeElementDOM(spinner);
            return this;
        }

        /**
         * Show the preloader
         * @returns Nothing.
         */

        show() {
            let preloader = this.getPreloader();
            this.getMenu().getModules().appendChild(preloader);
            return this;
        }

        /**
         * Hide the preloader from the user.
         * @returns Nothing.
         */

        hide() {
            let preloader = this.getPreloader();
            window.Menu.removeElementDOM(preloader);
            return this;
        }

        /**
         * Returns a boolean value indicating whether the preloader is currently visible
         * @returns The status of the preloader.
         */

        status() {
            return this.getPreloader().parentNode !== null;
        }
    }

    class Menu {

        /**
         * It returns a string.
         * @returns The string "data-handle-event"
         */

        static handle() {
            return 'data-handle-event';
        }

        /**
         * This function returns a regular expression that matches the beginning of a JavaScript data
         * URI
         * @returns The regular expression that is used to match the data: prefix.
         */

        static regex() {
            return '^data\:';
        }

        /**
         * *Get the storage key for the menu widget.*
         * 
         * The following code is the JavaScript code for the menu widget
         * @returns The `storage()` method returns a string that is a combination of the `widget` and
         * `menu` strings.
         */

        static storage() {
            return 'widget' + '/' + 'menu';
        }

        /**
         * The constructor function creates an object that contains a list of elements, a dictionary of
         * clusters, and a preloader object
         */
        constructor() {
            this.elements = {};
            this.elements.list = [];
            this.elements.clusters = {};
            this.elements.preloader = new window.Menu.Preloader(this);

            this.xhr = {
                url: null,
                error: 0,
                construct: new XMLHttpRequest(),
                navigator: null,
                event: {}
            };

            this.xhr.construct.addEventListener('load', this, false);
            this.xhr.construct.addEventListener('error', this, false);
        }

        /**
         * *Get the list of elements from the DOM.*
         * @returns The list of elements.
         */

        getList() {
            return this.elements.list;
        }

        /**
         * Get the list of clusters in the current subscription
         * @returns The clusters.
         */

        getClusters() {
            return this.elements.clusters;
        }

        /**
         * Get the preloader element
         * @returns The preloader element.
         */

        getPreloader() {
            return this.elements.preloader;
        }

        /**
         * It returns the XHR object.
         * @returns The constructor of the XMLHttpRequest object.
         */

        getXHR() {
            return this.xhr.construct;
        }

        /**
         * Set the URL for the request
         * @param url - The URL to send the request to.
         * @returns Nothing.
         */

        setRequestUrl(url) {
            this.xhr.url = url;
            return this;
        }

        /**
         * Get the URL of the request
         * @returns The URL of the request.
         */

        getRequestUrl() {
            return this.xhr.url;
        }

        /**
         * It sets the callback function for the XHR object.
         * @param func - The function to call when the request is complete.
         * @returns Nothing.
         */

        setCallback(func) {
            this.xhr.event.callback = func;
            return this;
        }

        /**
         * Get the callback function from the XHR event object
         * @returns The callback function that was passed to the XHR object.
         */

        getCallback() {
            if (this.xhr.event.hasOwnProperty('callback')) return this.xhr.event.callback;
            return null;
        }

        /**
         * Set the navigator property of the XMLHttpRequest object
         * @param navigator - The navigator object that the XHR object should use.
         * @returns The XHR object.
         */

        setNavigator(navigator) {
            this.xhr.navigator = navigator;
            return this;
        }

        /**
         * Get the navigator object from the XHR object
         * @returns The navigator object.
         */

        getNavigator() {
            return this.xhr.navigator;
        }

        /**
         * Set the element that is near the current element
         * @param element - The element to be set as the near element.
         * @returns The `setNearElement` method returns the `this` object.
         */

        setNearElement(element) {
            this.elements.near = element;
            return this;
        }

        /**
         * Get the element that is near the current element
         * @returns The near element.
         */

        getNearElement() {
            return this.elements.near;
        }

        /**
         * Create a header element and append it to the container
         * @param object - {label: '', icon: ''}
         * @returns The `this` object.
         */

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

        /**
         * Get the header element from the elements object
         * @returns The header element.
         */

        getHeader() {
            if (this.elements.hasOwnProperty('header')) return this.elements.header;
            return null;
        }

        /**
         * * Get the modules element if it exists, otherwise create it
         * @returns The modules div.
         */

        getModules() {
            if (this.elements.hasOwnProperty('modules')) return this.elements.modules;
            this.elements.modules = document.createElement('div');
            this.elements.modules.className = 'modules';
            this.elements.modules.setAttribute(this.constructor.handle(), ':hover');
            this.elements.modules.addEventListener('mouseenter', this, false);
            this.elements.modules.addEventListener('mouseleave', this, false);
            return this.elements.modules;
        }

        /**
         * Create a footer element if it doesn't exist, and return it
         * @returns The footer element.
         */

        getFooter() {
            if (this.elements.hasOwnProperty('footer')) return this.elements.footer;
            let toggle = this.getToggle();
            this.elements.footer = document.createElement('div');
            this.elements.footer.className = 'footer ellipsis';
            this.elements.footer.appendChild(toggle);
            return this.elements.footer;
        }

        /**
         * Create a toggle button that will be used to toggle the visibility of the menu
         * @returns The toggle element.
         */

        getToggle() {
            if (this.elements.hasOwnProperty('toggle')) return this.elements.toggle;
            let icon = this.constructor.getIcon('keyboard_capslock');
            this.elements.toggle = document.createElement('a');
            this.elements.toggle.appendChild(icon);
            this.elements.toggle.setAttribute(this.constructor.handle(), ':toggle');
            this.elements.toggle.addEventListener('click', this, false);
            return this.elements.toggle;
        }

        /**
         * Create a container element for the menu
         * @returns The menu container.
         */

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

        /**
         * * For each item in the array, create a new menu item and append it to the menu
         * @param items - an array of objects that contain the following properties:
         * @returns The Menu object.
         */
        pushModules(items) {
            let grouping = this.getClusters();

            for (let item = 0; item < items.length; item++) {
                if (false === items[item].hasOwnProperty('cluster')
                    || typeof items[item].cluster !== 'string'
                    || 0 === items[item].cluster.length
                    || grouping.hasOwnProperty(items[item].cluster)) continue;

                grouping[items[item].cluster] = new window.Menu.Cluster(this, items[item].cluster);
                grouping[items[item].cluster].setLabel(items[item].cluster);

                this.getModules().appendChild(grouping[items[item].cluster].out());
            }

            for (let item = 0, list = this.getList(); item < items.length; item++)
                if (items[item].hasOwnProperty('href')) {
                    let attach = false === items[item].hasOwnProperty('cluster') || false === grouping.hasOwnProperty(items[item].cluster)
                        ? this.getModules()
                        : grouping[items[item].cluster].out();

                    let element = new window.Menu.Item(this);

                    if (typeof items[item].icon === 'string') element.setIcon(items[item].icon);
                    if (typeof items[item].label === 'string') element.setLabel(items[item].label);

                    element.setHref(items[item].href);
                    attach.appendChild(element.out());
                    list.push(element);
                }

            return this;
        }

        /**
         * Get the container of the current cell
         * @returns The container element.
         */

        out() {
            return this.getContainer();
        }

        /**
         * It sends a POST request to the server.
         * @param callback - The function to be called when the request is complete.
         */

        request(callback) {
            this.setCallback(callback);
            this.getPreloader().showSpinner().show();

            let xhr = this.getXHR(),
                url = this.getRequestUrl();

            xhr.open('POST', url, !0);

            let data = new FormData(),
                navigator = this.getNavigator();
            data.append('navigator', navigator);

            xhr.send(data);
        }
        
        /**
         * The function is called when the request fails. 
         * 
         * The function increments the error counter by 1. 
         * 
         * If the error counter is less than or equal to 4, the function calls itself again after 1
         * second. 
         * 
         * The function returns nothing
         */

        error() {
            this.xhr.error = this.xhr.error + 1;
            if (this.xhr.error <= 4)
                setTimeout(this.request.bind(this), 1e3, this.getCallback());
        }

        /**
         * * Loads the JSON file and calls the callback function with the JSON data
         */

        load() {
            let json, xhr = this.getXHR();

            this.xhr.error = 0;

            this.getPreloader().hide();

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

       /**
        * If the event type matches the event type in the attribute, or if the event type is empty,
        * then execute the function
        * @param event - The event object that was passed to the event handler.
        * @returns Nothing.
        */

        handleEvent(event) {
            if (typeof this[event.type] === 'function')
                return this[event.type].call(this, event);

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

        /**
         * *Open the menu.*
         * 
         * The function is pretty simple. It removes the `crush` class from the menu container and
         * removes the `crush` class from the `near` element
         */

        open() {
            let near = this.getNearElement();
            if (near instanceof HTMLElement) near.classList.remove('menu-crush');
            localStorage.removeItem(this.constructor.storage(), 'crush');
            this.getContainer().classList.remove('crush');
        }

        /**
         * *Add the class "menu-crush" to the nearest element and add the class "crush" to the menu
         * container.*
         * 
         * The function is called when the user clicks on the "Crush" button
         */

        crush() {
            let near = this.getNearElement();
            if (near instanceof HTMLElement) near.classList.add('menu-crush');
            localStorage.setItem(this.constructor.storage(), 'crush');
            this.getContainer().classList.add('crush');
        }

        /**
         * Returns a boolean indicating whether the container is currently in a crushed state
         * @returns The `get_status()` method returns a boolean value.
         */

        status() {
            return this.getContainer().classList.contains('crush');
        }

        /**
         * Toggle the status of the object
         */

        toggle() {
            let method = this.status() ? 'open' : 'crush';
            this[method].call(this);
        }

        /**
         * *When the user hovers over the preview button, the preview container is toggled on and off.*
         */

        hover() {
            let status = this.status();
            if (status === true) this.getContainer().classList.toggle('preview');
        }

        /**
         * Find the closest attribute to the target element
         * @param target - The element to search for the closest attribute.
         * @param attribute - The attribute to search for.
         * @param html - If true, the attribute is searched for in the HTML source code.
         * @returns The closest attribute.
         */

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

        /**
         * Remove the element from the DOM
         * @param element - The element to remove from the DOM.
         * @returns The return value is a boolean value.
         */

        static removeElementDOM(element) {
            let parent = element === null || typeof element === 'undefined' || typeof element.parentNode === 'undefined' ? null : element.parentNode;
            if (parent === null) return false;
            parent.removeChild(element);
            return true;
        }

        /**
         * Create an icon element from the data
         * @param data - The data to be displayed in the menu item.
         * @returns The icon that was created.
         */
        
        static getIcon(data) {
            let regex = new RegExp(window.Menu.regex());
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
    window.Menu.Item = Item;
    window.Menu.Cluster = Cluster;
    window.Menu.Preloader = Preloader;

})(window);