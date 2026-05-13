import React from "react";
import AppLayout from "@src/components/AppLayout";
import AppMenu from "@src/components/Navbars/AppMenu";
import NewArrivals from "@src/components/PageFragments/NewArrivals";

const page = () => {
  return (
    <AppLayout>
      <NewArrivals />
      <AppMenu />
    </AppLayout>
  );
};

export default page;
