"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdInventory, MdStorefront } from "react-icons/md";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import ProductTable from "../Tables/ProductTable";
import { useCart } from "react-use-cart";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { useCustomer, useOrders } from "../lib/woocommerce";
import { filterCustomersByEmail } from "@constants";
import {
	FiHome,
	FiShoppingBag,
	FiBox,
	FiShoppingCart,
	FiUser,
	FiLogIn,
} from "react-icons/fi";

const AppMenu = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { totalItems } = useCart();
	const { data: customer, isLoading, isError } = useCustomer("");

	const { email } = useToken();
	const wc_customer2_info: Woo_Customer_Type[] = customer;
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);
	const firstName = wc_customer_info?.first_name;
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [activeTab, setActiveTab] = useState(pathname);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const isLoggedIn = !!firstName;

	const onOpenCart = () => setIsCartOpen(true);
	const onCloseCart = () => setIsCartOpen(false);

	const handleTabClick = (url: string, onClick?: () => void) => {
		if (onClick) {
			onClick();
		} else if (url) {
			setActiveTab(url);
			router.push(url);
		}
	};

	const {
		data: ordersData,
		isLoading: isLoadingOrders,
		isError: isErrorOrders,
	} = useOrders(undefined, currentPage, itemsPerPage);

	const OrderData: OrderGetType[] = ordersData?.data;
	const totalOrderedItems = ordersData?.totalItems || 0;

	const mobileHeaderLinkUrl = [
		{
			id: "home",
			url: "/",
			link: "Home",
			icon: FiHome, // Modern outline home
			onClick: () => handleTabClick("/"),
		},
		{
			id: "shop",
			url: totalOrderedItems > 0 ? "/user/my-orders" : "/category",
			link: totalOrderedItems > 0 ? "Orders" : "Shop",
			// FiBox for packages/inventory, FiShoppingBag for storefront
			icon: totalOrderedItems > 0 ? FiBox : FiShoppingBag,
			onClick:
				totalOrderedItems > 0
					? () => handleTabClick("/user/my-orders")
					: () => handleTabClick("/category"),
		},
		{
			id: "cart",
			url: "#cart",
			link: "Cart",
			icon: FiShoppingCart, // Sleek shopping cart
			badge: totalItems,
			onClick: onOpenCart,
		},
		{
			id: "account",
			url: isLoggedIn ? "#account" : "/user/login",
			link: isLoggedIn ? "Account" : "Login",
			// FiUser for profile, FiLogIn for signing in
			icon: isLoggedIn ? FiUser : FiLogIn,
			onClick: isLoggedIn
				? () => handleTabClick("/user/dashboard")
				: () => handleTabClick("/user/login"),
		},
	];

	return (
		<>
			{/* Mobile Navigation Bar */}
			<div className='sm:hidden fixed bottom-0 z-50 w-full'>
				{/* Background with subtle gradient */}
				<div className='relative bg-white border-t border-gray-300/50 backdrop-blur-sm'>
					{/* Navigation Items */}
					<div className='grid grid-cols-4 gap-0 w-full px-1 py-3'>
						{mobileHeaderLinkUrl.map((menuItem) => {
							const isActive =
								activeTab === menuItem.url ||
								(menuItem.url !== "/" && pathname.startsWith(menuItem.url));
							const IconComponent = menuItem.icon;

							return (
								<button
									key={menuItem.id}
									onClick={() => menuItem.onClick?.()}
									className={`col-span-1 flex flex-col items-center justify-center text-center relative group transition-all duration-200 ${
										isActive ? "transform -translate-y-1" : ""
									}`}
								>
									{/* Badge for cart */}
									{totalItems > 0 && menuItem.badge && menuItem.badge > 0 && (
										<span className='absolute -top-1 right-1/4 bg-red-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-bold'>
											{menuItem.badge > 9 ? "9+" : menuItem.badge}
										</span>
									)}

									{/* Icon Container */}
									<div
										className={`relative p-2 rounded-full transition-all duration-200 ${
											isActive
												? "bg-primary-100 text-white shadow-lg"
												: "text-gray-600 group-hover:bg-gray-100"
										}`}
									>
										<IconComponent className='size-6' />
									</div>

									{/* Label */}
									<span
										className={`text-[10px] mt-0.5 transition-colors ${
											isActive
												? "text-primary-100 font-bold"
												: "text-gray-600 group-hover:text-primary-100"
										}`}
									>
										{menuItem.link}
									</span>

									{/* Active indicator line */}
									{isActive && (
										<div className='w-6 h-0.5 bg-primary-100 rounded-full mt-0.5'></div>
									)}
								</button>
							);
						})}
					</div>

					{/* User Dropdown Menu */}
					{isUserMenuOpen && (
						<div className='absolute bottom-full right-2 mb-4 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-slideUp'>
							<div className='p-3'>
								<div className='px-3 py-2 mb-2 border-b border-gray-100'>
									<p className='text-sm font-semibold text-gray-700'>
										My Account
									</p>
									<p className='text-xs text-gray-500'>{email}</p>
								</div>

								<div className='space-y-1'>
									{mobileHeaderLinkUrl.map((item, index) => (
										<button
											key={index}
											onClick={() => {
												if (item.url) {
													router.push(item.url);
													setIsUserMenuOpen(false);
													setActiveTab(item.url);
												} else if (item.onClick) {
													item.onClick();
													setIsUserMenuOpen(false);
												}
											}}
											className='w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors'
										>
											<span className={`text-lg`}>
												{item.icon && <item.icon />}
											</span>
											<span className={`text-sm`}>{item.link}</span>
										</button>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Cart Drawer */}
			<Drawer
				open={isCartOpen}
				onClose={onCloseCart}
				placement='right'
				width={
					typeof window !== "undefined" && window.innerWidth > 768
						? 500
						: "100%"
				}
				className='cart-drawer'
				maskClosable={true}
				maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
			>
				<ProductTable onClose={onCloseCart} />
			</Drawer>

			{/* Overlay for user menu */}
			{isUserMenuOpen && (
				<div
					className='fixed inset-0 z-40 sm:hidden bg-black/20'
					onClick={() => setIsUserMenuOpen(false)}
				></div>
			)}

			{/* Add custom animation */}
			<style jsx global>{`
				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-slideUp {
					animation: slideUp 0.2s ease-out;
				}
			`}</style>
		</>
	);
};

export default AppMenu;
