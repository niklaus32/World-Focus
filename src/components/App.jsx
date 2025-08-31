import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Card from "./Card";
import Footer from "./Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Welcome />

      <main className="flex-grow container mx-auto px-6 py-12 grid gap-6 md:grid-cols-3">
        <Card
          title="HEALTH"
          description="Lorem ipsum is a dummy or placeholder text commonly used in graphic design"
          image="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Card
          title="AND"
          description="Lorem ipsum is a dummy or placeholder text commonly used in graphic design"
          image="https://images.unsplash.com/photo-1687436874760-45d7cf64dc22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Card
          title="WELLBEING"
          description="Lorem ipsum is a dummy or placeholder text commonly used in graphic design"
          image="https://plus.unsplash.com/premium_photo-1742910864340-2aa39c65d1bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
