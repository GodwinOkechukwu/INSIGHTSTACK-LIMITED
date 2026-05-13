"use client";
import React, {
  useMemo,
  useState,
  useTransition,
  Fragment,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useCustomer } from "../lib/woocommerce";
import { currencyOptions, filterCustomersByEmail } from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";
import { logoImage } from "@public/images";
import { CircleUser } from "lucide-react";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import HomePageBottomHeader from "./HomePageBottomHeader";
import { FaCartArrowDown } from "@node_modules/react-icons/fa";
import { BiUser } from "@node_modules/react-icons/bi";
import { ImSpinner2 } from "@node_modules/react-icons/im";

/* ─────────────────────────────────────────────
   CART PANEL
   • Desktop (md+) → centred modal
   • Mobile        → bottom sheet drawer
───────────────────────────────────────────── */
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanelHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
        <FiShoppingCart className="w-4 h-4 text-white" />
      </div>
      <div>
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          Your Cart
        </h2>
        <p className="text-[11px] text-slate-400 font-medium">
          Review your items before checkout
        </p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 active:scale-90"
      aria-label="Close cart"
    >
      <FiX className="w-4 h-4" />
    </button>
  </div>
);

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  /* hydration guard */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* scroll-lock + delayed unmount */
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const t = setTimeout(() => setVisible(false), 350);
      document.body.style.overflow = "";
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!mounted || !visible) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm transition-opacity duration-350 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile — bottom sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
					md:hidden
					fixed bottom-0 left-0 right-0 z-[999]
					flex flex-col bg-white
					rounded-t-3xl
					shadow-[0_-8px_40px_rgba(0,0,0,0.18)]
					max-h-[90dvh]
					transition-transform duration-350 ease-[cubic-bezier(.32,.72,0,1)]
					${isOpen ? "translate-y-0" : "translate-y-full"}
				`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>
        {/* Accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-slate-800 via-primary-100 to-slate-800 flex-shrink-0" />
        <CartPanelHeader onClose={onClose} />
        <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
          <ProductTable onClose={onClose} />
        </div>
      </div>

      {/* Desktop — centred modal */}
      <div className="hidden md:flex fixed inset-0 z-[999] items-center justify-center p-6 pointer-events-none">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
						pointer-events-auto
						relative w-full max-w-2xl max-h-[88vh]
						flex flex-col bg-white
						rounded-3xl
						shadow-[0_32px_80px_rgba(0,0,0,0.24)]
						overflow-hidden
						transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.2)]
						${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }
					`}
        >
          {/* Accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-slate-800 via-primary-100 to-slate-800 flex-shrink-0" />
          <CartPanelHeader onClose={onClose} />
          <div className="flex-1 overflow-y-auto min-h-0">
            <ProductTable onClose={onClose} />
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useToken();
  const { totalItems } = useCart();

  const { baseCurrency } = useAppSelector((state) => state.currency);
  const [isPending, startTransition] = useTransition();
  const [showSearch, setShowSearch] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data: customer } = useCustomer("");
  const wc_customer_info = useMemo(
    () => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
    [customer, email],
  );

  const onOpenCart = useCallback(() => setIsCartOpen(true), []);
  const onCloseCart = useCallback(() => setIsCartOpen(false), []);

  const handleCurrencyChange = async (code: string) => {
    const selectedObj = currencyOptions.find((c) => c.code === code);
    if (!selectedObj) return;

    try {
      const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
      if (data) {
        dispatch(setExchangeRate(data));
        dispatch(setBaseCurrency(selectedObj));
        FormToast({ message: `Switched to ${code}`, success: true });
      }
    } catch (error) {
      FormToast({ message: "Currency switch failed", success: false });
    }
  };

  const handleSearch = () => {
    if (!searchValue) return;

    startTransition(() => {
      router.push(`/search?${searchValue}`);
    });
  };

  const userDropDownLinks = [
    {
      id: 1,
      href: "/user/dashboard",
      icon: <BiUser />,
      label: "My Account",
    },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown />,
      label: "Orders",
    },
    { id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
  ];

  return (
    <>
      <header className="flex flex-col w-full bg-[#FBF9F8CC]  z-[100] fixed top-0 border-b border-white/5 shadow-2xl transition-all">
        {/* Desktop Header */}
        <div
          className={`hidden slg:grid ${showSearch ? "grid-cols-3 " : "grid-cols-2 "} items-center justify-stretch w-full py-3 max-w-[1350px] mx-auto`}
        >
          {/* 1. Logo */}
          <div className="col-span-1 flex items-center gap-10 ">
            <div className=" ">
              <Picture
                className="w-[150px] relative top-2"
                src={logoImage}
                alt="logo"
              />
            </div>

            <div className="pr-8">
              <HomePageBottomHeader />
            </div>
          </div>
          {/* 2. Search Bar */}
          {showSearch && (
            <div className="col-span-1 flex justify-center ">
              <div className="relative w-full max-w-[550px] group">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search hardware, accessories..."
                  className="w-full h-11 text-sm text-gray-500 rounded-3xl pl-12 pr-5 outline-none focus:border-blue-500/50 transition bg-gray-200"
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
          )}

          {/* 3. Controls */}
          <div className="col-span-1 flex items-center justify-end gap-6">
            {/* STABLE CURRENCY DROPDOWN */}
            <FiSearch
              onClick={() => {
                setShowSearch(!showSearch);
              }}
              className="relative cursor-pointer top-[10px] -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
            />
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <Menu.Button className="flex items-center gap-2 bg-[#B5182E] border border-white/10 px-3 py-2 rounded-xl cursor-pointer hover:bg-[#B5182E]/80 transition group outline-none">
                    {/* @ts-ignore */}
                    <Flag
                      code={baseCurrency?.countryCode || "NG"}
                      className="w-4 rounded-sm"
                    />
                    <span className="text-xs font-bold text-gray-200 uppercase">
                      {baseCurrency.code}
                    </span>
                    <SlArrowDown
                      className={`text-[8px] text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right bg-[#111111] border border-white/10 rounded-2xl shadow-2xl p-1 z-[110] outline-none">
                      {currencyOptions.map((c) => (
                        <Menu.Item key={c.code}>
                          {({ active }) => (
                            <button
                              onClick={() => handleCurrencyChange(c.code)}
                              className={`${
                                active
                                  ? "bg-white/5 text-white"
                                  : "text-gray-400"
                              } flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors`}
                            >
                              {/* @ts-ignore */}
                              <Flag code={c.countryCode} className="w-4" />
                              {c.code} ({c.symbol})
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>

            {/* Cart */}
            <div className="relative cursor-pointer group" onClick={onOpenCart}>
              <FiShoppingBag className="text-2xl text-[#B5182E] group-hover:text-[#B5182E]/80 transition" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 size-5 bg-gray-800 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-black">
                  {totalItems}
                </span>
              )}
            </div>

            {/* STABLE USER DROPDOWN */}
            {email ? (
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button className="flex items-center gap-2 cursor-pointer group outline-none focus:ring-0">
                      {wc_customer_info?.shipping?.address_2 ? (
                        <Picture
                          src={wc_customer_info.shipping.address_2}
                          alt="user"
                          className="size-9 rounded-full border border-white/10"
                        />
                      ) : (
                        <div className="size-9 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-black text-xs">
                          {getFirstCharacter(
                            wc_customer_info?.first_name || "U",
                          )}
                        </div>
                      )}
                      <SlArrowDown
                        className={`text-[10px] text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right bg-[#111111] border border-white/10 rounded-2xl shadow-2xl p-1.5 z-[110] outline-none">
                        <div className="px-3 py-2 mb-1 border-b border-white/5">
                          <p className="text-xs text-gray-500">Logged in as</p>
                          <p className="text-sm font-bold text-white truncate">
                            {wc_customer_info?.first_name}
                          </p>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          {userDropDownLinks.map((item) => (
                            <Menu.Item key={item.id}>
                              {({ active }) => (
                                <button
                                  onClick={(e) => {
                                    if (item.onClick) {
                                      e.preventDefault();
                                      item.onClick();
                                    } else if (item.href) {
                                      router.push(item.href);
                                    }
                                  }}
                                  className={`${
                                    active
                                      ? "bg-white/5 text-white"
                                      : "text-gray-300"
                                  } flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors`}
                                >
                                  <span className="text-lg">{item.icon}</span>
                                  {item.label}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={`${
                                active ? "bg-red-500/10" : ""
                              } flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 font-bold transition-colors mt-1`}
                            >
                              <FiLogOut /> Log Out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            ) : (
              <CircleUser color="#B5182E" />
            )}
          </div>
        </div>

        {/* Mobile Header (Hidden on Laptop) */}
        <div className="slg:hidden flex flex-col w-full p-4 gap-3 bg-[#FBF9F8CC]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 ">
              <FiMenu
                className="text-2xl text-[#1B1C1C]"
                onClick={() => setDrawerVisible(true)}
              />
              <LogoImage className="!w-[100px] brightness-200 relative top-2" />
            </div>
            <div onClick={onOpenCart} className="relative">
              <FiShoppingBag className="text-2xl text-[#1B1C1C]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 size-4 bg-blue-600 rounded-full text-[9px] flex items-center justify-center text-[#1B1C1C]">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
          <div className="relative h-10">
            <input
              type="text"
              placeholder="Search items..."
              className="w-full h-full text-sm bg-gray-100 rounded-lg px-4 border-none outline-none focus:ring-2 focus:ring-primary-100"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {isPending ? (
              <ImSpinner2 className="absolute right-3 top-1/3 text-primary-100 animate-spin" />
            ) : (
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            )}
          </div>
        </div>

        {/* Conditional Bottom Headers */}
        {/* {pathname.includes("/category") ? (
					<CategoryPageBottomHeader />
				) : pathname.includes("/home-item") ? (
					<ProductPageBottomHeader />
				) : (
					<HomePageBottomHeader />
				)} */}
      </header>

      {/* Cart — modal on desktop, bottom sheet on mobile */}
      <CartModal isOpen={isCartOpen} onClose={onCloseCart} />

      <GlobalLoader isPending={isPending} />
      <MobileNav
        closeDrawer={() => setDrawerVisible(false)}
        drawerVisible={drawerVisible}
      />
    </>
  );
};

export default Header;
