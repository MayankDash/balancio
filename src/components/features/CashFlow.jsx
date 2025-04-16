import companyData from "../../data/companyData";

const CashFlow = () => {
  const { inflow, outflow, net } = companyData.cashFlow;
  return (
    <div>
      <h2>Cash Flow Forecasting</h2>
      <p>Inflow: ₹{inflow}</p>
      <p>Outflow: ₹{outflow}</p>
      <p>
        <strong>Net: ₹{net}</strong>
      </p>
    </div>
  );
};

export default CashFlow;
