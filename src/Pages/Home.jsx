import Hero from "../components/Hero";
import Stats from "../components/Stats";
import AboutPreview from "../components/AboutPreview";
import Ministries from "../components/Ministries";
import Service from "../components/Service";
import PastorWelcome from "../components/PastorWelcome";
import SermonsPreview from "../components/SermonsPreview";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <Ministries />
      <Service />
      <PastorWelcome />
      <SermonsPreview />
    </>
  );
}

export default Home;