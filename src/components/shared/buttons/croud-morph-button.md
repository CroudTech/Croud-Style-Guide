### Basic Morph Button 

    <croud-morph-button :options="[{name: 'Follow', method: ()=>{ this.$toasted.show('Following') }}, {name: 'Unfollow', method: ()=> { this.$toasted.show('Unfollowed') }}]" />

You can choose to make the second option active on render by using the *active* prop.

    <croud-morph-button :active="1" :options="[{name: 'Follow', method: ()=>{ this.$toasted.show('Following')}}, {name: 'Unfollow', method: ()=> { this.$toasted.show('Unfollowed') }}]" />

### Styled Morph Button

You can style the button just like you would any other semantic button. Just apply the classes to the component instance.
    
    <croud-morph-button class="primary" :options="[{name: 'Follow', method: ()=>{ this.$toasted.show('Following')}}, {name: 'Unfollow', method: ()=> { this.$toasted.show('Unfollowed') }}]" />

You can also turn the button into a secondary button just by passing the *basic* class.

    <croud-morph-button class="basic blue" :options="[{name: 'Follow', method: ()=>{ this.$toasted.show('Following')}}, {name: 'Unfollow', method: ()=> { this.$toasted.show('Unfollowed') }}]" />

