### Basic usage
Simply add the **croud-status** in the markup and pass through the context in a prop

    <table class="ui very basic fixed table">
        <tr>
            <td>
                <croud-status :context="{status: 'new'}" />
            </td>
            <td>
                <croud-status :context="{status: 'open'}" />
            </td>
            <td>
                <croud-status :context="{status: 'in_progress'}" />
            </td>
            <td>
                <croud-status :context="{status: 'approval'}" />
            </td>
            <td>
                <croud-status :context="{status: 'complete'}" />
            </td>
            <td>
                <croud-status :context="{status: 'deleted'}" />
            </td>
        </tr>
    </table>


