<template>
  <div class="mb-6" id="search">
    <input
      ref="searchField"
      class="bg-gray-100 outline-none hover:bg-gray-200 focus:bg-gray-200 rounded-full py-3 px-6 text-sm block w-full appearance-none leading-normal"
      v-model="input"
      @keydown.enter="$refs.go.click()"
      placeholder="Search Google"
    />
    <a
      v-show="true == false"
      :href="'autotoolscommand://assistant=:=search=:=www.google.com/search?q=' + input"
      ref="go"
    ></a>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      input: '',
    }
  },
  computed: {
    config () {
      return this.$store.state.userConfig
    }
  },
  mounted () {
    this.$refs.searchField.focus()
  },
  methods: {
  }
}
</script>