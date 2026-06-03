import AboutPreview from "../components/landingPage/AboutPreview";
import Hero from "../components/landingPage/Hero";

const Home = ({ isReady }) => {
  return (
    <main>
      <Hero isReady={isReady} />
      <AboutPreview/>
    </main>
  );
};

export default Home;