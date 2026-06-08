
import Footer from "@/components/layout/Footer";
import ProjectsCTA from "@/components/projectPage/Projectscta";
import ProjectsFeatured from "@/components/projectPage/ProjectsFeatured";
import ProjectsHero from "@/components/projectPage/ProjectsHero";
import ProjectsHorizontalScroll from "@/components/projectPage/ProjectsHorizontalScroll";

const Project = () => {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-neutral-900 dark:bg-[#050505] dark:text-white transition-colors duration-300 overflow-x-hidden">
      <ProjectsHero/>
      <ProjectsFeatured/>
      <ProjectsHorizontalScroll/>
      <ProjectsCTA/>
      <Footer />
    </main>
  );
};

export default Project;