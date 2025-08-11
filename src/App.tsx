import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Features from './components/Features'
import KeyInfo from './components/KeyInfo'
import Gallery from './components/Gallery'
import EnquiryFormModal from './components/EnquiryFormModal'


function App() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <KeyInfo />
      <Gallery />
      <EnquiryFormModal />
    </main>
  )
}

export default App