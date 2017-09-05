### Usage
This is our Universal List Dropdown component, for basic usage simply pass a getter to the listgetter prop, and listen for the item-selected event which passes the selected list item, if you wish to display this in the header of the dropdown menu, simply pass the selected item object to the headerItem prop. 

It also shows that you can add an action button, by setting the prop and adding a button as below..
    
    <croud-list-dropdown :listGetter="listExamples.basic" 
                         :headerItem="listExamples.selected" 
                         @item-selected="listExamples.selected = $event"
                         :showHeaderAction="true">
    <div slot="header-action">
        <button class="ui button tiny blue">Action</button>
    </div>
    </croud-list-dropdown>

### Expanding component with scoped slots and props
This example shows that you can use scoped slots with templates to customize each item listed, the templates have access to the data passed through as an attibute in the list component, it also adds a custom header item.

It also shows how to add a button icon and custom button text, as well as customized dropdown classes..

    <croud-list-dropdown :listGetter="listExamples.scoped" 
                         :headerItem="listExamples.selected" @item-selected="listExamples.selected = $event"
                         dropdownClasses="ui floating right labeled icon top right pointing dropdown tiny basic black button right floated"
                         :buttonText="'Select Client'"
                         :showIcon="true"
                         :buttonIcon="'exchange'"
                         :showHeaderAction="false">

    <div slot="header-item">
        <croud-avatar v-if="listExamples.selected.name" size="avatar" :user="listExamples.selected" />
        <div class="label">
            <span v-html="listExamples.selected.name"></span>
        </div>
    </div>
        
    <template slot="items" scope="items">
        <div>
            <croud-avatar size="avatar" :user="items.item" />
            <div class="label">
                <span v-html="items.item.name"></span>
            </div>
        </div>
    </template>
    
    </croud-list-dropdown>
