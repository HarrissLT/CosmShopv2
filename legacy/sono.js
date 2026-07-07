import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, DollarSign, User, AlertCircle, CheckCircle, Edit, Trash2, Bell, FileText, Filter } from 'lucide-react';

const DebtManagementSystem = () => {
  const [debts, setDebts] = useState([
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      customerPhone: '0123456789',
      customerEmail: 'nguyenvana@email.com',
      amount: 5000000,
      remainingAmount: 3000000,
      product: 'Laptop Dell XPS 13',
      createDate: '2024-05-01',
      dueDate: '2024-06-01',
      note: 'Khách hàng VIP, ưu tiên thanh toán',
      status: 'overdue'
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      customerPhone: '0987654321',
      customerEmail: 'tranthib@email.com',
      amount: 2000000,
      remainingAmount: 2000000,
      product: 'iPhone 15 Pro',
      createDate: '2024-05-15',
      dueDate: '2024-06-15',
      note: 'Thanh toán theo tháng',
      status: 'pending'
    }
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      debtId: 1,
      amount: 2000000,
      paymentDate: '2024-05-15',
      note: 'Thanh toán lần 1'
    }
  ]);

  const [activeTab, setActiveTab] = useState('list');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDebt, setEditingDebt] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form states
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    amount: '',
    product: '',
    dueDate: '',
    note: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    debtId: '',
    amount: '',
    note: ''
  });

  // Update debt status based on due date
  useEffect(() => {
    const updateStatuses = () => {
      const today = new Date();
      setDebts(prevDebts =>
        prevDebts.map(debt => {
          const dueDate = new Date(debt.dueDate);
          let status = 'pending';

          if (debt.remainingAmount === 0) {
            status = 'paid';
          } else if (dueDate < today) {
            status = 'overdue';
          }

          return { ...debt, status };
        })
      );
    };

    updateStatuses();
    const interval = setInterval(updateStatuses, 24 * 60 * 60 * 1000); // Update daily
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (editingDebt) {
      setDebts(prevDebts =>
        prevDebts.map(debt =>
          debt.id === editingDebt.id
            ? {
              ...debt,
              ...formData,
              amount: parseFloat(formData.amount),
              remainingAmount: debt.remainingAmount + (parseFloat(formData.amount) - debt.amount)
            }
            : debt
        )
      );
      setEditingDebt(null);
    } else {
      const newDebt = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount),
        remainingAmount: parseFloat(formData.amount),
        createDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setDebts(prev => [...prev, newDebt]);
    }

    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      amount: '',
      product: '',
      dueDate: '',
      note: ''
    });
    setShowAddForm(false);
  };

  const handlePayment = () => {
    const paymentAmount = parseFloat(paymentForm.amount);
    const newPayment = {
      id: Date.now(),
      debtId: parseInt(paymentForm.debtId),
      amount: paymentAmount,
      paymentDate: new Date().toISOString().split('T')[0],
      note: paymentForm.note
    };

    setPayments(prev => [...prev, newPayment]);

    setDebts(prevDebts =>
      prevDebts.map(debt =>
        debt.id === parseInt(paymentForm.debtId)
          ? {
            ...debt,
            remainingAmount: Math.max(0, debt.remainingAmount - paymentAmount)
          }
          : debt
      )
    );

    setPaymentForm({ debtId: '', amount: '', note: '' });
  };

  const handleEdit = (debt) => {
    setEditingDebt(debt);
    setFormData({
      customerName: debt.customerName,
      customerPhone: debt.customerPhone,
      customerEmail: debt.customerEmail,
      amount: debt.amount.toString(),
      product: debt.product,
      dueDate: debt.dueDate,
      note: debt.note
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa khoản nợ này?')) {
      setDebts(prev => prev.filter(debt => debt.id !== id));
      setPayments(prev => prev.filter(payment => payment.debtId !== id));
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
      paid: 'bg-green-100 text-green-800'
    };

    const labels = {
      pending: 'Chờ thanh toán',
      overdue: 'Quá hạn',
      paid: 'Đã thanh toán'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const filteredDebts = debts.filter(debt => {
    const matchesSearch = debt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debt.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || debt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getDebtPayments = (debtId) => {
    return payments.filter(payment => payment.debtId === debtId);
  };

  const calculateTotals = () => {
    const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
    const totalRemaining = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
    const totalPaid = totalDebt - totalRemaining;
    const overdueDebts = debts.filter(debt => debt.status === 'overdue');

    return { totalDebt, totalRemaining, totalPaid, overdueCount: overdueDebts.length };
  };

  const totals = calculateTotals();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-8 w-8 text-blue-600" />
                Quản lý Sổ Nợ
              </h1>
              <p className="text-gray-600 mt-1">Theo dõi và quản lý công nợ khách hàng</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Tạo phiếu nợ
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Tổng nợ phải thu</p>
                  <p className="text-xl font-bold text-blue-900">{formatCurrency(totals.totalRemaining)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Đã thu được</p>
                  <p className="text-xl font-bold text-green-900">{formatCurrency(totals.totalPaid)}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Nợ quá hạn</p>
                  <p className="text-xl font-bold text-red-900">{totals.overdueCount} khoản</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600">Tổng khách hàng</p>
                  <p className="text-xl font-bold text-yellow-900">{debts.length}</p>
                </div>
                <User className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'list', label: 'Danh sách nợ', icon: FileText },
              { id: 'payment', label: 'Thanh toán', icon: DollarSign }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'list' && (
            <div>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên khách hàng hoặc sản phẩm..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tất cả</option>
                    <option value="pending">Chờ thanh toán</option>
                    <option value="overdue">Quá hạn</option>
                    <option value="paid">Đã thanh toán</option>
                  </select>
                </div>
              </div>

              {/* Debt List */}
              <div className="space-y-4">
                {filteredDebts.map(debt => (
                  <div key={debt.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{debt.customerName}</h3>
                          {getStatusBadge(debt.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Điện thoại: {debt.customerPhone}</p>
                            <p className="text-sm text-gray-600">Email: {debt.customerEmail}</p>
                            <p className="text-sm text-gray-600">Sản phẩm: {debt.product}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Ngày tạo: {debt.createDate}</p>
                            <p className="text-sm text-gray-600">Hạn thanh toán: {debt.dueDate}</p>
                            <p className="text-sm text-gray-600">Ghi chú: {debt.note}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mb-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Tổng nợ</p>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(debt.amount)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Còn lại</p>
                            <p className="text-lg font-bold text-red-600">{formatCurrency(debt.remainingAmount)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Đã trả</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(debt.amount - debt.remainingAmount)}</p>
                          </div>
                        </div>

                        {/* Payment History */}
                        {getDebtPayments(debt.id).length > 0 && (
                          <div className="border-t pt-4">
                            <h4 className="font-medium text-gray-900 mb-2">Lịch sử thanh toán:</h4>
                            <div className="space-y-1">
                              {getDebtPayments(debt.id).map(payment => (
                                <div key={payment.id} className="text-sm text-gray-600 flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  {payment.paymentDate}: {formatCurrency(payment.amount)}
                                  {payment.note && ` - ${payment.note}`}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(debt)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Chỉnh sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(debt.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredDebts.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Không có khoản nợ nào</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ghi nhận thanh toán</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn khoản nợ
                  </label>
                  <select
                    value={paymentForm.debtId}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, debtId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Chọn khách hàng</option>
                    {debts.filter(debt => debt.remainingAmount > 0).map(debt => (
                      <option key={debt.id} value={debt.id}>
                        {debt.customerName} - {formatCurrency(debt.remainingAmount)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tiền thanh toán
                  </label>
                  <input
                    type="number"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập số tiền"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={paymentForm.note}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, note: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ghi chú về lần thanh toán này"
                    rows="3"
                  />
                </div>

                <button
                  type="button"
                  onClick={handlePayment}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Ghi nhận thanh toán
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Debt Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {editingDebt ? 'Chỉnh sửa phiếu nợ' : 'Tạo phiếu nợ mới'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên khách hàng *
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sản phẩm/Dịch vụ *
                  </label>
                  <input
                    type="text"
                    value={formData.product}
                    onChange={(e) => setFormData(prev => ({ ...prev, product: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tiền nợ *
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hạn thanh toán *
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingDebt(null);
                      setFormData({
                        customerName: '',
                        customerPhone: '',
                        customerEmail: '',
                        amount: '',
                        product: '',
                        dueDate: '',
                        note: ''
                      });
                    }}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                  >
                    {editingDebt ? 'Cập nhật' : 'Tạo mới'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebtManagementSystem;