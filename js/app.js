// Khai báo biến toàn cục để hoadon.js có thể truy cập
window.currentOrderForInvoiceFromApp = null;
window.debts_v2_from_app = []; // Để hoadon.js có thể truy cập danh sách nợ

// GHI CHÚ NÂNG CẤP: file này giờ được js/boot-loader.js nạp ĐỘNG (sau khi DOM
// và toàn bộ modal đã có sẵn trong trang), chứ không còn nạp tĩnh bằng thẻ
// <script> như trước. Vì vậy không cần chờ sự kiện 'DOMContentLoaded' nữa
// (sự kiện đó đã xảy ra trước khi file này được tải) -> đổi sang hàm tự
// gọi (IIFE) để chạy ngay lập tức. TOÀN BỘ logic bên trong giữ nguyên 100%,
// không có gì khác bị thay đổi.
(function () {
    // --- DOM ELEMENTS ---
    const mainNavButtons = document.querySelectorAll('.main-nav .nav-btn');
    const pageSections = document.querySelectorAll('.page-section');

    // Product Section Elements
    const productSectionDiv = document.getElementById('productsSection');
    const productListDiv = document.getElementById('productList');
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const closeProductModalButton = document.querySelector('#productModal .close-button');
    const cancelProductModalBtn = document.getElementById('cancelProductModalBtn');
    const productForm = document.getElementById('productForm');
    const productModalTitleElem = document.getElementById('productModalTitleElem');
    const generateSKUBtn = document.getElementById('generateSKU');
    const productImageUploadInput = document.getElementById('productImageUpload');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const productSearchInput = document.getElementById('productSearchInput');
    const productCategoryFilterSelect = document.getElementById('productCategoryFilter');
    const productStockStatusFilterSelect = document.getElementById('productStockStatusFilter');
    const productMinPriceFilterInput = document.getElementById('productMinPriceFilter');
    const productMaxPriceFilterInput = document.getElementById('productMaxPriceFilter');
    const productStatusFilterSelect = document.getElementById('productStatusFilter');
    const productModalStatusSelect = document.getElementById('productModalStatus');
    const applyProductFiltersBtn = document.getElementById('applyProductFiltersBtn');
    const resetProductFiltersBtn = document.getElementById('resetProductFiltersBtn');
    const productCostPriceInput = document.getElementById('productCostPrice');
    const productPriceInput = document.getElementById('productPrice');
    const productPromoPriceInput = document.getElementById('productPromoPrice');
    const productWholesalePriceInput = document.getElementById('productWholesalePrice');
    const productUnitSelect = document.getElementById('productUnitSelect');
    const productUnitCustomInput = document.getElementById('productUnitCustom');
    const importProductsBtn = document.getElementById('importProductsBtn');
    const productImportFileInput = document.getElementById('productImportFile');


    // Order Section Elements
    const ordersSectionDiv = document.getElementById('ordersSection');
    const createOrderBtn = document.getElementById('createOrderBtn');
    const orderListContainer = document.getElementById('orderListContainer');
    const orderSearchInput = document.getElementById('orderSearchInput');
    const orderStatusFilterSelect = document.getElementById('orderStatusFilter');
    const orderDateFromFilterInput = document.getElementById('orderDateFromFilter');
    const orderDateToFilterInput = document.getElementById('orderDateToFilter');
    const applyOrderFiltersBtn = document.getElementById('applyOrderFiltersBtn');
    const resetOrderFiltersBtn = document.getElementById('resetOrderFiltersBtn');
    const orderModal = document.getElementById('orderModal');
    const orderModalTitleElem = document.getElementById('orderModalTitleElem');
    const orderForm = document.getElementById('orderForm');
    const closeOrderModalButton = document.querySelector('#orderModal .close-button');
    const cancelOrderModalBtn = document.getElementById('cancelOrderModalBtn');
    const saveOrderBtn = document.getElementById('saveOrderBtn');
    const orderIdInput = document.getElementById('orderId');
    const orderCustomerSearchInput = document.getElementById('orderCustomerSearch');
    const orderCustomerSearchResultsDiv = document.getElementById('orderCustomerSearchResults');
    const customerNameOrderFormInput = document.getElementById('customerNameOrderForm');
    const customerPhoneOrderFormInput = document.getElementById('customerPhoneOrderForm');
    const customerAddressOrderFormInput = document.getElementById('customerAddressOrderForm');
    const customerEmailOrderFormInput = document.getElementById('customerEmailOrderForm');
    const selectedCustomerIdOrderFormInput = document.getElementById('selectedCustomerIdOrderForm');
    const orderProductSearchInput = document.getElementById('orderProductSearch');
    const orderProductSearchResultsDiv = document.getElementById('orderProductSearchResults');
    const orderItemsListDiv = document.getElementById('orderItemsList');
    const orderSubtotalSpan = document.getElementById('orderSubtotal');
    const orderDiscountInput = document.getElementById('orderDiscount');
    const orderShippingFeeInput = document.getElementById('orderShippingFee');
    const orderTotalAmountSpan = document.getElementById('orderTotalAmount');
    const orderPaymentMethodSelect = document.getElementById('orderPaymentMethod');
    const orderStatusModalSelect = document.getElementById('orderStatusModal');
    const orderNotesTextarea = document.getElementById('orderNotes');
    const orderCustomerNotesTextarea = document.getElementById('orderCustomerNotes');
    const orderDueDateGroupDiv = document.getElementById('orderDueDateGroup');
    const orderDebtDueDateInput = document.getElementById('orderDebtDueDate');
    const orderAmountPaidInput = document.getElementById('orderAmountPaid');
    const orderRemainingAmountRow = document.getElementById('orderRemainingAmountRow');
    const orderRemainingAmountSpan = document.getElementById('orderRemainingAmount');
    const orderCreatedAtModalInput = document.getElementById('orderCreatedAtModal');
    const paymentStatusFullRadio = document.getElementById('paymentStatusFull');
    const paymentStatusPartialDebtRadio = document.getElementById('paymentStatusPartialDebt');


    // Customer Section Elements
    const customersSectionDiv = document.getElementById('customersSection');
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const customerListContainer = document.getElementById('customerListContainer');
    const customerSearchInput = document.getElementById('customerSearchInput');
    const customerGroupFilterSelect = document.getElementById('customerGroupFilter');
    const customerTotalSpentMinInput = document.getElementById('customerTotalSpentMin');
    const customerTotalSpentMaxInput = document.getElementById('customerTotalSpentMax');
    const applyCustomerFiltersBtn = document.getElementById('applyCustomerFiltersBtn');
    const resetCustomerFiltersBtn = document.getElementById('resetCustomerFiltersBtn');
    const totalCustomerCountSpan = document.getElementById('totalCustomerCount');
    const customerModal = document.getElementById('customerModal');
    const customerModalTitleElem = document.getElementById('customerModalTitleElem');
    const customerForm = document.getElementById('customerForm');
    const closeCustomerModalButton = document.querySelector('#customerModal .close-button');
    const cancelCustomerModalBtn = document.getElementById('cancelCustomerModalBtn');
    const saveCustomerBtn = document.getElementById('saveCustomerBtn');
    const customerIdInput = document.getElementById('customerId');
    const custModalNameInput = document.getElementById('custModalName');
    const custModalPhoneInput = document.getElementById('custModalPhone');
    const custModalEmailInput = document.getElementById('custModalEmail');
    const custModalAddressTextarea = document.getElementById('custModalAddress');
    const custModalGroupSelect = document.getElementById('custModalGroup');
    const custModalDobInput = document.getElementById('custModalDob');
    const custModalSourceInput = document.getElementById('custModalSource');
    const custModalPersonalNotesTextarea = document.getElementById('custModalPersonalNotes');
    const customerModalTabs = customerModal.querySelectorAll('.modal-tabs .tab-link');
    const customerModalTabContents = customerModal.querySelectorAll('.tab-content');
    const customerOrderHistoryListDiv = document.getElementById('customerOrderHistoryList');
    const customerLTVDisplaySpan = document.getElementById('customerLTVDisplay');
    const customerTotalOrdersDisplaySpan = document.getElementById('customerTotalOrdersDisplay');
    const customerAvgOrderValueDisplaySpan = document.getElementById('customerAvgOrderValueDisplay');
    const customerPurchaseFrequencyDisplaySpan = document.getElementById('customerPurchaseFrequencyDisplay');
    const customerLastPurchaseDateDisplaySpan = document.getElementById('customerLastPurchaseDateDisplay');
    const customerInteractionForm = document.getElementById('customerInteractionForm');
    const interactionCustomerIdInput = document.getElementById('interactionCustomerId');
    const interactionDateInput = document.getElementById('interactionDate');
    const interactionChannelSelect = document.getElementById('interactionChannel');
    const interactionNotesTextarea = document.getElementById('interactionNotes');
    const customerInteractionHistoryListDiv = document.getElementById('customerInteractionHistoryList');

    // --- NEW DEBT SECTION ELEMENTS ---
    const debtsSectionDiv = document.getElementById('debtsSection');
    const addNewDebtBtn = document.getElementById('addNewDebtBtn');
    const debtTotalRemainingV2Span = document.getElementById('debtTotalRemainingV2');
    const debtTotalPaidV2Span = document.getElementById('debtTotalPaidV2');
    const debtOverdueCountV2Span = document.getElementById('debtOverdueCountV2');
    const debtTotalCountV2Span = document.getElementById('debtTotalCountV2');
    const debtTabBtns = document.querySelectorAll('.debt-tab-btn');
    const debtTabContents = document.querySelectorAll('.debt-tab-content');
    const debtSearchInputV2 = document.getElementById('debtSearchInputV2');
    const debtStatusFilterV2Select = document.getElementById('debtStatusFilterV2');
    const debtListContainerV2 = document.getElementById('debtListContainerV2');
    const noDebtsMessageV2 = debtsSectionDiv.querySelector('.no-debts-v2');
    const debtPaymentFormV2 = document.getElementById('debtPaymentFormV2');
    const debtPaymentSelectV2 = document.getElementById('debtPaymentSelectV2');
    const debtPaymentAmountV2Input = document.getElementById('debtPaymentAmountV2');
    const debtPaymentNoteV2Textarea = document.getElementById('debtPaymentNoteV2');
    const newDebtModal = document.getElementById('newDebtModal');
    const newDebtModalTitle = document.getElementById('newDebtModalTitle');
    const newDebtForm = document.getElementById('newDebtForm');
    const closeNewDebtModalButton = document.querySelector('#newDebtModal .close-button.new-debt-modal-close');
    const cancelNewDebtModalBtn = document.getElementById('cancelNewDebtModalBtn');
    const saveNewDebtBtn = document.getElementById('saveNewDebtBtn');
    const editingDebtIdV2Input = document.getElementById('editingDebtIdV2');
    const newDebtCustomerNameInput = document.getElementById('newDebtCustomerName');
    const newDebtCustomerPhoneInput = document.getElementById('newDebtCustomerPhone');
    const newDebtCustomerEmailInput = document.getElementById('newDebtCustomerEmail');
    const newDebtProductInput = document.getElementById('newDebtProduct');
    const newDebtAmountInput = document.getElementById('newDebtAmount');
    const newDebtDueDateInput = document.getElementById('newDebtDueDate');
    const newDebtNoteTextarea = document.getElementById('newDebtNote');
    const newDebtCustomerSearchInput = document.getElementById('newDebtCustomerSearch');
    const newDebtCustomerSearchResultsDiv = document.getElementById('newDebtCustomerSearchResults');
    const newDebtProductSearchInput = document.getElementById('newDebtProductSearch');
    const newDebtProductSearchResultsDiv = document.getElementById('newDebtProductSearchResults');
    const selectedDebtProductsDisplayDiv = document.getElementById('selectedDebtProductsDisplay');
    const newDebtCreateDateInput = document.getElementById('newDebtCreateDate');


    // Finance Section Elements
    const financeSectionDiv = document.getElementById('financeSection');
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const financeDateFromFilterInput = document.getElementById('financeDateFromFilter');
    const financeDateToFilterInput = document.getElementById('financeDateToFilter');
    const financeTypeFilterSelect = document.getElementById('financeTypeFilter');
    const financeCategoryFilterSelect = document.getElementById('financeCategoryFilter');
    const applyFinanceFiltersBtn = document.getElementById('applyFinanceFiltersBtn');
    const resetFinanceFiltersBtn = document.getElementById('resetFinanceFiltersBtn');
    const totalRevenueDisplay = document.getElementById('totalRevenueDisplay');
    const totalCOGSDisplay = document.getElementById('totalCOGSDisplay');
    const grossProfitDisplay = document.getElementById('grossProfitDisplay');
    const totalOtherExpensesDisplay = document.getElementById('totalOtherExpensesDisplay');
    const netProfitDisplay = document.getElementById('netProfitDisplay');
    const transactionTable = document.getElementById('transactionTable');
    const transactionTableBody = document.getElementById('transactionTableBody');
    const financeTransactionModal = document.getElementById('financeTransactionModal');
    const financeTransactionModalTitleElem = document.getElementById('financeTransactionModalTitleElem');
    const financeTransactionForm = document.getElementById('financeTransactionForm');
    const closeFinanceTransactionModalButton = document.querySelector('#financeTransactionModal .close-button');
    const cancelFinanceTransactionModalBtn = document.getElementById('cancelFinanceTransactionModalBtn');
    const transactionIdInput = document.getElementById('transactionId');
    const transactionTypeSelect = document.getElementById('transactionType');
    const transactionDateInput = document.getElementById('transactionDate');
    const transactionAmountInput = document.getElementById('transactionAmount');
    const transactionDescriptionTextarea = document.getElementById('transactionDescription');
    const transactionCategoryGroup = document.getElementById('transactionCategoryGroup');
    const transactionCategorySelect = document.getElementById('transactionCategory');
    const transactionCategoryCustomInput = document.getElementById('transactionCategoryCustom');

    // Reports Section Elements
    const reportsSectionDiv = document.getElementById('reportsSection');
    const reportSalesTodayRevenueSpan = document.getElementById('reportSalesTodayRevenue');
    const reportSalesThisMonthRevenueSpan = document.getElementById('reportSalesThisMonthRevenue');
    const reportSalesLastMonthRevenueSpan = document.getElementById('reportSalesLastMonthRevenue');
    const reportSalesTotalOrdersThisMonthSpan = document.getElementById('reportSalesTotalOrdersThisMonth');
    const reportSalesTotalCustomersThisMonthSpan = document.getElementById('reportSalesTotalCustomersThisMonth');
    const reportSalesAvgOrderValueThisMonthSpan = document.getElementById('reportSalesAvgOrderValueThisMonth');
    const reportFinanceTimeFilterSelect = document.getElementById('reportFinanceTimeFilter');
    const reportFinanceCustomDateRangeDiv = document.getElementById('reportFinanceCustomDateRange');
    const reportFinanceDateFromInput = document.getElementById('reportFinanceDateFrom');
    const reportFinanceDateToInput = document.getElementById('reportFinanceDateTo');
    const applyReportFinanceFiltersBtn = document.getElementById('applyReportFinanceFiltersBtn');
    const reportFinanceTotalIncomeSpan = document.getElementById('reportFinanceTotalIncome');
    const reportFinanceTotalExpenseSpan = document.getElementById('reportFinanceTotalExpense');
    const reportFinanceNetProfitSpan = document.getElementById('reportFinanceNetProfit');

    // Dashboard Section Elements
    const dashboardSectionDiv = document.getElementById('dashboardSection');
    const quickActionButtons = document.querySelectorAll('.quick-actions .action-card');
    const dashboardTotalActiveProductsSpan = document.getElementById('dashboardTotalActiveProducts');

    // Toast Notification
    const toastNotificationDiv = document.getElementById('toastNotification');
    const toastMessageSpan = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    let toastTimeoutHide;
    let toastTimeoutRemoveShow;


    // --- STATE & DATA ---
    let products = [];
    let categories = new Set();
    let editingProductId = null;
    const DEFAULT_LOW_STOCK_THRESHOLD = 5;
    let currentProductImages = [];

    let orders = [];
    let editingOrderId = null;
    let currentOrderItems = [];

    let customers = [];
    let editingCustomerId = null;

    let debts_v2 = [];
    let payments_v2 = [];
    let editingDebtId_v2 = null;
    let debtStatusUpdateInterval;
    let currentSelectedDebtProducts = [];

    let financialTransactions = [];
    let editingTransactionId = null;

    const DEFAULT_EXPENSE_CATEGORIES = [
        "Giá vốn hàng bán", "Chi phí thuê mặt bằng", "Lương nhân viên",
        "Marketing & Quảng cáo", "Điện nước", "Internet, Điện thoại", "Vận chuyển (chi ra)",
        "Vật tư, văn phòng phẩm", "Sửa chữa, bảo trì", "Thuế, phí, lệ phí", "Chi phí khác"
    ];
    const DEFAULT_INCOME_CATEGORIES = ["Doanh thu bán hàng", "Thu nhập khác", "Hoàn tiền từ NCC"];

    const ORDER_STATUSES = {
        pending_confirmation: "Chờ xác nhận", processing: "Đang xử lý", shipping: "Đang giao",
        delivered: "Đã giao", completed: "Đã hoàn thành", cancelled: "Đã hủy", returned: "Đã trả hàng"
    };
    const DEBT_STATUSES_V2 = { pending: "Chờ thanh toán", overdue: "Quá hạn", paid: "Đã thanh toán" };
    const PAYMENT_METHODS_TEXT = {
        cod: "COD (Thu hộ)", bank_transfer: "Chuyển khoản",
        cash: "Tiền mặt (tại cửa hàng)", debt: "Ghi nợ", debt_consolidation: "Tổng hợp nợ"
    };
    const CUSTOMER_GROUP_TEXT = {
        new: "Khách mới", regular: "Khách thường", vip: "Khách VIP",
        wholesale: "Khách sỉ", blocked: "Đã chặn"
    };


    // --- UTILITY FUNCTIONS ---
    function showToast(message, duration = 3000, type = 'success') {
        if (!toastNotificationDiv || !toastMessageSpan) return;
        toastNotificationDiv.classList.remove('success', 'error', 'warning', 'info', 'show', 'hide');
        if (toastTimeoutHide) clearTimeout(toastTimeoutHide);
        if (toastTimeoutRemoveShow) clearTimeout(toastTimeoutRemoveShow);
        toastMessageSpan.textContent = message;
        toastNotificationDiv.classList.add(type);
        if (toastIcon) {
            if (type === 'success') toastIcon.className = 'fas fa-check-circle toast-icon';
            else if (type === 'error') toastIcon.className = 'fas fa-times-circle toast-icon';
            else if (type === 'warning') toastIcon.className = 'fas fa-exclamation-triangle toast-icon';
            else toastIcon.className = 'fas fa-info-circle toast-icon';
        }
        requestAnimationFrame(() => { toastNotificationDiv.classList.add('show'); });
        toastTimeoutHide = setTimeout(() => { toastNotificationDiv.classList.add('hide'); }, duration - 300);
        toastTimeoutRemoveShow = setTimeout(() => { toastNotificationDiv.classList.remove('show', 'hide'); }, duration);
    }
    function formatCurrencyInput(inputElement) {
        if (!inputElement) return;
        let value = inputElement.value.replace(/\D/g, '');
        if (value) inputElement.value = parseInt(value, 10).toLocaleString('vi-VN');
        else inputElement.value = '';
    }
    function formatCurrencyV2(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) return '0đ';
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    function getNumericValueFromFormattedInput(formattedValue) {
        if (!formattedValue) return 0;
        return parseInt(String(formattedValue).replace(/\./g, ''), 10) || 0;
    }
    function openModalWithTransition(modalElement) {
        if (!modalElement) return;
        modalElement.style.display = 'block';
        document.body.classList.add('modal-open-no-scroll');
        requestAnimationFrame(() => { modalElement.classList.add('active-modal'); });
    }
    function closeModalWithTransition(modalElement, callback) {
        if (!modalElement) return;
        modalElement.classList.remove('active-modal');
        setTimeout(() => {
            modalElement.style.display = 'none';
            const anyModalActive = Array.from(document.querySelectorAll('.modal.active-modal')).length > 0;
            const isInvoicePanelVisible = document.getElementById('invoiceSettingsPanel') && document.getElementById('invoiceSettingsPanel').classList.contains('settings-panel-visible');
            const isFullscreenViewerVisible = document.querySelector('.invoice-fullscreen-viewer.visible');
            if (!anyModalActive && !isInvoicePanelVisible && !isFullscreenViewerVisible) {
                document.body.classList.remove('modal-open-no-scroll');
                document.body.classList.remove('body-no-scroll-when-panel-open');
            }
            if (callback && typeof callback === 'function') callback();
        }, 300);
    }
    function isMobileDevice() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
    function getDateRange(period, customStartDate = null, customEndDate = null) {
        const today = new Date(); let startDate = new Date(today); let endDate = new Date(today);
        startDate.setHours(0,0,0,0); endDate.setHours(23,59,59,999);
        switch(period){
            case 'today': break;
            case 'this_week': const dOW=today.getDay(); const diffM=dOW===0?-6:1-dOW; startDate.setDate(today.getDate()+diffM);endDate=new Date(startDate);endDate.setDate(startDate.getDate()+6);endDate.setHours(23,59,59,999);break;
            case 'this_month': startDate=new Date(today.getFullYear(),today.getMonth(),1);endDate=new Date(today.getFullYear(),today.getMonth()+1,0);endDate.setHours(23,59,59,999);break;
            case 'last_week': const pM=new Date(today);const pDOW=pM.getDay();const diffPM=pDOW===0?-13:-(pDOW+6);pM.setDate(today.getDate()+diffPM);pM.setHours(0,0,0,0);startDate=new Date(pM);endDate=new Date(pM);endDate.setDate(pM.getDate()+6);endDate.setHours(23,59,59,999);break;
            case 'last_month': startDate=new Date(today.getFullYear(),today.getMonth()-1,1);endDate=new Date(today.getFullYear(),today.getMonth(),0);endDate.setHours(23,59,59,999);break;
            case 'custom': if(customStartDate){startDate=new Date(customStartDate);startDate.setHours(0,0,0,0);}else{startDate=new Date(today.getFullYear(),today.getMonth(),1);} if(customEndDate){endDate=new Date(customEndDate);endDate.setHours(23,59,59,999);}else{endDate=new Date(today);endDate.setHours(23,59,59,999);} break;
            default: break;
        } return {startDate,endDate};
    }


    // --- INITIALIZATION ---
    function initializeApp() {
        loadProducts();
        loadCustomers();
        loadOrders();
        loadNewDebts();
        loadFinancialTransactions();

        showSection('dashboardSection');
        setupEventListeners();
        if (typeof InvoiceModule !== 'undefined' && InvoiceModule.initialize) {
            InvoiceModule.initialize(window.currentOrderForInvoiceFromApp);
        }


        populateFinanceCategoryFilters();
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
        if(financeDateFromFilterInput) financeDateFromFilterInput.value = firstDayOfMonth;
        if(financeDateToFilterInput) financeDateToFilterInput.value = lastDayOfMonth;

        updateNewDebtStatusesPeriodically();
        updateDashboardStats();
        updateReportSalesData();
        updateReportFinanceData();
    }

    // --- NAVIGATION ---
    function showSection(sectionId, highlightOrderId = null) {
        pageSections.forEach(section => {
            section.classList.remove('active-section');
        });
        mainNavButtons.forEach(button => button.classList.remove('active'));

        const activeSection = document.getElementById(sectionId);
        const activeButton = document.querySelector(`.main-nav .nav-btn[data-section="${sectionId}"]`);

        if (activeSection) {
            const cards = activeSection.querySelectorAll('.product-card, .order-card, .customer-card, .debt-card-v2');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'none';
            });

            requestAnimationFrame(() => {
                activeSection.classList.add('active-section');
                if (activeButton) activeButton.classList.add('active');

                const visibleCards = activeSection.querySelectorAll('.product-card, .order-card, .customer-card, .debt-card-v2');
                visibleCards.forEach((card, index) => {
                    card.style.transition = `opacity var(--transition-duration-long) var(--transition-timing-smooth) ${index * 70}ms, transform var(--transition-duration-long) var(--transition-timing-smooth) ${index * 70}ms`;
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                });
            });
        } else {
             if (activeButton) activeButton.classList.add('active');
        }

        if (sectionId === 'dashboardSection') updateDashboardStats();
        else if (sectionId === 'productsSection') { renderProducts(); populateCategoryFilter(); }
        else if (sectionId === 'ordersSection') {
            renderOrderList();
            if (highlightOrderId) { setTimeout(() => { const oC = orderListContainer.querySelector(`.order-card[data-order-id="${highlightOrderId}"]`); if(oC){orderListContainer.querySelectorAll('.order-card.highlighted-order').forEach(c=>c.classList.remove('highlighted-order'));oC.classList.add('highlighted-order');oC.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>oC.classList.remove('highlighted-order'),5000);}},200); }
        }
        else if (sectionId === 'customersSection') { renderCustomerList(); updateCustomerStats(); }
        else if (sectionId === 'debtsSection') { renderNewDebtList(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2(); setActiveDebtTab('debtListV2Tab'); }
        else if (sectionId === 'financeSection') { applyFinanceFilters(); populateFinanceCategoryFilters(); }
        else if (sectionId === 'invoiceSettingsSection') {
            if (typeof InvoiceModule !== 'undefined' && InvoiceModule.renderPreview) {
                 InvoiceModule.renderPreview(window.currentOrderForInvoiceFromApp);
            }
        } else if (sectionId === 'reportsSection') { updateReportSalesData(); updateReportFinanceData(); }
    }


    // --- PRODUCT MANAGEMENT ---
    function loadProducts() {
        const storedProducts = localStorage.getItem('products');
        products = storedProducts ? JSON.parse(storedProducts) : [
            { id: Date.now() + 1, name: "Son Kem Lì Black Rouge A12", sku: "BR-A12", description: "Màu nâu đỏ gạch trendy", costPrice: 100000, price: 180000, wholesalePrice: 150000, promoPrice: 159000, stock: 20, lowStockThreshold: 5, category: "Son Môi", brand: "Black Rouge", unit: "Cái", status: "active", images: ["https://via.placeholder.com/280x180/FFC0CB/000000.png?Text=Son+A12"] , variants: [] },
            { id: Date.now() + 2, name: "Kem Chống Nắng Innisfree", sku: "INNIS-SUN", description: "Bảo vệ da khỏi tia UV", costPrice: 180000, price: 250000, wholesalePrice: 220000, stock: 3, lowStockThreshold: 5, category: "Chăm Sóc Da", brand: "Innisfree", unit: "Tuýp", status: "active", images: ["https://via.placeholder.com/280x180/ADD8E6/000000.png?Text=KCN+Innisfree"], variants: [] },
            { id: Date.now() + 3, name: "Phấn Nước Cushion Aprilskin", sku: "APRIL-CUSHION", description: "Lớp nền mỏng nhẹ, che phủ tốt", costPrice: 250000, price: 350000, wholesalePrice: 300000, stock: null, lowStockThreshold: 3, category: "Trang Điểm Nền", brand: "Aprilskin", unit: "Hộp", status: "inactive", images: [], variants: [] }
        ];
        if (!storedProducts) {
            try {
                localStorage.setItem('products', JSON.stringify(products));
            } catch (e) {
                console.error("Lỗi lưu sản phẩm mẫu vào localStorage:", e);
            }
        }
        updateCategories();
    }
    function saveProducts() {
        try {
            localStorage.setItem('products', JSON.stringify(products));
        } catch (e) {
            console.error("Lỗi khi lưu sản phẩm vào localStorage:", e);
            showToast("Lỗi: Không thể lưu dữ liệu sản phẩm. Bộ nhớ có thể đã đầy.", 5000, 'error');
        }
        updateCategories();
    }
    function updateCategories() { categories.clear(); products.forEach(p => { if (p.category) categories.add(p.category); }); }
    function populateCategoryFilter() {
        if (!productCategoryFilterSelect) return;
        const currentVal = productCategoryFilterSelect.value;
        productCategoryFilterSelect.innerHTML = '<option value="">Tất cả Danh mục</option>';
        categories.forEach(cat => { const opt = document.createElement('option'); opt.value = opt.textContent = cat; productCategoryFilterSelect.appendChild(opt); });
        if (Array.from(categories).includes(currentVal)) productCategoryFilterSelect.value = currentVal;
    }
    function renderProducts(productsToDisplay = products) {
        if(!productListDiv) return; productListDiv.innerHTML = '';
        const noProdsMsg = productSectionDiv.querySelector('.no-products');
        if (productsToDisplay.length === 0) { if(noProdsMsg) noProdsMsg.style.display = 'block'; return; }
        if(noProdsMsg) noProdsMsg.style.display = 'none';

        productsToDisplay.forEach((p) => {
            const card = document.createElement('div'); card.className = 'product-card'; card.dataset.id = p.id;
            let stockSc = 'not-managed', stockTxt = 'Không QL';
            if (p.stock !== null) {
                if (p.stock === 0) { stockSc = 'out-of-stock'; stockTxt = 'Hết hàng'; }
                else if (p.stock <= (p.lowStockThreshold || DEFAULT_LOW_STOCK_THRESHOLD)) { stockSc = 'low-stock'; stockTxt = `Sắp hết: ${p.stock}`; }
                else { stockSc = 'in-stock'; stockTxt = `Còn: ${p.stock}`; }
            }
            const img = (p.images && p.images.length > 0) ? p.images[0] : null;
            card.innerHTML = `
                <div class="product-image-container">${img ? `<img src="${img}" alt="${p.name}">` : '<i class="fas fa-image no-image-icon"></i>'}</div>
                <div class="product-details">
                    <div class="product-main-info">
                        <h3>${p.name}</h3>
                        <p class="sku">SKU: ${p.sku||'N/A'}</p>
                        <div class="price-stock">
                            <p class="price">${p.promoPrice && p.promoPrice > 0 && p.promoPrice < p.price ? `<span class="promo">${p.promoPrice.toLocaleString('vi-VN')}đ</span> <span class="original">${p.price.toLocaleString('vi-VN')}đ</span>` : `${p.price.toLocaleString('vi-VN')}đ`}</p>
                            <span class="stock ${stockSc}">${stockTxt}</span>
                        </div>
                        <p class="category-brand">
                            <span><i class="fas fa-tag"></i> ${p.category||'N/A'}</span>
                            <span><i class="fas fa-building"></i> ${p.brand||'N/A'}</span>
                            ${p.unit ? `<span><i class="fas fa-ruler-combined"></i> ${p.unit}</span>` : ''}
                        </p>
                    </div>
                    <div class="actions">
                        <button class="btn btn-sm btn-secondary view-product-details-btn"><i class="fas fa-eye"></i> Xem</button>
                        <button class="btn btn-sm edit-product-btn"><i class="fas fa-edit"></i> Sửa</button>
                        <button class="btn btn-sm btn-danger delete-product-btn"><i class="fas fa-trash"></i> Xóa</button>
                    </div>
                </div>
            `;
            productListDiv.appendChild(card);
        });
    }
    function openProductModal(productId = null) {
        productForm.reset(); currentProductImages = []; renderProductImagePreviews();
        if(productUnitCustomInput) productUnitCustomInput.style.display = 'none';
        if(productUnitSelect) productUnitSelect.value = '';
        document.getElementById('productStock').placeholder = "Để trống nếu không quản lý";

        if (productId) {
            editingProductId = productId; productModalTitleElem.textContent = 'Chỉnh Sửa Sản Phẩm';
            const p = products.find(pr => pr.id === productId);
            if (p) {
                document.getElementById('productId').value = p.id;
                document.getElementById('productName').value = p.name;
                document.getElementById('productSKU').value = p.sku || '';
                document.getElementById('productDescription').value = p.description || '';
                document.getElementById('productCostPrice').value = p.costPrice ? p.costPrice.toLocaleString('vi-VN') : '';
                document.getElementById('productPrice').value = p.price.toLocaleString('vi-VN');
                if (productWholesalePriceInput) productWholesalePriceInput.value = p.wholesalePrice ? p.wholesalePrice.toLocaleString('vi-VN') : '';
                document.getElementById('productStock').value = (p.stock !== null) ? p.stock : '';
                document.getElementById('productPromoPrice').value = p.promoPrice ? p.promoPrice.toLocaleString('vi-VN') : '';
                document.getElementById('productLowStockThreshold').value = p.lowStockThreshold || DEFAULT_LOW_STOCK_THRESHOLD;
                document.getElementById('productCategory').value = p.category || '';
                document.getElementById('productBrand').value = p.brand || '';
                productModalStatusSelect.value = p.status || 'active';
                if (p.unit && productUnitSelect) {
                    const isStandardUnit = Array.from(productUnitSelect.options).some(opt => opt.value === p.unit && opt.value !== '_custom_');
                    if (isStandardUnit) { productUnitSelect.value = p.unit; if(productUnitCustomInput) productUnitCustomInput.style.display = 'none';}
                    else { productUnitSelect.value = '_custom_'; if(productUnitCustomInput) { productUnitCustomInput.value = p.unit; productUnitCustomInput.style.display = 'block';}}
                } else if (productUnitSelect) { productUnitSelect.value = ''; if(productUnitCustomInput) productUnitCustomInput.style.display = 'none';}
                if (p.images && p.images.length > 0) { currentProductImages = [...p.images]; renderProductImagePreviews(); }
            }
        } else {
            editingProductId = null; productModalTitleElem.textContent = 'Thêm Sản Phẩm Mới';
            document.getElementById('productCostPrice').value = '';
            if (productWholesalePriceInput) productWholesalePriceInput.value = '';
            document.getElementById('productStock').value = '';
            document.getElementById('productLowStockThreshold').value = DEFAULT_LOW_STOCK_THRESHOLD;
            productModalStatusSelect.value = 'active';
            if(productUnitSelect) productUnitSelect.value = '';
            if(productUnitCustomInput) productUnitCustomInput.style.display = 'none';
        }
        openModalWithTransition(productModal);
    }
    function closeProductModal() { closeModalWithTransition(productModal, () => { editingProductId = null; if(productImageUploadInput) productImageUploadInput.value = ''; }); }
    function handleProductFormSubmit(event) {
        event.preventDefault();
        let productUnitValue = productUnitSelect.value;
        if (productUnitValue === '_custom_') productUnitValue = productUnitCustomInput.value.trim();

        const stockInput = document.getElementById('productStock').value;
        const stockValue = stockInput.trim() === '' ? null : parseInt(stockInput);

        const pData = {
            id: editingProductId || Date.now(), name: document.getElementById('productName').value.trim(),
            sku: document.getElementById('productSKU').value.trim(), description: document.getElementById('productDescription').value.trim(),
            costPrice: getNumericValueFromFormattedInput(document.getElementById('productCostPrice').value),
            price: getNumericValueFromFormattedInput(document.getElementById('productPrice').value),
            wholesalePrice: productWholesalePriceInput ? getNumericValueFromFormattedInput(productWholesalePriceInput.value) : null,
            stock: stockValue,
            promoPrice: getNumericValueFromFormattedInput(document.getElementById('productPromoPrice').value) || null,
            lowStockThreshold: parseInt(document.getElementById('productLowStockThreshold').value) || DEFAULT_LOW_STOCK_THRESHOLD,
            category: document.getElementById('productCategory').value.trim(), brand: document.getElementById('productBrand').value.trim(),
            unit: productUnitValue || '', status: productModalStatusSelect.value, images: [...currentProductImages], variants: []
        };

        if (!pData.name || isNaN(pData.costPrice) || pData.costPrice < 0 || isNaN(pData.price) || pData.price <= 0) {
            showToast('Tên, Giá nhập (>=0), Giá bán lẻ (>0) là bắt buộc.', 3000, 'error'); return;
        }
        if (pData.stock !== null && (isNaN(pData.stock) || pData.stock < 0)) {
            showToast('Tồn kho nếu nhập phải là số không âm.', 3000, 'error'); return;
        }

        if (pData.costPrice > pData.price && pData.price > 0) showToast('Giá nhập đang cao hơn giá bán lẻ. Vui lòng kiểm tra lại.', 3000, 'warning');
        if (pData.wholesalePrice && pData.wholesalePrice < pData.costPrice) showToast('Giá bán sỉ đang thấp hơn giá nhập. Có thể gây lỗ.', 3000, 'warning');
        if (pData.wholesalePrice && pData.wholesalePrice >= pData.price) showToast('Giá bán sỉ nên thấp hơn giá bán lẻ.', 3000, 'warning');
        if (pData.promoPrice && pData.promoPrice < pData.costPrice) showToast('Giá khuyến mãi đang thấp hơn giá nhập. Có thể gây lỗ.', 3000, 'warning');
        if (pData.promoPrice && pData.promoPrice >= pData.price) { showToast('Giá KM phải nhỏ hơn giá gốc (bán lẻ).', 3000, 'error'); return; }

        if (editingProductId) { const i = products.findIndex(p => p.id === editingProductId); if (i > -1) products[i] = pData; showToast("Sản phẩm đã được cập nhật!"); }
        else { products.push(pData); showToast("Sản phẩm mới đã được thêm!"); }
        saveProducts(); applyProductFilters(); closeProductModal(); updateDashboardStats();
    }
    function renderProductImagePreviews() {
        if(!imagePreviewContainer) return; imagePreviewContainer.innerHTML = '';
        currentProductImages.forEach((imgBase64, idx) => {
            const item = document.createElement('div'); item.className = 'image-preview-item';
            const img = document.createElement('img'); img.src = imgBase64; img.alt = `Preview ${idx + 1}`;
            const rmvBtn = document.createElement('button'); rmvBtn.className = 'remove-image-btn'; rmvBtn.innerHTML = '<i class="fas fa-times"></i>'; rmvBtn.type = 'button'; rmvBtn.title = 'Xóa';
            rmvBtn.onclick = () => { currentProductImages.splice(idx, 1); renderProductImagePreviews(); };
            const priBtn = document.createElement('button'); priBtn.className = 'set-primary-btn'; priBtn.innerHTML = '<i class="fas fa-star"></i>'; priBtn.type = 'button';
            priBtn.title = idx === 0 ? 'Ảnh chính' : 'Đặt làm chính'; if (idx === 0) priBtn.classList.add('is-primary');
            priBtn.onclick = () => { if (idx > 0) { const pImg = currentProductImages.splice(idx, 1)[0]; currentProductImages.unshift(pImg); renderProductImagePreviews(); } };
            item.append(img, rmvBtn, priBtn); imagePreviewContainer.appendChild(item);
        });
    }
    function applyProductFilters() {
        const sT = productSearchInput.value.toLowerCase(), sC = productCategoryFilterSelect.value, sS = productStockStatusFilterSelect.value,
              mP = getNumericValueFromFormattedInput(productMinPriceFilterInput.value), xP = getNumericValueFromFormattedInput(productMaxPriceFilterInput.value), sSt = productStatusFilterSelect.value;
        const fProds = products.filter(p => {
            let stockCondition = true;
            if (sS) {
                if (sS === 'in_stock') stockCondition = p.stock !== null && p.stock > 0;
                else if (sS === 'low_stock') stockCondition = p.stock !== null && p.stock > 0 && p.stock <= (p.lowStockThreshold || DEFAULT_LOW_STOCK_THRESHOLD);
                else if (sS === 'out_of_stock') stockCondition = p.stock !== null && p.stock === 0;
                else if (sS === 'not_managed') stockCondition = p.stock === null;
            }
            const priceToCheck = (p.promoPrice && p.promoPrice > 0) ? p.promoPrice : p.price;
            return (!sT || p.name.toLowerCase().includes(sT) || (p.sku&&p.sku.toLowerCase().includes(sT)) || (p.description&&p.description.toLowerCase().includes(sT))) &&
                   (!sC || p.category === sC) &&
                   stockCondition &&
                   (isNaN(mP) || priceToCheck >= mP) &&
                   (isNaN(xP) || xP === 0 || priceToCheck <= xP) &&
                   (!sSt || p.status === sSt);
        });
        renderProducts(fProds);
        const cards = productListDiv.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'none';
            requestAnimationFrame(() => {
                card.style.transition = `opacity var(--transition-duration-long) var(--transition-timing-smooth) ${index * 50}ms, transform var(--transition-duration-long) var(--transition-timing-smooth) ${index * 50}ms`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        });
    }
    function handleProductImport(event) {
        const file = event.target.files[0];
        if (!file) {
            showToast("Không có file nào được chọn.", 3000, 'warning');
            return;
        }

        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.csv') && !fileName.endsWith('.xlsx')) {
            showToast("Vui lòng chọn file CSV (.csv) hoặc Excel (.xlsx).", 3000, 'error');
            productImportFileInput.value = '';
            return;
        }

        const reader = new FileReader();

        if (fileName.endsWith('.csv')) {
            reader.onload = function(e) {
                const csvContent = e.target.result;
                try {
                    const importedProducts = parseCSVToProducts(csvContent);
                    processImportedProducts(importedProducts);
                } catch (error) {
                    console.error("Lỗi khi xử lý file CSV:", error);
                    showToast("Lỗi xử lý file CSV: " + error.message, 5000, 'error');
                } finally {
                    productImportFileInput.value = '';
                }
            };
            reader.readAsText(file, 'UTF-8');
        } else if (fileName.endsWith('.xlsx')) {
            if (typeof XLSX === 'undefined') {
                showToast("Lỗi: Thư viện đọc file Excel (SheetJS) chưa được tải. Vui lòng tải lại trang hoặc kiểm tra kết nối mạng.", 5000, 'error');
                productImportFileInput.value = '';
                return;
            }
            reader.onload = function(e) {
                const data = new Uint8Array(e.target.result);
                try {
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    const importedProducts = parseExcelDataToProducts(jsonData);
                    processImportedProducts(importedProducts);

                } catch (error) {
                    console.error("Lỗi khi xử lý file Excel:", error);
                    showToast("Lỗi xử lý file Excel: " + error.message, 5000, 'error');
                } finally {
                    productImportFileInput.value = '';
                }
            };
            reader.readAsArrayBuffer(file);
        }
    }
    function parseExcelDataToProducts(jsonData) {
        const productsArray = [];
        if (!jsonData || jsonData.length < 2) {
            throw new Error("File Excel không có đủ dữ liệu hoặc không đúng định dạng (cần ít nhất 2 dòng: header và 1 dòng dữ liệu).");
        }

        for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (!row || row.length === 0 || row.every(cell => cell === null || cell === undefined || String(cell).trim() === "")) {
                continue;
            }

            if (row.length < 6) {
                console.warn(`Dòng ${i + 1} trong Excel không đủ 6 cột theo yêu cầu, bỏ qua.`);
                continue;
            }

            const productName = row[1] ? String(row[1]).trim() : null;
            if (!productName) {
                console.warn(`Dòng ${i + 1} trong Excel thiếu tên sản phẩm, bỏ qua.`);
                continue;
            }

            const parsePrice = (value) => {
                if (value === null || value === undefined || String(value).trim() === "") return null;
                let numStr = String(value).replace(/\./g, '').replace(/,/g, '.');
                let num = parseFloat(numStr);
                return isNaN(num) ? null : num;
            };


            let costPrice = parsePrice(row[2]);
            let wholesalePrice = parsePrice(row[3]);
            let retailPrice = parsePrice(row[4]);

            if (retailPrice === null || retailPrice <= 0) {
                console.warn(`Dòng ${i+1} có giá bán lẻ không hợp lệ (${row[4]}), bỏ qua sản phẩm "${productName}".`);
                continue;
            }
            if (costPrice === null || costPrice < 0) {
                console.warn(`Dòng ${i+1} có giá nhập không hợp lệ (${row[2]}) cho sản phẩm "${productName}", sẽ đặt là 0.`);
                costPrice = 0;
            }
            if (wholesalePrice !== null && wholesalePrice <= 0) {
                 wholesalePrice = null;
            }


            const unit = row[5] ? String(row[5]).trim() : "Cái";

            productsArray.push({
                id: Date.now() + i + Math.floor(Math.random() * 100000),
                name: productName,
                sku: `IMPXL-${Date.now().toString().slice(-5)}-${i}`,
                description: "",
                costPrice: costPrice,
                price: retailPrice,
                wholesalePrice: wholesalePrice,
                promoPrice: null,
                stock: null,
                lowStockThreshold: DEFAULT_LOW_STOCK_THRESHOLD,
                category: "Chưa phân loại",
                brand: "",
                unit: unit,
                status: "active",
                images: [],
                variants: []
            });
        }
        return productsArray;
    }
    function processImportedProducts(importedProducts) {
        if (importedProducts.length > 0) {
            if (confirm(`Bạn có chắc muốn thêm ${importedProducts.length} sản phẩm mới từ file? Các sản phẩm trùng tên sẽ được bỏ qua.`)) {
                let productsAddedCount = 0;
                let productsSkippedCount = 0;
                importedProducts.forEach(newProd => {
                    const existingProduct = products.find(p => p.name.toLowerCase() === newProd.name.toLowerCase());
                    if (existingProduct) {
                        console.warn(`Sản phẩm "${newProd.name}" đã tồn tại, bỏ qua.`);
                        productsSkippedCount++;
                    } else {
                        products.push(newProd);
                        productsAddedCount++;
                    }
                });
                saveProducts();
                applyProductFilters();
                updateDashboardStats();
                populateCategoryFilter();
                showToast(`Đã thêm ${productsAddedCount} sản phẩm. Bỏ qua ${productsSkippedCount} sản phẩm trùng tên.`, 5000, 'success');
            }
        } else {
            showToast("Không tìm thấy sản phẩm hợp lệ nào trong file.", 3000, 'warning');
        }
    }
    function parseCSVToProducts(csvText) {
        const productsArray = [];
        const lines = csvText.split(/\r\n|\n/);

        if (lines.length < 2) {
            throw new Error("File CSV không có đủ dữ liệu hoặc không đúng định dạng (cần ít nhất 2 dòng).");
        }
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            const columns = line.split(',').map(col => col.trim().replace(/^"|"$/g, ''));

            if (columns.length < 6) {
                console.warn(`Dòng CSV ${i + 1} không đủ cột, bỏ qua: "${line}"`);
                continue;
            }
            const productName = columns[1];
            if (!productName) {
                console.warn(`Dòng CSV ${i + 1} thiếu tên sản phẩm, bỏ qua.`);
                continue;
            }
            let costPrice = 0;
            const costPriceStr = columns[2] ? columns[2].replace(/\./g, '') : '0';
             if (!isNaN(parseInt(costPriceStr, 10)) && parseInt(costPriceStr, 10) >= 0) {
                costPrice = parseInt(costPriceStr, 10);
            } else {
                console.warn(`Dòng CSV ${i+1} có giá nhập không hợp lệ (${columns[2]}) cho sản phẩm "${productName}", sẽ đặt là 0.`);
            }

            const retailPriceStr = columns[4] ? columns[4].replace(/\./g, '') : '0';
            const retailPrice = parseInt(retailPriceStr, 10);
            if (isNaN(retailPrice) || retailPrice <= 0) {
                console.warn(`Dòng CSV ${i+1} có giá bán lẻ không hợp lệ (${columns[4]}), bỏ qua sản phẩm "${productName}".`);
                continue;
            }

            const wholesalePriceStr = columns[3] ? columns[3].replace(/\./g, '') : '0';
            let wholesalePrice = null;
            if (columns[3] && columns[3].trim() !== "" && !isNaN(parseInt(wholesalePriceStr, 10)) && parseInt(wholesalePriceStr, 10) > 0) {
                wholesalePrice = parseInt(wholesalePriceStr, 10);
            }

            const unit = columns[5] || "Cái";

            productsArray.push({
                id: Date.now() + i + Math.floor(Math.random() * 10000),
                name: productName,
                sku: `IMPCSV-${Date.now().toString().slice(-4)}-${i}`,
                description: "",
                costPrice: costPrice,
                price: retailPrice,
                wholesalePrice: wholesalePrice,
                promoPrice: null,
                stock: null,
                lowStockThreshold: DEFAULT_LOW_STOCK_THRESHOLD,
                category: "Chưa phân loại",
                brand: "",
                unit: unit,
                status: "active",
                images: [],
                variants: []
            });
        }
        return productsArray;
    }


    // --- ORDER MANAGEMENT ---
    function loadOrders() {
        const stored = localStorage.getItem('orders'); orders = stored ? JSON.parse(stored) : [];
        if (!stored && products.length > 0 && orders.length === 0 && customers.length > 0) {
            orders = [];
            try {
                localStorage.setItem('orders', JSON.stringify(orders));
            } catch (e) {
                console.error("Lỗi lưu đơn hàng mẫu (rỗng) vào localStorage:", e);
            }
        }
    }
    function saveOrders() {
        try {
            localStorage.setItem('orders', JSON.stringify(orders));
        } catch (e) {
            console.error("Lỗi khi lưu đơn hàng vào localStorage:", e);
            showToast("Lỗi: Không thể lưu dữ liệu đơn hàng. Bộ nhớ có thể đã đầy.", 5000, 'error');
        }
    }
    function renderOrderList(ordersToDisplay = orders) {
        if(!orderListContainer) return; orderListContainer.innerHTML = '';
        const noMsg = ordersSectionDiv.querySelector('.no-orders');

        // console.log("Render Order List - Đơn hàng sẽ được render:", JSON.parse(JSON.stringify(ordersToDisplay)));

        if (ordersToDisplay.length === 0) {
            if(noMsg) noMsg.style.display = 'block';
            // console.log("Không có đơn hàng nào để hiển thị trong renderOrderList.");
            return;
        }
        if(noMsg) noMsg.style.display = 'none';
        ordersToDisplay.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        ordersToDisplay.forEach((o) => {
            const card = document.createElement('div'); card.className = 'order-card'; card.dataset.orderId = o.id;
            const iCount = o.items.reduce((s, i) => s + i.quantity, 0);
            card.innerHTML = `
                <div class="order-card-header">
                    <span class="order-id">ĐH: #${o.id.toString().slice(-6)}</span>
                    <span class="order-status ${o.status}">${ORDER_STATUSES[o.status]||o.status}</span>
                </div>
                <div class="order-card-customer">
                    <p><i class="fas fa-user"></i> ${o.customer.name} - <i class="fas fa-phone"></i> ${o.customer.phone || 'N/A'}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${o.customer.address || 'N/A'}</p>
                </div>
                <div class="order-card-summary">
                    <span class="item-count">${iCount} SP</span>
                    <span class="total-amount">${o.totalAmount.toLocaleString('vi-VN')}đ</span>
                </div>
                <p class="order-date"><i class="fas fa-calendar-alt"></i> ${new Date(o.createdAt).toLocaleString('vi-VN')}</p>
                <div class="order-card-actions">
                    <button class="btn btn-sm btn-secondary view-order-details-btn"><i class="fas fa-eye"></i> Xem/Sửa</button>
                    <button class="btn btn-sm btn-info print-order-invoice-btn"><i class="fas fa-print"></i> In HĐ</button>
                    <button class="btn btn-sm btn-danger delete-order-btn"><i class="fas fa-trash-alt"></i> Xóa</button>
                </div>`;
            orderListContainer.appendChild(card);
        });
    }
    function openOrderModal(orderId = null) {
        orderForm.reset(); currentOrderItems = []; renderCurrentOrderItems();
        orderProductSearchResultsDiv.innerHTML = ''; orderProductSearchResultsDiv.classList.remove('visible');
        orderCustomerSearchResultsDiv.innerHTML = ''; orderCustomerSearchResultsDiv.classList.remove('visible');
        selectedCustomerIdOrderFormInput.value = '';
        if(orderPaymentMethodSelect) orderPaymentMethodSelect.value = 'cod';
        orderCustomerSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open');
        orderProductSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open');
        if (customerAddressOrderFormInput) customerAddressOrderFormInput.removeAttribute('required');


        if (paymentStatusFullRadio) paymentStatusFullRadio.checked = true;
        if (orderAmountPaidInput) {
            orderAmountPaidInput.value = '0';
            orderAmountPaidInput.disabled = true;
        }
        if (orderDueDateGroupDiv) orderDueDateGroupDiv.style.display = 'none';


        if (orderRemainingAmountRow) orderRemainingAmountRow.style.display = 'none';
        if (orderCreatedAtModalInput) orderCreatedAtModalInput.disabled = false;


        if (orderId) {
            editingOrderId = orderId; orderModalTitleElem.textContent = 'Chi Tiết & Cập Nhật Đơn Hàng';
            saveOrderBtn.innerHTML = '<i class="fas fa-save"></i> Cập Nhật Đơn';
            const o = orders.find(or => or.id === orderId);
            if (o) {
                orderIdInput.value = o.id;
                customerNameOrderFormInput.value = o.customer.name;
                customerPhoneOrderFormInput.value = o.customer.phone || "";
                customerAddressOrderFormInput.value = o.customer.address || "";
                customerEmailOrderFormInput.value = o.customer.email || '';
                selectedCustomerIdOrderFormInput.value = o.customerId || '';
                currentOrderItems = JSON.parse(JSON.stringify(o.items));
                orderDiscountInput.value = o.discountRaw || '';
                orderShippingFeeInput.value = o.shippingFee ? o.shippingFee.toLocaleString('vi-VN') : '0';
                orderPaymentMethodSelect.value = o.paymentMethod;
                orderStatusModalSelect.value = o.status;
                orderNotesTextarea.value = o.notes || '';
                orderCustomerNotesTextarea.value = o.customerNotes || '';

                const remainingDebtForOrder = o.totalAmount - (o.amountPaid || 0);
                if (remainingDebtForOrder <= 0 && o.paymentMethod !== 'debt') {
                    if (paymentStatusFullRadio) paymentStatusFullRadio.checked = true;
                    if (orderAmountPaidInput) {
                         orderAmountPaidInput.value = o.amountPaid ? o.amountPaid.toLocaleString('vi-VN') : o.totalAmount.toLocaleString('vi-VN');
                         orderAmountPaidInput.disabled = true;
                    }
                    if(orderDueDateGroupDiv) orderDueDateGroupDiv.style.display = 'none';
                } else {
                    if (paymentStatusPartialDebtRadio) paymentStatusPartialDebtRadio.checked = true;
                    if (orderAmountPaidInput) {
                        orderAmountPaidInput.value = o.amountPaid ? o.amountPaid.toLocaleString('vi-VN') : '0';
                        orderAmountPaidInput.disabled = false;
                    }
                    const shouldShowDueDate = o.paymentMethod === 'debt' || (paymentStatusPartialDebtRadio && paymentStatusPartialDebtRadio.checked);
                    if(orderDueDateGroupDiv) orderDueDateGroupDiv.style.display = shouldShowDueDate ? 'block' : 'none';
                     if (shouldShowDueDate && orderDebtDueDateInput && o.dueDate) {
                        orderDebtDueDateInput.value = o.dueDate;
                    } else if (shouldShowDueDate && orderDebtDueDateInput && !o.dueDate) {
                        const today = new Date();
                        const defaultDueDate = new Date(today.setDate(today.getDate() + 30));
                        orderDebtDueDateInput.value = defaultDueDate.toISOString().split('T')[0];
                    }
                }


                if (orderCreatedAtModalInput) {
                    const createdAtDate = new Date(o.createdAt);
                    const timezoneOffset = createdAtDate.getTimezoneOffset() * 60000;
                    const localISOTime = new Date(createdAtDate.getTime() - timezoneOffset).toISOString().slice(0, 16);
                    orderCreatedAtModalInput.value = localISOTime;
                }


                orderCustomerSearchInput.disabled = true;
                orderCustomerSearchInput.value = `${o.customer.name} (${o.customer.phone || 'N/A'})`;
                [customerNameOrderFormInput,customerPhoneOrderFormInput,customerAddressOrderFormInput,customerEmailOrderFormInput].forEach(el=>el.disabled=true);
            }
        } else {
            editingOrderId = null; orderModalTitleElem.textContent = 'Tạo Đơn Hàng Mới';
            saveOrderBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Tạo Đơn';
            orderStatusModalSelect.value = 'pending_confirmation';
            orderCustomerSearchInput.value = '';
            orderProductSearchInput.value = '';
            orderCustomerSearchInput.disabled = false;
            [customerNameOrderFormInput, customerPhoneOrderFormInput, customerAddressOrderFormInput, customerEmailOrderFormInput].forEach(el => el.disabled = false);

            if (orderCreatedAtModalInput) {
                const now = new Date();
                const timezoneOffset = now.getTimezoneOffset() * 60000;
                const localISOTime = new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 16);
                orderCreatedAtModalInput.value = localISOTime;
            }
        }
        renderCurrentOrderItems();
        updateOrderSummary();
        openModalWithTransition(orderModal);
    }
    function closeOrderModal() {
        closeModalWithTransition(orderModal, () => {
            editingOrderId = null;
            orderProductSearchInput.value = ''; orderProductSearchResultsDiv.classList.remove('visible'); orderProductSearchResultsDiv.innerHTML = '';
            orderCustomerSearchInput.value=''; orderCustomerSearchResultsDiv.classList.remove('visible'); orderCustomerSearchResultsDiv.innerHTML='';
            selectedCustomerIdOrderFormInput.value='';
            orderCustomerSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open');
            orderProductSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open');
        });
    }
    function renderDefaultProductsForOrderSelection() {
        const defProds = products.filter(p => (p.stock === null || p.stock > 0) && p.status === 'active').slice(0, 10);
        renderProductsForOrderSearch(defProds, orderProductSearchResultsDiv, true);
    }
    function renderProductsForOrderSearch(prodsToDisp, cont, isDef=false) {
        cont.innerHTML = '';
        if (!prodsToDisp || prodsToDisp.length === 0) { cont.innerHTML = `<p class="no-results">${isDef?'Không có SP nào.':'Không tìm thấy SP.'}</p>`; return; }
        prodsToDisp.forEach(p => {
            const iDiv = document.createElement('div'); iDiv.className = 'result-item'; iDiv.dataset.productId = p.id;
            const img = (p.images&&p.images.length>0)?p.images[0]:'https://via.placeholder.com/40?text=N/A';
            let priceToUse = (p.promoPrice && p.promoPrice > 0) ? p.promoPrice : p.price;
            const selectedCustId = selectedCustomerIdOrderFormInput.value;
            if (selectedCustId) {
                const customer = customers.find(c => c.id === parseInt(selectedCustId));
                if (customer && customer.group === 'wholesale' && typeof p.wholesalePrice === 'number' && p.wholesalePrice > 0) priceToUse = p.wholesalePrice;
            }
            const stockDisplay = p.stock !== null ? `(Tồn: ${p.stock})` : '(Không QL Tồn)';
            iDiv.innerHTML = `<img src="${img}" alt="${p.name}"><span class="item-name">${p.name}</span><span class="item-price">${priceToUse.toLocaleString('vi-VN')}đ</span> ${stockDisplay}`;
            iDiv.onclick = () => { addProductToCurrentOrder(p.id); orderProductSearchInput.value = ''; cont.classList.remove('visible'); orderProductSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open'); };
            cont.appendChild(iDiv);
        });
    }
    function addProductToCurrentOrder(pId) {
        const p = products.find(pr => pr.id === pId);
        if (!p || (p.stock !== null && p.stock <= 0)) {
             showToast("SP không có sẵn/hết hàng.", 3000, 'warning'); return;
        }
        const exItem = currentOrderItems.find(i => i.productId === pId);
        let unitPriceToUse = (p.promoPrice && p.promoPrice > 0) ? p.promoPrice : p.price;
        const selectedCustId = selectedCustomerIdOrderFormInput.value;
        if (selectedCustId) {
            const customer = customers.find(c => c.id === parseInt(selectedCustId));
            if (customer && customer.group === 'wholesale' && typeof p.wholesalePrice === 'number' && p.wholesalePrice > 0) unitPriceToUse = p.wholesalePrice;
        }
        if (exItem) {
            if (p.stock === null || exItem.quantity < p.stock) {
                exItem.quantity++; exItem.unitPrice = unitPriceToUse;
            } else {
                showToast(`Đã đạt SL tồn tối đa cho ${p.name}.`, 3000, 'warning');
            }
        } else {
            currentOrderItems.push({ productId: p.id, name: p.name, image:(p.images&&p.images.length>0)?p.images[0]:'https://via.placeholder.com/50?text=N/A', quantity:1, unitPrice: unitPriceToUse, stock:p.stock, sku: p.sku });
        }
        renderCurrentOrderItems(); updateOrderSummary();
    }
    function renderCurrentOrderItems() {
        orderItemsListDiv.innerHTML = '';
        if (currentOrderItems.length === 0) { orderItemsListDiv.innerHTML = '<p class="no-items-in-order">Chưa có SP trong đơn.</p>'; return; }
        currentOrderItems.forEach((item, idx) => {
            const iDiv = document.createElement('div'); iDiv.className = 'order-item';
            const maxQuantity = (item.stock !== null) ? `max="${item.stock}"` : '';
            iDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info"><span class="item-name">${item.name}</span><span class="item-unit-price">${item.unitPrice.toLocaleString('vi-VN')}đ/sp</span></div>
                <div class="item-quantity-controls">
                    <button type="button" class="quantity-btn decrease-qty" data-index="${idx}" title="Giảm">-</button>
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1" ${maxQuantity} data-index="${idx}">
                    <button type="button" class="quantity-btn increase-qty" data-index="${idx}" title="Tăng">+</button>
                </div>
                <span class="item-total-price">${(item.unitPrice * item.quantity).toLocaleString('vi-VN')}đ</span>
                <button type="button" class="remove-order-item-btn" data-index="${idx}" title="Xóa"><i class="fas fa-trash-alt"></i></button>`;
            orderItemsListDiv.appendChild(iDiv);
        });
        orderItemsListDiv.querySelectorAll('.item-quantity').forEach(inp => { inp.onchange = inp.oninput = handleOrderItemQuantityChange; });
        orderItemsListDiv.querySelectorAll('.remove-order-item-btn').forEach(btn => { btn.onclick = handleRemoveOrderItem; });
        orderItemsListDiv.querySelectorAll('.quantity-btn').forEach(btn => { btn.onclick = handleQuantityButtonClick; });
    }
    function handleQuantityButtonClick(e) {
        const button = e.currentTarget; const index = parseInt(button.dataset.index); const item = currentOrderItems[index];
        const quantityInput = orderItemsListDiv.querySelector(`.item-quantity[data-index="${index}"]`); if (!item || !quantityInput) return;
        let currentQuantity = parseInt(quantityInput.value);
        if (button.classList.contains('increase-qty')) {
            if (item.stock === null || currentQuantity < item.stock) currentQuantity++;
            else showToast(`Số lượng không thể vượt quá tồn kho (${item.stock}).`, 2000, 'warning');
        }
        else if (button.classList.contains('decrease-qty')) { if (currentQuantity > 1) currentQuantity--; }
        quantityInput.value = currentQuantity; item.quantity = currentQuantity;
        const itemTotalPriceElem = button.closest('.order-item').querySelector('.item-total-price');
        if (itemTotalPriceElem) itemTotalPriceElem.textContent = (item.unitPrice * item.quantity).toLocaleString('vi-VN') + 'đ';
        updateOrderSummary();
    }
    function handleOrderItemQuantityChange(e) {
        const idx = parseInt(e.target.dataset.index); let nQ = parseInt(e.target.value); const item = currentOrderItems[idx];
        if (isNaN(nQ)||nQ<1) nQ=1;
        if (item.stock !== null && nQ > item.stock) { nQ=item.stock; showToast(`SL không thể vượt tồn (${item.stock}).`, 3000, 'warning'); }
        item.quantity = nQ; e.target.value = nQ;
        const itemTotalPriceElem = e.target.closest('.order-item').querySelector('.item-total-price');
        if (itemTotalPriceElem) itemTotalPriceElem.textContent = (item.unitPrice * item.quantity).toLocaleString('vi-VN') + 'đ';
        updateOrderSummary();
    }
    function handleRemoveOrderItem(e) { const idx = parseInt(e.currentTarget.dataset.index); currentOrderItems.splice(idx,1); renderCurrentOrderItems(); updateOrderSummary(); }
    function updateOrderSummary() {
        const subt = currentOrderItems.reduce((s,i)=>s+(i.unitPrice*i.quantity),0);
        orderSubtotalSpan.textContent = subt.toLocaleString('vi-VN')+'đ';

        const discStr = orderDiscountInput.value.trim();
        let discAmt = 0;
        if(discStr){
            if(discStr.endsWith('%')){
                const p=parseFloat(discStr.slice(0,-1));
                if(!isNaN(p)&&p>=0&&p<=100) discAmt=(subt*p)/100;
            } else {
                discAmt=getNumericValueFromFormattedInput(discStr);
            }
        }
        discAmt = Math.min(discAmt, subt);

        const shipFee = getNumericValueFromFormattedInput(orderShippingFeeInput.value);
        const totalAmount = subt - discAmt + shipFee;
        orderTotalAmountSpan.textContent = totalAmount.toLocaleString('vi-VN')+'đ';

        let amountPaid = 0;
        if (paymentStatusFullRadio && paymentStatusFullRadio.checked) {
            amountPaid = totalAmount;
            if (orderAmountPaidInput) {
                orderAmountPaidInput.value = totalAmount > 0 ? totalAmount.toLocaleString('vi-VN') : '0';
            }
        } else {
            if (orderAmountPaidInput) {
                amountPaid = getNumericValueFromFormattedInput(orderAmountPaidInput.value);
            }
        }

        const remainingAmount = totalAmount - amountPaid;
        if (orderRemainingAmountRow && orderRemainingAmountSpan) {
            if (totalAmount > 0 && remainingAmount > 0) {
                orderRemainingAmountSpan.textContent = remainingAmount.toLocaleString('vi-VN') + 'đ';
                orderRemainingAmountRow.style.display = 'flex';
                orderRemainingAmountRow.style.color = 'var(--danger-color)';
            } else if (totalAmount > 0 && remainingAmount < 0) {
                 orderRemainingAmountSpan.textContent = `Trả thừa: ${Math.abs(remainingAmount).toLocaleString('vi-VN')}đ`;
                 orderRemainingAmountRow.style.display = 'flex';
                 orderRemainingAmountRow.style.color = 'var(--success-color)';
            } else {
                orderRemainingAmountRow.style.display = 'none';
                orderRemainingAmountRow.style.color = 'var(--danger-color)';
            }
        }
    }
    function renderCustomersForOrderSearch(custsToSearch, container) {
        container.innerHTML = '';
        if (!custsToSearch || custsToSearch.length === 0) { container.innerHTML = '<p class="no-results">Không tìm thấy khách hàng.</p>'; return; }
        custsToSearch.slice(0, 5).forEach(cust => {
            const itemDiv = document.createElement('div'); itemDiv.className = 'result-item'; itemDiv.dataset.customerId = cust.id;
            itemDiv.innerHTML = `<span class="cust-name">${cust.name}</span> <span class="cust-phone">${cust.phone || 'N/A'}</span>`;
            itemDiv.onclick = () => { selectCustomerForOrder(cust.id); orderCustomerSearchInput.value = `${cust.name} (${cust.phone || 'N/A'})`; container.classList.remove('visible'); orderCustomerSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open'); };
            container.appendChild(itemDiv);
        });
    }
    function selectCustomerForOrder(custId) {
        const cust = customers.find(c => c.id === custId);
        if (cust) {
            customerNameOrderFormInput.value = cust.name; customerPhoneOrderFormInput.value = cust.phone || ""; customerAddressOrderFormInput.value = cust.address || ''; customerEmailOrderFormInput.value = cust.email || ''; selectedCustomerIdOrderFormInput.value = cust.id;
            currentOrderItems.forEach(item => {
                const product = products.find(p => p.id === item.productId);
                if (product) {
                    let priceToUse = (product.promoPrice && product.promoPrice > 0) ? product.promoPrice : product.price;
                    if (cust.group === 'wholesale' && typeof product.wholesalePrice === 'number' && product.wholesalePrice > 0) priceToUse = product.wholesalePrice;
                    item.unitPrice = priceToUse;
                }
            });
            renderCurrentOrderItems(); updateOrderSummary();
        }
    }
    function autoFillCustomerInfoByPhone() {
        const phone = customerPhoneOrderFormInput.value.trim();
        if (phone && !selectedCustomerIdOrderFormInput.value) {
            const exCust = customers.find(c => c.phone === phone); if (exCust) { selectCustomerForOrder(exCust.id); orderCustomerSearchInput.value = `${exCust.name} (${exCust.phone || 'N/A'})`; }
        }
    }
    function handleOrderFormSubmit(e) {
        e.preventDefault();
        const cName = customerNameOrderFormInput.value.trim();
        const cAddr = customerAddressOrderFormInput.value.trim();
        if (!cName) {
            showToast("Vui lòng nhập Tên Khách Hàng.", 3000, 'error');
            return;
        }
        if (currentOrderItems.length === 0) {
            showToast("Đơn hàng phải có sản phẩm.", 3000, 'error');
            return;
        }

        updateOrderSummary();

        const subtotal = currentOrderItems.reduce((s, i) => s + (i.unitPrice * i.quantity), 0);
        const discountStr = orderDiscountInput.value.trim();
        let finalDiscountAmount = 0;
        if (discountStr) {
            if (discountStr.endsWith('%')) {
                const percentage = parseFloat(discountStr.slice(0, -1));
                if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
                    finalDiscountAmount = (subtotal * percentage) / 100;
                }
            } else {
                finalDiscountAmount = getNumericValueFromFormattedInput(discountStr);
            }
        }
        finalDiscountAmount = Math.min(finalDiscountAmount, subtotal);

        const finalShippingFee = getNumericValueFromFormattedInput(orderShippingFeeInput.value);
        const finalTotalAmount = subtotal - finalDiscountAmount + finalShippingFee;

        let finalAmountPaid;
        let isDebt = false;
        const paymentMethodUserSelected = orderPaymentMethodSelect.value;

        if (paymentStatusFullRadio && paymentStatusFullRadio.checked) {
            finalAmountPaid = finalTotalAmount;
            isDebt = false;
        } else if (paymentStatusPartialDebtRadio && paymentStatusPartialDebtRadio.checked) {
            finalAmountPaid = getNumericValueFromFormattedInput(orderAmountPaidInput.value);
            if (finalAmountPaid < finalTotalAmount) {
                isDebt = true;
            } else {
                finalAmountPaid = finalTotalAmount;
                isDebt = false;
            }
        } else {
            finalAmountPaid = getNumericValueFromFormattedInput(orderAmountPaidInput.value);
            if (paymentMethodUserSelected === 'debt') isDebt = true;
            else if (finalAmountPaid < finalTotalAmount) isDebt = true;
        }


        if (finalAmountPaid > finalTotalAmount) {
             showToast("Số tiền khách trả không thể lớn hơn tổng tiền đơn hàng.", 3000, 'error');
             return;
        }

        let custIdForOrder;
        const cPhoneValue = customerPhoneOrderFormInput.value.trim();
        const cEmailValue = customerEmailOrderFormInput.value.trim();
        if (selectedCustomerIdOrderFormInput.value) {
            custIdForOrder = parseInt(selectedCustomerIdOrderFormInput.value);
        } else {
            const custForOrder = getOrCreateCustomer(cName, cPhoneValue, cEmailValue, cAddr);
            custIdForOrder = custForOrder.id;
        }

        const newUpdatedAt = new Date().toISOString();
        let orderCreatedAtValue;
        if (orderCreatedAtModalInput && orderCreatedAtModalInput.value) {
            orderCreatedAtValue = new Date(orderCreatedAtModalInput.value).toISOString();
        } else if (editingOrderId) {
            const existingOrder = orders.find(o => o.id === editingOrderId);
            orderCreatedAtValue = existingOrder ? existingOrder.createdAt : new Date().toISOString();
        } else {
            orderCreatedAtValue = new Date().toISOString();
        }

        const oData = {
            id: editingOrderId || Date.now(),
            customerId: custIdForOrder,
            customer: { name: cName, phone: cPhoneValue, address: cAddr, email: cEmailValue },
            items: JSON.parse(JSON.stringify(currentOrderItems)),
            subtotal: subtotal,
            discountRaw: discountStr,
            discountAmount: finalDiscountAmount,
            shippingFee: finalShippingFee,
            totalAmount: finalTotalAmount,
            amountPaid: finalAmountPaid,
            paymentMethod: paymentMethodUserSelected,
            status: orderStatusModalSelect.value,
            notes: orderNotesTextarea.value.trim(),
            customerNotes: orderCustomerNotesTextarea.value.trim(),
            createdAt: orderCreatedAtValue,
            updatedAt: newUpdatedAt,
            dueDate: (isDebt && orderDebtDueDateInput.value) ? orderDebtDueDateInput.value : null
        };

        const origOrder = editingOrderId ? JSON.parse(JSON.stringify(orders.find(o => o.id === editingOrderId))) : null;
        const isNewOrder = !editingOrderId;

        const statusReducesStock = oData.status !== 'cancelled' && oData.status !== 'returned';
        const originalStatusReducedStock = origOrder && (origOrder.status !== 'cancelled' && origOrder.status !== 'returned');

        if (statusReducesStock) {
            let stockOk = true;
            for (const item of oData.items) {
                const product = products.find(p => p.id === item.productId);
                if (product && product.stock !== null) {
                    let quantityNeeded = item.quantity;
                    if (origOrder && originalStatusReducedStock) {
                        const originalItem = origOrder.items.find(oi => oi.productId === item.productId);
                        if (originalItem) quantityNeeded = item.quantity - originalItem.quantity;
                    }
                    if (quantityNeeded > 0 && product.stock < quantityNeeded) {
                        stockOk = false;
                        showToast(`Không đủ tồn kho cho: ${product.name}. Hiện có: ${product.stock}, Cần thêm: ${quantityNeeded}.`, 4000, 'error');
                        break;
                    }
                }
            }
            if (!stockOk) return;
        }

        oData.items.forEach(item => {
            const productIndex = products.findIndex(p => p.id === item.productId);
            if (productIndex > -1 && products[productIndex].stock !== null) {
                let quantityToAdjust = 0;
                const originalItem = origOrder ? origOrder.items.find(oi => oi.productId === item.productId) : null;
                const originalQuantity = originalItem ? originalItem.quantity : 0;
                if (statusReducesStock && !originalStatusReducedStock) {
                    quantityToAdjust = -item.quantity;
                } else if (!statusReducesStock && originalStatusReducedStock) {
                    quantityToAdjust = originalQuantity;
                } else if (statusReducesStock && originalStatusReducedStock) {
                    quantityToAdjust = -(item.quantity - originalQuantity);
                }
                products[productIndex].stock += quantityToAdjust;
            }
        });
        saveProducts();

        const previousStatus = origOrder ? origOrder.status : null;
        const currentStatus = oData.status;
        const orderIsNowCompletedOrDelivered = (currentStatus === 'delivered' || currentStatus === 'completed');
        const orderWasPreviouslyCompletedOrDelivered = (previousStatus === 'delivered' || previousStatus === 'completed');

        if (orderIsNowCompletedOrDelivered && !orderWasPreviouslyCompletedOrDelivered) {
            recordFinancialTransactionsForOrder(oData, 'create');
        } else if (!orderIsNowCompletedOrDelivered && orderWasPreviouslyCompletedOrDelivered) {
            recordFinancialTransactionsForOrder(origOrder, 'delete');
        } else if (orderIsNowCompletedOrDelivered && orderWasPreviouslyCompletedOrDelivered && editingOrderId) {
            recordFinancialTransactionsForOrder(origOrder, 'delete');
            recordFinancialTransactionsForOrder(oData, 'create');
        }


        if (isNewOrder) {
            orders.push(oData);
            showToast(`Đơn hàng #${oData.id.toString().slice(-6)} đã được tạo thành công!`, 3000, 'success');
        } else {
            const i = orders.findIndex(o => o.id === editingOrderId);
            if (i > -1) orders[i] = oData;
            showToast(`Đơn hàng #${oData.id.toString().slice(-6)} đã cập nhật!`);
        }
        saveOrders();

        const remainingToPayOnOrder = oData.totalAmount - oData.amountPaid;
        if (isDebt && remainingToPayOnOrder > 0) {
            const existingDebtForOrder = debts_v2.find(d => d.orderId === oData.id);
            const defaultDueDateForDebt = oData.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            if (existingDebtForOrder) {
                existingDebtForOrder.amount = oData.totalAmount;
                existingDebtForOrder.remainingAmount = remainingToPayOnOrder;
                existingDebtForOrder.dueDate = defaultDueDateForDebt;
                existingDebtForOrder.note = `Nợ cập nhật từ ĐH #${oData.id.toString().slice(-6)}. ${oData.notes || ''}`.trim();
                existingDebtForOrder.customerName = oData.customer.name;
                existingDebtForOrder.customerPhone = oData.customer.phone;
                existingDebtForOrder.customerEmail = oData.customer.email || '';
                existingDebtForOrder.product = oData.items.map(item => `${item.name} (x${item.quantity})`).join(', ');
                existingDebtForOrder.createDate = new Date(oData.createdAt).toISOString().split('T')[0];
                existingDebtForOrder.status = calculateNewDebtStatus(existingDebtForOrder);
                showToast(`Phiếu nợ cho ĐH #${oData.id.toString().slice(-6)} đã được cập nhật.`);
            } else {
                const newDebtEntry = {
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    customerName: oData.customer.name, customerPhone: oData.customer.phone, customerEmail: oData.customer.email || '',
                    amount: oData.totalAmount,
                    remainingAmount: remainingToPayOnOrder,
                    product: oData.items.map(item => `${item.name} (x${item.quantity})`).join(', '),
                    createDate: new Date(oData.createdAt).toISOString().split('T')[0],
                    dueDate: defaultDueDateForDebt,
                    note: `Nợ tự động từ ĐH #${oData.id.toString().slice(-6)}. ${oData.notes || ''}`.trim(),
                    status: 'pending',
                    orderId: oData.id
                };
                newDebtEntry.status = calculateNewDebtStatus(newDebtEntry);
                debts_v2.push(newDebtEntry);
                showToast(`Đã tự động tạo phiếu nợ cho ĐH #${oData.id.toString().slice(-6)}.`);
            }
            saveNewDebts();
            if (debtsSectionDiv.classList.contains('active-section')) {
                renderNewDebtList(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2();
            }
        } else if ((!isDebt && remainingToPayOnOrder <= 0) || (isDebt && remainingToPayOnOrder <= 0) ) {
            const existingDebtForOrderIndex = debts_v2.findIndex(d => d.orderId === oData.id);
            if (existingDebtForOrderIndex > -1) {
                const debtToRemove = debts_v2[existingDebtForOrderIndex];
                debts_v2.splice(existingDebtForOrderIndex, 1);
                payments_v2 = payments_v2.filter(p => p.debtId !== debtToRemove.id);
                saveNewDebts();
                showToast(`Đã xóa phiếu nợ cũ của ĐH #${oData.id.toString().slice(-6)} do đã thanh toán đủ hoặc thay đổi hình thức.`);
                if (debtsSectionDiv.classList.contains('active-section')) {
                    renderNewDebtList(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2();
                }
            }
        }

        closeOrderModal();

        window.currentOrderForInvoiceFromApp = { ...oData };

        if (oData.status !== 'cancelled' && oData.status !== 'returned') {
            if (typeof InvoiceModule !== 'undefined' && InvoiceModule.showInvoiceFullScreenDOM) {
                InvoiceModule.showInvoiceFullScreenDOM(oData);
            } else {
                showSection('invoiceSettingsSection');
            }
        } else {
            if (ordersSectionDiv.classList.contains('active-section')) {
                applyOrderFilters();
            }
        }

        if (productSectionDiv.classList.contains('active-section')) renderProducts();
        if (customersSectionDiv.classList.contains('active-section')) { renderCustomerList(); updateCustomerStats(); }
        if (financeSectionDiv.classList.contains('active-section')) { applyFinanceFilters(); }
        if (debtsSectionDiv.classList.contains('active-section')) { renderNewDebtList(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2(); }
        updateDashboardStats();

        if (!(typeof InvoiceModule !== 'undefined' && InvoiceModule.isOrderDisplayedInFullScreen && InvoiceModule.isOrderDisplayedInFullScreen(oData.id)) &&
            ordersSectionDiv.classList.contains('active-section') &&
            !document.getElementById('invoiceSettingsSection').classList.contains('active-section')
        ) {
            applyOrderFilters();
        }
        updateReportSalesData();
        updateReportFinanceData();
    }
    function applyOrderFilters() {
        const sT=orderSearchInput.value.toLowerCase(),sS=orderStatusFilterSelect.value,dF=orderDateFromFilterInput.value,dT=orderDateToFilterInput.value;
        // console.log("Đang lọc đơn hàng với:", { sT, sS, dF, dT });
        // console.log("Tất cả đơn hàng trước khi lọc:", JSON.parse(JSON.stringify(orders)));

        const fOrders = orders.filter(o=>
            (!sT||o.id.toString().slice(-6).includes(sT)||o.customer.name.toLowerCase().includes(sT)||(o.customer.phone && o.customer.phone.includes(sT))) &&
            (!sS||o.status===sS) && (!dF||new Date(o.createdAt).setHours(0,0,0,0)>=new Date(dF).setHours(0,0,0,0)) &&
            (!dT||new Date(o.createdAt).setHours(0,0,0,0)<=new Date(dT).setHours(0,0,0,0)) );

        // console.log("Đơn hàng sau khi lọc:", JSON.parse(JSON.stringify(fOrders)));
        renderOrderList(fOrders);
        const cards = orderListContainer.querySelectorAll('.order-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'none';
            requestAnimationFrame(() => {
                card.style.transition = `opacity var(--transition-duration-long) var(--transition-timing-smooth) ${index * 50}ms, transform var(--transition-duration-long) var(--transition-timing-smooth) ${index * 50}ms`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        });
    }
    function deleteOrder(orderId) {
        const orderIndex = orders.findIndex(o => o.id === orderId); if (orderIndex === -1) { showToast("Không tìm thấy đơn hàng.", 3000, 'error'); return; }
        const orderToDelete = orders[orderIndex];
        if (orderToDelete.status === 'delivered' || orderToDelete.status === 'completed') recordFinancialTransactionsForOrder(orderToDelete, 'delete');
        if (orderToDelete.status !== 'cancelled' && orderToDelete.status !== 'returned') {
            orderToDelete.items.forEach(item => {
                const productIndex = products.findIndex(p => p.id === item.productId);
                if (productIndex > -1 && products[productIndex].stock !== null) {
                     products[productIndex].stock += item.quantity;
                }
            });
            saveProducts(); if (productSectionDiv.classList.contains('active-section')) renderProducts();
        }
        const associatedDebtIndex = debts_v2.findIndex(d => d.orderId === orderId);
        if (associatedDebtIndex > -1) {
            const debtToDelete = debts_v2[associatedDebtIndex];
            debts_v2.splice(associatedDebtIndex, 1);
            payments_v2 = payments_v2.filter(p => p.debtId !== debtToDelete.id);
            saveNewDebts();
            if (debtsSectionDiv.classList.contains('active-section')) { renderNewDebtList(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2(); }
            showToast(`Đã xóa phiếu nợ liên quan đến ĐH #${orderToDelete.id.toString().slice(-6)}.`);
        }

        orders.splice(orderIndex, 1); saveOrders(); showToast(`Đơn hàng #${orderToDelete.id.toString().slice(-6)} đã xóa.`);
        updateDashboardStats(); applyOrderFilters(); if (customersSectionDiv.classList.contains('active-section')) { renderCustomerList(); updateCustomerStats(); }
        if (financeSectionDiv.classList.contains('active-section')) { applyFinanceFilters(); } updateReportSalesData(); updateReportFinanceData();
    }


    // --- CUSTOMER MANAGEMENT ---
    function loadCustomers() {
        const stored = localStorage.getItem('customers'); customers = stored ? JSON.parse(stored) : [];
        customers.forEach(cust => { if (cust.interactions === undefined) cust.interactions = []; if (cust.personalNotes === undefined) cust.personalNotes = ""; if (cust.source === undefined) cust.source = ""; });
        if (!stored && customers.length === 0) {
             customers = [
                { id: Date.now()+200, name: "Nguyễn Văn A", phone: "0901234567", email: "nva@example.com", address: "123 Đường ABC, Q1, HCM", group: "vip", dob: "1990-01-15", source: "Facebook", personalNotes: "Thích màu đỏ.", interactions: [], createdAt: new Date(Date.now() - 86400000 * 5).toISOString()},
                { id: Date.now()+201, name: "Trần Thị B", phone: "0912345678", email: "ttb@example.com", address: "456 Đường XYZ, Q3, HCM", group: "regular", dob: "1995-05-20", source: "Cửa hàng", personalNotes: "", interactions: [], createdAt: new Date(Date.now() - 86400000 * 10).toISOString()},
                { id: Date.now()+202, name: "Khách Sỉ C", phone: "0922222222", email: "khachsi@example.com", address: "789 Đường DEF, Q5, HCM", group: "wholesale", dob: "", source: "Zalo", personalNotes: "Lấy số lượng lớn.", interactions: [], createdAt: new Date(Date.now() - 86400000 * 2).toISOString()},
             ];
            try {
                localStorage.setItem('customers', JSON.stringify(customers));
            } catch (e) {
                console.error("Lỗi lưu khách hàng mẫu vào localStorage:", e);
            }
        }
    }
    function saveCustomers() {
        try {
            localStorage.setItem('customers', JSON.stringify(customers));
        } catch (e) {
            console.error("Lỗi khi lưu khách hàng vào localStorage:", e);
            showToast("Lỗi: Không thể lưu dữ liệu khách hàng. Bộ nhớ có thể đã đầy.", 5000, 'error');
        }
    }
    function getOrCreateCustomer(name, phone, email, address, createdAt = new Date().toISOString(), source = "") {
        let cust = null; const trimmedPhone = phone ? phone.trim() : "";
        if (trimmedPhone) cust = customers.find(c => c.phone === trimmedPhone);
        if (!cust && email && email.trim()) cust = customers.find(c => c.email && c.email.trim().toLowerCase() === email.trim().toLowerCase());
        if (cust) {
            if (name && !cust.name) cust.name = name.trim(); if (address && !cust.address) cust.address = address.trim();
            if (email && !cust.email) cust.email = email.trim(); if (source && !cust.source) cust.source = source;
        } else {
            cust = { id: Date.now() + Math.floor(Math.random() * 100), name: name.trim(), phone: trimmedPhone, email: email ? email.trim() : '', address: address ? address.trim() : '', group: 'new', dob: '', source: source, personalNotes: '', interactions: [], createdAt: createdAt };
            customers.push(cust);
        } saveCustomers(); return cust;
    }
    function renderCustomerList(custsToDisp = customers) {
        if(!customerListContainer) return; customerListContainer.innerHTML = '';
        const noMsg = customersSectionDiv.querySelector('.no-customers');
        if (custsToDisp.length === 0) { if(noMsg) noMsg.style.display = 'block'; return; } if(noMsg) noMsg.style.display = 'none';
        custsToDisp.sort((a,b)=>(b.createdAt&&a.createdAt)?new Date(b.createdAt)-new Date(a.createdAt):0);
        custsToDisp.forEach((c) => {
            const card = document.createElement('div'); card.className='customer-card'; card.dataset.customerId = c.id;
            const avChar = c.name?c.name.charAt(0).toUpperCase():'?';
            const cOrdersCompleted = orders.filter(o=>o.customerId===c.id && (o.status === 'delivered' || o.status === 'completed'));
            const tSpent=cOrdersCompleted.reduce((s,o)=>s+o.totalAmount,0); const customerGroupDisplay = CUSTOMER_GROUP_TEXT[c.group] || c.group || 'Mới';
            card.innerHTML = `
                <div class="customer-avatar">${avChar}</div>
                <div class="customer-info">
                    <h4 class="customer-name">${c.name||'Chưa có tên'}</h4>
                    <div class="customer-contact"><p><i class="fas fa-phone-alt"></i> ${c.phone||'N/A'}</p><p><i class="fas fa-envelope"></i> ${c.email||'N/A'}</p><p><i class="fas fa-map-marker-alt"></i> ${c.address||'N/A'}</p></div>
                    <div class="customer-summary"><span><i class="fas fa-shopping-cart"></i> Đơn HT: <strong>${cOrdersCompleted.length}</strong></span><span><i class="fas fa-dollar-sign"></i> Tổng chi: <strong>${tSpent.toLocaleString('vi-VN')}đ</strong></span><span><i class="fas fa-users"></i> Nhóm: <strong>${customerGroupDisplay}</strong></span></div>
                </div>
                <div class="customer-actions"><button class="btn btn-sm btn-secondary view-customer-btn"><i class="fas fa-eye"></i> Xem</button><button class="btn btn-sm edit-customer-btn"><i class="fas fa-user-edit"></i> Sửa</button><button class="btn btn-sm btn-danger delete-customer-btn"><i class="fas fa-user-times"></i> Xóa</button></div>`;
            customerListContainer.appendChild(card);
        });
    }
    function openCustomerModal(custId = null, defTab = 'customerInfoTab') {
        customerForm.reset(); if (customerInteractionForm) customerInteractionForm.reset();
        customerModalTabs.forEach(t => t.classList.remove('active')); customerModalTabContents.forEach(c => c.classList.remove('active'));
        const activeTabLink = customerModal.querySelector(`.tab-link[data-tab="${defTab}"]`); const activeTabContent = document.getElementById(defTab);
        if (activeTabLink) activeTabLink.classList.add('active'); if (activeTabContent) activeTabContent.classList.add('active');
        const historyTabLink = customerModal.querySelector(`.tab-link[data-tab="customerHistoryTab"]`); const interactionsTabLink = customerModal.querySelector(`.tab-link[data-tab="customerInteractionsTab"]`);
        if (custId) {
            editingCustomerId = custId; customerModalTitleElem.textContent = 'Thông Tin Chi Tiết Khách Hàng'; saveCustomerBtn.innerHTML = '<i class="fas fa-save"></i> Cập Nhật';
            const c = customers.find(cu => cu.id === custId);
            if (c) {
                customerIdInput.value = c.id; custModalNameInput.value = c.name; custModalPhoneInput.value = c.phone || ""; custModalEmailInput.value = c.email || ''; custModalAddressTextarea.value = c.address || '';
                custModalGroupSelect.value = c.group || ''; custModalDobInput.value = c.dob || ''; custModalSourceInput.value = c.source || ''; custModalPersonalNotesTextarea.value = c.personalNotes || '';
                renderCustomerOrderHistory(custId); renderCustomerInteractions(custId);
                if (interactionCustomerIdInput) interactionCustomerIdInput.value = custId; if (interactionDateInput) interactionDateInput.value = new Date().toISOString().substring(0, 16);
            }
            if (historyTabLink) historyTabLink.style.display = 'inline-block'; if (interactionsTabLink) interactionsTabLink.style.display = 'inline-block';
            const formShouldBeDisabled = defTab !== 'customerInfoTab'; customerForm.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(el => el.disabled = formShouldBeDisabled); saveCustomerBtn.style.display = formShouldBeDisabled ? 'none' : 'inline-flex';
        } else {
            editingCustomerId = null; customerModalTitleElem.textContent = 'Thêm Khách Hàng Mới'; saveCustomerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Thêm KH';
            if (customerOrderHistoryListDiv) customerOrderHistoryListDiv.innerHTML = '<p>Khách hàng mới, chưa có lịch sử mua hàng.</p>';
            if (customerLTVDisplaySpan) customerLTVDisplaySpan.textContent = '0đ'; if (customerTotalOrdersDisplaySpan) customerTotalOrdersDisplaySpan.textContent = '0'; if (customerAvgOrderValueDisplaySpan) customerAvgOrderValueDisplaySpan.textContent = '0đ';
            if (customerPurchaseFrequencyDisplaySpan) customerPurchaseFrequencyDisplaySpan.textContent = 'N/A'; if (customerLastPurchaseDateDisplaySpan) customerLastPurchaseDateDisplaySpan.textContent = 'N/A';
            if (customerInteractionHistoryListDiv) customerInteractionHistoryListDiv.innerHTML = '<p>Chưa có ghi chú tương tác.</p>';
            customerForm.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(el => el.disabled = false); saveCustomerBtn.style.display = 'inline-flex';
            if (historyTabLink) historyTabLink.style.display = 'none'; if (interactionsTabLink) interactionsTabLink.style.display = 'none';
        } openModalWithTransition(customerModal);
    }
    function closeCustomerModal() { closeModalWithTransition(customerModal, () => { editingCustomerId = null; }); }
    function renderCustomerOrderHistory(custId) {
        const customerOrdersCompleted = orders.filter(o => o.customerId === custId && (o.status === 'delivered' || o.status === 'completed')).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const allCustomerOrdersForDisplay = orders.filter(o => o.customerId === custId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (customerOrderHistoryListDiv) customerOrderHistoryListDiv.innerHTML = '';
        if (allCustomerOrdersForDisplay.length === 0) { if (customerOrderHistoryListDiv) customerOrderHistoryListDiv.innerHTML = '<p>Chưa có đơn hàng nào.</p>'; if (customerLTVDisplaySpan) customerLTVDisplaySpan.textContent = '0đ'; if (customerTotalOrdersDisplaySpan) customerTotalOrdersDisplaySpan.textContent = '0'; if (customerAvgOrderValueDisplaySpan) customerAvgOrderValueDisplaySpan.textContent = '0đ'; if (customerPurchaseFrequencyDisplaySpan) customerPurchaseFrequencyDisplaySpan.textContent = 'N/A'; if (customerLastPurchaseDateDisplaySpan) customerLastPurchaseDateDisplaySpan.textContent = 'N/A'; return; }
        let totalSpentLTV = 0; customerOrdersCompleted.forEach(o => { totalSpentLTV += o.totalAmount; });
        if (customerLTVDisplaySpan) customerLTVDisplaySpan.textContent = totalSpentLTV.toLocaleString('vi-VN') + 'đ'; if (customerTotalOrdersDisplaySpan) customerTotalOrdersDisplaySpan.textContent = customerOrdersCompleted.length.toString();
        if (customerAvgOrderValueDisplaySpan) customerAvgOrderValueDisplaySpan.textContent = customerOrdersCompleted.length > 0 ? (totalSpentLTV / customerOrdersCompleted.length).toLocaleString('vi-VN', { maximumFractionDigits: 0 }) + 'đ' : '0đ';
        if (customerLastPurchaseDateDisplaySpan) customerLastPurchaseDateDisplaySpan.textContent = customerOrdersCompleted.length > 0 ? new Date(customerOrdersCompleted[0].createdAt).toLocaleDateString('vi-VN') : 'N/A';
        if (customerPurchaseFrequencyDisplaySpan) { if (customerOrdersCompleted.length > 1) { let totalDaysBetweenPurchases = 0; for (let i = 0; i < customerOrdersCompleted.length - 1; i++) { const date1 = new Date(customerOrdersCompleted[i].createdAt); const date2 = new Date(customerOrdersCompleted[i+1].createdAt); totalDaysBetweenPurchases += Math.abs(date1 - date2) / (1000 * 60 * 60 * 24); } const avgDays = totalDaysBetweenPurchases / (customerOrdersCompleted.length - 1); customerPurchaseFrequencyDisplaySpan.textContent = `${avgDays.toFixed(1)} ngày`; } else customerPurchaseFrequencyDisplaySpan.textContent = 'N/A (cần >1 đơn HT)';}
        allCustomerOrdersForDisplay.forEach(o => {
            const li = document.createElement('div'); li.className = 'list-item'; let itemsHtml = o.items.map(item => `<p style="margin-left:15px;">- ${item.name} (SL: ${item.quantity}, Giá: ${item.unitPrice.toLocaleString('vi-VN')}đ)</p>`).join('');
            const paymentMethodText = PAYMENT_METHODS_TEXT[o.paymentMethod] || o.paymentMethod;
            li.innerHTML = `<div style="display: flex; justify-content: space-between; align-items: center;"><span><strong class="item-id" data-order-id="${o.id}" title="Click để xem chi tiết đơn hàng">ĐH #${o.id.toString().slice(-6)}</strong><span class="item-date">(${new Date(o.createdAt).toLocaleString('vi-VN')})</span>- Tổng: <span class="item-total">${o.totalAmount.toLocaleString('vi-VN')}đ</span><span class="item-status order-status ${o.status}">${ORDER_STATUSES[o.status] || o.status}</span></span><button class="order-details-toggle btn btn-sm"><i class="fas fa-chevron-down"></i> Xem CT</button></div><div class="order-item-details"><p><strong>Sản phẩm:</strong></p>${itemsHtml}<p><strong>Phương thức TT:</strong> ${paymentMethodText}</p>${o.notes ? `<p><strong>Ghi chú shop:</strong> ${o.notes}</p>` : ''}${o.customerNotes ? `<p><strong>Ghi chú khách:</strong> ${o.customerNotes}</p>` : ''}<p><strong>Địa chỉ giao:</strong> ${o.customer.address}</p></div>`;
            if (customerOrderHistoryListDiv) customerOrderHistoryListDiv.appendChild(li);
        });
    }
    function handleCustomerFormSubmit(e) {
        e.preventDefault(); const name = custModalNameInput.value.trim(); const phone = custModalPhoneInput.value.trim();
        if (!name) { showToast("Vui lòng nhập Tên Khách Hàng.", 3000, 'error'); return; }
        if (phone) { const exCust = customers.find(c => c.phone === phone && c.id !== editingCustomerId); if (exCust) { showToast("Số điện thoại này đã được sử dụng cho khách hàng khác.", 3000, 'error'); return; }}
        const cData = {
            id: editingCustomerId || Date.now(), name: name, phone: phone, email: custModalEmailInput.value.trim() || '', address: custModalAddressTextarea.value.trim() || '',
            group: custModalGroupSelect.value || 'new', dob: custModalDobInput.value || '', source: custModalSourceInput.value.trim() || '', personalNotes: custModalPersonalNotesTextarea.value.trim() || '',
            createdAt: editingCustomerId ? customers.find(c => c.id === editingCustomerId).createdAt : new Date().toISOString()
        };
        if (editingCustomerId) { const index = customers.findIndex(c => c.id === editingCustomerId); if (index > -1) { cData.interactions = customers[index].interactions || []; customers[index] = cData; } showToast("Thông tin khách hàng đã cập nhật!");}
        else { cData.interactions = []; customers.push(cData); showToast("Khách hàng mới đã được thêm!"); }
        saveCustomers(); renderCustomerList(); updateCustomerStats(); closeCustomerModal();
    }
    function deleteCustomer(customerId) {
        const customerOrdersCount = orders.filter(o => o.customerId === customerId).length; const customerDebtsCountV2 = debts_v2.filter(d => d.customerPhone === (customers.find(c => c.id === customerId)?.phone)).length;
        let warningMessage = `Xóa khách hàng "${customers.find(c=>c.id===customerId)?.name || 'này'}"?\n`;
        if (customerOrdersCount > 0) warningMessage += `- Có ${customerOrdersCount} đơn hàng.\n`; if (customerDebtsCountV2 > 0) warningMessage += `- Có ${customerDebtsCountV2} phiếu nợ (mới) liên quan đến SĐT này.\n`;
        if (customerOrdersCount > 0 || customerDebtsCountV2 > 0) warningMessage += `Các đơn hàng sẽ không bị xóa nhưng liên kết KH có thể mất. Các phiếu nợ (mới) sẽ không bị xóa.`;
        if (!confirm(warningMessage)) return;
        customers = customers.filter(c => c.id !== customerId); saveCustomers(); renderCustomerList(); updateCustomerStats(); showToast("Đã xóa khách hàng.");
    }
    function applyCustomerFilters() {
        const sT=customerSearchInput.value.toLowerCase(), sGrp=customerGroupFilterSelect.value, minS=getNumericValueFromFormattedInput(customerTotalSpentMinInput.value), maxS=getNumericValueFromFormattedInput(customerTotalSpentMaxInput.value);
        const fCusts = customers.filter(c => {
            const matchSearch = !sT||c.name.toLowerCase().includes(sT)||(c.phone && c.phone.includes(sT))||(c.email&&c.email.toLowerCase().includes(sT));
            const cOrdersCompleted =orders.filter(o=>o.customerId===c.id && (o.status === 'delivered' || o.status === 'completed')); const tSpent=cOrdersCompleted.reduce((s,o)=>s+o.totalAmount,0);
            const matchSpent = (isNaN(minS)||tSpent>=minS) && (isNaN(maxS)||maxS===0||tSpent<=maxS); const matchGroup = !sGrp || c.group === sGrp;
            return matchSearch && matchSpent && matchGroup;
        });
        renderCustomerList(fCusts);
        const cards = customerListContainer.querySelectorAll('.customer-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'none';
            requestAnimationFrame(() => {
                card.style.transition = `opacity var(--transition-duration-long) var(--transition-timing-smooth) ${index * 50}ms, transform var(--transition-duration-long) var(--transition-timing-smooth) ${index * 50}ms`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        });
    }
    function updateCustomerStats() { if(totalCustomerCountSpan) totalCustomerCountSpan.textContent = customers.length.toString(); }
    function renderCustomerInteractions(custId) {
        if (!customerInteractionHistoryListDiv) return; customerInteractionHistoryListDiv.innerHTML = '';
        const customer = customers.find(c => c.id === custId);
        if (!customer || !customer.interactions || customer.interactions.length === 0) { customerInteractionHistoryListDiv.innerHTML = '<p>Chưa có ghi chú tương tác nào.</p>'; return; }
        const sortedInteractions = [...customer.interactions].sort((a, b) => new Date(b.date) - new Date(a.date));
        sortedInteractions.forEach(interaction => {
            const itemDiv = document.createElement('div'); itemDiv.className = 'interaction-item';
            itemDiv.innerHTML = `<div class="interaction-meta"><span><strong>Ngày:</strong> ${new Date(interaction.date).toLocaleString('vi-VN')}</span> | <span><strong>Kênh:</strong> ${interaction.channel}</span></div><div class="interaction-content">${interaction.notes.replace(/\n/g, '<br>')}</div>`;
            customerInteractionHistoryListDiv.appendChild(itemDiv);
        });
    }
    function handleCustomerInteractionFormSubmit(event) {
        event.preventDefault(); if (!editingCustomerId) { showToast("Vui lòng chọn khách hàng để thêm tương tác.", 3000, 'error'); return; }
        const customerIdForInteraction = parseInt(interactionCustomerIdInput.value); const date = interactionDateInput.value; const channel = interactionChannelSelect.value; const notes = interactionNotesTextarea.value.trim();
        if (!date || !channel || !notes) { showToast("Vui lòng nhập đầy đủ thông tin tương tác (Ngày, Kênh, Nội dung).", 3000, 'error'); return; }
        const customerIndex = customers.findIndex(c => c.id === customerIdForInteraction);
        if (customerIndex > -1) { if (!customers[customerIndex].interactions) customers[customerIndex].interactions = []; customers[customerIndex].interactions.push({ id: Date.now(), date, channel, notes }); saveCustomers(); renderCustomerInteractions(customerIdForInteraction); interactionNotesTextarea.value = ''; interactionDateInput.value = new Date().toISOString().substring(0, 16); showToast("Đã thêm ghi chú tương tác."); }
        else showToast("Không tìm thấy khách hàng.", 3000, 'error');
    }


    // --- NEW DEBT MANAGEMENT ---
    function loadNewDebts() {
        const storedDebts = localStorage.getItem('debts_v2');
        debts_v2 = storedDebts ? JSON.parse(storedDebts) : [];
        if (!storedDebts && debts_v2.length === 0) {
            debts_v2 = [
                { id: Date.now() + 500, customerName: 'Nguyễn Văn A (Mẫu)', customerPhone: '0123456789', customerEmail: 'nguyenvana@email.com', amount: 5000000, remainingAmount: 3000000, product: 'Laptop Dell XPS 13', createDate: '2024-05-01', dueDate: '2024-06-01', note: 'Khách hàng VIP, ưu tiên thanh toán', status: 'overdue' },
                { id: Date.now() + 501, customerName: 'Trần Thị B (Mẫu)', customerPhone: '0987654321', customerEmail: 'tranthib@email.com', amount: 2000000, remainingAmount: 2000000, product: 'iPhone 15 Pro', createDate: '2024-05-15', dueDate: '2024-06-15', note: 'Thanh toán theo tháng', status: 'pending' }
            ];
        }
        window.debts_v2_from_app = debts_v2;
        const storedPayments = localStorage.getItem('payments_v2'); payments_v2 = storedPayments ? JSON.parse(storedPayments) : [];
        if (!storedPayments && payments_v2.length === 0 && debts_v2.length > 0 && debts_v2[0]) payments_v2 = [ { id: Date.now() + 600, debtId: debts_v2[0].id, amount: 2000000, paymentDate: '2024-05-15', note: 'Thanh toán lần 1 (mẫu)'} ];
        if(!storedDebts || !storedPayments) {
            try {
                localStorage.setItem('debts_v2', JSON.stringify(debts_v2));
                localStorage.setItem('payments_v2', JSON.stringify(payments_v2));
            } catch(e) {
                console.error("Lỗi lưu dữ liệu nợ mẫu vào localStorage:", e);
            }
        }
        updateNewDebtStatuses();
    }
    function saveNewDebts() {
        try {
            localStorage.setItem('debts_v2', JSON.stringify(debts_v2));
            localStorage.setItem('payments_v2', JSON.stringify(payments_v2));
        } catch(e) {
            console.error("Lỗi lưu dữ liệu nợ vào localStorage:", e);
            showToast("Lỗi: Không thể lưu dữ liệu nợ. Bộ nhớ có thể đã đầy.", 5000, 'error');
        }
        window.debts_v2_from_app = debts_v2;
    }
    function calculateNewDebtStatus(debt) { if (debt.remainingAmount <= 0) return 'paid'; const today = new Date(); today.setHours(0,0,0,0); const dueDate = new Date(debt.dueDate); dueDate.setHours(0,0,0,0); if (dueDate < today) return 'overdue'; return 'pending'; }
    function updateNewDebtStatuses() { debts_v2 = debts_v2.map(debt => ({ ...debt, status: calculateNewDebtStatus(debt) })); window.debts_v2_from_app = debts_v2; }
    function updateNewDebtStatusesPeriodically() {
        updateNewDebtStatuses();
        if (debtsSectionDiv.classList.contains('active-section')) { applyNewDebtFilters(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2(); }
        if (debtStatusUpdateInterval) clearInterval(debtStatusUpdateInterval);
        debtStatusUpdateInterval = setInterval(() => { updateNewDebtStatuses(); if (debtsSectionDiv.classList.contains('active-section')) { applyNewDebtFilters(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2(); }}, 60 * 60 * 1000);
    }
    function renderNewDebtList(filteredDebtsParam) {
        if (!debtListContainerV2 || !noDebtsMessageV2) return; debtListContainerV2.innerHTML = '';
        const debtsToDisplay = filteredDebtsParam ? filteredDebtsParam : debts_v2;
        const currentDebtsToDisplay = debtsToDisplay.map(d => ({...d, status: calculateNewDebtStatus(d)}));
        if (currentDebtsToDisplay.length === 0) { noDebtsMessageV2.innerHTML = '<i class="fas fa-file-invoice-dollar"></i><p>Chưa có khoản nợ nào.</p>'; noDebtsMessageV2.style.display = 'block'; return; }
        noDebtsMessageV2.style.display = 'none'; currentDebtsToDisplay.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        currentDebtsToDisplay.forEach((debt) => {
            const card = document.createElement('div'); card.className = 'debt-card-v2'; card.dataset.debtId = debt.id;
            const debtPayments = payments_v2.filter(p => p.debtId === debt.id).sort((a,b) => new Date(b.paymentDate) - new Date(a.paymentDate)); let paymentsHtml = '';
            if (debtPayments.length > 0) paymentsHtml = debtPayments.map(p => `<div class="payment-item-v2"><i class="fas fa-check-circle"></i><span>${new Date(p.paymentDate).toLocaleDateString('vi-VN')}:</span><strong>${formatCurrencyV2(p.amount)}</strong>${p.note ? `<span>- ${p.note}</span>` : ''}</div>`).join('');
            card.innerHTML = `
                <div class="debt-card-v2-header"><h3 class="debt-card-v2-customer-name">${debt.customerName}</h3><span class="debt-card-v2-status-badge ${debt.status}">${DEBT_STATUSES_V2[debt.status]}</span></div>
                <div class="debt-card-v2-details"><p><strong>Điện thoại:</strong> ${debt.customerPhone}</p><p><strong>Email:</strong> ${debt.customerEmail || 'N/A'}</p><p><strong>Sản phẩm:</strong> ${debt.product}</p><p><strong>Ngày tạo:</strong> ${new Date(debt.createDate).toLocaleDateString('vi-VN')}</p><p><strong>Hạn TT:</strong> ${new Date(debt.dueDate).toLocaleDateString('vi-VN')}</p><p><strong>Ghi chú:</strong> ${debt.note || 'Không có'}</p></div>
                <div class="debt-card-v2-amounts"><div class="debt-card-v2-amount-item"><span class="label">Tổng nợ</span><span class="value total-debt">${formatCurrencyV2(debt.amount)}</span></div><div class="debt-card-v2-amount-item"><span class="label">Còn lại</span><span class="value remaining-debt">${formatCurrencyV2(debt.remainingAmount)}</span></div><div class="debt-card-v2-amount-item"><span class="label">Đã trả</span><span class="value paid-debt">${formatCurrencyV2(debt.amount - debt.remainingAmount)}</span></div></div>
                ${debtPayments.length > 0 ? `<div class="debt-card-v2-payment-history"><h4>Lịch sử thanh toán:</h4>${paymentsHtml}</div>` : ''}
                <div class="debt-card-v2-actions">
                    <button class="btn btn-sm btn-info edit-debt-v2-btn"><i class="fas fa-edit"></i> Sửa</button>
                    <button class="btn btn-sm btn-danger delete-debt-v2-btn"><i class="fas fa-trash"></i> Xóa</button>
                    <button class="btn btn-sm btn-success generate-consolidated-debt-invoice-btn"><i class="fas fa-file-invoice-dollar"></i> Tạo HĐ Tổng Nợ</button>
                </div>`;
            debtListContainerV2.appendChild(card);
        });
    }
    function renderNewDebtSummaryStats() {
        updateNewDebtStatuses(); const totalDebtAmount = debts_v2.reduce((sum, debt) => sum + debt.amount, 0); const totalRemaining = debts_v2.reduce((sum, debt) => sum + debt.remainingAmount, 0);
        const totalPaid = totalDebtAmount - totalRemaining; const overdueDebts = debts_v2.filter(debt => debt.status === 'overdue');
        if (debtTotalRemainingV2Span) debtTotalRemainingV2Span.textContent = formatCurrencyV2(totalRemaining); if (debtTotalPaidV2Span) debtTotalPaidV2Span.textContent = formatCurrencyV2(totalPaid);
        if (debtOverdueCountV2Span) debtOverdueCountV2Span.textContent = `${overdueDebts.length} khoản`; if (debtTotalCountV2Span) debtTotalCountV2Span.textContent = debts_v2.length.toString();
    }
    function openNewDebtModal(debtId = null) {
        newDebtForm.reset(); editingDebtId_v2 = debtId; editingDebtIdV2Input.value = debtId || ''; currentSelectedDebtProducts = []; renderSelectedDebtProductsDisplay();
        if (newDebtCustomerSearchResultsDiv) {newDebtCustomerSearchResultsDiv.innerHTML = ''; newDebtCustomerSearchResultsDiv.classList.remove('visible');}
        if (newDebtProductSearchResultsDiv) {newDebtProductSearchResultsDiv.innerHTML = ''; newDebtProductSearchResultsDiv.classList.remove('visible');}
        if (newDebtCustomerSearchInput) newDebtCustomerSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open');
        if (newDebtProductSearchInput) newDebtProductSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open');

        if (newDebtCreateDateInput) newDebtCreateDateInput.disabled = false;


        if (debtId) {
            newDebtModalTitle.textContent = 'Chỉnh sửa phiếu nợ'; saveNewDebtBtn.innerHTML = '<i class="fas fa-save"></i> Cập nhật'; const debt = debts_v2.find(d => d.id === debtId);
            if (debt) {
                newDebtCustomerNameInput.value = debt.customerName; newDebtCustomerPhoneInput.value = debt.customerPhone; newDebtCustomerEmailInput.value = debt.customerEmail || '';
                if (newDebtCreateDateInput) newDebtCreateDateInput.value = debt.createDate;

                if (debt.product && typeof debt.product === 'string') { const productNames = debt.product.split(', '); currentSelectedDebtProducts = productNames.map(name => ({ id: name, name: name }));}
                else if (Array.isArray(debt.products)) currentSelectedDebtProducts = debt.products.map(p => ({id: p.id || p.name, name: p.name}));
                renderSelectedDebtProductsDisplay(); newDebtAmountInput.value = debt.amount.toLocaleString('vi-VN'); newDebtDueDateInput.value = debt.dueDate; newDebtNoteTextarea.value = debt.note || '';
                if (newDebtCustomerSearchInput) newDebtCustomerSearchInput.disabled = true; if (newDebtProductSearchInput) newDebtProductSearchInput.disabled = true;
            }
        } else {
            newDebtModalTitle.textContent = 'Tạo phiếu nợ mới'; saveNewDebtBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Tạo mới'; const today = new Date(); const defaultDueDate = new Date(today.setDate(today.getDate() + 30)); newDebtDueDateInput.value = defaultDueDate.toISOString().split('T')[0];
            if (newDebtCreateDateInput) newDebtCreateDateInput.value = new Date().toISOString().split('T')[0];

            if (newDebtCustomerSearchInput) newDebtCustomerSearchInput.disabled = false; if (newDebtProductSearchInput) newDebtProductSearchInput.disabled = false;
        } openModalWithTransition(newDebtModal);
    }
    function closeNewDebtModal() { closeModalWithTransition(newDebtModal, () => { editingDebtId_v2 = null; editingDebtIdV2Input.value = ''; newDebtForm.reset(); currentSelectedDebtProducts = []; renderSelectedDebtProductsDisplay(); if (newDebtCustomerSearchInput) newDebtCustomerSearchInput.disabled = false; if (newDebtProductSearchInput) newDebtProductSearchInput.disabled = false; if (newDebtCustomerSearchResultsDiv) newDebtCustomerSearchResultsDiv.classList.remove('visible'); if (newDebtProductSearchResultsDiv) newDebtProductSearchResultsDiv.classList.remove('visible'); }); }
    function renderSelectedDebtProductsDisplay() {
        if (!selectedDebtProductsDisplayDiv) return; selectedDebtProductsDisplayDiv.innerHTML = '';
        if (currentSelectedDebtProducts.length === 0) { selectedDebtProductsDisplayDiv.innerHTML = '<p style="margin:0; color:#888;">Chưa chọn sản phẩm/dịch vụ nào.</p>'; return; }
        currentSelectedDebtProducts.forEach((product, index) => {
            const productTag = document.createElement('span'); productTag.className = 'debt-product-tag'; productTag.textContent = product.name;
            const removeBtn = document.createElement('button'); removeBtn.type = 'button'; removeBtn.innerHTML = '&times;';
            removeBtn.onclick = () => { currentSelectedDebtProducts.splice(index, 1); renderSelectedDebtProductsDisplay(); }; productTag.appendChild(removeBtn); selectedDebtProductsDisplayDiv.appendChild(productTag);
        });
    }
    function handleNewDebtFormSubmit(event) {
        event.preventDefault(); const customerName = newDebtCustomerNameInput.value.trim(); const customerPhone = newDebtCustomerPhoneInput.value.trim();
        const productString = currentSelectedDebtProducts.map(p => p.name).join(', '); newDebtProductInput.value = productString;
        const amount = getNumericValueFromFormattedInput(newDebtAmountInput.value); const dueDate = newDebtDueDateInput.value;
        let debtCreateDateValue;
        if (newDebtCreateDateInput && newDebtCreateDateInput.value) {
            debtCreateDateValue = newDebtCreateDateInput.value;
        } else {
            debtCreateDateValue = new Date().toISOString().split('T')[0];
        }


        if (!customerName || !customerPhone || isNaN(amount) || amount <= 0 || !dueDate || !debtCreateDateValue) {
             showToast('Vui lòng điền đủ tên KH, SĐT KH, số tiền nợ (>0), hạn TT và ngày tạo phiếu.', 3500, 'error'); return;
        }
        const formData = { customerName, customerPhone, customerEmail: newDebtCustomerEmailInput.value.trim(), amount, product: productString || "Nợ chung", dueDate, note: newDebtNoteTextarea.value.trim(), createDate: debtCreateDateValue };
        const currentEditingId = editingDebtIdV2Input.value ? parseInt(editingDebtIdV2Input.value) : null;
        if (currentEditingId) {
            const debtIndex = debts_v2.findIndex(d => d.id === currentEditingId);
            if (debtIndex > -1) { const originalDebt = debts_v2[debtIndex]; const amountDifference = formData.amount - originalDebt.amount; debts_v2[debtIndex] = { ...originalDebt, ...formData, remainingAmount: Math.max(0, originalDebt.remainingAmount + amountDifference) }; debts_v2[debtIndex].status = calculateNewDebtStatus(debts_v2[debtIndex]); showToast('Phiếu nợ đã được cập nhật.'); }
        } else { const newDebt = { id: Date.now(), ...formData, remainingAmount: formData.amount, status: 'pending' }; newDebt.status = calculateNewDebtStatus(newDebt); debts_v2.push(newDebt); showToast('Phiếu nợ mới đã được tạo.'); }
        saveNewDebts(); applyNewDebtFilters(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2(); closeNewDebtModal();
    }
    function handleDeleteNewDebt(debtId) { if (confirm('Bạn có chắc chắn muốn xóa khoản nợ này? Các thanh toán liên quan cũng sẽ bị xóa.')) { debts_v2 = debts_v2.filter(debt => debt.id !== debtId); payments_v2 = payments_v2.filter(payment => payment.debtId !== debtId); saveNewDebts(); applyNewDebtFilters(); renderNewDebtSummaryStats(); populateDebtPaymentSelectV2(); showToast('Đã xóa khoản nợ và các thanh toán liên quan.'); }}
    function populateDebtPaymentSelectV2() {
        if (!debtPaymentSelectV2) return; const currentSelected = debtPaymentSelectV2.value; debtPaymentSelectV2.innerHTML = '<option value="">-- Chọn khách hàng --</option>';
        debts_v2.filter(debt => debt.remainingAmount > 0).sort((a,b) => a.customerName.localeCompare(b.customerName)).forEach(debt => { const option = document.createElement('option'); option.value = debt.id; option.textContent = `${debt.customerName} (${debt.product}) - Còn nợ: ${formatCurrencyV2(debt.remainingAmount)}`; debtPaymentSelectV2.appendChild(option); });
        const stillValid = debts_v2.some(d => d.id === parseInt(currentSelected) && d.remainingAmount > 0);
        if (currentSelected && stillValid) debtPaymentSelectV2.value = currentSelected; else if (debtPaymentSelectV2.options.length > 1) {} else debtPaymentSelectV2.value = "";
    }
    function handleNewDebtPaymentSubmit(event) {
        event.preventDefault();
        const debtId = parseInt(debtPaymentSelectV2.value);
        const amount = getNumericValueFromFormattedInput(debtPaymentAmountV2Input.value);
        const note = debtPaymentNoteV2Textarea.value.trim();

        if (!debtId || isNaN(amount) || amount <= 0) {
            showToast('Vui lòng chọn khoản nợ và nhập số tiền thanh toán hợp lệ.', 3000, 'error');
            return;
        }

        const debtIndex = debts_v2.findIndex(d => d.id === debtId);
        if (debtIndex === -1) {
            showToast('Không tìm thấy khoản nợ đã chọn.', 3000, 'error');
            return;
        }

        const debtToPay = debts_v2[debtIndex];
        if (amount > debtToPay.remainingAmount) {
            showToast(`Số tiền thanh toán (${formatCurrencyV2(amount)}) không thể lớn hơn số nợ còn lại (${formatCurrencyV2(debtToPay.remainingAmount)}).`, 4000, 'error');
            return;
        }

        const newPayment = {
            id: Date.now(),
            debtId: debtId,
            amount: amount,
            paymentDate: new Date().toISOString().split('T')[0],
            note: note
        };
        payments_v2.push(newPayment);

        debtToPay.remainingAmount = Math.max(0, debtToPay.remainingAmount - amount);
        debtToPay.status = calculateNewDebtStatus(debtToPay);

        saveNewDebts();
        applyNewDebtFilters();
        renderNewDebtSummaryStats();
        populateDebtPaymentSelectV2();
        debtPaymentFormV2.reset();
        showToast('Đã ghi nhận thanh toán thành công.');

        const paidDebt = debts_v2.find(d => d.id === debtId);
        if (paidDebt && paidDebt.orderId) {
            const relatedOrderId = paidDebt.orderId;
            let orderInstanceForInvoice = null;
            const relatedOrderIndex = orders.findIndex(o => o.id === relatedOrderId);

            if (relatedOrderIndex > -1) {
                let orderToProcess = JSON.parse(JSON.stringify(orders[relatedOrderIndex]));
                const allDebtsForThisOrder = debts_v2.filter(d => d.orderId === relatedOrderId);
                const allOtherDebtsPaid = allDebtsForThisOrder.every(d => d.remainingAmount <= 0);

                if (allOtherDebtsPaid) {
                     if (orderToProcess.status !== 'completed' &&
                        orderToProcess.status !== 'cancelled' &&
                        orderToProcess.status !== 'returned') {

                        orderToProcess.status = 'completed';
                        orderToProcess.amountPaid = orderToProcess.totalAmount;

                        orders[relatedOrderIndex] = { ...orderToProcess };
                        saveOrders();

                        if (ordersSectionDiv.classList.contains('active-section')) {
                            applyOrderFilters();
                        }
                        showToast(`Đơn hàng #${orderToProcess.id.toString().slice(-6)} đã được cập nhật thành "Đã hoàn thành".`);
                    }
                }
                orderInstanceForInvoice = JSON.parse(JSON.stringify(orders[relatedOrderIndex]));
            } else {
                if (window.currentOrderForInvoiceFromApp && window.currentOrderForInvoiceFromApp.id === relatedOrderId) {
                    orderInstanceForInvoice = JSON.parse(JSON.stringify(window.currentOrderForInvoiceFromApp));
                    const allDebtsForThisOrder = debts_v2.filter(d => d.orderId === relatedOrderId);
                    const allOtherDebtsPaid = allDebtsForThisOrder.every(d => d.remainingAmount <= 0);
                    if (allOtherDebtsPaid && orderInstanceForInvoice.status !== 'completed' && orderInstanceForInvoice.status !== 'cancelled' && orderInstanceForInvoice.status !== 'returned') {
                        orderInstanceForInvoice.status = 'completed';
                        orderInstanceForInvoice.amountPaid = orderInstanceForInvoice.totalAmount;
                    }
                }
            }

            if (orderInstanceForInvoice) {
                if (window.currentOrderForInvoiceFromApp && window.currentOrderForInvoiceFromApp.id === relatedOrderId) {
                    window.currentOrderForInvoiceFromApp = { ...orderInstanceForInvoice };
                    if (typeof InvoiceModule !== 'undefined' && InvoiceModule.renderPreview) {
                        InvoiceModule.renderPreview(window.currentOrderForInvoiceFromApp);
                    }
                }

                if (typeof InvoiceModule !== 'undefined' && InvoiceModule.isOrderDisplayedInFullScreen && InvoiceModule.isOrderDisplayedInFullScreen(relatedOrderId)) {
                    InvoiceModule.refreshFullScreenInvoice({ ...orderInstanceForInvoice });
                }
            }
        }
    }
    function applyNewDebtFilters() {
        const searchTerm = debtSearchInputV2.value.toLowerCase(); const filterStatus = debtStatusFilterV2Select.value; updateNewDebtStatuses();
        const filtered = debts_v2.filter(debt => { const matchesSearch = debt.customerName.toLowerCase().includes(searchTerm) || debt.product.toLowerCase().includes(searchTerm); const matchesFilter = filterStatus === 'all' || debt.status === filterStatus; return matchesSearch && matchesFilter; });
        renderNewDebtList(filtered);
        const cards = debtListContainerV2.querySelectorAll('.debt-card-v2');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'none';
            requestAnimationFrame(() => {
                card.style.transition = `opacity var(--transition-duration-long) var(--transition-timing-smooth) ${index * 50}ms, transform var(--transition-duration-long) var(--transition-timing-smooth) ${index * 50}ms`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        });
    }
    function setActiveDebtTab(tabId) { debtTabBtns.forEach(btn => { btn.classList.toggle('active', btn.dataset.tab === tabId); }); debtTabContents.forEach(content => { content.classList.toggle('active', content.id === tabId); }); if (tabId === 'debtPaymentV2Tab') populateDebtPaymentSelectV2(); }
    function renderCustomersForNewDebtSearch(custsToSearch, container) {
        container.innerHTML = ''; if (!custsToSearch || custsToSearch.length === 0) { container.innerHTML = '<p class="no-results">Không tìm thấy khách hàng.</p>'; return; }
        custsToSearch.slice(0, 5).forEach(cust => {
            const itemDiv = document.createElement('div'); itemDiv.className = 'result-item'; itemDiv.dataset.customerId = cust.id; itemDiv.innerHTML = `<span class="cust-name">${cust.name}</span> <span class="cust-phone">${cust.phone || 'N/A'}</span>`;
            itemDiv.onclick = () => { newDebtCustomerNameInput.value = cust.name; newDebtCustomerPhoneInput.value = cust.phone || ""; newDebtCustomerEmailInput.value = cust.email || ""; if (newDebtCustomerSearchInput) newDebtCustomerSearchInput.value = `${cust.name} (${cust.phone || 'N/A'})`; container.classList.remove('visible'); if (newDebtCustomerSearchInput) newDebtCustomerSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open'); };
            container.appendChild(itemDiv);
        });
    }
    function renderProductsForNewDebtSearch(prodsToDisp, container) {
        container.innerHTML = ''; if (!prodsToDisp || prodsToDisp.length === 0) { container.innerHTML = '<p class="no-results">Không tìm thấy sản phẩm.</p>'; return; }
        prodsToDisp.slice(0, 5).forEach(p => {
            const iDiv = document.createElement('div'); iDiv.className = 'result-item'; iDiv.dataset.productId = p.id; const img = (p.images && p.images.length > 0) ? p.images[0] : 'https://via.placeholder.com/40?text=N/A';
            iDiv.innerHTML = `<img src="${img}" alt="${p.name}"><span class="item-name">${p.name}</span>`;
            iDiv.onclick = () => { const existing = currentSelectedDebtProducts.find(item => item.id === p.id); if (!existing) { currentSelectedDebtProducts.push({ id: p.id, name: p.name, sku: p.sku }); renderSelectedDebtProductsDisplay(); } else showToast(`Sản phẩm "${p.name}" đã được chọn.`, 2000, 'warning'); if (newDebtProductSearchInput) newDebtProductSearchInput.value = ''; container.classList.remove('visible'); if (newDebtProductSearchInput) newDebtProductSearchInput.closest('.custom-search-input-wrapper')?.classList.remove('open'); };
            container.appendChild(iDiv);
        });
    }
    function handleGenerateConsolidatedDebtInvoice(debtIdOfOneDebt) {
        const initialDebt = debts_v2.find(d => d.id === debtIdOfOneDebt);

        if (!initialDebt) {
            showToast("Không tìm thấy phiếu nợ gốc để bắt đầu tổng hợp.", 3000, 'error');
            return;
        }

        const customerIdentifier = initialDebt.customerPhone;
        if (!customerIdentifier) {
            showToast("Phiếu nợ gốc không có thông tin định danh khách hàng (SĐT).", 3000, 'error');
            return;
        }

        const customerDebtsToConsolidate = debts_v2.filter(d =>
            (d.customerPhone === customerIdentifier) &&
            d.remainingAmount > 0 &&
            (d.status === 'pending' || d.status === 'overdue')
        ).sort((a, b) => new Date(a.createDate) - new Date(b.createDate));

        if (customerDebtsToConsolidate.length === 0) {
            showToast(`Khách hàng "${initialDebt.customerName}" không có khoản nợ nào cần tổng hợp hoặc tất cả đã được thanh toán.`, 4000, 'info');
            return;
        }

        let totalConsolidatedDebtAmount = 0;
        const invoiceItems = customerDebtsToConsolidate.map(debt => {
            totalConsolidatedDebtAmount += debt.remainingAmount;
            let itemNameDisplay = '';
            const orderIdForDebt = debt.orderId;
            let relatedOrder = null;

            if (orderIdForDebt) {
                relatedOrder = orders.find(o => o.id === orderIdForDebt);
            }

            const debtCreateDateFormatted = new Date(debt.createDate).toLocaleDateString('vi-VN');
            const debtDueDateFormatted = new Date(debt.dueDate).toLocaleDateString('vi-VN');

            if (relatedOrder) {
                const shortOrderId = relatedOrder.id.toString().slice(-6);
                itemNameDisplay = `Nợ từ ĐH #${shortOrderId} (Ngày tạo: ${debtCreateDateFormatted}, Hạn: ${debtDueDateFormatted}):\n`;
                relatedOrder.items.forEach(item => {
                    itemNameDisplay += `  • ${item.name} (SL: ${item.quantity})\n`;
                });
                itemNameDisplay = itemNameDisplay.trimEnd();
            } else {
                itemNameDisplay = `Phiếu nợ ngày ${debtCreateDateFormatted} (Hạn: ${debtDueDateFormatted}): ${debt.product || 'Nợ chung'}`;
            }

            return {
                isDebtItem: true,
                name: itemNameDisplay,
                quantity: 1,
                unitPrice: debt.remainingAmount,
                sku: `DEBT-${debt.id.toString().slice(-4)}-${debt.orderId ? debt.orderId.toString().slice(-4) : 'IND'}`,
                discount: 0
            };
        });

        const customerInfoFromCustomersArray = customers.find(c => c.phone === customerIdentifier);

        const consolidatedInvoiceData = {
            id: `CONSO-${Date.now().toString().slice(-6)}`,
            customer: {
                name: initialDebt.customerName,
                phone: initialDebt.customerPhone,
                address: initialDebt.customerAddress || (customerInfoFromCustomersArray ? customerInfoFromCustomersArray.address : '') || '',
                email: initialDebt.customerEmail || (customerInfoFromCustomersArray ? customerInfoFromCustomersArray.email : '') || ''
            },
            items: invoiceItems,
            subtotal: totalConsolidatedDebtAmount,
            discountAmount: 0,
            shippingFee: 0,
            totalAmount: totalConsolidatedDebtAmount,
            amountPaid: 0,
            paymentMethod: 'debt_consolidation',
            status: 'pending_payment',
            notes: `Tổng hợp ${customerDebtsToConsolidate.length} khoản nợ chưa thanh toán của khách hàng ${initialDebt.customerName} (SĐT: ${customerIdentifier}) tính đến ngày ${new Date().toLocaleDateString('vi-VN')}.`,
            customerNotes: "Vui lòng thanh toán tổng số tiền công nợ trên.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isConsolidatedDebtInvoice: true,
            consolidatedDebtIds: customerDebtsToConsolidate.map(d => d.id)
        };

        window.currentOrderForInvoiceFromApp = consolidatedInvoiceData;
        if (typeof InvoiceModule !== 'undefined' && InvoiceModule.showInvoiceFullScreenDOM) {
            InvoiceModule.showInvoiceFullScreenDOM(consolidatedInvoiceData);
        }
        showToast(`Đã tạo hóa đơn tổng hợp ${customerDebtsToConsolidate.length} khoản nợ cho KH ${initialDebt.customerName}.`, 4000, 'success');
    }

    // --- FINANCE MANAGEMENT ---
    function loadFinancialTransactions() { const stored = localStorage.getItem('financialTransactions'); financialTransactions = stored ? JSON.parse(stored) : []; }
    function saveFinancialTransactions() {
        try {
            localStorage.setItem('financialTransactions', JSON.stringify(financialTransactions));
        } catch (e) {
            console.error("Lỗi lưu giao dịch tài chính vào localStorage:", e);
            showToast("Lỗi: Không thể lưu dữ liệu tài chính. Bộ nhớ có thể đã đầy.", 5000, 'error');
        }
        populateFinanceCategoryFilters();
    }
    function populateTransactionCategoriesOnModal() {
        const type = transactionTypeSelect.value; transactionCategorySelect.innerHTML = '<option value="">-- Chọn danh mục --</option>'; let categoriesToShow = [];
        if (type === 'expense') { categoriesToShow = [...DEFAULT_EXPENSE_CATEGORIES]; financialTransactions.forEach(t => { if (t.type === 'expense' && t.category && !categoriesToShow.includes(t.category)) categoriesToShow.push(t.category); }); transactionCategoryCustomInput.placeholder = "Hoặc nhập danh mục chi phí mới"; transactionCategoryCustomInput.style.display = 'block'; }
        else if (type === 'income') { categoriesToShow = [...DEFAULT_INCOME_CATEGORIES]; financialTransactions.forEach(t => { if (t.type === 'income' && t.category && !categoriesToShow.includes(t.category)) categoriesToShow.push(t.category); }); transactionCategoryCustomInput.placeholder = "Hoặc nhập danh mục thu nhập mới"; transactionCategoryCustomInput.style.display = 'block'; }
        else transactionCategoryCustomInput.style.display = 'none';
        categoriesToShow.sort().forEach(cat => { const opt = document.createElement('option'); opt.value = cat; opt.textContent = cat; transactionCategorySelect.appendChild(opt); });
    }
    function openFinanceTransactionModal(transactionIdParam = null) {
        financeTransactionForm.reset(); transactionDateInput.value = new Date().toISOString().split('T')[0]; transactionTypeSelect.value = 'expense'; populateTransactionCategoriesOnModal();
        if (transactionIdParam) {
            editingTransactionId = transactionIdParam; financeTransactionModalTitleElem.textContent = 'Chỉnh Sửa Giao Dịch'; const t = financialTransactions.find(tr => tr.id === transactionIdParam);
            if (t) {
                transactionIdInput.value = t.id; transactionTypeSelect.value = t.type; populateTransactionCategoriesOnModal(); transactionDateInput.value = t.date; transactionAmountInput.value = t.amount.toLocaleString('vi-VN'); transactionDescriptionTextarea.value = t.description;
                const standardCategories = t.type === 'income' ? DEFAULT_INCOME_CATEGORIES : DEFAULT_EXPENSE_CATEGORIES; const allKnownCategories = new Set([...standardCategories]); financialTransactions.forEach(ft => { if(ft.category) allKnownCategories.add(ft.category); });
                if (allKnownCategories.has(t.category) && transactionCategorySelect.querySelector(`option[value="${t.category}"]`)) { transactionCategorySelect.value = t.category; transactionCategoryCustomInput.value = ''; transactionCategoryCustomInput.style.display = 'none'; }
                else { transactionCategorySelect.value = ""; transactionCategoryCustomInput.value = t.category; transactionCategoryCustomInput.style.display = 'block'; }
            }
        } else { editingTransactionId = null; financeTransactionModalTitleElem.textContent = 'Thêm Giao Dịch Mới'; transactionCategoryCustomInput.value = ''; transactionCategoryCustomInput.style.display = transactionCategorySelect.value === "" ? 'block' : 'none'; }
        openModalWithTransition(financeTransactionModal);
    }
    function closeFinanceTransactionModal() { closeModalWithTransition(financeTransactionModal, () => { editingTransactionId = null; }); }
    function handleFinanceTransactionFormSubmit(event) {
        event.preventDefault(); const type = transactionTypeSelect.value; const date = transactionDateInput.value; const amount = getNumericValueFromFormattedInput(transactionAmountInput.value); const description = transactionDescriptionTextarea.value.trim(); let category = transactionCategorySelect.value;
        if (category === "" && transactionCategoryCustomInput.value.trim() !== "") category = transactionCategoryCustomInput.value.trim(); else if (category === "" && transactionCategoryCustomInput.value.trim() === "") { if (type === 'expense' || type === 'income') { showToast('Vui lòng chọn hoặc nhập danh mục.', 3000, 'error'); return; }}
        if (!type || !date || isNaN(amount) || amount <= 0 || !description) { showToast('Vui lòng nhập đầy đủ thông tin bắt buộc (Loại, Ngày, Số tiền, Mô tả).', 3000, 'error'); return; }
        if (!category && (type === 'expense' || type === 'income')) category = "Chưa phân loại";
        const transactionData = { id: editingTransactionId || Date.now(), type, date, amount, description, category, orderId: editingTransactionId ? (financialTransactions.find(t => t.id === editingTransactionId)?.orderId || null) : null };
        if (editingTransactionId) { const index = financialTransactions.findIndex(t => t.id === editingTransactionId); if (index > -1) financialTransactions[index] = transactionData; showToast('Giao dịch đã được cập nhật!'); }
        else { financialTransactions.push(transactionData); showToast('Giao dịch mới đã được thêm!'); }
        saveFinancialTransactions(); applyFinanceFilters(); closeFinanceTransactionModal(); updateDashboardStats(); updateReportFinanceData();
    }
    function renderFinancialTransactions(transactionsToDisplay) {
        transactionTableBody.innerHTML = ''; const noTransactionsMessage = financeSectionDiv.querySelector('.no-transactions');
        if (!transactionsToDisplay || transactionsToDisplay.length === 0) { noTransactionsMessage.style.display = 'block'; if (transactionTable) transactionTable.style.display = 'none'; return; }
        noTransactionsMessage.style.display = 'none'; if (transactionTable) transactionTable.style.display = 'table';
        transactionsToDisplay.sort((a, b) => new Date(b.date) - new Date(a.date));
        transactionsToDisplay.forEach(t => {
            const row = transactionTableBody.insertRow();
            row.innerHTML = `
                <td>${new Date(t.date).toLocaleDateString('vi-VN')}</td><td>${t.type === 'income' ? 'Thu' : 'Chi'}</td><td>${t.description} ${t.orderId ? `(<a href="#" class="link-to-order-from-finance" data-order-id="${t.orderId}">ĐH #${t.orderId.toString().slice(-6)}</a>)` : ''}</td><td>${t.category || 'N/A'}</td>
                <td style="text-align: right; color: ${t.type === 'income' ? 'var(--success-color)' : 'var(--danger-color)'};">${t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString('vi-VN')}đ</td>
                <td>${ (t.category === "Doanh thu bán hàng" || t.category === "Giá vốn hàng bán") && t.orderId ? '<button class="btn btn-sm btn-secondary" disabled title="Giao dịch tự động từ đơn hàng"><i class="fas fa-ban"></i> Sửa</button>' : `<button class="btn btn-sm edit-transaction-btn action-btn" data-id="${t.id}"><i class="fas fa-edit"></i> Sửa</button>`} ${ (t.category === "Doanh thu bán hàng" || t.category === "Giá vốn hàng bán") && t.orderId ? '<button class="btn btn-sm btn-secondary" disabled title="Giao dịch tự động từ đơn hàng"><i class="fas fa-ban"></i> Xóa</button>' : `<button class="btn btn-sm btn-danger delete-transaction-btn action-btn" data-id="${t.id}"><i class="fas fa-trash"></i> Xóa</button>`}</td>`;
        });
    }
    function deleteFinancialTransaction(transactionIdParam) {
        const transaction = financialTransactions.find(t => t.id === transactionIdParam);
        if (transaction && transaction.orderId && (transaction.category === "Doanh thu bán hàng" || transaction.category === "Giá vốn hàng bán")) { showToast("Không thể xóa giao dịch tự động từ đơn hàng. Hủy/thay đổi trạng thái đơn hàng nếu cần.", 4000, 'warning'); return; }
        if (confirm('Bạn có chắc muốn xóa giao dịch này?')) { financialTransactions = financialTransactions.filter(t => t.id !== transactionIdParam); saveFinancialTransactions(); applyFinanceFilters(); showToast('Giao dịch đã được xóa.'); updateDashboardStats(); updateReportFinanceData(); }
    }
    function populateFinanceCategoryFilters() {
        if (!financeCategoryFilterSelect) return; const currentVal = financeCategoryFilterSelect.value; financeCategoryFilterSelect.innerHTML = '<option value="">Tất cả Danh mục</option>';
        const allCategories = new Set(); DEFAULT_EXPENSE_CATEGORIES.forEach(cat => allCategories.add(cat)); DEFAULT_INCOME_CATEGORIES.forEach(cat => allCategories.add(cat));
        financialTransactions.forEach(t => { if(t.category) allCategories.add(t.category); });
        Array.from(allCategories).sort().forEach(cat => { const opt = document.createElement('option'); opt.value = cat; opt.textContent = cat; financeCategoryFilterSelect.appendChild(opt); });
        if (Array.from(allCategories).includes(currentVal)) financeCategoryFilterSelect.value = currentVal;
    }
    function applyFinanceFilters() {
        const dateFrom = financeDateFromFilterInput.value; const dateTo = financeDateToFilterInput.value; const type = financeTypeFilterSelect.value; const category = financeCategoryFilterSelect.value;
        const filteredTransactions = financialTransactions.filter(t => {
            const transactionDateObj = new Date(t.date); transactionDateObj.setHours(0,0,0,0);
            if (dateFrom) { const fromDate = new Date(dateFrom); fromDate.setHours(0,0,0,0); if (transactionDateObj < fromDate) return false; }
            if (dateTo) { const toDate = new Date(dateTo); toDate.setHours(0,0,0,0); if (transactionDateObj > toDate) return false; }
            if (type && t.type !== type) return false; if (category && t.category !== category) return false; return true;
        }); renderFinancialTransactions(filteredTransactions); updateFinancialSummary(filteredTransactions);
    }
    function updateFinancialSummary(transactionsForSummary) {
        let revenue = 0; let cogs = 0; let otherIncome = 0; let otherExpenses = 0;
        transactionsForSummary.forEach(t => { if (t.type === 'income') { if (t.category === "Doanh thu bán hàng") revenue += t.amount; else otherIncome += t.amount; } else if (t.type === 'expense') { if (t.category === "Giá vốn hàng bán") cogs += t.amount; else otherExpenses += t.amount; } });
        const grossProfit = revenue - cogs; const netProfit = grossProfit - otherExpenses + otherIncome;
        totalRevenueDisplay.textContent = revenue.toLocaleString('vi-VN') + 'đ'; totalCOGSDisplay.textContent = cogs.toLocaleString('vi-VN') + 'đ'; grossProfitDisplay.textContent = grossProfit.toLocaleString('vi-VN') + 'đ';
        totalOtherExpensesDisplay.textContent = otherExpenses.toLocaleString('vi-VN') + 'đ'; netProfitDisplay.textContent = netProfit.toLocaleString('vi-VN') + 'đ';
        netProfitDisplay.classList.toggle('loss', netProfit < 0);
    }
    function recordFinancialTransactionsForOrder(orderData, actionType) {
        financialTransactions = financialTransactions.filter(tx => !(tx.orderId === orderData.id && (tx.category === "Doanh thu bán hàng" || tx.category === "Giá vốn hàng bán")));
        if (actionType === 'create') {
            financialTransactions.push({ id: Date.now() + Math.random(), type: 'income', date: new Date(orderData.updatedAt || orderData.createdAt).toISOString().split('T')[0], amount: orderData.totalAmount, description: `Doanh thu từ ĐH #${orderData.id.toString().slice(-6)}`, category: "Doanh thu bán hàng", orderId: orderData.id });
            let totalOrderCOGS = 0; orderData.items.forEach(item => { const product = products.find(p => p.id === item.productId); if (product && typeof product.costPrice === 'number') totalOrderCOGS += item.quantity * product.costPrice; });
            if (totalOrderCOGS > 0) financialTransactions.push({ id: Date.now() + Math.random(), type: 'expense', date: new Date(orderData.updatedAt || orderData.createdAt).toISOString().split('T')[0], amount: totalOrderCOGS, description: `Giá vốn cho ĐH #${orderData.id.toString().slice(-6)}`, category: "Giá vốn hàng bán", orderId: orderData.id });
        }
        saveFinancialTransactions(); if (financeSectionDiv.classList.contains('active-section')) applyFinanceFilters(); updateDashboardStats(); updateReportFinanceData();
    }


    // --- DASHBOARD FUNCTIONS ---
    function updateDashboardStats() { if (!dashboardSectionDiv || !dashboardSectionDiv.classList.contains('active-section')) return; if(dashboardTotalActiveProductsSpan) dashboardTotalActiveProductsSpan.textContent = products.filter(p => p.status === 'active').length; }

    // --- REPORTS SECTION FUNCTIONS ---
    function updateReportSalesData() {
        if (!reportsSectionDiv.classList.contains('active-section')) return;
        const todayRange = getDateRange('today'); const todayCompletedOrders = orders.filter(o => (o.status === 'completed' || o.status === 'delivered') && new Date(o.createdAt) >= todayRange.startDate && new Date(o.createdAt) <= todayRange.endDate); const todayRevenue = todayCompletedOrders.reduce((sum, o) => sum + o.totalAmount, 0); if(reportSalesTodayRevenueSpan) reportSalesTodayRevenueSpan.textContent = formatCurrencyV2(todayRevenue);
        const thisMonthRange = getDateRange('this_month'); const thisMonthCompletedOrders = orders.filter(o => (o.status === 'completed' || o.status === 'delivered') && new Date(o.createdAt) >= thisMonthRange.startDate && new Date(o.createdAt) <= thisMonthRange.endDate); const thisMonthRevenue = thisMonthCompletedOrders.reduce((sum, o) => sum + o.totalAmount, 0); if(reportSalesThisMonthRevenueSpan) reportSalesThisMonthRevenueSpan.textContent = formatCurrencyV2(thisMonthRevenue);
        const thisMonthAllOrders = orders.filter(o => new Date(o.createdAt) >= thisMonthRange.startDate && new Date(o.createdAt) <= thisMonthRange.endDate); if(reportSalesTotalOrdersThisMonthSpan) reportSalesTotalOrdersThisMonthSpan.textContent = thisMonthAllOrders.length;
        const thisMonthCustomers = new Set(thisMonthAllOrders.map(o => o.customerId)).size; if(reportSalesTotalCustomersThisMonthSpan) reportSalesTotalCustomersThisMonthSpan.textContent = thisMonthCustomers;
        const avgOrderValueThisMonth = thisMonthCompletedOrders.length > 0 ? thisMonthRevenue / thisMonthCompletedOrders.length : 0; if(reportSalesAvgOrderValueThisMonthSpan) reportSalesAvgOrderValueThisMonthSpan.textContent = formatCurrencyV2(avgOrderValueThisMonth);
        const lastMonthRange = getDateRange('last_month'); const lastMonthCompletedOrders = orders.filter(o => (o.status === 'completed' || o.status === 'delivered') && new Date(o.createdAt) >= lastMonthRange.startDate && new Date(o.createdAt) <= lastMonthRange.endDate); const lastMonthRevenue = lastMonthCompletedOrders.reduce((sum, o) => sum + o.totalAmount, 0); if(reportSalesLastMonthRevenueSpan) reportSalesLastMonthRevenueSpan.textContent = formatCurrencyV2(lastMonthRevenue);
    }
    function updateReportFinanceData() {
        if (!reportsSectionDiv.classList.contains('active-section') || !reportFinanceTimeFilterSelect) return;
        const selectedPeriod = reportFinanceTimeFilterSelect.value; let customStart = null, customEnd = null;
        if (selectedPeriod === 'custom') { customStart = reportFinanceDateFromInput.value; customEnd = reportFinanceDateToInput.value; if (!customStart || !customEnd) { showToast("Vui lòng chọn khoảng ngày tùy chỉnh.", 2500, "warning"); return; }}
        const { startDate, endDate } = getDateRange(selectedPeriod, customStart, customEnd);
        const filteredTx = financialTransactions.filter(tx => { const txDate = new Date(tx.date); return txDate >= startDate && txDate <= endDate; });
        let totalIncome = 0; let totalExpense = 0;
        filteredTx.forEach(tx => { if (tx.type === 'income') totalIncome += tx.amount; else if (tx.type === 'expense') totalExpense += tx.amount; });
        if(reportFinanceTotalIncomeSpan) reportFinanceTotalIncomeSpan.textContent = formatCurrencyV2(totalIncome); if(reportFinanceTotalExpenseSpan) reportFinanceTotalExpenseSpan.textContent = formatCurrencyV2(totalExpense);
        if(reportFinanceNetProfitSpan) reportFinanceNetProfitSpan.textContent = formatCurrencyV2(totalIncome - totalExpense); if(reportFinanceNetProfitSpan) reportFinanceNetProfitSpan.classList.toggle('loss', (totalIncome - totalExpense) < 0);
    }

    // --- EVENT LISTENERS SETUP ---
    function setupEventListeners() {
        mainNavButtons.forEach(btn => btn.onclick = () => showSection(btn.dataset.section));
        if(addProductBtn) addProductBtn.onclick = () => openProductModal();
        if(closeProductModalButton) closeProductModalButton.onclick = () => closeProductModal();
        if(cancelProductModalBtn) cancelProductModalBtn.onclick = () => closeProductModal();
        if(productForm) productForm.onsubmit = handleProductFormSubmit;
        if(generateSKUBtn) generateSKUBtn.onclick = () => { const pN = document.getElementById('productName').value.trim(); let sku = pN.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]/g,'').toUpperCase().substring(0,5); sku += '-' + Math.random().toString(36).substring(2,6).toUpperCase(); document.getElementById('productSKU').value=sku; };
        if(productImageUploadInput) productImageUploadInput.onchange = (e) => { const files=e.target.files; if(!files)return; const MAX_IMG=5,MAX_SZ=2*1024*1024; if(currentProductImages.length+files.length>MAX_IMG){showToast(`Tối đa ${MAX_IMG} hình.`,3000,'warning');e.target.value='';return;} Array.from(files).forEach(f=>{if(!f.type.startsWith('image/'))return;if(f.size>MAX_SZ){showToast(`File ${f.name} >2MB.`,3000,'warning');return;}const r=new FileReader();r.onload=ev=>{currentProductImages.push(ev.target.result);renderProductImagePreviews();};r.readAsDataURL(f);});e.target.value=''; };
        if(productListDiv) productListDiv.onclick = (e) => { const tgt=e.target, card=tgt.closest('.product-card'); if(!card)return; const pId=parseInt(card.dataset.id); if(tgt.closest('.edit-product-btn')) openProductModal(pId); else if(tgt.closest('.delete-product-btn')){if(confirm(`Xóa SP "${products.find(p=>p.id===pId)?.name||'này'}"?`)){products=products.filter(p=>p.id!==pId);saveProducts();applyProductFilters();showToast("Sản phẩm đã được xóa.");updateDashboardStats();}} else if(tgt.closest('.view-product-details-btn')){const p=products.find(pr=>pr.id===pId);if(p)alert(`SP: ${p.name}\nSKU: ${p.sku}\nGiá lẻ: ${p.price.toLocaleString('vi-VN')}đ\nGiá sỉ: ${p.wholesalePrice ? p.wholesalePrice.toLocaleString('vi-VN')+'đ' : 'N/A'}\nTồn: ${p.stock !== null ? p.stock : 'Không QL'}\nĐơn vị: ${p.unit || 'N/A'}`);} };
        if(applyProductFiltersBtn) applyProductFiltersBtn.onclick = applyProductFilters;
        if(resetProductFiltersBtn) resetProductFiltersBtn.onclick = () => { productSearchInput.value='';productCategoryFilterSelect.value='';productStockStatusFilterSelect.value='';productMinPriceFilterInput.value='';productMaxPriceFilterInput.value='';productStatusFilterSelect.value=''; applyProductFilters(); };
        [productSearchInput,productMinPriceFilterInput,productMaxPriceFilterInput].forEach(el=>{if(el)el.oninput=applyProductFilters}); [productCategoryFilterSelect,productStockStatusFilterSelect,productStatusFilterSelect].forEach(el=>{if(el)el.onchange=applyProductFilters});
        if (productUnitSelect && productUnitCustomInput) { productUnitSelect.addEventListener('change', () => { if (productUnitSelect.value === '_custom_') { productUnitCustomInput.style.display = 'block'; productUnitCustomInput.focus(); } else { productUnitCustomInput.style.display = 'none'; productUnitCustomInput.value = ''; }});}
        if (importProductsBtn && productImportFileInput) {
            importProductsBtn.addEventListener('click', () => {
                productImportFileInput.click();
            });
            productImportFileInput.addEventListener('change', handleProductImport);
        }

        if(orderPaymentMethodSelect) {
            orderPaymentMethodSelect.addEventListener('change', () => {
                const isDebtMethod = orderPaymentMethodSelect.value === 'debt';
                const isPartialDebtSelected = paymentStatusPartialDebtRadio && paymentStatusPartialDebtRadio.checked;

                if (orderDueDateGroupDiv) {
                     orderDueDateGroupDiv.style.display = (isDebtMethod || isPartialDebtSelected) ? 'block' : 'none';
                }
                if ((isDebtMethod || isPartialDebtSelected) && orderDebtDueDateInput && !orderDebtDueDateInput.value) {
                    const today = new Date();
                    const defaultDueDate = new Date(today.setDate(today.getDate() + 30));
                    orderDebtDueDateInput.value = defaultDueDate.toISOString().split('T')[0];
                }
                updateOrderSummary();
            });
        }
        if (paymentStatusFullRadio) {
            paymentStatusFullRadio.addEventListener('change', () => {
                if (paymentStatusFullRadio.checked) {
                    if (orderAmountPaidInput) orderAmountPaidInput.disabled = true;
                    if (orderDueDateGroupDiv) orderDueDateGroupDiv.style.display = 'none';
                    updateOrderSummary();
                }
            });
        }
        if (paymentStatusPartialDebtRadio) {
            paymentStatusPartialDebtRadio.addEventListener('change', () => {
                if (paymentStatusPartialDebtRadio.checked) {
                    if (orderAmountPaidInput) {
                        orderAmountPaidInput.disabled = false;
                        orderAmountPaidInput.focus();
                    }
                    const isDebtMethod = orderPaymentMethodSelect && orderPaymentMethodSelect.value === 'debt';
                    if (orderDueDateGroupDiv) {
                        orderDueDateGroupDiv.style.display = (isDebtMethod || paymentStatusPartialDebtRadio.checked) ? 'block' : 'none';
                    }
                     if ((isDebtMethod || paymentStatusPartialDebtRadio.checked) && orderDebtDueDateInput && !orderDebtDueDateInput.value) {
                        const today = new Date();
                        const defaultDueDate = new Date(today.setDate(today.getDate() + 30));
                        orderDebtDueDateInput.value = defaultDueDate.toISOString().split('T')[0];
                    }
                    updateOrderSummary();
                }
            });
        }

        if(createOrderBtn) createOrderBtn.onclick = () => { openOrderModal(); updateOrderSummary(); };
        if(closeOrderModalButton) closeOrderModalButton.onclick = () => closeOrderModal();
        if(cancelOrderModalBtn) cancelOrderModalBtn.onclick = () => closeOrderModal();
        if(orderForm) orderForm.onsubmit = handleOrderFormSubmit;
        if (orderCustomerSearchInput) { const w = orderCustomerSearchInput.closest('.custom-search-input-wrapper'); orderCustomerSearchInput.addEventListener('focus', ()=>{orderCustomerSearchResultsDiv.classList.add('visible');if(w)w.classList.add('open');if(orderCustomerSearchInput.value.trim()===''&&customers.length>0)renderCustomersForOrderSearch(customers.slice(0,5),orderCustomerSearchResultsDiv);}); orderCustomerSearchInput.addEventListener('input', ()=>{const sT=orderCustomerSearchInput.value.toLowerCase().trim();orderCustomerSearchResultsDiv.classList.add('visible');if(w)w.classList.add('open');if(sT.length===0&&customers.length>0){renderCustomersForOrderSearch(customers.slice(0,5),orderCustomerSearchResultsDiv);return;}if(sT.length===0){orderCustomerSearchResultsDiv.innerHTML='<p class="no-results">Nhập để tìm kiếm...</p>';return;}const mC=customers.filter(c=>c.name.toLowerCase().includes(sT)||(c.phone&&c.phone.includes(sT)));renderCustomersForOrderSearch(mC,orderCustomerSearchResultsDiv);}); if(w)w.addEventListener('click',(e)=>{if(e.target===w||e.target===w.querySelector('.custom-search-arrow')){const iV=orderCustomerSearchResultsDiv.classList.toggle('visible');w.classList.toggle('open',iV);if(iV&&orderCustomerSearchInput.value.trim()===''&&customers.length>0)renderCustomersForOrderSearch(customers.slice(0,5),orderCustomerSearchResultsDiv);orderCustomerSearchInput.focus();}}); }
        if (orderProductSearchInput) { const w = orderProductSearchInput.closest('.custom-search-input-wrapper'); orderProductSearchInput.addEventListener('focus', ()=>{orderProductSearchResultsDiv.classList.add('visible');if(w)w.classList.add('open');if(orderProductSearchInput.value.trim()==='')renderDefaultProductsForOrderSelection();}); orderProductSearchInput.addEventListener('input', ()=>{const sT=orderProductSearchInput.value.toLowerCase().trim();orderProductSearchResultsDiv.classList.add('visible');if(w)w.classList.add('open');if(sT.length===0){renderDefaultProductsForOrderSelection();return;}const mP=products.filter(p=>(p.name.toLowerCase().includes(sT)||(p.sku&&p.sku.toLowerCase().includes(sT)))&& (p.stock === null || p.stock>0) &&p.status==='active');renderProductsForOrderSearch(mP,orderProductSearchResultsDiv);}); if(w)w.addEventListener('click',(e)=>{if(e.target===w||e.target===w.querySelector('.custom-search-arrow')){const iV=orderProductSearchResultsDiv.classList.toggle('visible');w.classList.toggle('open',iV);if(iV&&orderProductSearchInput.value.trim()==='')renderDefaultProductsForOrderSelection();orderProductSearchInput.focus();}});}
        if(customerPhoneOrderFormInput) customerPhoneOrderFormInput.onblur = autoFillCustomerInfoByPhone;
        if(orderDiscountInput) orderDiscountInput.oninput = updateOrderSummary;
        if(orderShippingFeeInput) orderShippingFeeInput.oninput = updateOrderSummary;
        if(orderAmountPaidInput) orderAmountPaidInput.oninput = updateOrderSummary;

        if(orderListContainer) orderListContainer.onclick = (e) => {
            const tgt=e.target,card=tgt.closest('.order-card');if(!card)return; const oId=parseInt(card.dataset.orderId);
            if(tgt.closest('.view-order-details-btn'))openOrderModal(oId);
            else if (tgt.closest('.delete-order-btn')) { const oDel=orders.find(o=>o.id===oId);if(oDel)if(confirm(`Xóa ĐH #${oDel.id.toString().slice(-6)} của "${oDel.customer.name}"?\nTồn kho sẽ được khôi phục, giao dịch tài chính liên quan sẽ bị xóa.`))deleteOrder(oId);}
            else if (tgt.closest('.print-order-invoice-btn')) {
                const orderToPrint = orders.find(order => order.id === oId);
                if (orderToPrint) {
                    window.currentOrderForInvoiceFromApp = orderToPrint;
                    if (typeof InvoiceModule !== 'undefined' && InvoiceModule.showInvoiceFullScreenDOM) {
                        InvoiceModule.showInvoiceFullScreenDOM(orderToPrint);
                    }
                } else showToast("Không tìm thấy đơn hàng để in.", 3000, "error");
            }
        };
        if(applyOrderFiltersBtn) applyOrderFiltersBtn.onclick = applyOrderFilters;
        if(resetOrderFiltersBtn) resetOrderFiltersBtn.onclick = () => { orderSearchInput.value='';orderStatusFilterSelect.value='';orderDateFromFilterInput.value='';orderDateToFilterInput.value=''; applyOrderFilters(); };
        [orderSearchInput,orderDateFromFilterInput,orderDateToFilterInput].forEach(el=>{if(el)el.oninput=applyOrderFilters});
        if(orderStatusFilterSelect) orderStatusFilterSelect.onchange = applyOrderFilters;

        if(addCustomerBtn) addCustomerBtn.onclick = () => openCustomerModal();
        if(closeCustomerModalButton) closeCustomerModalButton.onclick = () => closeCustomerModal();
        if(cancelCustomerModalBtn) cancelCustomerModalBtn.onclick = () => closeCustomerModal();
        if(customerForm) customerForm.onsubmit = handleCustomerFormSubmit;
        if (customerListContainer) customerListContainer.onclick = (e) => { const tgt = e.target, card = tgt.closest('.customer-card'); if (!card) return; const cId = parseInt(card.dataset.customerId); if (tgt.closest('.edit-customer-btn')) openCustomerModal(cId, 'customerInfoTab'); else if (tgt.closest('.view-customer-btn')) openCustomerModal(cId, 'customerHistoryTab'); else if (tgt.closest('.delete-customer-btn')) deleteCustomer(cId); };
        if (customerModalTabs) customerModalTabs.forEach(tab => { tab.onclick = () => { const tT = tab.dataset.tab; customerModalTabs.forEach(t => t.classList.remove('active')); customerModalTabContents.forEach(c => c.classList.remove('active')); tab.classList.add('active'); document.getElementById(tT).classList.add('active'); const fSBD = !(tT === 'customerInfoTab'); customerForm.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(el => el.disabled = fSBD); saveCustomerBtn.style.display = fSBD ? 'none' : 'inline-flex'; if (customerInteractionForm) customerInteractionForm.querySelectorAll('input,textarea,select,button').forEach(el => el.disabled = (tT !== 'customerInteractionsTab')); if (!editingCustomerId && tT !== 'customerInfoTab') { customerForm.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(el => el.disabled = true); saveCustomerBtn.style.display = 'none'; } if (editingCustomerId && tT === 'customerInteractionsTab' && customerInteractionForm) customerInteractionForm.querySelectorAll('input,textarea,select,button').forEach(el => el.disabled = false); }});
        if (customerOrderHistoryListDiv) { customerOrderHistoryListDiv.addEventListener('click', (e) => { const tB = e.target.closest('.order-details-toggle'); const oIDL = e.target.closest('.item-id'); if (tB) { const dD = tB.closest('.list-item').querySelector('.order-item-details'); const i = tB.querySelector('i'); if (dD) { const iO = dD.classList.toggle('open-details'); if (iO) { if (i) i.classList.replace('fa-chevron-down', 'fa-chevron-up'); tB.classList.add('open'); } else { if (i) i.classList.replace('fa-chevron-up', 'fa-chevron-down'); tB.classList.remove('open');}}} else if (oIDL) { const oIDV = parseInt(oIDL.dataset.orderId); if (oIDV) { closeCustomerModal(); showSection('ordersSection', oIDV); openOrderModal(oIDV);}}});}
        if (customerInteractionForm) customerInteractionForm.onsubmit = handleCustomerInteractionFormSubmit;
        if(applyCustomerFiltersBtn) applyCustomerFiltersBtn.onclick = applyCustomerFilters;
        if(resetCustomerFiltersBtn) resetCustomerFiltersBtn.onclick = () => { customerSearchInput.value='';customerGroupFilterSelect.value='';customerTotalSpentMinInput.value='';customerTotalSpentMaxInput.value=''; applyCustomerFilters(); };
        [customerSearchInput,customerTotalSpentMinInput,customerTotalSpentMaxInput].forEach(el=>{if(el)el.oninput=applyCustomerFilters});
        if(customerGroupFilterSelect) customerGroupFilterSelect.onchange = applyCustomerFilters;

        if(addNewDebtBtn) addNewDebtBtn.onclick = () => openNewDebtModal();
        if(closeNewDebtModalButton) closeNewDebtModalButton.onclick = closeNewDebtModal;
        if(cancelNewDebtModalBtn) cancelNewDebtModalBtn.onclick = closeNewDebtModal;
        if(newDebtForm) newDebtForm.onsubmit = handleNewDebtFormSubmit;
        if(debtPaymentFormV2) debtPaymentFormV2.onsubmit = handleNewDebtPaymentSubmit;
        if(debtTabBtns) debtTabBtns.forEach(btn => { btn.onclick = () => setActiveDebtTab(btn.dataset.tab); });
        if(debtSearchInputV2) debtSearchInputV2.oninput = applyNewDebtFilters;
        if(debtStatusFilterV2Select) debtStatusFilterV2Select.onchange = applyNewDebtFilters;
        if(debtListContainerV2) debtListContainerV2.onclick = (e) => {
            const card = e.target.closest('.debt-card-v2'); if (!card) return;
            const debtId = parseInt(card.dataset.debtId);
            if (e.target.closest('.edit-debt-v2-btn')) openNewDebtModal(debtId);
            else if (e.target.closest('.delete-debt-v2-btn')) handleDeleteNewDebt(debtId);
            else if (e.target.closest('.generate-consolidated-debt-invoice-btn')) handleGenerateConsolidatedDebtInvoice(debtId);
        };
        if (newDebtCustomerSearchInput && newDebtCustomerSearchResultsDiv) { const w=newDebtCustomerSearchInput.closest('.custom-search-input-wrapper');newDebtCustomerSearchInput.addEventListener('focus',()=>{newDebtCustomerSearchResultsDiv.classList.add('visible');if(w)w.classList.add('open');if(newDebtCustomerSearchInput.value.trim()===''&&customers.length>0)renderCustomersForNewDebtSearch(customers.slice(0,5),newDebtCustomerSearchResultsDiv);});newDebtCustomerSearchInput.addEventListener('input',()=>{const sT=newDebtCustomerSearchInput.value.toLowerCase().trim();newDebtCustomerSearchResultsDiv.classList.add('visible');if(w)w.classList.add('open');if(sT.length===0&&customers.length>0){renderCustomersForNewDebtSearch(customers.slice(0,5),newDebtCustomerSearchResultsDiv);return;}if(sT.length===0){newDebtCustomerSearchResultsDiv.innerHTML='<p class="no-results">Nhập để tìm kiếm...</p>';return;}const mC=customers.filter(c=>c.name.toLowerCase().includes(sT)||(c.phone&&c.phone.includes(sT)));renderCustomersForNewDebtSearch(mC,newDebtCustomerSearchResultsDiv);});if(w)w.addEventListener('click',(e)=>{if(e.target===w||e.target===w.querySelector('.custom-search-arrow')){const iV=newDebtCustomerSearchResultsDiv.classList.toggle('visible');w.classList.toggle('open',iV);if(iV&&newDebtCustomerSearchInput.value.trim()===''&&customers.length>0)renderCustomersForNewDebtSearch(customers.slice(0,5),newDebtCustomerSearchResultsDiv);newDebtCustomerSearchInput.focus();}});}
        if (newDebtProductSearchInput && newDebtProductSearchResultsDiv) { const w=newDebtProductSearchInput.closest('.custom-search-input-wrapper');newDebtProductSearchInput.addEventListener('focus',()=>{newDebtProductSearchResultsDiv.classList.add('visible');if(w)w.classList.add('open');if(newDebtProductSearchInput.value.trim()===''){const aP=products.filter(p=>p.status==='active').slice(0,5);renderProductsForNewDebtSearch(aP,newDebtProductSearchResultsDiv);}});newDebtProductSearchInput.addEventListener('input',()=>{const sT=newDebtProductSearchInput.value.toLowerCase().trim();newDebtProductSearchResultsDiv.classList.add('visible');if(w)w.classList.add('open');if(sT.length===0){const aP=products.filter(p=>p.status==='active').slice(0,5);renderProductsForNewDebtSearch(aP,newDebtProductSearchResultsDiv);return;}const mP=products.filter(p=>(p.name.toLowerCase().includes(sT)||(p.sku&&p.sku.toLowerCase().includes(sT)))&&p.status==='active');renderProductsForNewDebtSearch(mP,newDebtProductSearchResultsDiv);});if(w)w.addEventListener('click',(e)=>{if(e.target===w||e.target===w.querySelector('.custom-search-arrow')){const iV=newDebtProductSearchResultsDiv.classList.toggle('visible');w.classList.toggle('open',iV);if(iV&&newDebtProductSearchInput.value.trim()===''){const aP=products.filter(p=>p.status==='active').slice(0,5);renderProductsForNewDebtSearch(aP,newDebtProductSearchResultsDiv);}newDebtProductSearchInput.focus();}});}

        if(addTransactionBtn) addTransactionBtn.onclick = () => openFinanceTransactionModal();
        if(closeFinanceTransactionModalButton) closeFinanceTransactionModalButton.onclick = () => closeFinanceTransactionModal();
        if(cancelFinanceTransactionModalBtn) cancelFinanceTransactionModalBtn.onclick = () => closeFinanceTransactionModal();
        if(financeTransactionForm) financeTransactionForm.onsubmit = handleFinanceTransactionFormSubmit;
        if(transactionTypeSelect) transactionTypeSelect.onchange = () => { populateTransactionCategoriesOnModal(); transactionCategoryCustomInput.style.display = transactionCategorySelect.value === "" ? 'block' : 'none'; };
        if(transactionCategorySelect) transactionCategorySelect.onchange = () => { transactionCategoryCustomInput.style.display = transactionCategorySelect.value === "" ? 'block' : 'none'; if (transactionCategorySelect.value !== "") transactionCategoryCustomInput.value = ''; };
        if(transactionTableBody) transactionTableBody.onclick = (e) => { const t = e.target; const eB = t.closest('.edit-transaction-btn'); const dB = t.closest('.delete-transaction-btn'); const lO = t.closest('.link-to-order-from-finance'); if (eB) openFinanceTransactionModal(parseInt(eB.dataset.id)); else if (dB) deleteFinancialTransaction(parseInt(dB.dataset.id)); else if (lO) { e.preventDefault(); const oIDV = parseInt(lO.dataset.orderId); showSection('ordersSection', oIDV); openOrderModal(oIDV); }};
        if(applyFinanceFiltersBtn) applyFinanceFiltersBtn.onclick = applyFinanceFilters;
        if(resetFinanceFiltersBtn) resetFinanceFiltersBtn.onclick = () => { const t=new Date();const fD=new Date(t.getFullYear(),t.getMonth(),1).toISOString().split('T')[0];const lD=new Date(t.getFullYear(),t.getMonth()+1,0).toISOString().split('T')[0];financeDateFromFilterInput.value=fD;financeDateToFilterInput.value=lD;financeTypeFilterSelect.value='';financeCategoryFilterSelect.value='';applyFinanceFilters(); };
        [financeDateFromFilterInput, financeDateToFilterInput, financeTypeFilterSelect, financeCategoryFilterSelect].forEach(el => { if (el) el.onchange = applyFinanceFilters; });

        quickActionButtons.forEach(button => { button.addEventListener('click', () => {
            const sId=button.dataset.section;
            const act=button.dataset.action;
            if (sId === 'invoiceSettingsSection') {
                if (!window.currentOrderForInvoiceFromApp && orders.length > 0) {
                     window.currentOrderForInvoiceFromApp = orders.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
                }
                showSection(sId);
            } else {
                showSection(sId);
                if(act==='addProduct')openProductModal();
                else if(act==='createOrder')openOrderModal();
                else if(act==='addCustomer')openCustomerModal();
                else if(act==='addNewDebt')openNewDebtModal();
                else if(act==='addTransaction')openFinanceTransactionModal();
            }
        });});

        if (reportFinanceTimeFilterSelect) reportFinanceTimeFilterSelect.addEventListener('change', () => { if (reportFinanceTimeFilterSelect.value === 'custom') { if(reportFinanceCustomDateRangeDiv) reportFinanceCustomDateRangeDiv.style.display = 'flex'; } else { if(reportFinanceCustomDateRangeDiv) reportFinanceCustomDateRangeDiv.style.display = 'none'; updateReportFinanceData(); }});
        if (applyReportFinanceFiltersBtn) applyReportFinanceFiltersBtn.addEventListener('click', updateReportFinanceData);
        if (reportFinanceDateFromInput) reportFinanceDateFromInput.addEventListener('change', updateReportFinanceData);
        if (reportFinanceDateToInput) reportFinanceDateToInput.addEventListener('change', updateReportFinanceData);

        const allCurrencyInputs = [productPriceInput, productPromoPriceInput, orderShippingFeeInput, orderDiscountInput, newDebtAmountInput, debtPaymentAmountV2Input, productMinPriceFilterInput, productMaxPriceFilterInput, customerTotalSpentMinInput, customerTotalSpentMaxInput, productCostPriceInput, productWholesalePriceInput, transactionAmountInput, orderAmountPaidInput];
        allCurrencyInputs.forEach(inputEl => { if (inputEl) { inputEl.addEventListener('input', () => formatCurrencyInput(inputEl)); inputEl.addEventListener('blur', () => { if (inputEl.value && !inputEl.value.includes('.')) formatCurrencyInput(inputEl); }); }});

        document.addEventListener('click', (e) => {
            const cSWO=orderCustomerSearchInput?.closest('.custom-search-input-wrapper');const pSWO=orderProductSearchInput?.closest('.custom-search-input-wrapper');const cSWD=newDebtCustomerSearchInput?.closest('.custom-search-input-wrapper');const pSWD=newDebtProductSearchInput?.closest('.custom-search-input-wrapper');
            if (orderCustomerSearchResultsDiv&&cSWO&&!cSWO.contains(e.target)&&!orderCustomerSearchResultsDiv.contains(e.target)&&orderCustomerSearchResultsDiv.classList.contains('visible')){orderCustomerSearchResultsDiv.classList.remove('visible');cSWO.classList.remove('open');}
            if (orderProductSearchResultsDiv&&pSWO&&!pSWO.contains(e.target)&&!orderProductSearchResultsDiv.contains(e.target)&&orderProductSearchResultsDiv.classList.contains('visible')){orderProductSearchResultsDiv.classList.remove('visible');pSWO.classList.remove('open');}
            if (newDebtCustomerSearchResultsDiv&&cSWD&&!cSWD.contains(e.target)&&!newDebtCustomerSearchResultsDiv.contains(e.target)&&newDebtCustomerSearchResultsDiv.classList.contains('visible')){newDebtCustomerSearchResultsDiv.classList.remove('visible');cSWD.classList.remove('open');}
            if (newDebtProductSearchResultsDiv&&pSWD&&!pSWD.contains(e.target)&&!newDebtProductSearchResultsDiv.contains(e.target)&&newDebtProductSearchResultsDiv.classList.contains('visible')){newDebtProductSearchResultsDiv.classList.remove('visible');pSWD.classList.remove('open');}
        });
    }

    initializeApp();
})();