<template>
<div class="ui container">
    <h1 class="ui header">Croud Style Guide</h1>

    <h2 class="ui dividing header">Site</h2>
    <div class="ui three column stackable grid">
    <div class="column">
        <h1 class="ui header">Heading 1</h1>
        <h2 class="ui header">Heading 2</h2>
        <h3 class="ui header">Heading 3</h3>
        <h4 class="ui header">Heading 4</h4>
        <h5 class="ui header">Heading 5</h5>
        <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
    </div>
    <div class="column">
        <h2>Example body text</h2>
        <p>Nullam quis risus eget <a href="#">urna mollis ornare</a> vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
        <p><small>This line of text is meant to be treated as fine print.</small></p>
        <p>The following snippet of text is <strong>rendered as bold text</strong>.</p>
        <p>The following snippet of text is <em>rendered as italicized text</em>.</p>
        <p>An abbreviation of the word attribute is <abbr title="attribute">attr</abbr>.</p>
    </div>

    <div class="column">
        <div class="ui two column stackable padded middle aligned centered color grid">
        <div class="yellow column">#f3c91d</div>
        <div class="green column">#6dd1be</div>
        <div class="red column">#ea6b65</div>
        <div class="purple column">#9f6daf</div>
        <div class="blue column">#3e86a3</div>
        <div class="black column">#ea6b65</div>
        <div class="grey column">#ea6b65</div>
        <div class="column">white</div>
        </div>
    </div>
    </div>

    <h2 class="ui dividing header">Buttons</h2>

    <div class="ui stackable equal width grid">
  <div class="column">
    <h4>Buttons should have the below propertys</h4>
    <button class="ui basic black button">Basic</button>
    <button class="ui primary button">Primary</button>
    <button class="ui secondary button">Secondary</button>
    <button class="ui blue button">Action</button>
    <button class="ui button">Default</button>

    <div class="ui divider"></div>
    <button class="ui icon button">
      <i class="heart icon"></i>
    </button>

    <div class="ui divider"></div>

    <button class="ui disabled button">Disabled</button>
    <button class="ui loading button">Loading</button>

  </div>
  <div>

  </div>
</div>

<h2 class="ui dividing header">Input</h2>

<div class="ui two column stackable grid">
  <div class="column">

    <div class="ui action left icon input">
      <i class="search icon"></i>
      <input type="text" placeholder="Search...">
      <div class="ui teal button">Search</div>
    </div>

    <div class="ui divider"></div>
    <div class="ui input error">
      <input placeholder="Search..." type="text">
    </div>
    <div class="ui divider"></div>

    <div class="ui right labeled input">
      <input placeholder="Placeholder" type="text">
      <div class="ui dropdown label" tabindex="0">
        <div class="text">Dropdown</div>
        <i class="dropdown icon"></i>
        <div class="menu" tabindex="-1">
          <div class="item">Choice 1</div>
          <div class="item">Choice 2</div>
          <div class="item">Choice 3</div>
        </div>
      </div>
    </div>
    <div class="ui divider"></div>

    <div class="ui transparent icon input">
      <input placeholder="Search..." type="text">
      <i class="search icon"></i>
    </div>
    <div class="ui transparent left icon input">
      <input placeholder="Search..." type="text">
      <i class="search icon"></i>
    </div>
    <div class="ui divider"></div>
    <div class="ui left icon input loading">
      <input placeholder="Loading..." type="text">
      <i class="search icon"></i>
    </div>

    <div class="ui icon input loading">
      <input placeholder="Loading..." type="text">
      <i class="search icon"></i>
    </div>

  </div>
  <div class="column">
    <div class="ui right labeled left icon input">
      <i class="tags icon"></i>
      <input placeholder="Enter tags" type="text">
      <a class="ui tag label">
        Add Tag
      </a>
    </div>
    <div class="ui divider"></div>
    <div class="ui labeled input">
      <a class="ui label">
        Label
      </a>
      <input type="text" placeholder="Placeholder...">
    </div>
    <div class="ui divider"></div>
    <div class="ui right labeled input">
      <input type="text" placeholder="Placeholder...">
      <a class="ui label">
        Label
      </a>
    </div>
    <div class="ui divider"></div>
    <div class="ui labeled icon input">
      <div class="ui label">
        http://
      </div>
      <input type="text" placeholder="domain.com">
      <i class="add circle link icon"></i>
    </div>
    <div class="ui right action input">
      <input type="text" placeholder="domain.com">
      <div class="ui teal button">
        <i class="add icon"></i>
        Add
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui corner labeled input">
      <input type="text" placeholder="Required Field">
      <div class="ui corner label">
        <i class="asterisk icon"></i>
      </div>
    </div>
  </div>
</div>

    <accordion-showcase></accordion-showcase>
    <formDropdown-showcase></formDropdown-showcase>
    <search-showcase></search-showcase>
    <modal-showcase></modal-showcase>
    <checkbox-showcase></checkbox-showcase>
    <radio-showcase></radio-showcase>
    <message-showcase></message-showcase>
    <statistic-showcase></statistic-showcase>
    <reveal-showcase></reveal-showcase>
    <loading-showcase></loading-showcase>
    <semLabel-showcase></semLabel-showcase>
    <divider-showcase></divider-showcase>
    <column-showcase></column-showcase>
    <pagination-showcase></pagination-showcase>

  <!--<h2 class="ui dividing header">Menu</h2>
  <iframe src="components/menu.html" width="100%" scrolling="no" id="iFrameResizer1" style="overflow: hidden; height: 621px;"></iframe>

  <h2 class="ui dividing header">Buttons</h2>
  <iframe src="components/button.html" width="100%" scrolling="no" id="iFrameResizer2" style="overflow: hidden; height: 1050px;"></iframe>

  <h2 class="ui dividing header">Table</h2>
  <iframe src="components/table.html" width="100%" scrolling="no" id="iFrameResizer3" style="overflow: hidden; height: 4113px;"></iframe>

  <h2 class="ui dividing header">Input</h2>
  <iframe src="components/input.html" width="100%" scrolling="no" id="iFrameResizer4" style="overflow: hidden; height: 658px;"></iframe>


  <h2 class="ui dividing header">Card</h2>
  <iframe src="components/card.html" width="100%" scrolling="no" id="iFrameResizer5" style="overflow: hidden; height: 1125px;"></iframe>-->


</div>
</template>

<script>

export default {
    name: 'Hello',
    components: {
    },
    data() {
        return {
            hello: 'Hello Vue2 Shell',
        }
    },
    methods: {
    },
    mounted() {
    },
    computed: {
    },
    watch: {
    },
}
</script>

<style scoped>
</style>
