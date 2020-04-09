<template>
  <DxDropDownBox
    :data-source="dataSource"
    :value.sync="selectedValues"
    display-expr="Title"
    value-expr="ID"
    content-template="contentTemplate"
  >
    <template #contentTemplate>
      <DxDataGrid
        :data-source="dataSource"
        :selected-row-keys.sync="selectedValues"
        :hover-state-enabled="true"
        :on-selection-changed="onSelectionChanged"
        :focused-row-enabled="true"
        key-expr="ID"
      >
        <DxPaging
          :enabled="true"
          :page-size="10" />
        <DxSelection mode="multiple"/>
        <DxHeaderFilter :visible="true"/>
        <DxColumn 
            data-field="Title" 
            data-type="string"
            :caption="'Name'|localize">
        </DxColumn>
      </DxDataGrid>
    </template>
  </DxDropDownBox>
</template>
<script>

import { DxDataGrid, DxColumn, DxPaging, DxSelection, DxHeaderFilter } from 'devextreme-vue/data-grid';
import DxDropDownBox from 'devextreme-vue/drop-down-box';

export default {
  components: { DxDataGrid, DxColumn, DxPaging, DxSelection, DxDropDownBox, DxHeaderFilter },
  props: {
    value: {
      type: Array,
      default: null
    },
    // columns: {
    //   type: Object,
    //   default: () => {}
    // },
    onValueChanged: {
      type: Function,
      default: () => function() {}
    },
    dataSource: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectedValues: this.value
    };
  },
  methods: {
    onSelectionChanged(e) {
      this.selectedValues = e.selectedRowKeys;
      this.onValueChanged(this.selectedValues);
    }
  }
};
</script>
