### Basic usage

    <summary-view
        :highlight="[today, today.clone().add(-1, 'months'), today.clone().add(1, 'months')]"
        :range="{start: today.clone().add(-1, 'months'), end: today.clone().add(1, 'months')}"
    />
