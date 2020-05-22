<template>
  <div class="e-collapsable-list-item">
    <header v-show="collapse" @click.self="toggleOpening">
      <slot name="header" />
      <i :class="{ fas: true, 'fa-chevron-down': true, opening }"></i>
    </header>
    <transition name="content" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div v-show="opening || !collapse">
        <div class="line-numbers">
          <pre><code ref="code" :class="['lang-' + lang]" >{{value}}</code></pre>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
function nextFrame(fn) {
  window.requestAnimationFrame(() => window.requestAnimationFrame(fn));
}

export default {
  props: {
    lang: {
      default: "json",
      type: String
    },
    value: {
      default: "",
      type: String
    },
    collapse: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      opening: false
    };
  },
  watch: {
    value() {
      this.redraw();
    }
  },
  mounted() {
    this.redraw();
  },
  methods: {
    toggleOpening() {
      this.opening = !this.opening;
    },
    enter(el) {
      el.style.overflow = "hidden";
      el.style.height = "0";

      nextFrame(() => {
        el.style.height = `${el.scrollHeight}px`;
      });
    },
    leave(el) {
      el.style.overflow = "hidden";
      el.style.height = `${el.scrollHeight}px`;

      nextFrame(() => {
        el.style.height = "0";
      });
    },
    afterEnter(el) {
      el.style.height = "";
      el.style.overflow = "";
    },
    afterLeave(el) {
      el.style.height = "";
      el.style.overflow = "";
    },
    redraw() {
      this.$refs.code.textContent = this.value;
      this.html = Prism.highlightElement(this.$refs.code);
    }
  }
};
</script>

<style lang="scss" scoped>
.e-collapsable-list-item {
  position: relative;
  transition: all ease 0.1s;
  header {
    padding: 8px;
    transition: all ease 0.1s;
    height: 2.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 48px;
    border-bottom: 2px solid $color-gray;
    .button,
    button,
    a {
      font-size: 0.9em;
      padding: 4px 8px;
    }
    i.fa-chevron-down {
      position: absolute;
      top: 0.8em;
      right: 16px;
      transition: all ease 0.2s;
      &.opening {
        transform: rotate(-180deg);
      }
    }
    &:hover {
      background-color: $color-gray-bg;
    }
  }

  .content {
    padding: 8px;
    border-top: 1px solid $color-gray-bg;
  }
}
.content-enter-active,
.content-leave-active {
  transition: height ease 0.2s;
}

.line-numbers {
  max-width: 100%;
  pre {
    @include mq-max("sm") {
      max-height: 15em;
    }
  }
}
</style>
