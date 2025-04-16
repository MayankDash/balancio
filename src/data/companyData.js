const companyData = {
  name: "TechNova Inc.",
  bookkeeping: [
    {
      date: "2025-04-01",
      description: "Revenue from product sales",
      amount: 15000,
    },
    { date: "2025-04-05", description: "AWS Hosting", amount: -200 },
  ],
  taxCompliance: {
    due: "2025-04-30",
    paid: false,
    taxAmount: 1200,
  },
  cashFlow: {
    inflow: 18000,
    outflow: 7000,
    net: 11000,
  },
  expenses: [
    { category: "Marketing", amount: 500 },
    { category: "Operations", amount: 1200 },
  ],
  notifications: [
    "Your Tax is due on 30th April!",
    "You exceeded budget on Operations",
  ],
};

export default companyData;
