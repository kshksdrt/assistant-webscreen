<template>
  <div id="app" class="container">
    <MainView />
  </div>
</template>

<script>
import MainView from "@/views/MainView";

export default {
  name: "App",
  components: { MainView },
  data () {
    return {
    };
  },
  computed: {
    userConfig () {
      return this.$store.state.userConfig
    }
  },
  created() {
    if (this.$store.state.production == true)
      this.$store.commit(
        "storeUserConfig",
        // eslint-disable-next-line
        JSON.parse(userConfig)
      );
  },
  beforeDestroy () {
    // Removes all event listeners
    this.$root.$off()
  },
  methods: {
  }
};
</script>

<style>
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  transition: opacity 0.5s;
  animation: slide-in 0.5s;
}

.slide-leave {
  opacity: 1;
}

.slide-leave-active {
  transition: opacity 0.5s;
  animation: slide-out 0.5s;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(40px);
  }
  to {
    transform: translateY(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(40px);
  }
}
</style>