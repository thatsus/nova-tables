# nova-tables
Easy-to-use HTML tables in Vue.js.

NovaTables works with bootstrap out-of-the-box.

NovaTables has several popular optional components out-of-the-box.

Search     : A text box to filter the data.
CSV        : A button to export the data as CSV.
Columns    : A dropdown to select which columns are displayed.
Sort       : A toggle to sort a column.
Pagination : A page selector and page length selector


It also has these optional features:

* Customizable cells, customizable header and footer space.
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
![Screen_Shot_2017-02-10_at_12.12.24_PM](/uploads/661df8504d77c6fd38a0dd3937172205/Screen_Shot_2017-02-10_at_12.12.24_PM.png)

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
![Screen_Shot_2017-02-20_at_1.54.59_PM](/uploads/13c44d8b822e775e9e1d7a7da9d9d8d2/Screen_Shot_2017-02-20_at_1.54.59_PM.png)
![Screen_Shot_2017-02-20_at_1.57.56_PM](/uploads/cefc81f00a3901429621cf2df80b528b/Screen_Shot_2017-02-20_at_1.57.56_PM.png)

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
![Screen_Shot_2017-02-10_at_12.12.45_PM](/uploads/1f9afb704904f870c5ffd8f90f9f2ad5/Screen_Shot_2017-02-10_at_12.12.45_PM.png)

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
        Sum: @{{ items.reduce((a, b) => a + b.price, 0) }}
    </template>
</nova-table>
```
![Screen_Shot_2017-05-24_at_5.30.37_PM](/uploads/e2cc1fd3b882979a5ccab60b6bc0971a/Screen_Shot_2017-05-24_at_5.30.37_PM.png)

## Other Slots

You can insert content in the area with, e.g., the search and page selector 
components by using slots named `top-left-bar`, `top-right-bar`, 
`bottom-right-bar`, and `bottom-left-bar`.

# Endpoint Params

If an `endpoint` is specified, an object passed to the `endpoint-params` 
attribute will be used as data to the `endpoint` URL.

If your parent component using a Nova Table has extra data to send, it should 
be sent via this parameter. Changes to this data will result in a call to the 
endpoint using the new data.

## endpoint params

TODO: Explain search/columns/page, etc, values sent to endpoint.

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

TODO

# Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/thatsus/nova-tables/issues) or a [pull request](https://github.com/thatsus/nova-tables/pulls).

# License

[MIT](http://opensource.org/licenses/MIT)

