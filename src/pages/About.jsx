import AboutCertifications from "@/components/aboutPage/AboutCertifications";
import AboutCTA from "@/components/aboutPage/AboutCTA";
import AboutEducation from "@/components/aboutPage/AboutEducation";
import AboutHero from "@/components/aboutPage/AboutHero";
import AboutPhilosophy from "@/components/aboutPage/AboutPhilosophy";
import AboutSoftSkills from "@/components/aboutPage/Aboutsoftskills";
import AboutStats from "@/components/aboutPage/AboutStats";
import AboutTechStack from "@/components/aboutPage/AboutTechStack";
import ExperienceTimeline from "@/components/landingPage/ExperienceTimeline";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-neutral-900 dark:bg-[#050505] dark:text-white transition-colors duration-300 overflow-x-hidden">
      <AboutHero />
      <AboutEducation/>
      <AboutStats/>
      <AboutSoftSkills/>
      <AboutTechStack/>
      <AboutPhilosophy/>
      <ExperienceTimeline />
      <AboutCertifications/>
      <AboutCTA/>
      <Footer />
    </main>
  );
};

export default About;