import React, { useState, useEffect } from 'react';
import { OrderDetails } from './CheckoutForm';

interface AdminDashboardProps {
  orders: OrderDetails[];
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onLogout }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.delivery.lastName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.timestamp - a.timestamp;
      } else {
        return a.timestamp - b.timestamp;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'confirmed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'shipped':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'delivered':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'schedule';
      case 'confirmed':
        return 'check_circle';
      case 'shipped':
        return 'local_shipping';
      case 'delivered':
        return 'task_alt';
      default:
        return 'help';
    }
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#0a0905] to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0a0905]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Orders Admin</h1>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-500/10 rounded-full transition-colors"
            title="Logout"
          >
            <span className="material-symbols-outlined text-red-400">logout</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40">search</span>
          <input
            type="text"
            placeholder="Search by Order ID, Email, or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 pb-24">
        {selectedOrder ? (
          /* Order Detail View */
          <div className="space-y-6 animate-fade-in">
            <button
              onClick={() => setSelectedOrder(null)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              <span>Back to Orders</span>
            </button>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 to-white/5 border-b border-white/10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedOrder.id}</h2>
                    <p className="text-white/60">
                      {new Date(selectedOrder.timestamp).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg border flex items-center gap-2 font-semibold text-sm ${getStatusColor(selectedOrder.status)}`}>
                    <span className="material-symbols-outlined text-base">{getStatusIcon(selectedOrder.status)}</span>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    Contact Information
                  </h3>
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="text-white font-medium">{selectedOrder.contact.email}</p>
                    </div>
                    {selectedOrder.contact.subscribeNews && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-primary text-sm">✓ Subscribed to news and offers</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    Delivery Address
                  </h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="space-y-1 text-white/80">
                      <p className="font-medium text-white">
                        {selectedOrder.delivery.firstName} {selectedOrder.delivery.lastName}
                      </p>
                      <p>{selectedOrder.delivery.address}</p>
                      {selectedOrder.delivery.apartment && (
                        <p>{selectedOrder.delivery.apartment}</p>
                      )}
                      <p>{selectedOrder.delivery.city}, {selectedOrder.delivery.state}</p>
                      <p>{selectedOrder.delivery.pinCode}</p>
                      {selectedOrder.delivery.country && (
                        <p>{selectedOrder.delivery.country}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">shopping_bag</span>
                    Order Items
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="bg-white/5 rounded-lg p-4 flex items-center gap-4"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-white/60 text-sm">{item.series} - {item.volume}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">×{item.quantity}</p>
                          <p className="text-primary text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-lg">Order Total</span>
                    <span className="text-3xl font-bold text-primary">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Orders List View */
          <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Sort</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders Count */}
            <div className="text-white/60 text-sm">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>

            {/* Orders List */}
            {filteredOrders.length > 0 ? (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="w-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 rounded-xl p-4 transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white">{order.id}</h3>
                        <p className="text-white/60 text-sm">
                          {new Date(order.timestamp).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 whitespace-nowrap ${getStatusColor(order.status)}`}>
                        <span className="material-symbols-outlined text-sm">{getStatusIcon(order.status)}</span>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/60">Customer</p>
                        <p className="text-white font-medium">
                          {order.delivery.firstName} {order.delivery.lastName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60">Total</p>
                        <p className="text-primary font-bold">₹{order.total.toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-white/60 text-xs">{order.items.length} item(s)</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-4xl text-white/20 block mb-4">shopping_bag</span>
                <p className="text-white/60">No orders found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
