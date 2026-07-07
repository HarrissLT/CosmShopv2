// hoadon.js

const InvoiceModule = (() => {
    // --- DOM ELEMENTS (Invoice Section Specific) ---
    let invoiceSettingsSectionDiv, toggleInvoiceSettingsPanelBtn, invoiceSettingsPanelDiv,
        closeSettingsPanelButton, invoiceCustomizationLayoutDiv, invoiceItemDisplayStyleSelect,
        invoiceFontSizeSelect, invoiceShowLogoCheckbox, invoiceStoreLogoUploadInput,
        invoiceLogoPreviewImg, invoiceLogoSizeSelect, invoiceShowInvoiceTitleCheckbox,
        invoiceTitleTextInput, invoiceStoreNameInput, invoiceShowStoreAddressCheckbox,
        invoiceStoreAddressInput, invoiceShowStorePhoneCheckbox, invoiceStorePhoneInput,
        invoiceShowStoreEmailCheckbox, invoiceStoreEmailInput, invoiceShowStoreWebsiteCheckbox,
        invoiceStoreWebsiteInput, invoiceShowCustomerNameCheckbox, invoiceShowCustomerPhoneCheckboxEl,
        invoiceShowCustomerAddressCheckbox, invoiceShowCustomerEmailCheckboxEl,
        invoiceShowOrderNotesCheckbox, invoiceShowItemPriceCheckbox, invoiceShowSKUCheckboxEl,
        invoiceShowItemDiscountCheckboxEl, invoiceShowAmountPaidCheckbox,
        invoiceShowTotalDebtCheckbox, invoiceShowStoreNoteCheckbox, invoiceStoreNoteTextInput,
        invoiceShowInvoiceFooterCheckbox, invoiceCustomMessageTextarea, invoicePrimaryColorInput,
        invoiceSecondaryColorInput, invoiceFontFamilySelect, saveInvoiceSettingsBtn,
        invoicePreviewAreaDiv, printCurrentInvoiceBtn, exportInvoicePNGBtn,
        viewFullScreenInvoiceBtn, invoiceShowOrderIdCheckbox, invoiceTotalAmountColorInput,
        copyInvoiceImageBtn;

    // Variables for fullscreen DOM mode
    let fullScreenDOMViewer = null;
    let currentOrderForFullScreenDOM = null;

    let invoiceSettings = {};

    const initializeDOMReferences = () => {
        invoiceSettingsSectionDiv = document.getElementById('invoiceSettingsSection');
        toggleInvoiceSettingsPanelBtn = document.getElementById('toggleInvoiceSettingsPanelBtn');
        invoiceSettingsPanelDiv = document.getElementById('invoiceSettingsPanel');
        closeSettingsPanelButton = document.querySelector('#invoiceSettingsPanel .close-settings-panel-btn');
        invoiceCustomizationLayoutDiv = document.querySelector('.invoice-customization-layout');

        invoiceItemDisplayStyleSelect = document.getElementById('invoiceItemDisplayStyle');
        invoiceFontSizeSelect = document.getElementById('invoiceFontSize');
        invoiceShowLogoCheckbox = document.getElementById('invoiceShowLogoCheckbox');
        invoiceStoreLogoUploadInput = document.getElementById('invoiceStoreLogoUpload');
        invoiceLogoPreviewImg = document.getElementById('invoiceLogoPreview');
        invoiceLogoSizeSelect = document.getElementById('invoiceLogoSize');
        invoiceShowInvoiceTitleCheckbox = document.getElementById('invoiceShowInvoiceTitleCheckbox');
        invoiceTitleTextInput = document.getElementById('invoiceTitleText');
        invoiceStoreNameInput = document.getElementById('invoiceStoreName');
        invoiceShowStoreAddressCheckbox = document.getElementById('invoiceShowStoreAddressCheckbox');
        invoiceStoreAddressInput = document.getElementById('invoiceStoreAddress');
        invoiceShowStorePhoneCheckbox = document.getElementById('invoiceShowStorePhoneCheckbox');
        invoiceStorePhoneInput = document.getElementById('invoiceStorePhone');
        invoiceShowStoreEmailCheckbox = document.getElementById('invoiceShowStoreEmailCheckbox');
        invoiceStoreEmailInput = document.getElementById('invoiceStoreEmail');
        invoiceShowStoreWebsiteCheckbox = document.getElementById('invoiceShowStoreWebsiteCheckbox');
        invoiceStoreWebsiteInput = document.getElementById('invoiceStoreWebsite');
        invoiceShowCustomerNameCheckbox = document.getElementById('invoiceShowCustomerNameCheckbox');
        invoiceShowCustomerPhoneCheckboxEl = document.getElementById('invoiceShowCustomerPhoneCheckbox');
        invoiceShowCustomerAddressCheckbox = document.getElementById('invoiceShowCustomerAddressCheckbox');
        invoiceShowCustomerEmailCheckboxEl = document.getElementById('invoiceShowCustomerEmailCheckbox');
        invoiceShowOrderIdCheckbox = document.getElementById('invoiceShowOrderIdCheckbox');
        invoiceShowOrderNotesCheckbox = document.getElementById('invoiceShowOrderNotesCheckbox');
        invoiceShowItemPriceCheckbox = document.getElementById('invoiceShowItemPriceCheckbox');
        invoiceShowSKUCheckboxEl = document.getElementById('invoiceShowSKUCheckbox');
        invoiceShowItemDiscountCheckboxEl = document.getElementById('invoiceShowItemDiscountCheckbox');
        invoiceShowAmountPaidCheckbox = document.getElementById('invoiceShowAmountPaidCheckbox');
        invoiceShowTotalDebtCheckbox = document.getElementById('invoiceShowTotalDebtCheckbox');
        invoiceShowStoreNoteCheckbox = document.getElementById('invoiceShowStoreNoteCheckbox');
        invoiceStoreNoteTextInput = document.getElementById('invoiceStoreNoteText');
        invoiceShowInvoiceFooterCheckbox = document.getElementById('invoiceShowInvoiceFooterCheckbox');
        invoiceCustomMessageTextarea = document.getElementById('invoiceCustomMessage');
        invoicePrimaryColorInput = document.getElementById('invoicePrimaryColor');
        invoiceSecondaryColorInput = document.getElementById('invoiceSecondaryColor');
        invoiceFontFamilySelect = document.getElementById('invoiceFontFamily');
        invoiceTotalAmountColorInput = document.getElementById('invoiceTotalAmountColor');
        saveInvoiceSettingsBtn = document.getElementById('saveInvoiceSettingsBtn');

        invoicePreviewAreaDiv = document.getElementById('invoicePreviewArea');
        printCurrentInvoiceBtn = document.getElementById('printCurrentInvoiceBtn');
        exportInvoicePNGBtn = document.getElementById('exportInvoicePNGBtn');
        copyInvoiceImageBtn = document.getElementById('copyInvoiceImageBtn');
        viewFullScreenInvoiceBtn = document.getElementById('viewFullScreenInvoiceBtn');
    };

    const loadSettings = () => {
        const storedSettings = localStorage.getItem('invoiceSettings');
        const defaultSettings = {
            itemDisplayStyle: 'lines', fontSize: '10px', showLogo: true, logo: null, logoSize: '75px',
            showInvoiceTitle: true, invoiceTitle: "HÓA ĐƠN BÁN HÀNG", storeName: "Tên Cửa Hàng Của Bạn",
            showStoreAddress: true, storeAddress: "123 Đường ABC, Quận XYZ, TP. HCM",
            showStorePhone: true, storePhone: "0123 456 789", showStoreEmail: true, storeEmail: "cuahang@example.com",
            showStoreWebsite: false, storeWebsite: "www.cuahang.com", showCustomerName: true,
            showCustomerPhone: true, showCustomerAddress: true, showCustomerEmail: false,
            showOrderId: true, showOrderNotes: false, showItemPrice: true, showSKU: false, showItemDiscount: false,
            showAmountPaid: false, showTotalDebt: false, showStoreNote: true,
            storeNote: "STK: 123456789, Ngân hàng ABC, Chủ TK: Nguyễn Văn A. Nội dung: TT MaDonHang",
            showInvoiceFooter: true, customMessage: "Cảm ơn quý khách đã tin tưởng và mua sắm tại cửa hàng!",
            primaryColor: "#007bff", secondaryColor: "#333333", fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            totalAmountColor: "#DC3545"
        };
        invoiceSettings = storedSettings ? { ...defaultSettings, ...JSON.parse(storedSettings) } : defaultSettings;
        applySettingsToControls();
        applyCustomizationsToPreviewDOM();
    };

    const applySettingsToControls = () => {
        if(!invoiceItemDisplayStyleSelect) return;
        invoiceItemDisplayStyleSelect.value = invoiceSettings.itemDisplayStyle;
        invoiceFontSizeSelect.value = invoiceSettings.fontSize;
        invoiceShowLogoCheckbox.checked = invoiceSettings.showLogo;
        if (invoiceSettings.logo && invoiceLogoPreviewImg) {
            invoiceLogoPreviewImg.src = invoiceSettings.logo;
            invoiceLogoPreviewImg.style.display = 'block';
        } else if (invoiceLogoPreviewImg) {
            invoiceLogoPreviewImg.style.display = 'none';
            invoiceLogoPreviewImg.src = "#";
        }
        invoiceLogoSizeSelect.value = invoiceSettings.logoSize;
        invoiceShowInvoiceTitleCheckbox.checked = invoiceSettings.showInvoiceTitle;
        invoiceTitleTextInput.value = invoiceSettings.invoiceTitle;
        invoiceStoreNameInput.value = invoiceSettings.storeName;
        invoiceShowStoreAddressCheckbox.checked = invoiceSettings.showStoreAddress;
        invoiceStoreAddressInput.value = invoiceSettings.storeAddress;
        invoiceShowStorePhoneCheckbox.checked = invoiceSettings.showStorePhone;
        invoiceStorePhoneInput.value = invoiceSettings.storePhone;
        invoiceShowStoreEmailCheckbox.checked = invoiceSettings.showStoreEmail;
        invoiceStoreEmailInput.value = invoiceSettings.storeEmail;
        invoiceShowStoreWebsiteCheckbox.checked = invoiceSettings.showStoreWebsite;
        invoiceStoreWebsiteInput.value = invoiceSettings.storeWebsite;
        invoiceShowCustomerNameCheckbox.checked = invoiceSettings.showCustomerName;
        invoiceShowCustomerPhoneCheckboxEl.checked = invoiceSettings.showCustomerPhone;
        invoiceShowCustomerAddressCheckbox.checked = invoiceSettings.showCustomerAddress;
        invoiceShowCustomerEmailCheckboxEl.checked = invoiceSettings.showCustomerEmail;
        invoiceShowOrderIdCheckbox.checked = invoiceSettings.showOrderId;
        invoiceShowOrderNotesCheckbox.checked = invoiceSettings.showOrderNotes;
        invoiceShowItemPriceCheckbox.checked = invoiceSettings.showItemPrice;
        invoiceShowSKUCheckboxEl.checked = invoiceSettings.showSKU;
        invoiceShowItemDiscountCheckboxEl.checked = invoiceSettings.showItemDiscount;
        invoiceShowAmountPaidCheckbox.checked = invoiceSettings.showAmountPaid;
        invoiceShowTotalDebtCheckbox.checked = invoiceSettings.showTotalDebt;
        invoiceShowStoreNoteCheckbox.checked = invoiceSettings.showStoreNote;
        invoiceStoreNoteTextInput.value = invoiceSettings.storeNote;
        invoiceShowInvoiceFooterCheckbox.checked = invoiceSettings.showInvoiceFooter;
        invoiceCustomMessageTextarea.value = invoiceSettings.customMessage;
        invoicePrimaryColorInput.value = invoiceSettings.primaryColor;
        invoiceSecondaryColorInput.value = invoiceSettings.secondaryColor;
        invoiceFontFamilySelect.value = invoiceSettings.fontFamily;
        invoiceTotalAmountColorInput.value = invoiceSettings.totalAmountColor;
    };

    const saveSettings = () => {
        try {
            localStorage.setItem('invoiceSettings', JSON.stringify(invoiceSettings));
        } catch (e) {
            console.error("Lỗi khi lưu cài đặt hóa đơn:", e);
            if (typeof showToast === 'function') showToast("Lỗi lưu cài đặt. Bộ nhớ có thể đầy.", 3000, 'error');
        }

        if (typeof showToast === 'function') showToast("Cài đặt hóa đơn đã được lưu!");
        applyCustomizationsToPreviewDOM();
        renderPreview(window.currentOrderForInvoiceFromApp);

        if (fullScreenDOMViewer && fullScreenDOMViewer.classList.contains('visible')) {
            const fullScreenInvoiceElement = fullScreenDOMViewer.querySelector('#fullscreenClonedInvoice');
            if (fullScreenInvoiceElement) {
                applyCustomizationsToPreviewDOM(fullScreenInvoiceElement);
                renderPreview(currentOrderForFullScreenDOM, fullScreenInvoiceElement);
            }
        }
    };

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                if (typeof showToast === 'function') showToast("Kích thước logo quá lớn (tối đa 1MB).", 3000, 'error');
                event.target.value = ''; return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                invoiceSettings.logo = e.target.result;
                if(invoiceLogoPreviewImg) {
                    invoiceLogoPreviewImg.src = e.target.result;
                    invoiceLogoPreviewImg.style.display = 'block';
                }
                applyCustomizationsToPreviewDOM();
                renderPreview(window.currentOrderForInvoiceFromApp);
            };
            reader.readAsDataURL(file);
        }
    };

    const applyCustomizationsToPreviewDOM = (targetElement = invoicePreviewAreaDiv) => {
        if (!targetElement) return;

        targetElement.style.setProperty('--invoice-primary-color', invoiceSettings.primaryColor);
        targetElement.style.setProperty('--invoice-secondary-color', invoiceSettings.secondaryColor);
        targetElement.style.setProperty('--invoice-font', invoiceSettings.fontFamily);
        targetElement.style.setProperty('--invoice-font-size', invoiceSettings.fontSize);
        targetElement.style.setProperty('--invoice-logo-size', invoiceSettings.logoSize);
        targetElement.style.setProperty('--invoice-total-amount-color', invoiceSettings.totalAmountColor);
        targetElement.style.setProperty('--invoice-show-order-id', invoiceSettings.showOrderId ? 'block' : 'none');

        const logoWrapper = targetElement.querySelector('#invoiceLogoWrapperPreview');
        const actualLogoImg = targetElement.querySelector('#invoicePreviewActualLogo');
        const titleSection = targetElement.querySelector('#invoiceTitleSectionPreview');
        const titleTextElem = targetElement.querySelector('#invoiceTitleTextPreview');
        const storeNameElem = targetElement.querySelector('.invoice-store-name-preview');
        const storeAddressContainer = targetElement.querySelector('#invoiceStoreAddressPreviewContainer');
        const storeContactContainer = targetElement.querySelector('#invoiceStoreContactPreviewContainer');
        const storePhoneContainer = targetElement.querySelector('#invoiceStorePhoneContainer');
        const storeEmailContainer = targetElement.querySelector('#invoiceStoreEmailContainer');
        const storeWebsiteContainer = targetElement.querySelector('#invoiceStoreWebsitePreviewContainer');
        const customerDetails = targetElement.querySelector('#invoiceCustomerDetailsPreview');
        const customerNameContainer = targetElement.querySelector('#invoiceCustomerNameContainerPreview');
        const customerPhoneContainer = targetElement.querySelector('#invoiceCustomerPhoneContainerPreview');
        const customerAddressContainer = targetElement.querySelector('#invoiceCustomerAddressContainerPreview');
        const customerEmailContainer = targetElement.querySelector('#invoiceCustomerEmailContainerPreview');
        const orderNotesSection = targetElement.querySelector('#invoiceOrderNotesSectionPreview');
        const amountPaidContainer = targetElement.querySelector('#invoiceAmountPaidContainerPreview');
        const totalDebtContainer = targetElement.querySelector('#invoiceTotalDebtContainerPreview');
        const storeNoteSection = targetElement.querySelector('#invoiceStoreNoteSectionPreview');
        const storeNoteTextSpan = targetElement.querySelector('#invoicePreviewStoreNoteText');
        const footerCustom = targetElement.querySelector('#invoiceFooterCustomPreview');
        const customMessageElem = targetElement.querySelector('.invoice-custom-message-preview');

        if(logoWrapper) logoWrapper.style.display = invoiceSettings.showLogo && invoiceSettings.logo ? 'flex' : 'none';
        if(actualLogoImg) {
            if (invoiceSettings.logo) {
                actualLogoImg.src = invoiceSettings.logo;
                actualLogoImg.style.display = 'block';
            } else {
                actualLogoImg.src = "#";
                actualLogoImg.style.display = 'none';
            }
        }

        if(titleSection) titleSection.style.display = invoiceSettings.showInvoiceTitle ? 'block' : 'none';
        if(titleTextElem) titleTextElem.textContent = invoiceSettings.invoiceTitle;
        if(storeNameElem) storeNameElem.textContent = invoiceSettings.storeName;

        if(storeAddressContainer) {
            if (invoiceSettings.showStoreAddress && invoiceSettings.storeAddress) {
                storeAddressContainer.style.display = 'block';
                storeAddressContainer.innerHTML = invoiceSettings.storeAddress.replace(/\n/g, '<br>');
            } else {
                storeAddressContainer.style.display = 'none';
            }
        }

        const phoneVisible = invoiceSettings.showStorePhone && invoiceSettings.storePhone;
        const emailVisible = invoiceSettings.showStoreEmail && invoiceSettings.storeEmail;

        if (storePhoneContainer) {
            const phoneValElem = storePhoneContainer.querySelector('.invoice-store-phone-val-preview');
            if (phoneVisible && phoneValElem) {
                phoneValElem.textContent = invoiceSettings.storePhone;
                storePhoneContainer.style.display = 'inline';
            } else {
                storePhoneContainer.style.display = 'none';
            }
        }

        if (storeEmailContainer) {
            const emailValElem = storeEmailContainer.querySelector('.invoice-store-email-val-preview');
            if (emailVisible && emailValElem) {
                emailValElem.textContent = invoiceSettings.storeEmail;
                const phoneActuallyDisplayed = storePhoneContainer && getComputedStyle(storePhoneContainer).display !== 'none';
                // Cập nhật tiền tố cho email dựa trên việc SĐT có hiển thị không
                const emailPrefixNode = Array.from(storeEmailContainer.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes('Email:'));
                if(emailPrefixNode){
                    emailPrefixNode.textContent = phoneActuallyDisplayed ? " - Email: " : "Email: ";
                }
                storeEmailContainer.style.display = 'inline';
            } else {
                storeEmailContainer.style.display = 'none';
            }
        }
        if (storeContactContainer) {
            storeContactContainer.style.display = (getComputedStyle(storePhoneContainer).display !== 'none' || getComputedStyle(storeEmailContainer).display !== 'none') ? 'block' : 'none';
        }


        if(storeWebsiteContainer) {
            const websiteValElem = storeWebsiteContainer.querySelector('#invoiceStoreWebsiteValPreview');
            if (invoiceSettings.showStoreWebsite && invoiceSettings.storeWebsite && websiteValElem) {
                websiteValElem.textContent = invoiceSettings.storeWebsite;
                websiteValElem.href = invoiceSettings.storeWebsite.startsWith('http') ? invoiceSettings.storeWebsite : `http://${invoiceSettings.storeWebsite}`;
                storeWebsiteContainer.style.display = 'block';
            } else {
                storeWebsiteContainer.style.display = 'none';
            }
        }

        if(customerDetails) customerDetails.style.display = (invoiceSettings.showCustomerName || invoiceSettings.showCustomerPhone || invoiceSettings.showCustomerAddress || invoiceSettings.showCustomerEmail) ? 'block' : 'none';
        if(customerNameContainer) customerNameContainer.style.display = invoiceSettings.showCustomerName ? 'block' : 'none';
        if(customerPhoneContainer) customerPhoneContainer.style.display = invoiceSettings.showCustomerPhone ? 'block' : 'none';
        if(customerAddressContainer) customerAddressContainer.style.display = invoiceSettings.showCustomerAddress ? 'block' : 'none';
        if(customerEmailContainer) customerEmailContainer.style.display = invoiceSettings.showCustomerEmail ? 'block' : 'none';

        if(orderNotesSection) orderNotesSection.style.display = invoiceSettings.showOrderNotes ? 'block' : 'none';
        if(amountPaidContainer) amountPaidContainer.style.display = invoiceSettings.showAmountPaid ? 'flex' : 'none';
        if(totalDebtContainer) totalDebtContainer.style.display = invoiceSettings.showTotalDebt ? 'flex' : 'none';

        if(storeNoteSection) storeNoteSection.style.display = invoiceSettings.showStoreNote && invoiceSettings.storeNote ? 'block' : 'none';
        if(storeNoteTextSpan) storeNoteTextSpan.innerHTML = invoiceSettings.storeNote.replace(/\n/g, '<br>');
        if(footerCustom) footerCustom.style.display = invoiceSettings.showInvoiceFooter ? 'block' : 'none';
        if(customMessageElem) customMessageElem.innerHTML = invoiceSettings.customMessage.replace(/\n/g, '<br>');
    };

    const renderPreview = (orderDataParam, targetElement = invoicePreviewAreaDiv) => {
        if (!targetElement) {
            console.error("Phần tử đích để render preview không được xác định.");
            return;
        }
        applyCustomizationsToPreviewDOM(targetElement);

        const data = orderDataParam || window.currentOrderForInvoiceFromApp || {
            id: Date.now(), customer: { name: "Khách Hàng Mẫu", phone: "0987654321", address: "123 Đường Mẫu, Phường Mẫu, Quận Mẫu, TP Mẫu", email: "mau@example.com" },
            items: [
                { productId: 1, name: "Sản phẩm A", quantity: 2, unitPrice: 150000, sku: "SP-A", discount: 0 },
                { productId: 2, name: "Sản phẩm B (mô tả dài)", quantity: 1, unitPrice: 250000, sku: "SP-B-002", discount: 10000 }
            ],
            subtotal: 0, discountAmount: 50000, shippingFee: 30000, totalAmount: 0, amountPaid: undefined, // Để logic bên dưới xử lý
            createdAt: new Date().toISOString(), notes: "Ghi chú mẫu của đơn hàng.",
            customerNotes: "Ghi chú cho khách (mẫu)", paymentMethod: "cod"
        };

        if (!data.isConsolidatedDebtInvoice && data.amountPaid === undefined) {
            data.amountPaid = (data.paymentMethod !== 'debt' && data.paymentMethod !== 'debt_consolidation') ? (data.totalAmount || 0) : 0;
        }

        const titleTextPreview = targetElement.querySelector('#invoiceTitleTextPreview');
        const previewOrderIdSpan = targetElement.querySelector('#invoicePreviewOrderId');
        const previewOrderDateSpan = targetElement.querySelector('#invoicePreviewOrderDate');
        const previewCustomerNameSpan = targetElement.querySelector('#invoicePreviewCustomerName');
        const previewCustomerPhoneSpan = targetElement.querySelector('#invoicePreviewCustomerPhone');
        const previewCustomerAddressSpan = targetElement.querySelector('#invoicePreviewCustomerAddress');
        const previewCustomerEmailValSpan = targetElement.querySelector('#invoicePreviewCustomerEmailVal');
        const orderNotesSection = targetElement.querySelector('#invoiceOrderNotesSectionPreview');
        const previewOrderNotesSpan = targetElement.querySelector('#invoicePreviewOrderNotes');
        const itemsBodyVertical = targetElement.querySelector('#invoicePreviewItemsBodyVertical');
        const previewSubtotalSpan = targetElement.querySelector('#invoicePreviewSubtotal');
        const previewOrderDiscountSpan = targetElement.querySelector('#invoicePreviewOrderDiscount');
        const previewShippingFeeSpan = targetElement.querySelector('#invoicePreviewShippingFee');
        const amountPaidContainer = targetElement.querySelector('#invoiceAmountPaidContainerPreview');
        const previewAmountPaidSpan = targetElement.querySelector('#invoicePreviewAmountPaid');
        const previewTotalAmountSpan = targetElement.querySelector('#invoicePreviewTotalAmount');
        const totalDebtContainer = targetElement.querySelector('#invoiceTotalDebtContainerPreview');
        const previewTotalDebtSpan = targetElement.querySelector('#invoicePreviewTotalDebt');


        if (titleTextPreview) titleTextPreview.textContent = data.isConsolidatedDebtInvoice ? "BẢNG KÊ CÔNG NỢ" : invoiceSettings.invoiceTitle;
        if (previewOrderIdSpan) previewOrderIdSpan.textContent = `#${data.id.toString().slice(data.isConsolidatedDebtInvoice ? -10 : -8)}`;
        if (previewOrderDateSpan) previewOrderDateSpan.textContent = new Date(data.createdAt).toLocaleDateString('vi-VN') + " " + new Date(data.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        if (previewCustomerNameSpan) previewCustomerNameSpan.textContent = data.customer.name;
        if (previewCustomerPhoneSpan) previewCustomerPhoneSpan.textContent = data.customer.phone || 'N/A';
        if (previewCustomerAddressSpan) previewCustomerAddressSpan.textContent = data.customer.address || 'N/A';
        if (previewCustomerEmailValSpan) previewCustomerEmailValSpan.textContent = data.customer.email || 'N/A';

        const notesToDisplay = data.customerNotes || data.notes;
        if (orderNotesSection && previewOrderNotesSpan) {
            if (invoiceSettings.showOrderNotes && notesToDisplay) {
                previewOrderNotesSpan.innerHTML = notesToDisplay.replace(/\n/g, '<br>');
                orderNotesSection.style.display = 'block';
            } else {
                orderNotesSection.style.display = 'none';
            }
        }

        if (itemsBodyVertical) {
            itemsBodyVertical.innerHTML = '';
            let calculatedSubtotal = 0;

            data.items.forEach((item) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'invoice-item-vertical';
                itemElement.classList.add(invoiceSettings.itemDisplayStyle === 'boxed' ? 'item-display-boxed' : 'item-display-lines');

                let itemNameDisplayHTML = item.name.replace(/\n/g, '<br>');
                if (!item.isDebtItem && invoiceSettings.showSKU && item.sku) {
                    itemNameDisplayHTML += ` <small class="item-sku-preview">(SKU: ${item.sku})</small>`;
                }

                let itemSubDetailsHTML = '';
                const itemUnitPrice = item.unitPrice || 0;
                const itemQuantity = item.quantity || 1;
                const itemDiscountAmount = item.discount || 0;
                const itemTotalValue = (itemQuantity * itemUnitPrice) - itemDiscountAmount;
                calculatedSubtotal += itemTotalValue;

                if (!item.isDebtItem) {
                    if (invoiceSettings.showItemPrice) {
                        itemSubDetailsHTML += `<span class="item-unit-price-preview">Đ.Giá: ${itemUnitPrice.toLocaleString('vi-VN')}đ</span>`;
                    }
                    itemSubDetailsHTML += `<span>SL: ${itemQuantity}</span>`;
                    if (invoiceSettings.showItemDiscount && itemDiscountAmount > 0) {
                        itemSubDetailsHTML += `<span class="item-discount-preview" style="display:inline-block;">Giảm SP: ${itemDiscountAmount.toLocaleString('vi-VN')}đ</span>`;
                    }
                }

                itemElement.innerHTML = `
                    <div class="item-main-info">
                        <span class="item-name">${itemNameDisplayHTML}</span>
                        <span class="item-total-value">${itemTotalValue.toLocaleString('vi-VN')}đ</span>
                    </div>
                    ${itemSubDetailsHTML ? `<div class="item-sub-details">${itemSubDetailsHTML}</div>` : ''}`;
                itemsBodyVertical.appendChild(itemElement);
            });

            const displaySubtotal = data.subtotal !== undefined ? data.subtotal : calculatedSubtotal;
            const orderDiscount = data.discountAmount || 0;
            const shippingFee = data.shippingFee || 0;
            const finalTotal = data.totalAmount !== undefined ? data.totalAmount : (displaySubtotal - orderDiscount + shippingFee);

            if (previewSubtotalSpan) previewSubtotalSpan.textContent = displaySubtotal.toLocaleString('vi-VN') + 'đ';
            if (previewOrderDiscountSpan) {
                previewOrderDiscountSpan.textContent = orderDiscount.toLocaleString('vi-VN') + 'đ';
                previewOrderDiscountSpan.closest('.summary-line').style.display = data.isConsolidatedDebtInvoice ? 'none' : 'flex';
            }
            if (previewShippingFeeSpan) {
                previewShippingFeeSpan.textContent = shippingFee.toLocaleString('vi-VN') + 'đ';
                previewShippingFeeSpan.closest('.summary-line').style.display = data.isConsolidatedDebtInvoice ? 'none' : 'flex';
            }

            if (previewTotalAmountSpan) previewTotalAmountSpan.textContent = finalTotal.toLocaleString('vi-VN') + 'đ';

            let displayAmountPaid = data.amountPaid || 0;
            let displayTotalDebt = 0;

            if (data.isConsolidatedDebtInvoice) {
                displayAmountPaid = 0; // Hóa đơn tổng hợp nợ thì mặc định chưa trả
                displayTotalDebt = finalTotal;
            } else {
                const relatedDebt = (typeof window.debts_v2_from_app !== 'undefined' && Array.isArray(window.debts_v2_from_app))
                                    ? window.debts_v2_from_app.find(d => d.orderId === data.id) : null;
                if (relatedDebt) {
                    displayAmountPaid = relatedDebt.amount - relatedDebt.remainingAmount;
                    displayTotalDebt = relatedDebt.remainingAmount;
                } else { // Nếu không có phiếu nợ liên kết, tính toán dựa trên thông tin đơn hàng
                    displayAmountPaid = data.amountPaid !== undefined ? data.amountPaid : (data.paymentMethod === 'debt' ? 0 : finalTotal);
                    displayTotalDebt = finalTotal - displayAmountPaid;
                }
            }
            displayTotalDebt = Math.max(0, displayTotalDebt);

            if (amountPaidContainer && previewAmountPaidSpan) {
                if (invoiceSettings.showAmountPaid && !data.isConsolidatedDebtInvoice) {
                    previewAmountPaidSpan.textContent = displayAmountPaid.toLocaleString('vi-VN') + 'đ';
                    amountPaidContainer.style.display = 'flex';
                } else {
                    amountPaidContainer.style.display = 'none';
                }
            }

            if (totalDebtContainer && previewTotalDebtSpan) {
                if ((invoiceSettings.showTotalDebt && displayTotalDebt > 0 && !data.isConsolidatedDebtInvoice) || (data.isConsolidatedDebtInvoice && displayTotalDebt > 0) ) {
                    previewTotalDebtSpan.textContent = displayTotalDebt.toLocaleString('vi-VN') + 'đ';
                    totalDebtContainer.style.display = 'flex';
                } else {
                    totalDebtContainer.style.display = 'none';
                }
            }
        }
    };

    const getOrderIdForFilename = (currentOrder) => {
        if (!currentOrder || !currentOrder.id) return 'mau';
        return currentOrder.id.toString().replace(/[^a-zA-Z0-9-_]/g, '').slice(-10);
    };

    const generateCanvasFromInvoiceFS = async (elementToCapture, scale = 2, forExport = false) => {
        if (!elementToCapture) throw new Error("Element để chụp không tồn tại.");
        document.body.classList.add('capturing-invoice');

        if (document.fonts && typeof document.fonts.ready === 'object') {
            try {
                await Promise.race([ document.fonts.ready, new Promise(resolve => setTimeout(resolve, 700)) ]);
            } catch (fontError) { console.warn("Lỗi chờ font hoặc timeout (FS):", fontError); }
        } else {
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        let canvas;
        try {
            const html2canvasOptions = {
                scale: scale,
                useCORS: true,
                logging: false,
                imageTimeout: 0,
                backgroundColor: '#ffffff',
                windowWidth: elementToCapture.scrollWidth,
                windowHeight: elementToCapture.scrollHeight,
                scrollX: 0, scrollY: 0, x: 0, y: 0,
                removeContainer: true,
            };
            if (forExport) {
                let exportScale = (typeof isMobileDevice === 'function' && isMobileDevice()) ? 2.5 : 3.5;
                if (invoiceSettings.fontSize === '11px') exportScale *= 1.05;
                if (invoiceSettings.fontSize === '12px') exportScale *= 1.1;
                html2canvasOptions.scale = Math.min(exportScale, 4);
            }
            canvas = await html2canvas(elementToCapture, html2canvasOptions);
        } finally {
            document.body.classList.remove('capturing-invoice');
        }
        return canvas;
    };

    const triggerDownload = (url, filename, isBlobUrl = true) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename;

        const mobile = typeof isMobileDevice === 'function' && isMobileDevice();
        if (mobile) {
            if (isBlobUrl && navigator.share && navigator.canShare && url.startsWith('blob:')) {
                fetch(url).then(res => res.blob()).then(async blob => {
                    const file = new File([blob], filename, { type: blob.type });
                    try {
                        await navigator.share({ files: [file], title: 'Hóa đơn bán hàng', text: `Hóa đơn ${filename}`});
                        if (typeof showToast === 'function') showToast('Đã mở hộp thoại chia sẻ.', 3000, 'success');
                        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
                        return;
                    } catch (err) {
                        console.warn('Lỗi chia sẻ, thử cách mở tab mới:', err);
                        const newWindow = window.open(url, '_blank');
                        if (newWindow && typeof showToast === 'function') showToast("Nhấn giữ ảnh và chọn 'Lưu ảnh' hoặc 'Tải về'.", 8000, "info");
                        else if (typeof showToast === 'function') showToast("Không thể mở tab. Vui lòng thử lại.", 5000, "warning");
                    }
                }).catch(err => {
                    console.error("Lỗi fetch Blob URL để chia sẻ:", err);
                    const newWindow = window.open(url, '_blank');
                    if (newWindow && typeof showToast === 'function') showToast("Nhấn giữ ảnh và chọn 'Lưu ảnh' hoặc 'Tải về'.", 8000, "info");
                });
            } else {
                const newWindow = window.open(url, '_blank');
                if (newWindow && typeof showToast === 'function') showToast("Nhấn giữ ảnh và chọn 'Lưu ảnh' hoặc 'Tải về'.", 8000, "info");
                else {
                    document.body.appendChild(downloadLink);
                    try { downloadLink.click(); if (typeof showToast === 'function') showToast("Đang thử tải...", 5000, "info");}
                    catch (e) { if (typeof showToast === 'function') showToast("Không thể tự động tải.", 5000, "warning");}
                    document.body.removeChild(downloadLink);
                }
            }
            if (isBlobUrl && url.startsWith('blob:')) {
                setTimeout(() => { if (url.startsWith('blob:')) URL.revokeObjectURL(url); }, 60000);
            }
        } else {
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            if (isBlobUrl && url.startsWith('blob:')) { setTimeout(() => URL.revokeObjectURL(url), 200); }
            if (typeof showToast === 'function') showToast("Đã gửi yêu cầu tải file.", 4000, "success");
        }
    };

     const handleDownloadInvoiceImageFS = async () => {
        if (typeof html2canvas === 'undefined') { if (typeof showToast === 'function') showToast("Lỗi: Thư viện html2canvas chưa tải.", 3000, "error"); return; }
        if (!fullScreenDOMViewer || !fullScreenDOMViewer.classList.contains('visible')) { if (typeof showToast === 'function') showToast("Vui lòng mở hóa đơn toàn màn hình trước.", 3000, "warning"); return;}
        if (typeof showToast === 'function') showToast("Đang xử lý ảnh hóa đơn...", 2000, "info");

        const invoiceContentElement = fullScreenDOMViewer.querySelector('#fullscreenClonedInvoice');
        if (!invoiceContentElement) {
            if (typeof showToast === 'function') showToast("Không tìm thấy nội dung hóa đơn để xuất ảnh.", 3000, "error");
            return;
        }
        try {
            const canvas = await generateCanvasFromInvoiceFS(invoiceContentElement, 2, true);
            canvas.toBlob(async function(blob) {
                if (blob) {
                    const filename = `hoa-don-${getOrderIdForFilename(currentOrderForFullScreenDOM)}.png`;
                    const imageURL = URL.createObjectURL(blob);
                    triggerDownload(imageURL, filename, true);
                } else { if (typeof showToast === 'function') showToast("Không thể tạo blob từ canvas.", 4000, "error"); }
            }, 'image/png', 0.95);
        } catch (error) { console.error("Lỗi tải ảnh HĐ (FS):", error); if (typeof showToast === 'function') showToast("Lỗi tải ảnh HĐ: " + error.message, 4000, "error"); }
    };

    const handleCopyInvoiceImageFS = async () => {
        if (typeof html2canvas === 'undefined') { if (typeof showToast === 'function') showToast("Lỗi: Thư viện html2canvas chưa tải.", 3000, "error"); return; }
        if (!fullScreenDOMViewer || !fullScreenDOMViewer.classList.contains('visible')) { if (typeof showToast === 'function') showToast("Vui lòng mở hóa đơn toàn màn hình trước.", 3000, "warning"); return;}
        if (!navigator.clipboard || !navigator.clipboard.write) { if (typeof showToast === 'function') showToast("Tính năng sao chép ảnh không được hỗ trợ trên trình duyệt này/chế độ này (cần HTTPS).", 4000, "warning"); return; }
        if (typeof showToast === 'function') showToast("Đang chuẩn bị ảnh để sao chép...", 2000, "info");

        const invoiceContentElement = fullScreenDOMViewer.querySelector('#fullscreenClonedInvoice');
        if (!invoiceContentElement) {
            if (typeof showToast === 'function') showToast("Không tìm thấy nội dung hóa đơn để sao chép.", 3000, "error");
            return;
        }
        try {
            const canvas = await generateCanvasFromInvoiceFS(invoiceContentElement, 2);
            canvas.toBlob(async function(blob) {
                if (!blob || blob.type !== 'image/png') { if (typeof showToast === 'function') showToast("Không thể tạo dữ liệu ảnh hợp lệ để sao chép.", 3000, "error"); return; }
                try {
                    await navigator.clipboard.write([ new ClipboardItem({ [blob.type]: blob }) ]);
                    if (typeof showToast === 'function') showToast("Đã sao chép hóa đơn (ảnh) vào clipboard!", 2500, "success");
                } catch (err) {
                    console.error('Lỗi sao chép ảnh vào clipboard (FS):', err);
                    let userMessage = "Lỗi khi sao chép hóa đơn.";
                    if (err.name === 'NotAllowedError' || err.name === 'SecurityError') userMessage = "Trình duyệt đã chặn quyền truy cập clipboard. Vui lòng kiểm tra cài đặt hoặc đảm bảo trang đang chạy trên HTTPS.";
                    else if (err.message && err.message.includes("user gesture")) userMessage = "Cần thao tác trực tiếp của bạn để sao chép.";
                    if (typeof showToast === 'function') showToast(userMessage, 4000, "error");
                }
            }, 'image/png', 0.92);
        } catch (error) { console.error("Lỗi tạo canvas để sao chép (FS):", error); if (typeof showToast === 'function') showToast("Lỗi tạo ảnh để sao chép: " + error.message, 4000, "error"); }
    };


    const showInvoiceFullScreenDOM = (orderData) => {
        currentOrderForFullScreenDOM = orderData || window.currentOrderForInvoiceFromApp;

        if (!currentOrderForFullScreenDOM && !invoicePreviewAreaDiv) {
            if (typeof showToast === 'function') showToast("Không có dữ liệu đơn hàng hoặc mẫu xem trước để hiển thị.", 3000, "warning");
            return;
        }
        const dataToRender = currentOrderForFullScreenDOM;

        if (!fullScreenDOMViewer) {
            fullScreenDOMViewer = document.createElement('div');
            fullScreenDOMViewer.id = 'liveInvoiceFullScreenViewer';
            document.body.appendChild(fullScreenDOMViewer);
        }

        fullScreenDOMViewer.className = 'invoice-fullscreen-viewer dom-mode';
        fullScreenDOMViewer.innerHTML = `
            <div class="fullscreen-invoice-toolbar">
                <button id="closeFullscreenInvoiceDOMBtn" class="btn btn-danger btn-sm"><i class="fas fa-times"></i> Đóng</button>
                <button id="printFullscreenInvoiceDOMBtn" class="btn btn-primary btn-sm"><i class="fas fa-print"></i> In Hóa Đơn</button>
                <button id="exportFullscreenInvoicePNGBtn" class="btn btn-info btn-sm"><i class="fas fa-download"></i> Tải Ảnh HĐ</button>
                <button id="copyFullscreenInvoiceImageBtn" class="btn btn-warning btn-sm"><i class="fas fa-copy"></i> Sao Chép Ảnh</button>
            </div>
            <div id="fullscreenClonedInvoiceContent">
                <div id="fullscreenClonedInvoice" class="invoice-paper template-custom-layout">
                    <!-- Nội dung hóa đơn sẽ được clone/render ở đây -->
                </div>
            </div>`;

        const clonedInvoiceElement = fullScreenDOMViewer.querySelector('#fullscreenClonedInvoice');
        if (invoicePreviewAreaDiv) { // Clone từ preview hiện tại nếu có
            clonedInvoiceElement.innerHTML = invoicePreviewAreaDiv.innerHTML;
        } else { // Tạo cấu trúc cơ bản nếu preview gốc không tồn tại
            clonedInvoiceElement.innerHTML = `
                <div class="invoice-header-centered"><div id="invoiceLogoWrapperPreview" class="invoice-logo-centered-wrapper"><img id="invoicePreviewActualLogo" src="#" alt="Logo Cửa Hàng" style="display:none;"></div><h2 id="invoiceStoreNamePreview" class="invoice-store-name-preview"></h2><p id="invoiceStoreAddressPreviewContainer" class="invoice-store-address-preview"></p><p id="invoiceStoreContactPreviewContainer" class="invoice-store-contact-preview"><span id="invoiceStorePhoneContainer" class="invoice-store-phone-container">SĐT: <span id="invoiceStorePhonePreview" class="invoice-store-phone-val-preview"></span></span><span id="invoiceStoreEmailContainer" class="invoice-store-email-container"> - Email: <span id="invoiceStoreEmailPreview" class="invoice-store-email-val-preview"></span></span></p><p id="invoiceStoreWebsitePreviewContainer" class="invoice-store-website-preview" style="display:none;">Website: <a href="#" id="invoiceStoreWebsiteValPreview" target="_blank"></a></p></div>
                <div id="invoiceTitleSectionPreview" class="invoice-title-section"><h3 id="invoiceTitleTextPreview"></h3><p>Mã ĐH: <span id="invoicePreviewOrderId"></span></p><p>Ngày: <span id="invoicePreviewOrderDate"></span></p></div>
                <hr class="invoice-separator-light">
                <div id="invoiceCustomerDetailsPreview" class="invoice-customer-details-left"><p id="invoiceCustomerNameContainerPreview"><strong>Khách hàng:</strong> <span id="invoicePreviewCustomerName"></span></p><p id="invoiceCustomerPhoneContainerPreview"><strong>Điện thoại:</strong> <span id="invoicePreviewCustomerPhone"></span></p><p id="invoiceCustomerAddressContainerPreview"><strong>Địa chỉ:</strong> <span id="invoicePreviewCustomerAddress"></span></p><p id="invoiceCustomerEmailContainerPreview" style="display:none;"><strong>Email:</strong> <span id="invoicePreviewCustomerEmailVal"></span></p></div>
                <div id="invoiceOrderNotesSectionPreview" style="display:none;"><p><strong>Ghi chú đơn hàng:</strong> <span id="invoicePreviewOrderNotes"></span></p><hr class="invoice-separator-light"></div>
                <div id="invoiceItemsListVerticalPreview" class="invoice-items-list-vertical"><div class="invoice-items-header-vertical"><span>Tên sản phẩm</span><span>Thành tiền</span></div><div id="invoicePreviewItemsBodyVertical"></div></div>
                <div id="invoiceSummaryCustomPreview" class="invoice-summary-custom"><div class="summary-line"><span>Tổng tiền hàng:</span><span id="invoicePreviewSubtotal"></span></div><div class="summary-line"><span>Giảm giá ĐH:</span><span id="invoicePreviewOrderDiscount"></span></div><div class="summary-line"><span>Phí vận chuyển:</span><span id="invoicePreviewShippingFee"></span></div><div id="invoiceAmountPaidContainerPreview" class="summary-line" style="display:none;"><span>Khách đã trả:</span><span id="invoicePreviewAmountPaid"></span></div><div class="summary-line total-line"><span>TỔNG CỘNG:</span><span id="invoicePreviewTotalAmount"></span></div><div id="invoiceTotalDebtContainerPreview" class="summary-line" style="font-weight: bold; color: var(--danger-color); display:none;"><span>Còn lại (Nợ):</span><span id="invoicePreviewTotalDebt"></span></div></div>
                <div id="invoiceStoreNoteSectionPreview" class="invoice-payment-info"><strong>Thông tin thanh toán/Ghi chú:</strong><p id="invoicePreviewStoreNoteText"></p></div>
                <div id="invoiceFooterCustomPreview" class="invoice-footer-custom"><p class="invoice-custom-message-preview"></p><p class="invoice-branding-footer">Hóa đơn được tạo bởi Quản Lý Bán Hàng Mini</p></div>
            `;
        }

        // Render dữ liệu đơn hàng vào hóa đơn fullscreen
        renderPreview(dataToRender, clonedInvoiceElement);

        requestAnimationFrame(() => {
            fullScreenDOMViewer.classList.add('visible');
            document.body.classList.add('body-no-scroll-when-panel-open');
        });

        // Gán sự kiện cho các nút trên toolbar của hóa đơn fullscreen
        const closeBtnFS = fullScreenDOMViewer.querySelector('#closeFullscreenInvoiceDOMBtn');
        const printBtnFS = fullScreenDOMViewer.querySelector('#printFullscreenInvoiceDOMBtn');
        const exportBtnFS = fullScreenDOMViewer.querySelector('#exportFullscreenInvoicePNGBtn');
        const copyBtnFS = fullScreenDOMViewer.querySelector('#copyFullscreenInvoiceImageBtn');

        if(closeBtnFS) closeBtnFS.onclick = hideInvoiceFullScreenDOM;
        if(printBtnFS) printBtnFS.onclick = () => { window.print(); };
        if(exportBtnFS) exportBtnFS.onclick = handleDownloadInvoiceImageFS;
        if(copyBtnFS) copyBtnFS.onclick = handleCopyInvoiceImageFS;

        if (viewFullScreenInvoiceBtn) { // Cập nhật nút trên panel chính
            viewFullScreenInvoiceBtn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i> Thu Gọn';
            viewFullScreenInvoiceBtn.onclick = hideInvoiceFullScreenDOM;
        }
        document.addEventListener('keydown', handleEscKeyForInvoiceFSDOM);
    };

    const hideInvoiceFullScreenDOM = () => {
        if (fullScreenDOMViewer) {
            fullScreenDOMViewer.classList.remove('visible');
            const anyModalActive = Array.from(document.querySelectorAll('.modal.active-modal')).length > 0;
            const isPanelVisible = invoiceSettingsPanelDiv && invoiceSettingsPanelDiv.classList.contains('settings-panel-visible');
            if (!anyModalActive && !isPanelVisible) {
                document.body.classList.remove('body-no-scroll-when-panel-open');
            }
        }
        if (viewFullScreenInvoiceBtn) {
            viewFullScreenInvoiceBtn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i> Xem Toàn Màn Hình';
            viewFullScreenInvoiceBtn.onclick = () => showInvoiceFullScreenDOM(window.currentOrderForInvoiceFromApp);
        }
        document.removeEventListener('keydown', handleEscKeyForInvoiceFSDOM);
        currentOrderForFullScreenDOM = null; // Reset order khi đóng
    };

    const handleEscKeyForInvoiceFSDOM = (event) => {
        if (event.key === 'Escape') {
            hideInvoiceFullScreenDOM();
        }
    };

    const handleDirectPrintInvoice = () => {
        if (!fullScreenDOMViewer || !fullScreenDOMViewer.classList.contains('visible')) {
             showInvoiceFullScreenDOM(window.currentOrderForInvoiceFromApp);
             // Đợi một chút để DOM được render trước khi gọi print
             setTimeout(() => {
                 if (fullScreenDOMViewer && fullScreenDOMViewer.classList.contains('visible')) {
                     window.print();
                 }
             }, 500); // 500ms có thể cần điều chỉnh
        } else {
            window.print();
        }
    };
    const handleDirectDownloadInvoiceImage = () => {
         if (!fullScreenDOMViewer || !fullScreenDOMViewer.classList.contains('visible')) {
            showInvoiceFullScreenDOM(window.currentOrderForInvoiceFromApp);
             setTimeout(() => { // Đợi DOM render
                 if (fullScreenDOMViewer && fullScreenDOMViewer.classList.contains('visible')) {
                     handleDownloadInvoiceImageFS();
                 }
             }, 500);
        } else {
            handleDownloadInvoiceImageFS();
        }
    };
    const handleDirectCopyInvoiceImage = () => {
        if (!fullScreenDOMViewer || !fullScreenDOMViewer.classList.contains('visible')) {
            showInvoiceFullScreenDOM(window.currentOrderForInvoiceFromApp);
            setTimeout(() => { // Đợi DOM render
                if (fullScreenDOMViewer && fullScreenDOMViewer.classList.contains('visible')) {
                    handleCopyInvoiceImageFS();
                }
            }, 500);
        } else {
            handleCopyInvoiceImageFS();
        }
    };


    const isOrderDisplayedInFullScreen = (orderId) => {
        return fullScreenDOMViewer &&
               fullScreenDOMViewer.classList.contains('visible') &&
               currentOrderForFullScreenDOM &&
               currentOrderForFullScreenDOM.id === orderId;
    };

    const refreshFullScreenInvoice = (updatedOrderData = null) => {
        if (fullScreenDOMViewer && fullScreenDOMViewer.classList.contains('visible') && currentOrderForFullScreenDOM) {
            const dataToRender = updatedOrderData || currentOrderForFullScreenDOM;
            currentOrderForFullScreenDOM = dataToRender; // Cập nhật dữ liệu hiện tại của fullscreen

            const fullScreenInvoiceElement = fullScreenDOMViewer.querySelector('#fullscreenClonedInvoice');
            if (fullScreenInvoiceElement) {
                applyCustomizationsToPreviewDOM(fullScreenInvoiceElement); // Áp dụng lại cài đặt
                renderPreview(dataToRender, fullScreenInvoiceElement);    // Render lại với dữ liệu mới
            }
        }
    };


    const setupEventListeners = () => {
        if (toggleInvoiceSettingsPanelBtn && invoiceSettingsPanelDiv) {
            const openPanel = () => { invoiceSettingsPanelDiv.classList.add('settings-panel-visible'); toggleInvoiceSettingsPanelBtn.classList.add('panel-open'); document.body.classList.add('body-no-scroll-when-panel-open'); const btnTxt = toggleInvoiceSettingsPanelBtn.querySelector('span.button-text-desktop'); if (btnTxt) btnTxt.textContent = "Đóng"; };
            const closePanel = () => { invoiceSettingsPanelDiv.classList.remove('settings-panel-visible'); toggleInvoiceSettingsPanelBtn.classList.remove('panel-open'); const anyModalActive = Array.from(document.querySelectorAll('.modal.active-modal')).length > 0; const fsViewVisible = (fullScreenDOMViewer && fullScreenDOMViewer.classList.contains('visible')); if (!anyModalActive && !fsViewVisible) document.body.classList.remove('body-no-scroll-when-panel-open'); const btnTxt = toggleInvoiceSettingsPanelBtn.querySelector('span.button-text-desktop'); if (btnTxt) btnTxt.textContent = "Cài đặt"; };
            toggleInvoiceSettingsPanelBtn.addEventListener('click', (e) => { e.stopPropagation(); if(invoiceSettingsPanelDiv.classList.contains('settings-panel-visible')) closePanel(); else openPanel(); });
            if (closeSettingsPanelButton) closeSettingsPanelButton.addEventListener('click', (e) => { e.stopPropagation(); closePanel(); });
            document.addEventListener('click', (e) => { if (invoiceSettingsPanelDiv && invoiceSettingsPanelDiv.classList.contains('settings-panel-visible') && !invoiceSettingsPanelDiv.contains(e.target) && toggleInvoiceSettingsPanelBtn && !toggleInvoiceSettingsPanelBtn.contains(e.target) && !e.target.closest('#toggleInvoiceSettingsPanelBtn')) closePanel(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && invoiceSettingsPanelDiv && invoiceSettingsPanelDiv.classList.contains('settings-panel-visible')) closePanel(); });
        }

        if (viewFullScreenInvoiceBtn) viewFullScreenInvoiceBtn.onclick = () => showInvoiceFullScreenDOM(window.currentOrderForInvoiceFromApp);
        if (printCurrentInvoiceBtn) printCurrentInvoiceBtn.onclick = handleDirectPrintInvoice;
        if (exportInvoicePNGBtn) exportInvoicePNGBtn.onclick = handleDirectDownloadInvoiceImage;
        if (copyInvoiceImageBtn) copyInvoiceImageBtn.onclick = handleDirectCopyInvoiceImage;

        if (invoiceStoreLogoUploadInput) invoiceStoreLogoUploadInput.onchange = handleLogoUpload;
        if (saveInvoiceSettingsBtn) saveInvoiceSettingsBtn.onclick = saveSettings;

        const allInvoiceSettingControls = [
            invoiceItemDisplayStyleSelect, invoiceFontSizeSelect, invoiceShowLogoCheckbox, invoiceLogoSizeSelect,
            invoiceShowInvoiceTitleCheckbox, invoiceTitleTextInput, invoiceStoreNameInput,
            invoiceShowStoreAddressCheckbox, invoiceStoreAddressInput, invoiceShowStorePhoneCheckbox,
            invoiceStorePhoneInput, invoiceShowStoreEmailCheckbox, invoiceStoreEmailInput,
            invoiceShowStoreWebsiteCheckbox, invoiceStoreWebsiteInput, invoiceShowCustomerNameCheckbox,
            invoiceShowCustomerPhoneCheckboxEl, invoiceShowCustomerAddressCheckbox, invoiceShowCustomerEmailCheckboxEl,
            invoiceShowOrderIdCheckbox, invoiceShowOrderNotesCheckbox, invoiceShowItemPriceCheckbox, invoiceShowSKUCheckboxEl,
            invoiceShowItemDiscountCheckboxEl, invoiceShowAmountPaidCheckbox, invoiceShowTotalDebtCheckbox,
            invoiceShowStoreNoteCheckbox, invoiceStoreNoteTextInput, invoiceShowInvoiceFooterCheckbox,
            invoiceCustomMessageTextarea, invoicePrimaryColorInput, invoiceSecondaryColorInput,
            invoiceFontFamilySelect, invoiceTotalAmountColorInput
        ];

        allInvoiceSettingControls.forEach(input => {
            if (input) {
                const eventType = (input.type === 'checkbox' || input.tagName === 'SELECT' || input.type === 'color') ? 'change' : 'input';
                input.addEventListener(eventType, () => {
                    const key = input.id.replace('invoice', '').replace('Checkbox', '').replace('El', '');
                    let settingKey = key.charAt(0).toLowerCase() + key.slice(1);

                    if (input.id === 'invoiceItemDisplayStyle') settingKey = 'itemDisplayStyle';
                    else if (input.id === 'invoiceFontSize') settingKey = 'fontSize';
                    else if (input.id === 'invoiceShowLogoCheckbox') settingKey = 'showLogo';
                    else if (input.id === 'invoiceLogoSize') settingKey = 'logoSize';
                    else if (input.id === 'invoiceShowInvoiceTitleCheckbox') settingKey = 'showInvoiceTitle';
                    else if (input.id === 'invoiceTitleText') settingKey = 'invoiceTitle';
                    else if (input.id === 'invoiceStoreName') settingKey = 'storeName';
                    else if (input.id === 'invoiceShowStoreAddressCheckbox') settingKey = 'showStoreAddress';
                    else if (input.id === 'invoiceStoreAddress') settingKey = 'storeAddress';
                    else if (input.id === 'invoiceShowStorePhoneCheckbox') settingKey = 'showStorePhone';
                    else if (input.id === 'invoiceStorePhone') settingKey = 'storePhone';
                    else if (input.id === 'invoiceShowStoreEmailCheckbox') settingKey = 'showStoreEmail';
                    else if (input.id === 'invoiceStoreEmail') settingKey = 'storeEmail';
                    else if (input.id === 'invoiceShowStoreWebsiteCheckbox') settingKey = 'showStoreWebsite';
                    else if (input.id === 'invoiceStoreWebsite') settingKey = 'storeWebsite';
                    else if (input.id === 'invoiceShowCustomerNameCheckbox') settingKey = 'showCustomerName';
                    else if (input.id === 'invoiceShowCustomerPhoneCheckbox') settingKey = 'showCustomerPhone';
                    else if (input.id === 'invoiceShowCustomerAddressCheckbox') settingKey = 'showCustomerAddress';
                    else if (input.id === 'invoiceShowCustomerEmailCheckbox') settingKey = 'showCustomerEmail';
                    else if (input.id === 'invoiceShowOrderIdCheckbox') settingKey = 'showOrderId';
                    else if (input.id === 'invoiceShowOrderNotesCheckbox') settingKey = 'showOrderNotes';
                    else if (input.id === 'invoiceShowItemPriceCheckbox') settingKey = 'showItemPrice';
                    else if (input.id === 'invoiceShowSKUCheckbox') settingKey = 'showSKU';
                    else if (input.id === 'invoiceShowItemDiscountCheckbox') settingKey = 'showItemDiscount';
                    else if (input.id === 'invoiceShowAmountPaidCheckbox') settingKey = 'showAmountPaid';
                    else if (input.id === 'invoiceShowTotalDebtCheckbox') settingKey = 'showTotalDebt';
                    else if (input.id === 'invoiceShowStoreNoteCheckbox') settingKey = 'showStoreNote';
                    else if (input.id === 'invoiceStoreNoteText') settingKey = 'storeNote';
                    else if (input.id === 'invoiceShowInvoiceFooterCheckbox') settingKey = 'showInvoiceFooter';
                    else if (input.id === 'invoiceCustomMessage') settingKey = 'customMessage';
                    else if (input.id === 'invoicePrimaryColor') settingKey = 'primaryColor';
                    else if (input.id === 'invoiceSecondaryColor') settingKey = 'secondaryColor';
                    else if (input.id === 'invoiceFontFamily') settingKey = 'fontFamily';
                    else if (input.id === 'invoiceTotalAmountColor') settingKey = 'totalAmountColor';


                    if (input.type === 'checkbox') {
                        invoiceSettings[settingKey] = input.checked;
                    } else {
                        invoiceSettings[settingKey] = input.value;
                    }

                    applyCustomizationsToPreviewDOM();
                    renderPreview(window.currentOrderForInvoiceFromApp);

                    if (fullScreenDOMViewer && fullScreenDOMViewer.classList.contains('visible')) {
                        const fullScreenInvoiceElement = fullScreenDOMViewer.querySelector('#fullscreenClonedInvoice');
                        if (fullScreenInvoiceElement) {
                            applyCustomizationsToPreviewDOM(fullScreenInvoiceElement);
                            renderPreview(currentOrderForFullScreenDOM, fullScreenInvoiceElement);
                        }
                    }
                });
            }
        });
    };

    const initialize = (initialOrderForInvoice) => {
        initializeDOMReferences();
        loadSettings();
        setupEventListeners();

        if (invoiceSettingsPanelDiv) invoiceSettingsPanelDiv.classList.remove('settings-panel-visible');
        if (toggleInvoiceSettingsPanelBtn) {
            toggleInvoiceSettingsPanelBtn.classList.remove('panel-open');
            const btnTextSpan = toggleInvoiceSettingsPanelBtn.querySelector('span.button-text-desktop');
            if (btnTextSpan) btnTextSpan.textContent = "Cài đặt";
        }
        renderPreview(initialOrderForInvoice);
    };

    return {
        initialize,
        renderPreview,
        showInvoiceFullScreenDOM,
        isOrderDisplayedInFullScreen,
        refreshFullScreenInvoice
    };
})();