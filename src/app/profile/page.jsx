'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUser, FaShoppingBag, FaMapMarkerAlt, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/components/auth/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function ProfilePage() {
  const { user, loading, isAuthenticated, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  // Form states
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  });
  
  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [updating, setUpdating] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login?redirect=profile');
    }
  }, [loading, isAuthenticated, router]);

  // Set initial form data when user is loaded
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
      });
      
      if (user.shippingAddress) {
        setShippingData({
          fullName: user.shippingAddress.fullName || '',
          address: user.shippingAddress.address || '',
          city: user.shippingAddress.city || '',
          postalCode: user.shippingAddress.postalCode || '',
          country: user.shippingAddress.country || '',
        });
      }
    }
  }, [user]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (isAuthenticated) {
        try {
          setLoadingOrders(true);
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/api/orders/my-orders', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
          toast.error('Failed to load your orders');
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [isAuthenticated, activeTab]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const result = await updateProfile(profileData);
      
      if (result.success) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating your profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleShippingUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const result = await updateProfile({ shippingAddress: shippingData });
      
      if (result.success) {
        toast.success('Shipping address updated successfully');
      } else {
        toast.error(result.message || 'Failed to update shipping address');
      }
    } catch (error) {
      toast.error('An error occurred while updating your shipping address');
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setUpdating(true);
    
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put('/api/auth/update-password', 
        { 
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (data.success) {
        toast.success('Password updated successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        toast.error(data.message || 'Failed to update password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while updating your password');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night-900">
        <span className="loader h-10 w-10" />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', Icon: FaUser },
    { id: 'orders', label: 'Orders', Icon: FaShoppingBag },
    { id: 'shipping', label: 'Shipping address', Icon: FaMapMarkerAlt },
    { id: 'password', label: 'Change password', Icon: FaLock },
  ];

  return (
    <div className="min-h-screen bg-night-900">
      <div className="wrap max-w-6xl py-10 sm:py-14">
        <p className="tag mb-4">account</p>
        <h1 className="h-display mb-8 text-3xl sm:text-4xl">My account</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="cell p-3">
                <div className="flex flex-col space-y-1">
                  {tabs.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center border px-3 py-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                        activeTab === id
                          ? 'border-volt bg-volt text-volt-ink'
                          : 'border-transparent text-bone-muted hover:border-line hover:text-bone'
                      }`}
                    >
                      <Icon className="mr-3" /> {label}
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center border border-transparent px-3 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-bone-muted transition-colors hover:border-signal hover:text-signal"
                  >
                    <FaSignOutAlt className="mr-3" /> Logout
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="cell p-6 sm:p-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="mb-6 font-display text-xl font-bold text-bone">Profile Information</h2>
                    
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="field-label">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="field"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="field-label">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="field"
                          required
                        />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={updating}
                        className="btn-volt disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updating ? (
                          <div className="flex items-center justify-center">
                            <span className="loader mr-2 h-4 w-4" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          'Update Profile'
                        )}
                      </motion.button>
                    </form>
                  </div>
                )}
                
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="mb-6 font-display text-xl font-bold text-bone">Order History</h2>
                    
                    {loadingOrders ? (
                      <div className="flex justify-center py-8">
                        <span className="loader h-10 w-10" />
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order._id} className="border border-line bg-night-800 p-4">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <p className="field-label mb-1">Order ID</p>
                                <p className="font-mono text-xs text-bone">{order._id}</p>
                              </div>
                              <div>
                                <p className="field-label mb-1">Date</p>
                                <p className="text-sm text-bone">{new Date(order.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="field-label mb-1">Total</p>
                                <p className="font-mono text-sm font-bold text-volt">${order.totalPrice.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="field-label mb-1">Status</p>
                                <span className={`inline-block px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${
                                  order.isPaid 
                                    ? 'bg-volt/15 text-volt' 
                                    : 'bg-signal/15 text-signal'
                                }`}>
                                  {order.isPaid ? 'Paid' : 'Pending'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="border-t border-line pt-4">
                              <p className="field-label mb-2">Items</p>
                              <div className="space-y-2">
                                {order.orderItems.map((item) => (
                                  <div key={item._id} className="flex justify-between">
                                    <div className="flex items-center">
                                      <span className="text-sm text-bone">{item.name}</span>
                                      {item.variant && (
                                        <span className="ml-2 text-xs text-bone-faint">({item.variant.quantity}g)</span>
                                      )}
                                      <span className="mx-2 text-bone-faint">&times;</span>
                                      <span className="text-sm text-bone">{item.quantity}</span>
                                    </div>
                                    <span className="font-mono text-sm text-bone">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <Link 
                                href={`/orders/${order._id}`}
                                className="font-mono text-[11px] uppercase tracking-[0.14em] text-volt transition-colors hover:text-bone"
                              >
                                View order details
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="mb-4 text-bone-muted">You haven&apos;t placed any orders yet.</p>
                        <Link href="/products" className="btn-volt">
                          Browse products
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Shipping Address Tab */}
                {activeTab === 'shipping' && (
                  <div>
                    <h2 className="mb-6 font-display text-xl font-bold text-bone">Shipping Address</h2>
                    
                    <form onSubmit={handleShippingUpdate} className="space-y-6">
                      <div>
                        <label htmlFor="fullName" className="field-label">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={shippingData.fullName}
                          onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
                          className="field"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="field-label">
                          Street Address
                        </label>
                        <input
                          id="address"
                          type="text"
                          value={shippingData.address}
                          onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                          className="field"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="city" className="field-label">
                            City
                          </label>
                          <input
                            id="city"
                            type="text"
                            value={shippingData.city}
                            onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                            className="field"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="field-label">
                            Postal Code
                          </label>
                          <input
                            id="postalCode"
                            type="text"
                            value={shippingData.postalCode}
                            onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                            className="field"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="field-label">
                          Country
                        </label>
                        <input
                          id="country"
                          type="text"
                          value={shippingData.country}
                          onChange={(e) => setShippingData({...shippingData, country: e.target.value})}
                          className="field"
                          required
                        />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={updating}
                        className="btn-volt disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updating ? (
                          <div className="flex items-center justify-center">
                            <span className="loader mr-2 h-4 w-4" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          'Update Shipping Address'
                        )}
                      </motion.button>
                    </form>
                  </div>
                )}
                
                {/* Change Password Tab */}
                {activeTab === 'password' && (
                  <div>
                    <h2 className="mb-6 font-display text-xl font-bold text-bone">Change Password</h2>
                    
                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                      <div>
                        <label htmlFor="currentPassword" className="field-label">
                          Current Password
                        </label>
                        <input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="field"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="field-label">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="field"
                          required
                          minLength={6}
                        />
                        <p className="mt-1 text-xs text-bone-faint">
                          Must be at least 6 characters
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="field-label">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="field"
                          required
                        />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={updating}
                        className="btn-volt disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updating ? (
                          <div className="flex items-center justify-center">
                            <span className="loader mr-2 h-4 w-4" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          'Change Password'
                        )}
                      </motion.button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
