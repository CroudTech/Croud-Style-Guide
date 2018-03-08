A component that gives a textual representation of a schedule

### Basic usage
Pass the object containing the schedule schema keys through to the component, this will merge with a base schedule to protect the project against schema updates

    <croud-scheduler-text :root-object="schedulerSchema" />
