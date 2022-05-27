<?PHP

namespace Menu;

use Closure;
use DirectoryIterator;
use ReflectionFunction;

use Knight\armor\Language;

use Entity\Map as Entity;
use Entity\Validation;

class Base extends Entity
{
    const FILE = 'menu.item';
    const DIRECTORY_VIEWS = 'views';
    const FRONT_MENU_PARAMETERS = [
        'cluster',
        'label',
        'href',
        'icon'
    ];

    protected $items = []; // (array)
    protected $prior;      // Base

    final public static function create(Closure $closure = null) : self
    {
        $instance = new static();
        if (null === $closure) return $instance;

        $reflection = new ReflectionFunction($closure);
        $reflection_file = $reflection->getFileName();
        $reflection_namespace = $reflection->getNamespaceName();

        $instance->setDefault($reflection_file, $reflection_namespace);
        call_user_func($closure, $instance);

        return $instance;
    }

    final public static function getItemFromPath(string $path, bool $module = false) :? self
    {
        $instance_path = $path . DIRECTORY_SEPARATOR . static::FILE . chr(46) . 'php';
        if (false === file_exists($instance_path)) return null;

        $instance = require $instance_path;
        $instance->setAvailableModules($path);

        return $instance;
    }

    public function getItems() : array
    {
        return $this->items;
    }

    public function getItem(string $name) :? self
    {
        $items = $this->getItems();
        foreach ($items as $item) 
            if ($name === $item->getField('name')->getValue())
                return $item;

        return null;
    }

    public function setViewsFavorite(string ...$views_favorite) : self
    {
        $this->getField('favorite')->setValue($views_favorite);
        return $this;
    }

    public function setViewsProtected(string ...$views_protected) : self
    {
        $this->getField('protected')->setValue($views_protected);
        return $this;
    }

    public function pushPolicies(string ...$policies) : self
    {
        $field = $this->getField('policies');
        $intermediate = $field->getValue();
        array_push($intermediate, ...$policies);
        $field->setValue($intermediate);
        return $this;
    }

    public function getHref() :? string
    {
        $field = $this->getField('href');
        $field_default = $field->isDefault();
        if (true !== $field_default) return $field->getValue();
        $item = $this->getItemElect();
        return null === $item ? null : $item->getHref();
    }

    public function output(string ...$filter)
    {
        $values = $this->getAllFieldsValues();
        $filter = array_flip(static::FRONT_MENU_PARAMETERS);
        $values = array_intersect_key($values, $filter);
        $values = array_filter($values);
        return (object)$values;
    }

    protected function initialize() : void
	{
		$priority = $this->addField('priority');
        $priority_validator = Validation::factory('Number', 0);
        $priority_validator->setMin(0);
        $priority->setPatterns($priority_validator);

		$favorite = $this->addField('favorite');
        $favorite_validation = Validation::factory('ShowArray', array());
        $favorite->setPatterns($favorite_validation);

        $protected = $this->addField('protected');
        $protected_validation = Validation::factory('ShowArray', array());
        $protected->setPatterns($protected_validation);

        $policies = $this->addField('policies');
        $policies_validation = Validation::factory('ShowArray', array());
        $policies->setPatterns($policies_validation);

        $cluster = $this->addField('cluster');
        $cluster_validation = Validation::factory('ShowString');
        $cluster->setPatterns($cluster_validation);

        $label = $this->addField('label');
        $label_validation = Validation::factory('ShowString');
        $label->setPatterns($label_validation);

        $icon = $this->addField('icon');
        $icon_validation = Validation::factory('ShowString');
        $icon->setPatterns($icon_validation);

        $href = $this->addField('href');
        $href_validation = Validation::factory('ShowString');
        $href->setPatterns($href_validation);

        $name = $this->addField('name');
        $name_validation = Validation::factory('ShowString');
        $name->setPatterns($name_validation);
    }

    protected function setDefault(string $file, string $namespace) : void
    {
        Language::dictionary($file);

        $namespace_menu = $namespace . '\\' . 'menu' . '\\';

        $cluster_label = $namespace_menu . 'cluster';
        $cluster_label_translate = Language::translate($cluster_label);
        if ($cluster_label !== $cluster_label_translate) $this->getField('cluster')->setValue($cluster_label_translate);

        $application_label = $namespace_menu . 'label';
        $application_label_translate = Language::translate($application_label);
        $this->getField('label')->setValue($application_label_translate);

        $dirname = dirname($file);
        $dirname_basename = basename($dirname);
        $this->getField('name')->setValue($dirname_basename);

        $dirname_views = $dirname . DIRECTORY_SEPARATOR . static::DIRECTORY_VIEWS . DIRECTORY_SEPARATOR;
        if (!file_exists($dirname_views)
            || !is_dir($dirname_views)) return;

        $dirname_views_directory = new DirectoryIterator($dirname_views);


        foreach ($dirname_views_directory as $info) {
            if ($info->isDot()) continue;

            $info_filename = $info->getFilename();
            $this->addItem($info_filename);
        }
    }

    protected function setAvailableModules(string $path) : void
    {
        if (!file_exists($path)
            || !is_dir($path)) return;

        $path_directory = new DirectoryIterator($path);

        $path_basename = basename($path);
        $this->getField('name')->setValue($path_basename);

        foreach ($path_directory as $info) {
            $info_pathname = $info->getPathname();
            if ($info->isDot()
                || !is_dir($info_pathname)) continue;

            $info_filename = $info->getFilename();
            $item = static::getItemFromPath($info_pathname);
            if (null === $item) continue;

            $this->addItem($info_filename, $item);
        }
    }


    protected function addItem(string $name, self $item = null) : int
    {
        $instance = $item ?? new static();
        $instance->getField('name')->setValue($name);

        if (null === $item) $instance->getField('href')->setValue($name);

        return array_push($this->items, $instance);
    }

    protected function getItemElect() :? self
    {
        $items = $this->getItems();
        $items_first = reset($items);
        if (false === $items_first) return null;

        $field_name = $this->getField('name')->getValue();
        $field_favorite = $this->getField('favorite')->getValue();
        $field_policies = $this->getField('policies')->getValue();
        $field_protected = $this->getField('protected')->getValue();

        foreach ($items as $item) {

            $item_negotiate_href = $item->getHref();
            if (null === $item_negotiate_href) continue;

            $item_name = $item->getField('name')->getValue();

            if ($item_negotiate_href === $item_name
                && (in_array($item_name, $field_protected)
                    || !in_array($item_name, $field_policies))) continue;

            if ($items_first->getField('priority')->getValue() > $item->getField('priority')->getValue()) continue;

            $items_first = clone $item;
            $items_first_href_value = $field_name . '/' . $item_negotiate_href;
            $items_first->getField('href')->setValue($items_first_href_value);

            if (in_array($item_name, $field_favorite)) break;
        }

        return null === $items_first->getHref() ? null : $items_first;
    }
}
