import Hero from "../components/landingPage/Hero";

const Home = ({ isReady }) => {
  return (
    <main>
      <Hero isReady={isReady} />
    </main>
  );
};

export default Home;