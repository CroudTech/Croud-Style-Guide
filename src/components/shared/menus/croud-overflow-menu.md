### Plain Overflow Menu

    <croud-overflow-menu :options="[{name: 'Delete', method: () => {} }, {name: 'Postpone', method: () => {}}, {name: 'Copy', method: () => {}, disabled: true}]"></croud-overflow-menu>

You can add a **divider** to seperate unrelated content by passing though an empty object.

     <croud-overflow-menu :options="[{name: 'Profile', method: () => {} }, {name: 'Account Settings', method: () => {}}, {}, {name: 'Logout', method: () => {}}]"></croud-overflow-menu>

By default there is a pointer but you can also remove it.

     <croud-overflow-menu :options="[{name: 'Delete', method: () => {} }, {name: 'Postpone', method: () => {}}, {name: 'Copy', method: () => {}, disabled: true}]" :no-pointer="true"></croud-overflow-menu>

You can also **flip** the menu so that it **aligns to the left** of the menu icon.

    <croud-overflow-menu :options="[{name: 'Profile', method: () => {} }, {name: 'Account Settings', method: () => {}}, {}, {name: 'Logout', method: () => {}}]" :left="true"></croud-overflow-menu>
