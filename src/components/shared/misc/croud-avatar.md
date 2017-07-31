### Basic usage

    <div>
        <croud-avatar :user="{name: 'Homer J Simpson', avatar: '//lorempicsum.com/simpsons/450/450/1'}" />
        <croud-avatar size="tiny" :user="{name: 'Marge Simpson', avatar: '//lorempicsum.com/simpsons/200/200/2'}" />
        <croud-avatar size="mini" :user="{name: 'Bart Simpson', avatar: '//lorempicsum.com/simpsons/200/200/7'}" />
    </div>


### Fallback
If there is no avatar url or the image fails to load, the component will fallback to show an svg of the **initials** of the user on top of a secondary colour from our styleguide

    <div>
        <croud-avatar :user="{name: 'Bart Simpson'}" />
        <croud-avatar size="tiny" :user="{name: 'Marge Simpson', avatar: '//lorempicsum.com/simpsons/450/450/10'}" />
        <croud-avatar size="mini" :user="{name: 'Homer J Simpson', avatar: ''}" />
    </div>

