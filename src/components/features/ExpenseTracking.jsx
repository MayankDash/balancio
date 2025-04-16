import companyData from "../../data/companyData";

const ExpenseTracking = () => (
  <div>
    <h2>Expense Tracking</h2>
    <ul>
      {companyData.expenses.map((exp, i) => (
        <li key={i}>
          {exp.category} - ₹{exp.amount}
        </li>
      ))}
    </ul>
  </div>
);

export default ExpenseTracking;
