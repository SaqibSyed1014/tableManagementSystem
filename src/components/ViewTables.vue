<template>
  <v-card>
    <v-row class="mb-2 px-5">
      <v-col cols="12" md="3" class="my-auto">Tables</v-col>
      <v-col cols="12" md="9">
        <v-row no-gutters style="grid-gap: 10px; align-items: center;">
          <v-col cols="12" md="5" class="ml-auto">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Table"
                single-line
                hide-details
                class="pt-0 mt-0"
            ></v-text-field>
          </v-col>
          <v-btn color="primary">Add Table</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-data-table
        :headers="tableHeader"
        :items="tableData"
        hide-default-footer
        :search="search"
        class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "ViewTables",
  data: () => ({
    search: '',
    tableHeader: [
      { text: 'Table No', value: 'tableNo', align: 'center' },
      { text: 'Assigned Orders', value: 'orders', align: 'center' }
    ],
    tableData: [
      { tableNo: 1, orders: 4 },
      { tableNo: 2, orders: 1 },
      { tableNo: 3, orders: 0 },
    ],
  }),
}
</script>

<style scoped>

</style>
