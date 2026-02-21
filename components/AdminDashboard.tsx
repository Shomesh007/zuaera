import React, { useState, useRef } from 'react';
import { OrderDetails } from './CheckoutForm';
import { Product } from '../App';
import { loadProducts, saveProducts, resetProducts, DEFAULT_PRODUCTS } from './productStore';

interface AdminDashboardProps {
  orders: OrderDetails[];
  onLogout: () => void;
  onProductsChange?: (products: Product[]) => void;
}

// ─── Utility ─────────────────────────────────────────────────────────────────
function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function emptyProduct(): Product {
  return {
    id: generateId(),
    series: '',
    name: '',
    navLabel: '',
    tags: [],
    description: '',
    tagline: '',
    highlights: [
      { label: '', value: '', icon: 'star' },
      { label: '', value: '', icon: 'star' },
    ],
    price: 999,
    volume: '30ML',
    image: '',
    glowColor: 'rgba(242,208,13,0.3)',
    ingredients: [],
  };
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
const OrdersTab: React.FC<{ orders: OrderDetails[] }> = ({ orders }) => {
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
    .sort((a, b) => sortBy === 'newest' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp);

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
    };
    return map[s] || 'bg-white/10 text-white/60 border-white/20';
  };
  const statusIcon = (s: string) => {
    const map: Record<string, string> = { pending: 'schedule', confirmed: 'check_circle', shipped: 'local_shipping', delivered: 'task_alt' };
    return map[s] || 'help';
  };

  if (selectedOrder) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-[#f2d00d] hover:text-yellow-300 transition-colors">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <span>Back to Orders</span>
        </button>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#f2d00d]/10 to-white/5 border-b border-white/10 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedOrder.id}</h2>
                <p className="text-white/60">{new Date(selectedOrder.timestamp).toLocaleString('en-IN')}</p>
              </div>
              <span className={`px-4 py-2 rounded-lg border flex items-center gap-2 font-semibold text-sm ${statusColor(selectedOrder.status)}`}>
                <span className="material-symbols-outlined text-base">{statusIcon(selectedOrder.status)}</span>
                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="p-6 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2d00d]">mail</span>Contact Information
              </h3>
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <p className="text-white/60 text-sm">Email</p>
                <p className="text-white font-medium">{selectedOrder.contact.email}</p>
                {selectedOrder.contact.subscribeNews && (
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-[#f2d00d] text-sm">✓ Subscribed to news and offers</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2d00d]">location_on</span>Delivery Address
              </h3>
              <div className="bg-white/5 rounded-lg p-4 space-y-1 text-white/80">
                <p className="font-medium text-white">{selectedOrder.delivery.firstName} {selectedOrder.delivery.lastName}</p>
                <p>{selectedOrder.delivery.address}</p>
                {selectedOrder.delivery.apartment && <p>{selectedOrder.delivery.apartment}</p>}
                <p>{selectedOrder.delivery.city}, {selectedOrder.delivery.state}</p>
                <p>{selectedOrder.delivery.pinCode}</p>
                {selectedOrder.delivery.country && <p>{selectedOrder.delivery.country}</p>}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2d00d]">shopping_bag</span>Order Items
              </h3>
              <div className="space-y-2">
                {selectedOrder.items.map(item => (
                  <div key={item.cartItemId} className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
                    {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />}
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-white/60 text-sm">{item.series} - {item.volume}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">×{item.quantity}</p>
                      <p className="text-[#f2d00d] text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex justify-between items-center">
              <span className="text-white/60 text-lg">Order Total</span>
              <span className="text-3xl font-bold text-[#f2d00d]">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50">
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Sort</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40">search</span>
          <input type="text" placeholder="Search by ID, email, or name..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50 text-sm" />
        </div>
      </div>

      <div className="text-white/60 text-sm">Showing {filteredOrders.length} of {orders.length} orders</div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-3">
          {filteredOrders.map(order => (
            <button key={order.id} onClick={() => setSelectedOrder(order)}
              className="w-full bg-white/5 border border-white/10 hover:border-[#f2d00d]/30 hover:bg-white/10 rounded-xl p-4 transition-all text-left">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white">{order.id}</h3>
                  <p className="text-white/60 text-sm">{new Date(order.timestamp).toLocaleString('en-IN')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 whitespace-nowrap ${statusColor(order.status)}`}>
                  <span className="material-symbols-outlined text-sm">{statusIcon(order.status)}</span>
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Customer</p>
                  <p className="text-white font-medium">{order.delivery.firstName} {order.delivery.lastName}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60">Total</p>
                  <p className="text-[#f2d00d] font-bold">₹{order.total.toLocaleString('en-IN')}</p>
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
  );
};

// ─── Product Editor Modal ─────────────────────────────────────────────────────
interface ProductEditorProps {
  product: Product;
  onSave: (p: Product) => void;
  onClose: () => void;
  isNew?: boolean;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onClose, isNew }) => {
  const [form, setForm] = useState<Product>({ ...product, highlights: [...product.highlights], ingredients: product.ingredients.map(i => ({ ...i })) });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [newIngredientUrl, setNewIngredientUrl] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>(() => {
    // Parse multi-image string if stored as JSON array, else single-image
    try {
      const arr = JSON.parse(product.image);
      if (Array.isArray(arr)) return arr;
    } catch { }
    return product.image ? [product.image] : [];
  });
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Save images as JSON array string in product.image
  const syncImages = (imgs: string[]) => {
    setPreviewImages(imgs);
    setForm(prev => ({ ...prev, image: imgs.length === 1 ? imgs[0] : JSON.stringify(imgs) }));
  };

  const addImageUrl = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    syncImages([...previewImages, url]);
    setNewImageUrl('');
  };

  const removeImage = (idx: number) => {
    const updated = previewImages.filter((_, i) => i !== idx);
    syncImages(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = ev => {
        const dataUrl = ev.target?.result as string;
        syncImages([...previewImages, dataUrl]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    const updated: Product = {
      ...form,
      navLabel: form.navLabel || `${form.series} ${form.name}`,
    };
    onSave(updated);
  };

  const field = (label: string, key: keyof Product, type: 'text' | 'number' | 'textarea' = 'text') => (
    <div>
      <label className="block text-xs font-semibold text-white/60 uppercase mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={String(form[key] ?? '')}
          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50 resize-none"
        />
      ) : (
        <input
          type={type}
          value={String(form[key] ?? '')}
          onChange={e => setForm(prev => ({ ...prev, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50"
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 overflow-y-auto">
      <div className="relative bg-[#0d0d0d] border border-white/10 rounded-t-2xl md:rounded-2xl w-full md:max-w-2xl max-h-[95dvh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[#0d0d0d] border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f2d00d]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#f2d00d] text-sm">{isNew ? 'add' : 'edit'}</span>
            </div>
            <h2 className="text-lg font-bold text-white">{isNew ? 'New Product' : `Edit — ${product.name}`}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-5 space-y-6 pb-8">
          {/* Basic Info */}
          <section>
            <h3 className="text-xs font-bold text-[#f2d00d] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span>Basic Info
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {field('Name', 'name')}
                {field('Series / Number', 'series')}
              </div>
              {field('Nav Label (e.g. 01 Crisp)', 'navLabel')}
              {field('Tagline', 'tagline')}
              {field('Description', 'description', 'textarea')}
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h3 className="text-xs font-bold text-[#f2d00d] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">payments</span>Pricing
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase mb-1">Price (₹)</label>
                <input type="number" value={form.price}
                  onChange={e => setForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase mb-1">Volume</label>
                <select value={form.volume} onChange={e => setForm(prev => ({ ...prev, volume: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50">
                  <option value="30ML">30ML</option>
                  <option value="50ML">50ML</option>
                  <option value="100ML">100ML</option>
                </select>
              </div>
            </div>
          </section>

          {/* Images */}
          <section>
            <h3 className="text-xs font-bold text-[#f2d00d] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">image</span>Images
              <span className="text-white/30 text-xs font-normal normal-case">({previewImages.length} added)</span>
            </h3>

            {/* Current Images */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {previewImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-black border border-white/10 group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <div className="absolute top-1 left-1 bg-[#f2d00d] text-black text-[9px] font-bold px-1.5 py-0.5 rounded">MAIN</div>
                    )}
                    <button onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-sm">close</span>
                    </button>
                    {idx !== 0 && (
                      <button onClick={() => { const imgs = [...previewImages];[imgs[0], imgs[idx]] = [imgs[idx], imgs[0]]; syncImages(imgs); }}
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] bg-black/70 text-white/70 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Set main
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add URL */}
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="Paste image URL..." value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addImageUrl()}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
              <button onClick={addImageUrl}
                className="px-3 py-2 bg-[#f2d00d]/20 text-[#f2d00d] rounded-lg hover:bg-[#f2d00d]/30 transition-colors text-sm font-semibold">
                Add
              </button>
            </div>

            {/* Upload from device */}
            <button onClick={() => imageInputRef.current?.click()}
              className="w-full py-2.5 border border-dashed border-white/20 rounded-lg text-white/50 hover:text-white hover:border-[#f2d00d]/40 transition-colors text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">upload</span>
              Upload from device
            </button>
            <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
          </section>

          {/* Tags */}
          <section>
            <h3 className="text-xs font-bold text-[#f2d00d] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">label</span>Tags
            </h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tags.map((tag, idx) => (
                <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 text-xs">
                  {tag}
                  <button onClick={() => setForm(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== idx) }))}
                    className="text-white/40 hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Add tag..." value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && newTag.trim()) { setForm(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] })); setNewTag(''); } }}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
              <button onClick={() => { if (newTag.trim()) { setForm(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] })); setNewTag(''); } }}
                className="px-3 py-2 bg-[#f2d00d]/20 text-[#f2d00d] rounded-lg hover:bg-[#f2d00d]/30 transition-colors text-sm font-semibold">
                Add
              </button>
            </div>
          </section>

          {/* Highlights */}
          <section>
            <h3 className="text-xs font-bold text-[#f2d00d] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">star</span>Highlights (2)
            </h3>
            <div className="space-y-3">
              {[0, 1].map(i => (
                <div key={i} className="bg-white/5 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-white/40">Highlight {i + 1}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Label (e.g. Family)" value={form.highlights[i].label}
                      onChange={e => setForm(prev => {
                        const h = [...prev.highlights] as Product['highlights'];
                        h[i] = { ...h[i], label: e.target.value };
                        return { ...prev, highlights: h };
                      })}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
                    <input type="text" placeholder="Value (e.g. Citrus Green)" value={form.highlights[i].value}
                      onChange={e => setForm(prev => {
                        const h = [...prev.highlights] as Product['highlights'];
                        h[i] = { ...h[i], value: e.target.value };
                        return { ...prev, highlights: h };
                      })}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
                  </div>
                  <input type="text" placeholder="Icon name (material icon, e.g. eco)" value={form.highlights[i].icon}
                    onChange={e => setForm(prev => {
                      const h = [...prev.highlights] as Product['highlights'];
                      h[i] = { ...h[i], icon: e.target.value };
                      return { ...prev, highlights: h };
                    })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
                </div>
              ))}
            </div>
          </section>

          {/* Fragrance Notes / Ingredients */}
          <section>
            <h3 className="text-xs font-bold text-[#f2d00d] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">science</span>Fragrance Notes
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.ingredients.map((ing, idx) => (
                <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 text-xs">
                  {ing.name}
                  <button onClick={() => setForm(prev => ({ ...prev, ingredients: prev.ingredients.filter((_, i) => i !== idx) }))}
                    className="text-white/40 hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" placeholder="Ingredient name" value={newIngredient}
                onChange={e => setNewIngredient(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && newIngredient.trim()) { setForm(prev => ({ ...prev, ingredients: [...prev.ingredients, { name: newIngredient.trim(), url: newIngredientUrl.trim() }] })); setNewIngredient(''); setNewIngredientUrl(''); } }}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
              <input type="text" placeholder="Image URL (optional)" value={newIngredientUrl}
                onChange={e => setNewIngredientUrl(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
            </div>
            <button onClick={() => { if (newIngredient.trim()) { setForm(prev => ({ ...prev, ingredients: [...prev.ingredients, { name: newIngredient.trim(), url: newIngredientUrl.trim() }] })); setNewIngredient(''); setNewIngredientUrl(''); } }}
              className="w-full py-2 bg-white/5 border border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-[#f2d00d]/40 transition-colors text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>Add Ingredient
            </button>
          </section>

          {/* Glow Color */}
          <section>
            <h3 className="text-xs font-bold text-[#f2d00d] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">palette</span>Glow Color
            </h3>
            <input type="text" placeholder="e.g. rgba(100, 255, 218, 0.2)" value={form.glowColor}
              onChange={e => setForm(prev => ({ ...prev, glowColor: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2d00d]/50" />
            <div className="mt-2 h-6 rounded-md" style={{ background: form.glowColor, border: '1px solid rgba(255,255,255,0.1)' }} />
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0d0d0d] border-t border-white/10 p-4 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 bg-white/5 text-white/70 rounded-xl hover:bg-white/10 transition-colors font-medium">
            Cancel
          </button>
          <button onClick={handleSave}
            disabled={!form.name.trim()}
            className="flex-1 py-3 bg-[#f2d00d] text-black font-bold rounded-xl hover:bg-yellow-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">save</span>
            {isNew ? 'Create Product' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Products Tab ─────────────────────────────────────────────────────────────
const ProductsTab: React.FC<{ onProductsChange?: (p: Product[]) => void }> = ({ onProductsChange }) => {
  const [products, setProducts] = useState<Product[]>(() => loadProducts());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const notify = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const updateAndSave = (updated: Product[]) => {
    setProducts(updated);
    saveProducts(updated);
    onProductsChange?.(updated);
  };

  const handleSave = (p: Product) => {
    let updated: Product[];
    if (isNew) {
      updated = [...products, p];
      notify(`"${p.name}" created!`);
    } else {
      updated = products.map(x => x.id === p.id ? p : x);
      notify(`"${p.name}" updated!`);
    }
    updateAndSave(updated);
    setEditingProduct(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    updateAndSave(updated);
    setDeleteConfirm(null);
    notify('Product deleted.');
  };

  const handleReset = () => {
    resetProducts();
    const fresh = loadProducts();
    setProducts(fresh);
    onProductsChange?.(fresh);
    notify('Products reset to defaults.');
  };

  const getMainImage = (product: Product) => {
    try {
      const arr = JSON.parse(product.image);
      if (Array.isArray(arr) && arr.length > 0) return arr[0];
    } catch { }
    return product.image;
  };

  return (
    <div className="space-y-4">
      {/* Success toast */}
      {successMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500/90 text-white px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-xl backdrop-blur-sm animate-fade-in">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {successMsg}
        </div>
      )}

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <p className="text-white/60 text-sm">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        <div className="flex gap-2">
          <button onClick={handleReset}
            className="px-3 py-2 text-xs bg-white/5 text-white/50 rounded-lg hover:bg-white/10 hover:text-white/80 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">restart_alt</span>Reset
          </button>
          <button onClick={() => { setEditingProduct(emptyProduct()); setIsNew(true); }}
            className="px-4 py-2 bg-[#f2d00d] text-black text-sm font-bold rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">add</span>New Product
          </button>
        </div>
      </div>

      {/* Product Cards */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-white/20 block mb-3">inventory_2</span>
          <p className="text-white/50 mb-4">No products yet</p>
          <button onClick={() => { setEditingProduct(emptyProduct()); setIsNew(true); }}
            className="px-5 py-2.5 bg-[#f2d00d] text-black font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm">
            Add First Product
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map(product => (
            <div key={product.id} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition-colors">
              <div className="flex items-center gap-4 p-4">
                {/* Product Image */}
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-black border border-white/10">
                  {getMainImage(product) ? (
                    <img src={getMainImage(product)} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/20">image</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold truncate">{product.name || 'Untitled'}</h3>
                    <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0">#{product.series}</span>
                  </div>
                  <p className="text-[#f2d00d] font-semibold text-sm">₹{product.price.toLocaleString('en-IN')}</p>
                  <p className="text-white/40 text-xs truncate mt-0.5">{product.tagline || product.description}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => { setEditingProduct(product); setIsNew(false); }}
                    className="w-9 h-9 bg-white/5 hover:bg-[#f2d00d]/10 rounded-lg flex items-center justify-center transition-colors group">
                    <span className="material-symbols-outlined text-white/50 group-hover:text-[#f2d00d] text-sm">edit</span>
                  </button>
                  <button onClick={() => setDeleteConfirm(product.id)}
                    className="w-9 h-9 bg-white/5 hover:bg-red-500/10 rounded-lg flex items-center justify-center transition-colors group">
                    <span className="material-symbols-outlined text-white/50 group-hover:text-red-400 text-sm">delete</span>
                  </button>
                </div>
              </div>

              {/* Tags preview */}
              {product.tags.length > 0 && (
                <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                  {product.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/5 text-white/50 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                  {product.tags.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 text-white/30">+{product.tags.length - 4} more</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-red-500/20 rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-400">warning</span>
              </div>
              <div>
                <h3 className="text-white font-bold">Delete Product?</h3>
                <p className="text-white/50 text-sm">This cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 bg-white/5 text-white/70 rounded-xl hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-400 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Product Editor Modal */}
      {editingProduct && (
        <ProductEditor
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setEditingProduct(null); setIsNew(false); }}
          isNew={isNew}
        />
      )}
    </div>
  );
};

// ─── Main AdminDashboard ───────────────────────────────────────────────────────
type Tab = 'orders' | 'products';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onLogout, onProductsChange }) => {
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'orders', label: 'Orders', icon: 'shopping_bag', count: orders.length },
    { id: 'products', label: 'Products', icon: 'inventory_2' },
  ];

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#0a0905] to-black">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-[#0a0905]/90 backdrop-blur-xl border-b border-white/5">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f2d00d]/20 flex items-center justify-center border border-[#f2d00d]/30">
              <span className="material-symbols-outlined text-[#f2d00d] text-sm">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">ZUAERA Admin</h1>
              <p className="text-white/40 text-xs">Content Management</p>
            </div>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm">
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-white/5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all relative ${activeTab === tab.id
                ? 'text-[#f2d00d]'
                : 'text-white/40 hover:text-white/70'
                }`}
            >
              <span className="material-symbols-outlined text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.id ? 'bg-[#f2d00d]/20 text-[#f2d00d]' : 'bg-white/10 text-white/40'
                  }`}>{tab.count}</span>
              )}
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#f2d00d] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-5 pb-24">
        {activeTab === 'orders' && <OrdersTab orders={orders} />}
        {activeTab === 'products' && <ProductsTab onProductsChange={onProductsChange} />}
      </div>
    </div>
  );
};
