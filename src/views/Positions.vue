<template>
  <LoadPanel v-if="loading"/>
  <DxDataGrid v-else
    :data-source="positionDataStore"
    :show-borders="true"
    :column-auto-width="false"
    :hower-state-enabled="true"
    key-expr="ID">
    <DxSearchPanel :visible="true"/>
    <DxHeaderFilter :visible="true"/>
    <DxColumnChooser :enabled="true"/>
    <DxExport
        :enabled="true"
        file-name="Positions"/>
    <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        :use-icons="true"
        mode="popup">
        <DxPopup
          :show-title="true"
          :title="'Position'|localize"/>
        <DxForm>
          <DxItem data-field="Title"/>
          <DxItem data-field="IsChief"/>
      </DxForm>
    </DxEditing>
    <DxColumn 
        data-field="Title" 
        data-type="string"
        width="30%"
        :visible="true"
        :allow-editing="true"
        :caption="'PositionTitle'|localize">
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="IsChief" 
        data-type="boolean"
        :visible="true"
        :allow-editing="true"
        :caption="'PositionIsChief'|localize">
    </DxColumn>
    <DxColumn 
        data-field="AuthorID"
        :visible="false"
        :allow-editing="false"
        :caption="'Author'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="Created" 
        data-type="date" 
        :caption="'Created'|localize"
        :visible="true"
        :allow-editing="false"
        format="dd.MM.yyyy">
    </DxColumn>
    <DxColumn 
        data-field="EditorID"
        :visible="false"
        :allow-editing="false"
        :caption="'Editor'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="Modified" 
        data-type="date" 
        :caption="'Modified'|localize"
        :visible="true"
        :allow-editing="false"
        format="dd.MM.yyyy">
    </DxColumn>
  </DxDataGrid>
</template>
<script>


import { DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport } from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';

import { mapGetters, mapActions } from "vuex"

import CustomStore from 'devextreme/data/custom_store';


export default {
  components: {
    DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxItem, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport
  },
  methods: {
    ...mapActions(["loadUsers", "loadPositions", "createPosition", "updatePosition", "deletePosition"])
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(["getPositions", "getUsers"]),
    positionDataStore () {
      return new CustomStore({
        key: 'ID',
        load: async () => {
          return this.getPositions;
        },
        insert: async (values) => {
          await this.createPosition(values);
        },
        update: async (key, values) => {
          await this.updatePosition({key, values});
        },
        remove: async (key) => {
          await this.deletePosition(key);
        }
      })
    },
  },
  async mounted() {
    await this.loadUsers();
    await this.loadPositions();
    this.loading = false;
  }
};
</script>
