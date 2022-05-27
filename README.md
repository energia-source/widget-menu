# Documentation widget-menu

Widget Javascript Menù is a library used to create a sidepanel in whitch you can display a menu to surf between pages

## Usage

So the basic setup looks something like this:

```

let menu = new Menu();

menu.setNearElement(window.elements.main);
menu.setRequestUrl(<uri to abotain a dynamic menu>);
menu.setNavigator(window.page.getNavigator().join('/'));
menu.request(function (response) {
    if (response.hasOwnProperty('header')) this.setHeader(response.header);
    if (false === response.hasOwnProperty('data')) return;

    this.pushModules(response.data); // When data have a correct JSON notation

    let pathname = window.location.pathname.split(/[\\\/]/);
    if (pathname.hasOwnProperty(2)) {
        let list = this.getList();
        for (let item = 0; item < list.length; item++) {
            let href = list[item].out().getAttribute('href');
            if (href === null) continue;

            let split = href.split(/[\\\/]/);
            if (split.hasOwnProperty(2)
                && pathname[2] === split[2]) list[item].out().classList.add('active');
        }
    }
});

document.appendChild(menu.out());

```

## Structure

library:
- [window.Menu](https://github.com/energia-source/widget-menu/tree/main/lib)
- [window.Menu.Item](https://github.com/energia-source/widget-menu/tree/main/lib)
- [window.Menu.Cluster](https://github.com/energia-source/widget-menu/tree/main/lib)
- [window.Menu.Preloader](https://github.com/energia-source/widget-menu/tree/main/lib)

<br>

## Contributing

Please read [CONTRIBUTING.md](https://github.com/energia-source/widget-menu/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting us pull requests.

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/energia-source/widget-menu/tags). 

## Authors

* **Paolo Fabris** - *Initial work* - [energia-europa.com](https://www.energia-europa.com/)
* **Gabriele Luigi Masero** - *Developer* - [energia-europa.com](https://www.energia-europa.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
