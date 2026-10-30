import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <main id="app-root" className="relative w-screen h-screen overflow-hidden">
      <BackgroundVideo />
      <Navbar />
      <Hero />
    </main>
  );
}
