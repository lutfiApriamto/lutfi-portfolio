import AboutEducation from "@/components/aboutPage/AboutEducation";
import AboutHero from "@/components/aboutPage/AboutHero";
import ExperienceTimeline from "@/components/landingPage/ExperienceTimeline";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-neutral-900 dark:bg-[#050505] dark:text-white transition-colors duration-300 overflow-x-hidden">
      <AboutHero />
      <AboutEducation/>
      <ExperienceTimeline />
      <Footer />
    </main>
  );
};

export default About;