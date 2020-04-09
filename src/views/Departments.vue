<template>
  <LoadPanel v-if="loading"/>
  <DxDataGrid v-else
    :data-source="departmentDataStore"
    :show-borders="true"
    :column-auto-width="false"
    :hower-state-enabled="true"
    key-expr="ID">
    <DxSearchPanel :visible="true"/>
    <DxHeaderFilter :visible="true"/>
    <DxColumnChooser :enabled="true"/>
    <DxExport
        :enabled="true"
        file-name="Departments"/>
    <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        :use-icons="true"
        mode="popup">
        <DxPopup
          :show-title="true"
          :title="'Department'|localize"/>
        <DxForm>
          <DxItem data-field="Title"/>
          <DxItem data-field="ChiefID"
            editor-type="dxLookup"/>
      </DxForm>
    </DxEditing>
    <DxColumn 
        data-field="Title" 
        data-type="string"
        width="20%"
        :visible="true"
        :allow-editing="true"
        :caption="'Title'|localize">
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="ChiefID"
        :visible="true"
        :allow-editing="true"
        :caption="'DepartmentChief'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
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
    ...mapActions(["loadUsers", "loadDepartments", "createDepartment", "updateDepartment", "deleteDepartment"])
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(["getDepartments", "getUsers"]),
    departmentDataStore () {
      return new CustomStore({
        key: 'ID',
        load: async () => {
          return this.getDepartments;
        },
        insert: async (values) => {
          await this.createDepartment(values);
        },
        update: async (key, values) => {
          await this.updateDepartment({key, values});
        },
        remove: async (key) => {
          await this.deleteDepartment(key);
        }
      })
    },
  },
  async mounted() {
    await this.loadUsers();
    await this.loadDepartments();
    this.loading = false;
  }
};
</script>
