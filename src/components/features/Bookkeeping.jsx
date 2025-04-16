import companyData from "../../data/companyData";

const Bookkeeping = () => (
  <div>
    <h2>Bookkeeping</h2>
    <ul>
      {companyData.bookkeeping.map((entry, index) => (
        <li key={index}>
          {entry.date} - {entry.description} - ₹{entry.amount}
        </li>
      ))}
    </ul>
  </div>
);

export default Bookkeeping;
