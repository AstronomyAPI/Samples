<template>
  <div class="floating">
    <div class="row">
      <button @click="drawerAction">{{ drawerTitle }}</button>
    </div>
    <div class="row panel" v-bind:class="{ expanded: expanded }">
      <div class="column column-30" ref="requestView">
        <select
          class="float-right"
          @change="generateSnippet"
          v-model="store.language"
        >
          <option value="javascript">Javascript</option>
          <option value="node">NodeJs</option>
          <option value="php">PHP</option>
          <option value="java">Java</option>
          <option value="go">Go</option>
          <option value="python">Python</option>
          <option value="csharp">C#</option>
        </select>
        <h6>Request</h6>
        <pre :style="{ width: requestViewWidth + 'px' }">{{
          store.request
        }}</pre>
      </div>
      <div class="column column-60" ref="responseView">
        <h6>Response</h6>
        <pre :style="{ width: responseViewWidth + 'px' }">{{
          store.response
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins.js";
import { store } from "../store.js";

export default {
  mixins: [mixins],
  data() {
    return {
      store,
      expanded: false,
      drawerTitle: "ᐃ Show Console",
      requestViewWidth: 0,
      responseViewWidth: 0
    };
  },
  methods: {
    drawerAction() {
      this.expanded = !this.expanded;
      this.drawerTitle = this.expanded ? "ᐁ Hide Console" : "ᐃ Show Console";
      setTimeout(this.changeWidth, 100);
    },
    changeWidth() {
      this.requestViewWidth = this.$refs.requestView.clientWidth;
      this.responseViewWidth = this.$refs.responseView.clientWidth - 40;
    }
  },
  created() {
    window.addEventListener("resize", this.changeWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.changeWidth);
  },
  mounted() {
    this.changeWidth();
  }
};
</script>
