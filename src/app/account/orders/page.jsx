'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { FaBox, FaClipboardList, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/account/orders');
      return;
    }

    // Fetch orders if authenticated
    const fetchOrders = async () => {
      try {
        setPageLoading(true);
        
        // For demo purposes, we'll create mock orders
        // In a real app, you would fetch orders from your API
        const mockOrders = [
          {
            _id: '682009d162cd32c2443bb6e9',
            orderNumber: 'ORD-123456',
            totalPrice: 79.99,
            status: 'processing',
            createdAt: new Date().toISOString(),
            items: [
              { name: 'Product 1', quantity: 2, price: 29.99 },
              { name: 'Product 2', quantity: 1, price: 19.99 }
            ]
          },
          {
            _id: '682009d162cd32c2443bb6e8',
            orderNumber: 'ORD-123455',
            totalPrice: 129.99,
            status: 'shipped',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            items: [
              { name: 'Product 3', quantity: 1, price: 99.99 },
              { name: 'Product 4', quantity: 2, price: 14.99 }
            ]
          }
        ];
        
        setOrders(mockOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setPageLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, loading, router]);

  if (loading || pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night-900">
        <span className="loader h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night-900 pb-20">
      <div className="wrap max-w-4xl py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-volt">Home</Link>
          <span>/</span>
          <Link href="/profile" className="transition-colors hover:text-volt">Account</Link>
          <span>/</span>
          <span className="text-bone-muted">My Orders</span>
        </nav>

        <p className="tag mb-4">account.orders</p>
        <h1 className="h-display mb-8 text-3xl sm:text-4xl">My orders</h1>

        {error ? (
          <div className="flex items-center gap-3 border border-signal/40 bg-signal/10 p-4 text-sm text-bone">
            <FaExclamationTriangle className="flex-shrink-0 text-signal" />
            <p>{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="cell p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-volt/40 bg-volt/10">
              <FaClipboardList className="text-xl text-volt" />
            </div>
            <h2 className="h-display mb-2 text-lg">No orders yet</h2>
            <p className="mb-6 text-sm text-bone-muted">You haven&apos;t placed any orders yet.</p>
            <Link href="/products" className="btn-volt">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="cell overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-line bg-night-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="field-label mb-0.5">Order</p>
                    <p className="font-mono text-sm font-semibold text-bone">{order.orderNumber}</p>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    <div>
                      <p className="field-label mb-0.5">Date</p>
                      <p className="text-sm text-bone">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="field-label mb-0.5">Total</p>
                      <p className="font-mono text-sm font-bold text-volt">&euro;{order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="field-label mb-0.5">Status</p>
                      <p className={`font-mono text-sm font-bold uppercase tracking-[0.08em] ${
                        order.status === 'delivered' ? 'text-volt' :
                        order.status === 'shipped' ? 'text-bone' :
                        order.status === 'processing' ? 'text-signal' :
                        order.status === 'cancelled' ? 'text-bone-faint line-through' :
                        'text-bone-muted'
                      }`}>{order.status}</p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <p className="field-label mb-3">Items</p>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-line bg-night-800">
                            <FaBox className="text-xs text-bone-muted" />
                          </div>
                          <div>
                            <p className="text-sm text-bone">{item.name}</p>
                            <p className="text-xs text-bone-faint">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-mono text-sm text-bone">&euro;{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end border-t border-line px-5 py-3">
                  <Link href={`/account/orders/${order._id}`}
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-volt transition-colors hover:text-bone">
                    View details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
