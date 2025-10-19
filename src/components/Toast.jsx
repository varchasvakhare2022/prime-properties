/**
 * Toast Notification Component
 * Displays toast messages for form submissions and user actions
 * Uses framer-motion for smooth animations
 */

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
};

const toastColors = {
  success: 'from-green-500 to-emerald-500',
  error: 'from-red-500 to-rose-500',
  info: 'from-primary to-secondary',
  warning: 'from-yellow-500 to-orange-500',
};

const toastBorders = {
  success: 'border-green-500/50',
  error: 'border-red-500/50',
  info: 'border-primary/50',
  warning: 'border-yellow-500/50',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = toastIcons[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="pointer-events-auto"
              >
                <div className={`backdrop-blur-xl bg-dark-surface/90 border ${toastBorders[toast.type]} rounded-xl p-4 shadow-2xl min-w-[300px] max-w-md`}>
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${toastColors[toast.type]} opacity-10 rounded-xl`} />
                  
                  <div className="relative flex items-start gap-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${toastColors[toast.type]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Message */}
                    <div className="flex-1 pt-1">
                      <p className="text-white text-sm font-medium leading-relaxed">
                        {toast.message}
                      </p>
                    </div>
                    
                    {/* Close button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeToast(toast.id)}
                      className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

