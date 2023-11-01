export const GRID_EDITED_LOCALE_TEXT = {
    // Root
    noRowsLabel: 'Sonuç yok',
    noResultsOverlayLabel: 'Sonuç bulunamadı.',

    // Density selector toolbar button text
    toolbarDensity: 'Büyüklük',
    toolbarDensityLabel: 'Büyüklük',
    toolbarDensityCompact: 'Küçük',
    toolbarDensityStandard: 'Orta',
    toolbarDensityComfortable: 'Büyük',

    // Columns selector toolbar button text
    toolbarColumns: 'Kolonlar',
    toolbarColumnsLabel: 'Seçili kolon',

    // Filters toolbar button text
    toolbarFilters: 'Filtre',
    toolbarFiltersLabel: 'Filtreleri göster',
    toolbarFiltersTooltipHide: 'Filtrleri gizle',
    toolbarFiltersTooltipShow: 'Filtreleri göster',
    toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} active filters` : `${count} active filter`,

    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Ara...',
    toolbarQuickFilterLabel: 'Ara',
    toolbarQuickFilterDeleteIconLabel: 'Temizle',

    // Export selector toolbar button text
    toolbarExport: 'Dışa aktar',
    toolbarExportLabel: 'Dışa aktar',
    toolbarExportCSV: 'CSV İndir',
    toolbarExportPrint: 'Yazdır',
    toolbarExportExcel: 'Download as Excel',

    // Columns panel text
    columnsPanelTextFieldLabel: 'Kolonu bul',
    columnsPanelTextFieldPlaceholder: 'Kolon adı',
    columnsPanelDragIconLabel: 'Kolonu yeniden sırala',
    columnsPanelShowAllButton: 'Tümünü göster',
    columnsPanelHideAllButton: 'Tümünü gizle',

    // Filter panel text
    filterPanelAddFilter: 'Add filter',
    filterPanelRemoveAll: 'Remove all',
    filterPanelDeleteIconLabel: 'Delete',
    filterPanelLogicOperator: 'Logic operator',
    filterPanelOperator: 'Koşul',
    filterPanelOperatorAnd: 'And',
    filterPanelOperatorOr: 'Or',
    filterPanelColumns: 'Kolon',
    filterPanelInputLabel: 'Değer',
    filterPanelInputPlaceholder: 'Filter value',

    // Filter operators text
    filterOperatorContains: 'İçeriyorsa',
    filterOperatorEquals: 'Eşitse',
    filterOperatorStartsWith: 'Başlıyorsa',
    filterOperatorEndsWith: 'Bitiyorsa',
    filterOperatorIs: 'is',
    filterOperatorNot: 'is not',
    filterOperatorAfter: 'is after',
    filterOperatorOnOrAfter: 'is on or after',
    filterOperatorBefore: 'is before',
    filterOperatorOnOrBefore: 'is on or before',
    filterOperatorIsEmpty: 'Boşsa',
    filterOperatorIsNotEmpty: 'Boş değilse',
    filterOperatorIsAnyOf: 'Hepsi',
    'filterOperator=': '=',
    'filterOperator!=': '!=',
    'filterOperator>': '>',
    'filterOperator>=': '>=',
    'filterOperator<': '<',
    'filterOperator<=': '<=',

    // Header filter operators text
    headerFilterOperatorContains: 'İçeriyorsa',
    headerFilterOperatorEquals: 'Eşitse',
    headerFilterOperatorStartsWith: 'Başlıyorsa',
    headerFilterOperatorEndsWith: 'Bitiyorsa',
    headerFilterOperatorIs: 'Is',
    headerFilterOperatorNot: 'Is not',
    headerFilterOperatorAfter: 'Is after',
    headerFilterOperatorOnOrAfter: 'Is on or after',
    headerFilterOperatorBefore: 'Is before',
    headerFilterOperatorOnOrBefore: 'Is on or before',
    headerFilterOperatorIsEmpty: 'Boşsa',
    headerFilterOperatorIsNotEmpty: 'Boş değilse',
    headerFilterOperatorIsAnyOf: 'Hepsi',
    'headerFilterOperator=': 'Equals',
    'headerFilterOperator!=': 'Not equals',
    'headerFilterOperator>': 'Greater than',
    'headerFilterOperator>=': 'Greater than or equal to',
    'headerFilterOperator<': 'Less than',
    'headerFilterOperator<=': 'Less than or equal to',

    // Filter values text
    filterValueAny: 'any',
    filterValueTrue: 'true',
    filterValueFalse: 'false',

    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Kolonu göster',
    columnMenuManageColumns: 'Kolonu yönet',
    columnMenuFilter: 'Filtre',
    columnMenuHideColumn: 'Kolonu gizle',
    columnMenuUnsort: 'Sıralamayı kaldır',
    columnMenuSortAsc: 'Artana göre sırala',
    columnMenuSortDesc: 'Azalana göre sırala',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} active filters` : `${count} active filter`,
    columnHeaderFiltersLabel: 'Show filters',
    columnHeaderSortIconLabel: 'Sort',

    // Rows selected footer text
    footerRowSelected: (count) =>
        `${count.toLocaleString()} öğe seçildi`,

    // Total row amount footer text
    footerTotalRows: 'Toplam Satır:',

    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: 'Checkbox selection',
    checkboxSelectionSelectAllRows: 'Select all rows',
    checkboxSelectionUnselectAllRows: 'Unselect all rows',
    checkboxSelectionSelectRow: 'Select row',
    checkboxSelectionUnselectRow: 'Unselect row',

    // Boolean cell text
    booleanCellTrueLabel: 'yes',
    booleanCellFalseLabel: 'no',

    // Actions cell more text
    actionsCellMore: 'more',

    // Column pinning text
    pinToLeft: 'Pin to left',
    pinToRight: 'Pin to right',
    unpin: 'Unpin',

    // Tree Data
    treeDataGroupingHeaderName: 'Group',
    treeDataExpand: 'see children',
    treeDataCollapse: 'hide children',

    // Grouping columns
    groupingColumnHeaderName: 'Group',
    groupColumn: (name) => `Group by ${name}`,
    unGroupColumn: (name) => `Stop grouping by ${name}`,

    // Master/detail
    detailPanelToggle: 'Detail panel toggle',
    expandDetailPanel: 'Expand',
    collapseDetailPanel: 'Collapse',

    // Used core components translation keys
    MuiTablePagination: {},

    // Row reordering text
    rowReorderingHeaderName: 'Row reordering',

    // Aggregation
    aggregationMenuItemHeader: 'Aggregation',
    aggregationFunctionLabelSum: 'sum',
    aggregationFunctionLabelAvg: 'avg',
    aggregationFunctionLabelMin: 'min',
    aggregationFunctionLabelMax: 'max',
    aggregationFunctionLabelSize: 'size',
};