import companyData from "../../data/companyData";

const Notifications = () => (
  <div>
    <h2>Notifications</h2>
    <ul>
      {companyData.notifications.map((note, i) => (
        <li key={i}>{note}</li>
      ))}
    </ul>
  </div>
);

export default Notifications;
