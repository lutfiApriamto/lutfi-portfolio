import FeaturedProjects from "@/components/landingPage/FeaturedProjects";
import AboutPreview from "../components/landingPage/AboutPreview";
import ExperienceTimeline from "../components/landingPage/ExperienceTimeline";
import Hero from "../components/landingPage/Hero";
import ConnectSection from "@/components/landingPage/Connectsection";
import Footer from "@/components/layout/Footer";


const Home = ({ isReady }) => {
  return (
    <main>
      <Hero isReady={isReady} />
      <AboutPreview/>
      <ExperienceTimeline/>
      <FeaturedProjects/>
      <ConnectSection/>
      <Footer/>
    </main>
  );
};

export default Home;