This is our current scheduler editor, which you can use directly or through our [croud scheduler modal](#croud-scheduler-modal) component

### Usage
Simply provide the :root-object prop passing the root object you wish the scheduler schema to be appended to, this will be done through the schedule-set event which will pass through your root object with the scheduler schema appended when the 'Done' button is clicked

You can then listen for the @schedule-set event and manipulate the data/update your data with the logic you see fit

e.g. Below we are passing through our root object and listening for the schedule-set event, we are then calling the updateRootObject method which is passed our updated rootObject and that is updating our schedulerSchema Object

    <croud-scheduler-editor :root-object="schedulerSchema" @schedule-set="updateRootObject"/>

```js static
// Example update method, this is using Object.assign to make our appended items reactive
updateRootObject(updatedObject) {
    this.schedulerSchema = Object.assign(updatedObject)
}
```

```js static
// Example of the root object before the scheduler schema is applied
schedulerSchema: {
    id: 1,
    name: 'rootObject',
}

// Example of the root object after the scheduler schema is applied
schedulerSchema: {
    id: 1,
    name: 'rootObject',
    'service=scheduler;table=timetables;field=frequency;': {
        recur: 'daily',
        at: ['00:00'],
        timezone: 'Europe/London',
        months: ['march', 'april', 'may'],
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    },
    'service=scheduler;table=timetables;field=max_executions;': null,
    'service=scheduler;table=timetables;field=starts_at;': '2018-03-01 00:00:00',
    'service=scheduler;table=timetables;field=ends_at;': '2018-05-31 23:59:59' },
}
```
