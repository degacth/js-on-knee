<template>
  <div>
    <ul uk-tab>
      <li class="uk-active"><a>record</a></li>
      <li><a id="configuration-selector">selector</a></li>
    </ul>
    <ul class="uk-switcher">
      <li>
        <dl class="uk-description-list">
          <dt>Record events</dt>
          <dd>
            <list-of-checkbox :items="config.recordEvents" id="configuration-record-events" />
          </dd>

          <dt>Close browser timeout</dt>
          <dd>
            <input type="number"
                   id="configuration-record-close-browser-timeout"
                   class="uk-input uk-form-small"
                   v-model="config.closeBrowserTimeout" />
          </dd>
        </dl>
      </li>
      <li>
        <dl class="uk-description-list">
          <dt>Selector types</dt>
          <dd><list-of-checkbox :items="config.selectorTypes" id="configuration-record-selector-types" /></dd>

          <dt>Root element selector</dt>
          <dd>
            <input type="text"
                   id="configuration-record-root-element"
                   v-model="config.rootElementSelector"
                   placeholder=".root-css-selector"
                   class="uk-input uk-form-small" />
          </dd>

          <dt>Blacklist selector</dt>
          <dd>
            <input type="text"
                   id="configuration-record-blacklist"
                   v-model="config.blacklistSelector"
                   placeholder=".blacklist-css-selector"
                   class="uk-input uk-form-small" />
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
import ListOfCheckbox from '../form/ListOfCheckbox.vue'

export default {
  props: ['config'],
  components: { ListOfCheckbox },
}
</script>
