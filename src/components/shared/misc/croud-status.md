### Basic usage
Simply add the **croud-status** in the markup and pass through the context in a prop

    <table class="ui very basic fixed table">
        <tr>
            <td>
                <croud-status :context="{contextual_status: { status: 'Scheduled', colour: 'blue' }}" />
            </td>
            <td>
                <croud-status :context="{contextual_status: { status: 'Open', colour: 'green' }}" />
            </td>
            <td>
                <croud-status :context="{contextual_status: { status: 'In Progress', colour: 'yellow' }}" />
            </td>
            <td>
                <croud-status :context="{contextual_status: { status: 'Submitted', colour: 'blue' }}" />
            </td>
            <td>
                <croud-status :context="{contextual_status: { status: 'Request Revisions', colour: 'orange' }}" />
            </td>

        </tr>
    </table>


