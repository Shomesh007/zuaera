import React, { useState, useEffect } from 'react';
import { OrderDetails } from './CheckoutForm';
import { Product } from '../App';
import { loadProducts, saveProducts } from './productStore';

interface AdminDashboardProps {
  orders: OrderDetails[];
  onLogout: () => void;
  onProductsChange?: (products: Product[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onLogout, onProductsChange }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [products, setProducts] = useState<Product[]>(loadProducts());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingImages, setEditingImages] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [editingProduct, setEditingProduct] = useState<(Omit<Product, 'image'> & { isNew?: boolean }) | null>(null);
  const [newTagInput, setNewTagInput] = useState('');
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientUrl, setNewIngredientUrl] = useState('');

  // Compress image to JPEG at max 800px and 70% quality to fit localStorage
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX = 800;
          let { width, height } = img;
          if (width > height && width > MAX) {
            height = Math.round((height * MAX) / width);
            width = MAX;
          } else if (height > MAX) {
            width = Math.round((width * MAX) / height);
            height = MAX;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Canvas error');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

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
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-500/10 rounded-full transition-colors"
            title="Logout"
          >
            <span className="material-symbols-outlined text-red-400">logout</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-white/10">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'text-primary border-b-2 border-primary'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'products'
                ? 'text-primary border-b-2 border-primary'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Products
          </button>
        </div>

        {/* Search Bar - only for orders */}
        {activeTab === 'orders' && (
          <div className="relative mt-4">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40">search</span>
            <input
              type="text"
              placeholder="Search by Order ID, Email, or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 pb-24">
        {activeTab === 'orders' ? (
          selectedOrder ? (
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
          )
        ) : (
          /* Products Tab */
          selectedProduct && editingProduct ? (
            /* Product Edit View */
            <div className="space-y-6 animate-fade-in">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setEditingProduct(null);
                  setEditingImages([]);
                  setSaveStatus('idle');
                }}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
                <span>Back to Products</span>
              </button>


              {/* === FULL EDIT FORM === */}
              <div className="space-y-5">

                {/* Basic Info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">info</span>
                    Basic Info
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Product Name</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={e => setEditingProduct(p => p ? { ...p, name: e.target.value } : p)}
                        className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="e.g. CRISP"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Series / Brand</label>
                      <input
                        type="text"
                        value={editingProduct.series}
                        onChange={e => setEditingProduct(p => p ? { ...p, series: e.target.value } : p)}
                        className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="e.g. ZUAERA"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Price (₹)</label>
                      <input
                        type="number"
                        min={0}
                        value={editingProduct.price}
                        onChange={e => setEditingProduct(p => p ? { ...p, price: Number(e.target.value) } : p)}
                        className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Volume</label>
                      <input
                        type="text"
                        value={editingProduct.volume}
                        onChange={e => setEditingProduct(p => p ? { ...p, volume: e.target.value } : p)}
                        className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="e.g. 30ML"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Gender / Audience</label>
                      <select
                        value={editingProduct.navLabel}
                        onChange={e => setEditingProduct(p => p ? { ...p, navLabel: e.target.value } : p)}
                        className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Target Audience Label</label>
                      <input
                        type="text"
                        value={editingProduct.targetAudience || ''}
                        onChange={e => setEditingProduct(p => p ? { ...p, targetAudience: e.target.value } : p)}
                        className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="e.g. For Him"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-white/60 text-xs mb-1 block">Glow Color (CSS color / rgba)</label>
                      <input
                        type="text"
                        value={editingProduct.glowColor}
                        onChange={e => setEditingProduct(p => p ? { ...p, glowColor: e.target.value } : p)}
                        className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="e.g. rgba(100, 255, 218, 0.2)"
                      />
                    </div>
                  </div>
                </div>

                {/* Tagline & Description */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">text_fields</span>
                    Copy
                  </h3>
                  <div>
                    <label className="text-white/60 text-xs mb-1 block">Tagline</label>
                    <input
                      type="text"
                      value={editingProduct.tagline}
                      onChange={e => setEditingProduct(p => p ? { ...p, tagline: e.target.value } : p)}
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="Short catchy tagline"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1 block">Description</label>
                    <textarea
                      value={editingProduct.description}
                      onChange={e => setEditingProduct(p => p ? { ...p, description: e.target.value } : p)}
                      rows={5}
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y min-h-[100px]"
                      placeholder="Full product description..."
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">label</span>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {editingProduct.tags.map((tag, i) => (
                      <span key={i} className="flex items-center gap-1 bg-primary/15 border border-primary/30 text-primary text-xs px-3 py-1 rounded-full">
                        {tag}
                        <button
                          onClick={() => setEditingProduct(p => p ? { ...p, tags: p.tags.filter((_, ti) => ti !== i) } : p)}
                          className="ml-0.5 hover:text-red-400 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm leading-none">close</span>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={e => setNewTagInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && newTagInput.trim()) {
                          setEditingProduct(p => p ? { ...p, tags: [...p.tags, newTagInput.trim()] } : p);
                          setNewTagInput('');
                        }
                      }}
                      className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="Type tag and press Enter"
                    />
                    <button
                      onClick={() => {
                        if (newTagInput.trim()) {
                          setEditingProduct(p => p ? { ...p, tags: [...p.tags, newTagInput.trim()] } : p);
                          setNewTagInput('');
                        }
                      }}
                      className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg px-3 py-2 text-sm transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">star</span>
                    Highlights (2 Stats)
                  </h3>
                  {[0, 1].map(i => (
                    <div key={i} className="space-y-2">
                      <p className="text-white/40 text-xs">Highlight {i + 1}</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-white/60 text-xs mb-1 block">Label</label>
                          <input
                            type="text"
                            value={editingProduct.highlights[i].label}
                            onChange={e => {
                              const updated: Product['highlights'] = [...editingProduct.highlights] as Product['highlights'];
                              updated[i] = { ...updated[i], label: e.target.value };
                              setEditingProduct(p => p ? { ...p, highlights: updated } : p);
                            }}
                            className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="e.g. Duration"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-xs mb-1 block">Value</label>
                          <input
                            type="text"
                            value={editingProduct.highlights[i].value}
                            onChange={e => {
                              const updated: Product['highlights'] = [...editingProduct.highlights] as Product['highlights'];
                              updated[i] = { ...updated[i], value: e.target.value };
                              setEditingProduct(p => p ? { ...p, highlights: updated } : p);
                            }}
                            className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="e.g. 8+ Hours"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-xs mb-1 block">Icon (Material)</label>
                          <input
                            type="text"
                            value={editingProduct.highlights[i].icon}
                            onChange={e => {
                              const updated: Product['highlights'] = [...editingProduct.highlights] as Product['highlights'];
                              updated[i] = { ...updated[i], icon: e.target.value };
                              setEditingProduct(p => p ? { ...p, highlights: updated } : p);
                            }}
                            className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="e.g. timer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ingredients */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">science</span>
                    Ingredients
                  </h3>
                  <div className="space-y-2">
                    {editingProduct.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2 group">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{ing.name}</p>
                          {ing.url && <p className="text-white/40 text-xs truncate">{ing.url}</p>}
                        </div>
                        <button
                          onClick={() => setEditingProduct(p => p ? { ...p, ingredients: p.ingredients.filter((_, ii) => ii !== i) } : p)}
                          className="p-1.5 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <span className="material-symbols-outlined text-red-400 text-lg">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 border border-white/10 rounded-lg p-3 bg-black/20">
                    <p className="text-white/40 text-xs mb-2">Add ingredient:</p>
                    <input
                      type="text"
                      value={newIngredientName}
                      onChange={e => setNewIngredientName(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="Ingredient name (required)"
                    />
                    <input
                      type="text"
                      value={newIngredientUrl}
                      onChange={e => setNewIngredientUrl(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="Info URL (optional)"
                    />
                    <button
                      onClick={() => {
                        if (newIngredientName.trim()) {
                          setEditingProduct(p => p ? {
                            ...p,
                            ingredients: [...p.ingredients, { name: newIngredientName.trim(), url: newIngredientUrl.trim() }]
                          } : p);
                          setNewIngredientName('');
                          setNewIngredientUrl('');
                        }
                      }}
                      className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg px-3 py-2 text-sm transition-colors"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                </div>

                {/* Images */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">image</span>
                    Product Images
                  </h3>

                  {editingImages.length > 0 ? (
                    <div className="space-y-3">
                      <div className="bg-black/50 rounded-lg overflow-hidden w-32 h-32 flex-shrink-0">
                        <img src={editingImages[0]} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-white/60 text-sm">Drag to reorder · click 🗑 to remove:</p>
                        {editingImages.map((image, index) => (
                          <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-4 group cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => e.dataTransfer?.setData('text/plain', index.toString())}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const sourceIndex = parseInt(e.dataTransfer?.getData('text/plain') || '0');
                              const newImages = [...editingImages];
                              [newImages[sourceIndex], newImages[index]] = [newImages[index], newImages[sourceIndex]];
                              setEditingImages(newImages);
                            }}
                          >
                            <span className="material-symbols-outlined text-white/40 group-hover:text-white/60">drag_handle</span>
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm">Slide {index + 1}</p>
                              <p className="text-white/40 text-xs truncate max-w-[120px] sm:max-w-[220px]">
                                {image.startsWith('data:') ? 'Uploaded image' : image}
                              </p>
                            </div>
                            <button
                              onClick={() => setEditingImages(editingImages.filter((_, i) => i !== index))}
                              className="p-2 hover:bg-red-500/20 rounded transition-colors flex-shrink-0 ml-2"
                            >
                              <span className="material-symbols-outlined text-red-400 text-xl">delete</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm">No images added yet</p>
                  )}

                  <div className="space-y-2">
                    <label className="flex items-center gap-3 bg-white/5 border border-dashed border-primary/40 rounded-lg px-4 py-4 cursor-pointer hover:bg-primary/5 transition-colors">
                      <span className="material-symbols-outlined text-primary">upload</span>
                      <div>
                        <p className="text-white text-sm font-semibold">Upload from device</p>
                        <p className="text-white/40 text-xs">JPG, PNG, WEBP — auto-compressed</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []) as File[];
                          files.forEach((file) => {
                            compressImage(file).then((dataUrl) => {
                              setEditingImages(prev => [...prev, dataUrl]);
                            }).catch(() => setSaveStatus('error'));
                          });
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <label className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 cursor-text hover:bg-white/10 transition-colors">
                      <span className="material-symbols-outlined text-white/40">link</span>
                      <input
                        type="text"
                        placeholder="Or paste image URL and press Enter..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value) {
                            setEditingImages(prev => [...prev, e.currentTarget.value]);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm"
                      />
                    </label>
                  </div>
                </div>

                {/* Save / Cancel */}
                <div className="space-y-3">
                  {saveStatus === 'saved' && (
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3">
                      <span className="material-symbols-outlined text-green-400">check_circle</span>
                      <p className="text-green-400 font-semibold text-sm">Product saved successfully!</p>
                    </div>
                  )}
                  {saveStatus === 'error' && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                      <span className="material-symbols-outlined text-red-400">error</span>
                      <p className="text-red-400 font-semibold text-sm">Save failed — product name required, or storage limit hit.</p>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <button
                      disabled={saveStatus === 'saving'}
                      onClick={() => {
                        if (!editingProduct?.name?.trim()) {
                          setSaveStatus('error');
                          return;
                        }
                        setSaveStatus('saving');
                        try {
                          const imageValue = editingImages.length > 0
                            ? JSON.stringify(editingImages)
                            : (editingProduct.isNew ? '[]' : (selectedProduct?.image || '[]'));
                          const finalProduct: Product = {
                            id: editingProduct.id,
                            series: editingProduct.series,
                            name: editingProduct.name,
                            navLabel: editingProduct.navLabel,
                            tags: editingProduct.tags,
                            description: editingProduct.description,
                            tagline: editingProduct.tagline,
                            highlights: editingProduct.highlights,
                            ingredients: editingProduct.ingredients,
                            price: editingProduct.price,
                            volume: editingProduct.volume,
                            glowColor: editingProduct.glowColor,
                            targetAudience: editingProduct.targetAudience,
                            image: imageValue,
                          };
                          const updatedProducts = editingProduct.isNew
                            ? [...products, finalProduct]
                            : products.map(p => p.id === finalProduct.id ? finalProduct : p);
                          setProducts(updatedProducts);
                          saveProducts(updatedProducts);
                          onProductsChange?.(updatedProducts);
                          setSaveStatus('saved');
                          setTimeout(() => {
                            setSelectedProduct(null);
                            setEditingProduct(null);
                            setEditingImages([]);
                            setSaveStatus('idle');
                          }, 1500);
                        } catch {
                          setSaveStatus('error');
                        }
                      }}
                      className="flex-1 bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saveStatus === 'saving' ? (
                        <><span className="material-symbols-outlined animate-spin">progress_activity</span> Saving...</>
                      ) : saveStatus === 'saved' ? (
                        <><span className="material-symbols-outlined">check_circle</span> Saved!</>
                      ) : (
                        <><span className="material-symbols-outlined">save</span> Save Product</>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setEditingProduct(null);
                        setEditingImages([]);
                        setSaveStatus('idle');
                      }}
                      className="flex-1 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Delete product (only for existing) */}
                  {!editingProduct.isNew && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${editingProduct.name}"? This cannot be undone.`)) {
                          const updatedProducts = products.filter(p => p.id !== editingProduct.id);
                          setProducts(updatedProducts);
                          saveProducts(updatedProducts);
                          onProductsChange?.(updatedProducts);
                          setSelectedProduct(null);
                          setEditingProduct(null);
                          setEditingImages([]);
                          setSaveStatus('idle');
                        }
                      }}
                      className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">delete_forever</span>
                      Delete Product
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Products List View */
            <div className="space-y-4">
              {/* Add New Product */}
              <button
                onClick={() => {
                  const newProduct: Product = {
                    id: `product-${Date.now()}`,
                    series: 'ZUAERA',
                    name: '',
                    navLabel: 'Unisex',
                    tags: [],
                    description: '',
                    tagline: '',
                    highlights: [
                      { label: 'Duration', value: '8+ Hours', icon: 'timer' },
                      { label: 'Volume', value: '30ML', icon: 'science' },
                    ],
                    ingredients: [],
                    price: 999,
                    image: '[]',
                    volume: '30ML',
                    glowColor: 'rgba(100, 255, 218, 0.2)',
                    targetAudience: 'All',
                  };
                  setSelectedProduct(newProduct);
                  setEditingProduct({ ...newProduct, isNew: true });
                  setEditingImages([]);
                  setSaveStatus('idle');
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary/15 hover:bg-primary/25 border border-primary/40 text-primary rounded-xl px-6 py-4 font-semibold transition-colors"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Add New Product
              </button>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {products.map((product) => {
                  let thumb = product.image;
                  try {
                    const parsed = JSON.parse(product.image);
                    if (Array.isArray(parsed) && parsed.length > 0) thumb = parsed[0];
                  } catch {}
                  return (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setEditingProduct({ ...product, isNew: false });
                        try {
                          const parsed = JSON.parse(product.image);
                          setEditingImages(Array.isArray(parsed) ? parsed : [product.image]);
                        } catch {
                          setEditingImages([product.image]);
                        }
                        setSaveStatus('idle');
                      }}
                      className="bg-white/5 border border-white/10 hover:border-primary/30 rounded-xl overflow-hidden transition-all text-left"
                    >
                      <div className="aspect-square bg-black/50 flex items-center justify-center overflow-hidden">
                        {thumb && !thumb.startsWith('[') ? (
                          <img src={thumb} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-white/20 text-4xl">image</span>
                        )}
                      </div>
                      <div className="p-2">
                        <h3 className="font-bold text-white text-xs mb-0.5 truncate">{product.name || 'Untitled'}</h3>
                        <p className="text-primary font-semibold text-xs">₹{product.price}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
