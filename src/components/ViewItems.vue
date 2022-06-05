<template>
  <v-card>
    <v-row class="mb-2 px-5">
      <v-col cols="12" md="3" class="my-auto">Items Table</v-col>
      <v-col cols="12" md="9">
        <v-row no-gutters style="grid-gap: 10px; align-items: center;">
          <v-col cols="12" md="5" class="ml-auto">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Item"
                single-line
                hide-details
                class="pt-0 mt-0"
            ></v-text-field>
          </v-col>
          <v-btn color="primary">Add Item</v-btn>
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
  name: "ViewItems",
  data: () => ({
    search: '',
    tableHeader: [
      { text: 'Item Name', value: 'itemName', align: 'center' },
      { text: 'Category', value: 'category', align: 'center' }
    ],
    tableData: [
      { itemName: 'Biryani', category: 'Indian' },
      { itemName: 'Korma', category: 'Indian' },
      { itemName: 'Chowmen', category: 'Chinese' },
    ],
  }),
}
</script>

<style scoped>

</style>
