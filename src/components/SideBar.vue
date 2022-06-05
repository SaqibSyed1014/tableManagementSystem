<template>
  <span>
    <v-app-bar app dark>
      <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.smAndUp" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
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
        <v-list-item link :to="item.link" v-for="item in sideBarItems" :key="item.name">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>

<script>
export default {
  name: "SideBar",
  data: () => ({
    sideBarItems: [
      { name: 'Dashboard', link: '/', icon: 'mdi-view-dashboard' },
      { name: 'View Categories', link: '/categories', icon: 'mdi-dots-grid' },
      { name: 'View Items', link: '/items', icon: 'mdi-cart-heart' },
      { name: 'View Table', link: '/tables', icon: 'mdi-table-furniture' },
      { name: 'View Orders', link: '/orders', icon: 'mdi-order-bool-descending' },
    ],
    drawer: false,
  }),
}
</script>
