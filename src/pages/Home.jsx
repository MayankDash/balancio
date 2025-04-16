import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to the Home Page</h2>
        <p>This is where the main content of the website goes.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
