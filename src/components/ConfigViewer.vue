<template>
  <div>
    <p class="text-sm pb-2">User config (Tasker/Web Screens/Assistant/user-config.json)</p>
    <div class="overflow-auto h-32 bg-gray-100 p-2">
      <p class="font-mono text-sm">
        {{ config }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigViewer',
  computed: {
    config () {
      return this.$store.state.userConfig
    }
  }
}
</script>