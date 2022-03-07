# Documentation widget-menu

Widget Javascript Menù is a library used to create a sidepanel in whitch you can display a menu to surf between pages

## Structure

library:
- [window.Menu](https://github.com/energia-source/widget-menu/tree/main/lib#class-windowmenu-usable-methods)
- [window.Menu.Item](https://github.com/energia-source/widget-menu/tree/main/lib#class-windowmenuitem-usable-methods)
- [window.Menu.Cluster](https://github.com/energia-source/widget-menu/tree/main/lib#class-windowmenucluster-usable-methods)
- [window.Menu.Preloader](https://github.com/energia-source/widget-menu/tree/main/lib#class-windowmenupreloader-usable-methods)

<br>

#### ***Class window.Menu usable methods***

###### Documentation

##### `static handle()`

It returns a string.

 * **Returns:** The string "data-handle-event"

##### `static regex()`

This function returns a regular expression that matches the beginning of a JavaScript data URI

 * **Returns:** The regular expression that is used to match the data: prefix.

##### `static storage()`

*Get the storage key for the menu widget.*

The following code is the JavaScript code for the menu widget

 * **Returns:** The `storage()` method returns a string that is a combination of the `widget` and

     `menu` strings.

##### `constructor()`

The constructor function creates an object that contains a list of elements, a dictionary of clusters, and a preloader object

##### `getList()`

*Get the list of elements from the DOM.*

 * **Returns:** The list of elements.

##### `getClusters()`

Get the list of clusters in the current subscription

 * **Returns:** The clusters.

##### `getPreloader()`

Get the preloader element

 * **Returns:** The preloader element.

##### `getXHR()`

It returns the XHR object.

 * **Returns:** The constructor of the XMLHttpRequest object.

##### `setRequestUrl(url)`

Set the URL for the request

 * **Parameters:** `url` — The URL to send the request to.
 * **Returns:** Nothing 

##### `getRequestUrl()`

Get the URL of the request

 * **Returns:** The URL of the request.

##### `setCallback(func)`

It sets the callback function for the XHR object.

 * **Parameters:** `func` — The function to call when the request is complete.
 * **Returns:** Nothing 

##### `getCallback()`

Get the callback function from the XHR event object

 * **Returns:** The callback function that was passed to the XHR object.

##### `setNavigator(navigator)`

Set the navigator property of the XMLHttpRequest object

 * **Parameters:** `navigator` — The navigator object that the XHR object should use.
 * **Returns:** The XHR object.

##### `getNavigator()`

Get the navigator object from the XHR object

 * **Returns:** The navigator object.

##### `setNearElement(element)`

Set the element that is near the current element

 * **Parameters:** `element` — The element to be set as the near element.
 * **Returns:** The `setNearElement` method returns the `this` object.

##### `getNearElement()`

Get the element that is near the current element

 * **Returns:** The near element.

##### `setHeader(object)`

Create a header element and append it to the container

 * **Parameters:** `object` — {label: '', icon: ''}
 * **Returns:** The `this` object.

##### `getHeader()`

Get the header element from the elements object

 * **Returns:** The header element.

##### `getModules()`

* Get the modules element if it exists, otherwise create it

 * **Returns:** The modules div.

##### `getFooter()`

Create a footer element if it doesn't exist, and return it

 * **Returns:** The footer element.

##### `getToggle()`

Create a toggle button that will be used to toggle the visibility of the menu

 * **Returns:** The toggle element.

##### `getContainer()`

Create a container element for the menu

 * **Returns:** The menu container.

##### `pushModules(items)`

* For each item in the array, create a new menu item and append it to the menu

 * **Parameters:** `items` — an array of objects that contain the following properties:
 * **Returns:** The Menu object.

##### `out()`

Get the container of the current cell

 * **Returns:** The container element.

##### `request(callback)`

It sends a POST request to the server.

 * **Parameters:** `callback` — The function to be called when the request is complete.

##### `error()`

The function is called when the request fails.

The function increments the error counter by 1.

If the error counter is less than or equal to 4, the function calls itself again after 1 second.

The function returns nothing

##### `load()`

* Loads the JSON file and calls the callback function with the JSON data

##### `handleEvent(event)`

If the event type matches the event type in the attribute, or if the event type is empty, then execute the function

 * **Parameters:** `event` — The event object that was passed to the event handler.
 * **Returns:** Nothing 

##### `open()`

*Open the menu.*

The function is pretty simple. It removes the `crush` class from the menu container and removes the `crush` class from the `near` element

##### `crush()`

*Add the class "menu-crush" to the nearest element and add the class "crush" to the menu container.*

The function is called when the user clicks on the "Crush" button

##### `status()`

Returns a boolean indicating whether the container is currently in a crushed state

 * **Returns:** The `get_status()` method returns a boolean value.

##### `toggle()`

Toggle the status of the object

##### `hover()`

*When the user hovers over the preview button, the preview container is toggled on and off.*

##### `static closestAttribute(target, attribute, html)`

Find the closest attribute to the target element

 * **Parameters:**
   * `target` — The element to search for the closest attribute.
   * `attribute` — The attribute to search for.
   * `html` — If true, the attribute is searched for in the HTML source code.
 * **Returns:** The closest attribute.

##### `static removeElementDOM(element)`

Remove the element from the DOM

 * **Parameters:** `element` — The element to remove from the DOM.
 * **Returns:** The return value is a boolean value.

##### `static getIcon(data)`

Create an icon element from the data

 * **Parameters:** `data` — The data to be displayed in the menu item.
 * **Returns:** The icon that was created.

<br>

#### ***Class window.Menu.Item usable methods***

###### Documentation

##### `static icon()`

`static icon()` returns the icon name for the class

 * **Returns:** The icon name.

##### `static default()`

*The default function returns the value 'developer\widget\menu\item\default'*

The default function is called when the menu item is not found in the menu item map

 * **Returns:** The string 'developer\widget\menu\item\default'

##### `constructor(menu)`

Create a new instance of the Item class

 * **Parameters:** `menu` — The menu object that the menu item is to be added to.

##### `getMenu()`

Get the menu from the database

 * **Returns:** The menu property.

##### `setHref(href)`

Set the href attribute of the anchor tag

 * **Parameters:** `href` — The URL to which the link will navigate.
 * **Returns:** The element.

##### `getIcon()`

Get the icon for the menu item

 * **Returns:** The icon for the menu item.

##### `setIcon(data)`

* Set the icon for the menu item

 * **Parameters:** `data` — The data to be used to create the menu item.
 * **Returns:** Nothing 

##### `getLabel()`

*Create a label element if it doesn't exist, and return it.*

 * **Returns:** The label element.

##### `setLabel(text)`

* Set the label of the current node to the given text

 * **Parameters:** `text` — The text to be displayed in the label.
 * **Returns:** The `setLabel` method returns the `this` object.

##### `getContainer()`

* Create a container element for the icon and label

 * **Returns:** The container element.

##### `out()`

Get the container of the current cell

 * **Returns:** The container element.


<br>

#### ***Class window.Menu.Cluster usable methods***

###### Documentation

##### `constructor(menu, id)`

Create a new JavaScript menu object

 * **Parameters:**
   * `menu` — The menu object that the menu item is a part of.
   * `id` — The id of the menu item.

##### `getMenu()`

Get the menu from the constructor

 * **Returns:** The menu property.

##### `getID()`

Get the ID of the current object

 * **Returns:** The id of the object.

##### `setLabel(text)`

* Set the label of the button to the given text

 * **Parameters:** `text` — The text to be displayed in the label.
 * **Returns:** The `setLabel` method returns the `this` object.

##### `getLabel()`

Create a label element if it doesn't already exist

 * **Returns:** The label element.

##### `getLabelWrapper()`

* Create a wrapper element for the label

 * **Returns:** The label element.

##### `getContainer()`

Create a container element for the label wrapper

 * **Returns:** The container element.

##### `out()`

Get the container element for the current widget

 * **Returns:** The container element.

<br>

#### ***Class window.Menu.Preloader usable methods***

##### `constructor(menu)`

Create a new instance of the Preloader class

 * **Parameters:** `menu` — The menu object that the menu item is to be added to.

##### `getMenu()`

Get the menu from the database

 * **Returns:** The menu property.

##### `getPreloader()`

Create a div element with the class name "preloader" if it doesn't already exist

 * **Returns:** The preloader element.

##### `getSpinner()`

Create a spinner element if it doesn't exist, and return it

 * **Returns:** The spinner element.

##### `showSpinner()`

Create a spinner and append it to the preloader

 * **Returns:** `Nothing` — 

##### `hideSpinner()`

Hide the spinner.

 * **Returns:** `Nothing` — 

##### `show()`

Show the preloader

 * **Returns:** `Nothing` — 

##### `hide()`

Hide the preloader from the user.

 * **Returns:** `Nothing` — 

##### `status()`

Returns a boolean value indicating whether the preloader is currently visible

 * **Returns:** The status of the preloader.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript