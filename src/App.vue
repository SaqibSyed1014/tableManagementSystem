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
  methods: {},
};
</script>
