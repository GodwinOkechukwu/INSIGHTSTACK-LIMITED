"use client";
import AppLayout from "@src/components/AppLayout";
import AppMenu from "@src/components/Navbars/AppMenu";
import MainCategoryContent from "@src/components/PageFragments/MainCategoryContent";
import MainCategorySection from "@src/components/PageFragments/MainCategorySection";
import PriceRangeSection from "@src/components/PageFragments/PriceRangeSection";
import SearchNSortSection from "@src/components/PageFragments/SearchNSortSection";
import React from "react";

const page = () => {
  return (
    <AppLayout>
      <main className="flex flex-col slg:flex-row gap-4 w-full mx-auto">
        <MainCategoryContent />
      </main>
      <AppMenu />
    </AppLayout>
  );
};

export default page;
