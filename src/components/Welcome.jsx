import Button from "./Button";

function Welcome() {
  return (
    <section className="bg-green-50 py-20">
      <div className="container mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
          WELCOME TO UOACS/WINCS HACKATHON!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Build projects that promote health, wellbeing, and a better future.
        </p>
        <div className="mt-6">
          <Button className="w-[10px]">Get Started!</Button>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
