import ConnectForm from "@/components/connectPage/ConnectForm";
import ConnectHero from "@/components/connectPage/ConnectHero";
import ConnectWhyHire from "@/components/connectPage/ConnectWhyHire";
import SkillMatchCalculator from "@/components/connectPage/SkillMatchCalculator";
import Footer from "@/components/layout/Footer";


const Connect = () => {
  return (
    <main>
      <ConnectHero/>
      <ConnectWhyHire/>
      <SkillMatchCalculator/>
      <ConnectForm/>
      <Footer/>
    </main>
  );
};

export default Connect;