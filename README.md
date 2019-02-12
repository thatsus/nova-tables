# nova-tables
Easy-to-use HTML tables in Vue.js.

NovaTables works with bootstrap out-of-the-box.

NovaTables has several popular optional components out-of-the-box.

* Search
* CSV download
* Column selection
* Sort
* Pagination

It also has these optional features:

* Customizable cells, plus customizable header and footer space.
* Writes some state to the URL for copy-pasting.
* Writes some state to cookies for user friendliness.


# Attributes

## Required:

```
One of these:
   items       : an Array of objects
   endpoint    : a URL to request data from
   item-source : a Source object, see below
columns        : an object, keys should be field names on the items, values will be
                   used for visible column names
```

## Optional:
```
searchable            : boolean, if true, include the search text box
adjustable-columns    : boolean, if true, include the columns dropdown
sortable              : boolean|array, if true, show sort toggles, if array,
                        show sort toggles on the columns in the array
default-sort-field    : string, the field to sort on at load time
default-sort-orders   : object, keys are fields, values are 'A' or 'D', to
                        indicate the order to sort by on first click
csv-exportable        : boolean, if true, show the CSV download button
default-active-fields : array, only show these columns at load time
always-active-fields  : array, always show these column, do not allow them to be 
                        hidden.
page-length           : int, if non-zero, include the pagination element if the
                        count exceeds this length
page-length-options   : array, if present, include a drop up to select the page
                        length
footer                : boolean, if true, show a footer row; see Slots section
endpoint-params       : object, data to append to the endpoint URL when using
                        the endpoint attribute
name                  : string, if present some data is saved to cookies and
                        some to the URL, see State Persistence section
key-field             : string, unique field to use so filter and page
                        transitions are smooth and do not briefly mix records
table-class           : string|function, the CSS class to apply to the table. If undefined,
                        some default Bootstrap classes will be applied. When a
                        function is given, an array containing all items
                        will be sent to the callback and you can return a
                        CSS class conditionally
row-class             : string|function, the CSS class to apply to all rows
                        in the table. When a function is given, an item
                        object will be sent to the callback and you can
                        return a CSS class conditionally
```


# Basic Example

