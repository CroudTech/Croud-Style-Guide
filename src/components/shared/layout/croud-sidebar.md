### Basic usage
You can toggle the sidebar using a **v-show** attribute. The sidebar emits **save** and **close** events. You can pass two slots into the sidebar, the **default** slot will display in the main section of the sidebar and the **options** slot will display next to the buttons in the header
    <div>
        <button class="ui basic info button" @click="toggleSidebar = true">
            Edit
        </button>
        <croud-sidebar v-show="toggleSidebar" @close="toggleSidebar = false" @save="() => {this.$toasted.success('Saved')}" title="Super Long Title: this will probably be in need of truncation">
            <croud-overflow-menu slot="options"  :options="[{name: 'Delete', method() {}}]"></croud-overflow-menu>
            <div class="ui very padded basic segment">
                <div class="ui form">
                    <div class="field">
                        <label>Name</label>
                        <input />
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input />
                    </div>
                </div>
            </div>
        </croud-sidebar>
    </div>

### Autofocus
If you would like the first input field passed through to be focused then you need to use **v-if** and **not v-show** to toggle the sidebar.
    <div>
        <button class="ui basic info button" @click="toggleSidebar = true">
            Edit
        </button>
        <croud-sidebar v-if="toggleSidebar" @close="toggleSidebar = false" @save="() => {this.$toasted.success('Saved')}">
            <croud-overflow-menu slot="options"  :options="[{name: 'Delete', method() {}}]"></croud-overflow-menu>
            <div class="ui very padded basic segment">
                <div class="ui form">
                    <div class="field">
                        <label>Name</label>
                        <input />
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input />
                    </div>
                </div>
            </div>
        </croud-sidebar>
    </div>

### Responsive Sidebar
For use with croudLayout, If you apply a class of 'responsive' to the sidebar it will take up 100% of the screen width minus the croudLayout side menu width when the window size is reduced.
    <div>
        <button class="ui basic info button" @click="toggleSidebar = true">
            Test Responsive
        </button>
        <croud-sidebar class="responsive" v-show="toggleSidebar" @close="toggleSidebar = false" @save="() => {this.$toasted.success('Saved')}" title="Super Long Title: this will probably be in need of truncation">
            <croud-overflow-menu slot="options"  :options="[{name: 'Delete', method() {}}]"></croud-overflow-menu>
            <div class="ui very padded basic segment">
                <div class="ui form">
                    <div class="field">
                        <label>Name</label>
                        <input />
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input />
                    </div>
                </div>
            </div>
        </croud-sidebar>
    </div
