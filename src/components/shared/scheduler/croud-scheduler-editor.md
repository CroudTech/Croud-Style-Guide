This is our current scheduler editor, which you can use directly or through our [croud scheduler modal](#croud-scheduler-modal) component

### Basic usage
Simply provide the v-model attribute with a scheduler schema mapped as below..

```js static
schedulerSchema: {
    months: {
        january: false,
        february: false,
        march: false,
        april: false,
        may: false,
        june: false,
        july: false,
        august: false,
        september: false,
        october: false,
        november: false,
        december: false,
    },
    days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    },
    recur: 'daily',
    at: '00:00',
    timezone: ' Europe/London',
    limit: {
        from: 'YYYY-MM-DD hh:mm:ss',
        to: 'YYYY-MM-DD hh:mm:ss',
        count: 1
    },
}
```
    <croud-scheduler-editor v-model="schedulerSchema" />