```
<nova-table
    :items="[{name: 'Fred', dob: '1980-01-02', role: 'Veterinarian'},
             {name: 'Beth', dob: '1972-12-34', role: 'Customer'    },
             {name: 'Gary', dob: '1998-09-08', role: 'Driver'      }]"
    :columns="{'name': 'Name', 'dob': 'Date of Birth', 'role': 'Job'}"
>
</nova-table>
```
![Screen_Shot_2017-02-10_at_12.12.24_PM](https://thatsus.github.io/nova-tables/assets/Screen_Shot_2017-02-10_at_12.12.24_PM.png)

# Example with optional attributes

```
<nova-table
    :items="[{description: 'Banana',     price: 0.66, price_type: 'per lbs'},
             {description: 'Orange',     price: 1.50, price_type: 'each'   },
             {description: 'Blueberry',  price: 4.00, price_type: 'per lbs'},
             {description: 'Strawberry', price: 3.00, price_type: 'per lbs'},
             {description: 'Guava',      price: 5.50, price_type: 'per lbs'},
             {description: 'Clementine', price: 1.10, price_type: 'each'   },
             {description: 'Apple',      price: 2.05, price_type: 'per lbs'}]"
    :columns="{'description': 'Item', 'price': 'Price'}"
    :searchable="1"
    :adjustable-columns="1"
    :sortable="1"
    :csv-exportable="1"
    :page-length="5"
    :page-length-options="[5, 50, 100]"
>
</nova-table>
```
![Screen_Shot_2017-02-20_at_1.54.59_PM](https://thatsus.github.io/nova-tables/assets/Screen_Shot_2017-02-20_at_1.54.59_PM.png)
![Screen_Shot_2017-02-20_at_1.57.56_PM](https://thatsus.github.io/nova-tables/assets/Screen_Shot_2017-02-20_at_1.57.56_PM.png)

# Using a callback method to apply a CSS class to a row

You can optionally supply a callback method that will apply a CSS class to a row.

```
<nova-table
    :items="[{description: 'Banana',     price: 0.66, price_type: 'per lbs'},
             {description: 'Orange',     price: 1.50, price_type: 'each' },
             {description: 'Blueberry',  price: 4.00, price_type: 'per lbs'},
             {description: 'Strawberry', price: 3.00, price_type: 'per lbs'},
             {description: 'Guava',      price: 5.50, price_type: 'per lbs'},
             {description: 'Clementine', price: 1.10, price_type: 'each'},
             {description: 'Apple',      price: 2.05, price_type: 'per lbs'}]"
    :columns="{'description': 'Item', 'price': 'Price'}"
    :searchable="1"
    :adjustable-columns="1"
    :sortable="1"
    :csv-exportable="1"
    :page-length="5"
    :page-length-options="[5, 50, 100]"
    :row-class="function (item) {
        if (item.price > 4.00) {
            return 'table-danger';
        } else if (item.price > 2.50) {
            return 'table-warning';
        } else {
            return '';
        }
    }"
>
</nova-table>
```

# Slots

## Field Slots

Slots can be used to customize the display of a particular field.

```
<nova-table
    :items="[{description: 'Banana',    price: 0.66, price_type: 'per lbs'},
             {description: 'Orange',    price: 1.50, price_type: 'each'   },
             {description: 'Blueberry', price: 4.00, price_type: 'per lbs'}]"
    :columns="{'description': 'Item', 'price': 'Price'}"
>
    <template slot="price" slot-scope="{item}">
        {{ item.price }} {{ item.price_type }}
    </template>
</nova-table>
```
![Screen_Shot_2017-02-10_at_12.12.45_PM](https://thatsus.github.io/nova-tables/assets/Screen_Shot_2017-02-10_at_12.12.45_PM.png)

In this example, the template will be rendered once each time a "price"
cell is needed. The name matches the field name. `props.item` will be an
item from the `items` array.

Using this technique, new columns can be created that do not directly
correspond to any field on the items.

Note: The `slot-scope` attribute of template was called `scope` prior to Vue
2.5.

## Footer Slots

When the `footer` attribute is truthy, a row of footer cells is displayed at
the bottom of the table. These cells may be defined via footer slots.

These slots are named &lt;field>-footer. The slot scope includes an `items`
key with all the items on the current page.

Example:
```
<nova-table
    :items="[{description: 'Banana',    price: 0.66, price_type: 'per lbs'},
             {description: 'Orange',    price: 1.50, price_type: 'each'   },
             {description: 'Blueberry', price: 4.00, price_type: 'per lbs'}]"
    :columns="{'description': 'Item', 'price': 'Price', 'price_type': 'Price Type'}"
    :footer="true"
>
    <template slot="price-footer" scope="{items}">
        Sum: {{ items.reduce((a, b) => a + b.price, 0) }}
    </template>
</nova-table>
```
![Screen_Shot_2017-05-24_at_5.30.37_PM](https://thatsus.github.io/nova-tables/assets/Screen_Shot_2017-05-24_at_5.30.37_PM.png)

## Other Slots

You can insert content in the area with, e.g., the search and page selector
components by using slots named `top-left-bar`, `top-right-bar`,
`bottom-right-bar`, and `bottom-left-bar`.

# Endpoints

## endpoint-params

If an `endpoint` is specified, an object passed to the `endpoint-params`
attribute will be used as data to the `endpoint` URL.

If your parent component has extra parameters to send to the endpoint, they
should be sent as keys on this object. Changes to this object will cause a
table refresh.

## Standard Params

When using `endpoint` these params are always added to the URL query. The
server should expect them and use them to return data in the format specified
in the next section.

```
page           : int or null, the current page selection, or null for All
                 (page numbers start at 1)
page_length    : int or null, how many items to return on the page, or null
search         : string, the text from the search box
search_fields  : string, columns currently visible
sort_direction : string, A or D, which direction to sort
sort_field     : string, the field to sort by
```

## Return format

The server should return a JSON-formatted object with the following fields:

```
items       : array of objects, the data to show
page        : int, the id of the page being returned (pages start at 1)
pageCount  : int, the number of pages available
totalCount : int, the number of individual items available
```

# State Persistence

When a Nova Table is given a `name` attribute it will use it to persist some
of its state to the browser cookies and some of it to the browser URL. It will
include any data in `endpoint-params` in the URL data.

When the table is loaded again, this data is used to reset the state.

## @load-endpoint-params

When the table is loaded in a browser with URL params present, the
`@load-endpoint-params` event is fired with the data in the format given to
`endpoint-params`. A parent component using Nova Tables can handle this event
and use it to restore its own previous state.

# Custom Data Sources

The `endpoint` and `items` attributes should be sufficient to setup data
sources for most purposes.

The `item-source` attribute allows the parent component to pass in a custom
object for accessing and managing data. Using a custom source allows the parent
component greater access to the object so that it can do things like, e.g.,
calling `fireChangeEvent` to cause a table refresh.

## Interface

The Source object must implement the following methods.
`NovaTable.AbstractSource` implements most of them already and is a great
super class for this purpose.

```
setPage(page, page_length) :
    After this is called, the next call to `get` should produce a page of data
    with the correct length. If page_length is null, all data should be
    returned by `get`.
    This should cause a call to `fireChangeEvent`.

setSearch(search, fields) :
    After this is called, the next call to `get` should produce a page of data
    that matches the `search` string in the given `fields`.
    This should cause a call to `fireChangeEvent`.

setSort(field, direction) :
    After this is called, the next call to `get` should produce a page of data
    sorted according to the `field`, in the direction given by `direction`
    which can contain 'A' or 'D'.
    This should cause a call to `fireChangeEvent`.

onChange(closure) :
    This should add the given closure to an array of closures that should run
    whenever the data on this object changes.

fireChangeEvent() :
    This should run each of the closures added via `onChange`.

get() :
    This must return a Promise. When successful, the Promise's value should be
    an object with these fields:
        items       : array of objects, the data to show
        page        : int, the id of the page being returned (pages start at
                      1)
        pageCount  : int, the number of pages available
        totalCount : int, the number of individual items available
```

## Built-In ArraySource

The `NovaTable.ArraySource` object may be used for in-memory data. This is the
source used internally when `items` is supplied.

The array should be passed as the only parameter to the constructor.

In addition to the usual interface, `ArraySource` also implements:

```
addFilter(closure) :
    Adds the closure to an array. Each time `get` is called, the closure will
    be passed an array of items and must return an array of items.
```

## Built-In ServerSideSource

The `NovaTable.ServerSideSource` object may be used to access a server
endpoint.

The endpoint string should be passed as the only parameter.

In addition to the usual interface, `ServerSideSource` also implements:

```
addParamMerger(closure) :
    Adds the closure to an array. Each time `get` is called, before the call
    to the server, the endpoint params are sent to these closures. Any changes
    made to the object here will be sent to the endpoint.
```

## Built-In AbstractSource

The parent class `NovaTables.AbstractSource` provides most of an implementation
of the Source interface. It also exposes this data to its child classes:

```
this.search         : the string set by setSearch
this.search_fields  : the array set by setSearch
this.sort_field     : the string set by setSort
this.sort_direction : the string 'A' or 'D' set by setSort
this.page           : the page int set by setPage
this.page_length    : the page_length int set by setPage
```

Children of `AbstractSource` must implement the `get` method.

# Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/thatsus/nova-tables/issues) or a [pull request](https://github.com/thatsus/nova-tables/pulls).

# License

[MIT](http://opensource.org/licenses/MIT)

