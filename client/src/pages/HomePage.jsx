import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-cover bg-[url('https://images.unsplash.com/photo-1594306280489-ddaaf2439841?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] h-screen w-full bg-pink-700 flex flex-col justify-between">
      <div className="w-full p-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
          className="w-1/4"
        />
      </div>
      <div className="bg-gray-200 flex flex-col items-center justify-center p-4 gap-4">
        <h2 className="text-3xl text-black">Get Started with Uber</h2>
        <Link
          to={"/login"}
          className="bg-black text-white rounded-lg p-2 w-full text-center outline-none border-none"
        >
          <p className="text-lg">continue</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
