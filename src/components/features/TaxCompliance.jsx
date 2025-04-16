import companyData from "../../data/companyData";

const TaxCompliance = () => {
  const tax = companyData.taxCompliance;
  return (
    <div>
      <h2>Tax Compliance</h2>
      <p>Due Date: {tax.due}</p>
      <p>Status: {tax.paid ? "Paid" : "Unpaid"}</p>
      <p>Amount: ₹{tax.taxAmount}</p>
    </div>
  );
};

export default TaxCompliance;
