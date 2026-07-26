import Hero from "../components/Hero";
import Stats from "../components/Stats";
import AboutPreview from "../components/AboutPreview";
import Ministries from "../components/Ministries";
import Service from "../components/Service";
import PastorWelcome from "../components/PastorWelcome";
import SermonsPreview from "../components/SermonsPreview";
import EventsPreview from "../components/EventsPreview";
import GalleryPreview from "../components/GalleryPreview";
import GivePreview from "../components/Givepreview";
import ContactPreview from "../components/ContactPreview";

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
      <EventsPreview />
      <GalleryPreview />
      <GivePreview />
      <ContactPreview />
    </>
  );
}

export default Home;