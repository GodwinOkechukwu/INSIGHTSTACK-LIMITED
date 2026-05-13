"use client";
import React, { useMemo, useTransition } from "react";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useCart } from "react-use-cart";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import Picture from "../picture/Picture";
import { filterCustomersByEmail } from "@constants";
import useToken from "../hooks/useToken";
import { toast } from "react-toastify";
import { useCustomer } from "../lib/woocommerce";
import { useRouter } from "next/navigation";

interface ProductTableProps {
  onClose: () => void;
}

const ProductTable = ({ onClose }: ProductTableProps) => {
  const router = useRouter();
  const { email } = useToken();
  const { data: customer } = useCustomer("");
  const { items, updateItem, removeItem, emptyCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const wc_customer_info = useMemo(
    () => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
    [customer, email],
  );

  const handleCheckoutOpen = () => {
    if (wc_customer_info?.first_name) {
      startTransition(() => {
        router.push("/checkout");
      });
    } else {
      toast.warn("Please log in to proceed to checkout.");
      startTransition(() => {
        router.push("/user/login");
      });
      onClose();
    }
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item?.price * item?.quantity!,
    0,
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#F9FAFB]">
      {/* 1. ELEGANT HEADER */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Your Bag
            </h2>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-0.5">
              {items.length} {items.length === 1 ? "Product" : "Products"}
            </p>
          </div>
          {/* <button
						onClick={onClose}
						className='p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-black'
					>
						<IoCloseOutline size={28} />
					</button> */}
        </div>
      </div>

      {/* 2. CART ITEMS */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {items.length <= 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FiShoppingBag className="text-3xl text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Empty Bag</h3>
            <p className="text-sm text-gray-500 max-w-[200px] mt-2">
              Looks like you haven&apos;t added any hardware yet.
            </p>
            <button
              onClick={onClose}
              className="mt-8 text-sm font-bold text-primary-100 underline underline-offset-4"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          items.map((product: any) => (
            <div
              key={product.id}
              className="flex gap-5 pb-6 border-b border-gray-100 last:border-0"
            >
              {/* Product Image */}
              <div className="w-24 h-24 bg-white rounded-2xl p-2 flex-shrink-0 border border-gray-50 shadow-sm">
                <Picture
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 uppercase tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs font-bold text-primary-100">
                      <FormatMoney2 value={product.price} />
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Modern Pill Quantity Selector */}
                  <div className="flex items-center bg-white border border-gray-200 rounded-full px-1 py-1 shadow-sm">
                    <button
                      onClick={() =>
                        updateItem(product.id, {
                          quantity: product.quantity - 1,
                        })
                      }
                      disabled={product.quantity <= 1}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-gray-900">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateItem(product.id, {
                          quantity: product.quantity + 1,
                        })
                      }
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <p className="text-sm font-black text-gray-900">
                    <FormatMoney2 value={product.price * product.quantity} />
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 3. PREMIUM SUMMARY FOOTER */}
      {items.length > 0 && (
        <div className="bg-white border-t border-gray-100 p-8 pt-6 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-gray-900 font-bold">
                <FormatMoney2 value={totalAmount} />
              </span>
            </div>

            <div className="pt-4 flex justify-between items-end">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                Total Amount
              </span>
              <div className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
                <FormatMoney2 value={totalAmount} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleCheckoutOpen}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={emptyCart}
              className="w-full py-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
            >
              Clear Bag
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors"
          >
            <FiArrowLeft /> Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
