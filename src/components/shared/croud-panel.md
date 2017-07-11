### Simple Panel

    <croud-panel title="Basic Panel">
        <div class="ui basic segment">Here is a Panel</div>
    </croud-panel>

### Extra slot
You can use the **extra** slot to display additional options to the top right of the card

    <croud-panel title="Options Card">
        <div slot="extra" class="item">
            <div class="ui icon mini basic buttons">
                <button class="ui icon button">
                    <i class="left chevron icon"></i>
                </button>
                <button class="ui icon button">
                    <i class="right chevron icon"></i>
                </button>
            </div>
        </div>
        <div class="ui basic segment">Look up there...</div>
    </croud-panel>
