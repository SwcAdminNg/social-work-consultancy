import Hero from "./Hero";
import HomeContact from "./HomeContact";
import HomeFAQ from "./HomeFAQ";
import Intro from "./Intro";
import LearningApproach from "./LearningApproach";
import LearningCategories from "./LearningCategories";
import LearningCTA from "./LearningCTA";
import LearningOptions from "./LearningOptions";
import Services from "./Services";

// The homepage in the handover's order: banners, introduction, services,
// learning, learning options, categories, call to action, FAQs, contact.
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <LearningApproach />
      <LearningOptions />
      <LearningCategories />
      <LearningCTA />
      <HomeFAQ />
      <HomeContact />
    </>
  );
}
