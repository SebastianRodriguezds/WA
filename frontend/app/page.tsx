import experiences from "../src/data/experiences.json";

export default function Home() {
  return (
    <div className="home-container space-y-12">
      {experiences.map((exp, index) => (
        <div
          key={exp.id}
          className={`flex flex-col md:flex-row items-center ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">{exp.title}</h2>
            <p className="text-gray-700">{exp.description}</p>
          </div>

          <div className="md:w-1/2 p-6">
            <img
              src={exp.image}
              alt={exp.title}
              className="w-full h-150 md:w-4/5 lg:w-3/4 rounded-lg shadow-md mx-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
