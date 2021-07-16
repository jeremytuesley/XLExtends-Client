import React from "react";
import "../assets/policies.scss";

const RefundPolicy = () => {
  return (
    <div className="content">
      <div className="legalPolicies">
        <div className="policyTitle">Refund Policy</div>
        <div className="policyDate">18th June 2021 - Subject to Change</div>
        <div className="policySubtitle">
          We truly thank you for supporting our small business and purchasing
          our products and services at XLEXTENDS operated by Zenyl Roderick
        </div>
        <div className="policyText">
          <br />
          Due to the nature of our business and products we sell, Items and
          Products that expire within the 42 hours from the date of purchase are{" "}
          <span>not</span> eligible for a refund.
          <br />
          <br /> For any other items to be eligible for a refund, you have to
          return the item you have purchased to us{" "}
          <span>
            within 7 calendar days of the purchase or 7 days from receiving the
            shipment
          </span>
          . The item <span>must</span> be in its{" "}
          <span>original state and unopened</span>. Contact our customer service
          department to get a Free Shipping Label. <br />
          <br />
          If our products arrived damaged, rotten or contaminated in any way
          shape or form. Contact us and we will be happy to discuss a
          replacement regardless or included expiration dates.
          <br />
          <br />
          If anything is unclear or if you have more questions, feel free to
          contact me.
          <br />
          <br />
          Changes to this policy at any given time will be kept in the refund
          policy tab. To make sure you are up to date make sure you are up to
          date with any changes, please visit this page.
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
