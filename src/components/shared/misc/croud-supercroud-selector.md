### Basic Usage
Simply define a v-modal, the current users id and an array of teams.

    <croud-supercroud-selector
        v-model="supercroudSelector.value"
        currentUserId="1"
        :teamsArray="supercroudSelector.teams"
    />

### Additional Users
Additional users can be defined using the options prop

    <croud-supercroud-selector
        v-model="supercroudSelector.value"
        currentUserId="1"
        :teamsArray="supercroudSelector.teams"
        :options="supercroudSelector.additionalUser"
    />
