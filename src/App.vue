<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.smAndUp" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My files</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        app
        v-model="drawer"
        dark
        left
        :permanent="$vuetify.breakpoint.smAndUp"
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Table Ordering System
            </v-list-item-title>
            <v-list-item-subtitle>By Saqib Syed</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
          nav
          dense
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-eye</v-icon>
          </v-list-item-icon>
          <v-list-item-title>View Orders</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main><p
        class="title grey--text text--lighten-1 font-weight-light text-xs-center mx-4 my-5"
    >Content</p></v-main>
  </v-app>
</template>

<script>
// import SideBar from "./components/SideBar";

export default {
  name: 'App',
  components: {
  },

  data: () => ({
    drawer: false,
  }),
};
</script>
