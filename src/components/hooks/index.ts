"use client";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// import { AppDispatch } from "@/Setup/redux/store";
import { AppDispatch } from "../set-up/redux/store";
import { RootState } from "../set-up/redux/root-reducer";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();