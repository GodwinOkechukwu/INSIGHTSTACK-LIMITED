import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";
import { SITE_NAME } from "@constants/seoContants";

const RefundPolicy = () => {
  const { data: generalSettings, isLoading, isError } = useGeneralSettings();

  const GeneralSettings: WooCommerceSetting[] = generalSettings;

  return (
    <div className="text-gray-600 space-y-6 text-xs sm:text-sm">
      <p>
        At {SITE_NAME}, we strive for 100% accuracy in every order. Since we act
        as your procurement and logistics partner, our policy is designed to be
        fair to both you and our international suppliers.
      </p>

      <section>
        <h3 className="font-bold text-gray-800">1. Eligibility for Refunds</h3>
        <p>You are entitled to a full refund in the following cases:</p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Out of Stock:</strong> If an item you paid for becomes
            unavailable before procurement.
          </li>
          <li>
            <strong>Wrong Item:</strong> If we procure a completely different
            item from what you ordered (e.g., you ordered a Blue Bag, and we
            bought a Red Shoe).
          </li>
          <li>
            <strong>Damaged on Arrival:</strong> If the item arrives at our
            Nigerian office with significant damage that makes it unusable.
            (Minor packaging dents from international shipping are excluded).
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-gray-800">
          2. Non-Refundable Situations
        </h3>
        <p>We cannot offer refunds for:</p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Change of Mind:</strong> Once an order is placed with a
            supplier in China/Turkey, it cannot be canceled.
          </li>
          <li>
            <strong>Sizing Issues:</strong> We buy exactly the size you request.
            Please consult the supplier's size chart before ordering.
          </li>
          <li>
            <strong>Color Variance:</strong> Slight differences in color due to
            studio lighting or screen resolution.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-gray-800">3. The Return Process</h3>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Inspection Window:</strong> You must inspect your goods and
            report any issues within 48 hours of pickup or delivery.
          </li>
          <li>
            <strong>Evidence:</strong> You must provide a clear video of the
            unboxing (Opening Video) and photos of the defect.
          </li>
          <li>
            <strong>Shipping Costs:</strong> If a return is approved because of
            our error, Insight Import covers the return shipping. For all
            other approved returns, the customer bears the cost.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-gray-800">
          4. Missing Items & Supplier Discrepancies
        </h3>
        <p>
          At {SITE_NAME}, we act as your dedicated procurement agent. While we
          vet suppliers, we do not control their internal packing process. In
          the rare event that a supplier fails to ship an item or sends an
          incomplete order, the following policy applies:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Re-order Protocol:</strong> Our primary resolution for
            missing items is an automatic Re-order. We will immediately engage
            the supplier to ship the missing item in our next available cargo
            batch at no additional service charge to you.
          </li>
          <li>
            <strong>Alternative Resolution:</strong> If the item is out of stock
            or time-sensitive, the value of the missing item will be converted
            into a Store Credit/Wallet Balance for your future procurement.
          </li>
          <li>
            <strong>Refund Exception:</strong> Cash refunds for missing items
            are only processed if the supplier confirms they cannot fulfill the
            order and has refunded the funds to our corporate account. Please
            allow 5–7 business days for international payment reversals to
            reflect.
          </li>
        </ul>
      </section>

      <p className="mt-4">
        <strong>Important Note:</strong> To claim a missing item, a continuous{" "}
        <strong>Unboxing Video</strong> (from the moment the seal is broken
        until every item is counted) is mandatory. Without this video, we cannot
        file a dispute with the international supplier on your behalf.
      </p>
    </div>
  );
};

export default RefundPolicy;
