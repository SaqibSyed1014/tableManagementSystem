<template>
  <v-app>
    <side-bar />
    <v-main>
      <div class="mx-4 my-10">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar";

export default {
  name: 'App',
  components: {
    SideBar,
  },
  created() {
    console.log(this.$vuetify.theme.themes.light.primary)
    this.$vuetify.theme.themes.light.primary = '#4cb5f5'
  },
  methods: {},
};
</script>

<style lang="scss">
.row-pointer > .v-data-table__wrapper > table > tbody > tr:hover {
  cursor: pointer;
}
</style>
