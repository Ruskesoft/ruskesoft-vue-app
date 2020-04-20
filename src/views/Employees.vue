<template>
  <LoadPanel v-if="loading"/>
  <DxDataGrid v-else
    :data-source="employeeDataStore"
    :show-borders="true"
    :column-auto-width="false"
    :hower-state-enabled="true"
    key-expr="ID">
    <DxSearchPanel :visible="true"/>
    <DxHeaderFilter :visible="true"/>
    <DxGroupPanel :visible="true"/>
    <DxColumnChooser :enabled="true"/>
    <DxExport
        :enabled="true"
        :file-name="'Employees'|localize"/>
    <DxEditing
        :allow-adding="false"
        :allow-updating="true"
        :allow-deleting="true"
        :use-icons="true"
        mode="popup">
        <DxPopup
          :show-title="true"
          :title="'Employee'|localize"/>
        <DxForm>
          <DxItem data-field="Title"/>
          <DxItem data-field="EmployeeNumber"/>
          <DxItem data-field="PhoneNumber"/>
          <DxItem data-field="DepartmentID"/>
          <DxItem data-field="PositionID"/>
        </DxForm>
    </DxEditing>
    <DxColumn 
        data-field="Title" 
        data-type="string"
        width="30%"
        :visible="true"
        :caption="'EmployeeTitle'|localize">
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="PositionID"
        :visible="true"
        :caption="'EmployeePosition'|localize">
        <DxLookup
          :data-source="getPositions"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="EmployeeNumber" 
        data-type="string"
        :visible="true"
        :caption="'EmployeeNumber'|localize">
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="Email" 
        data-type="string"
        :visible="true"
        :allow-editing="false"
        :caption="'EmployeeEmail'|localize">
    </DxColumn>
    <DxColumn 
        data-field="PhoneNumber" 
        data-type="string"
        :visible="true"
        :caption="'EmployeePhoneNumber'|localize">
    </DxColumn>
    <DxColumn 
        data-field="DepartmentID"
        :visible="true"
        :group-index="0"
        :caption="'EmployeeDepartment'|localize">
        <DxLookup
          :data-source="getDepartments"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="AuthorID"
        :visible="false"
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
        :visible="false"
        format="dd.MM.yyyy">
    </DxColumn>
    <DxColumn 
        data-field="EditorID"
        :visible="false"
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
        :visible="false"
        format="dd.MM.yyyy">
    </DxColumn>
  </DxDataGrid>
</template>
<script>


import { DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxGroupPanel, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport } from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';

import { mapGetters, mapActions } from "vuex"

import CustomStore from 'devextreme/data/custom_store';


export default {
  components: {
    DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxItem, DxGroupPanel, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport
  },
  methods: {
    ...mapActions(["loadDepartments", "loadPositions", "loadUsers", "createUser", "updateUser", "deleteUser"])
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(["getDepartments", "getPositions", "getUsers"]),
    employeeDataStore () {
      return new CustomStore({
        key: 'ID',
        load: async () => {
          return this.getUsers;
        },
        insert: async (values) => {
          await this.createUser(values);
        },
        update: async (key, values) => {
          await this.updateUser({key, values});
        },
        remove: async (key) => {
          await this.deleteUser(key);
        }
      })
    },
  },
  async mounted() {
    await this.loadDepartments();
    await this.loadPositions();
    await this.loadUsers();
    this.loading = false;
  }
};
</script>
