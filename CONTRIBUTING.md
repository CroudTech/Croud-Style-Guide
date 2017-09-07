## How to Contribute

Hey! It's great that you want to share with the rest of us!

At this very early stage, we need to gain some traction so don't be afraid to add some new reuseable components. However, as with most things, there are a few rules that we would like you to follow.

***Boooooooo!***

### Semantic UI Overrides

Any changes made to Semanti UI theme and overrides **must** be stored in the following directory:

    semantic/src/site/

If you store it in the *themes* directory then all changes will be lost when Semantic UI is updated.

### Technical Documentation

Please ensure any new components added to the technical documentation comply with the following rules:

* At least one example of the new component must be visible
* All component props must have a basic description


### Testing

We use [Jest](https://facebook.github.io/jest/) to test our components. Be sure to add a [snapshot](https://facebook.github.io/jest/docs/en/snapshot-testing.html) test at the very least.
