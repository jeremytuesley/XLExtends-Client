import React from "react";
import "../assets/policies.scss";

const ShipPolicy = () => {
  return (
    <div className="content">
      <div className="legalPolicies">
        <div className="policyTitle">Shipping Policy</div>
        <div className="policyDate">18th June 2021 - Subject to Change</div>
        <div className="policyText">
          Check this page for any updates on any shipping policy's.
          <br /> Changes to this policy can be subjected to change at any time
          without further notice.
        </div>
        <div className="policySubtitle">Does EXTENDS Ship Internationally?</div>
        <div className="policyText">
          Currently we ship anywhere throughout Australia.
          <br /> We do not ship currently internationally without expected
          delays, subject to change.
        </div>
        <div className="policySubtitle">More to be added soon.</div>
      </div>
    </div>
  );
};

export default ShipPolicy;
