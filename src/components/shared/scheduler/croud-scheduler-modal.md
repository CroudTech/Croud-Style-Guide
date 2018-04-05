This component wraps our [croud scheduler editor](#croud-scheduler-editor)  component in a modal

### Usage
As with the croud scheduler editor component, simply provide the :root-object prop passing the root object you wish the scheduler schema to be appended to, this will be done through the schedule-set event which will pass through your root object with the scheduler schema appended when the 'Done' button is clicked

You can then listen for the @schedule-set event and manipulate the data/update your data with the logic you see fit

e.g. Below we are passing through our root object and listening for the schedule-set event, we are then calling the updateRootObject method which is passed our updated rootObject and that is updating our schedulerSchema Object

    <croud-scheduler-modal :root-object="schedulerSchema" @schedule-set="updateRootObject"/>

```js static
// Example update method, this is using Object.assign to make our appended items reactive
updateRootObject(updatedObject) {
    this.schedulerSchema = Object.assign(updatedObject)
}
```
