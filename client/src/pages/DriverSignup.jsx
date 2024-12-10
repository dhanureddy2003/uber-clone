import { useState } from "react";
import { Link } from "react-router-dom";

const DriverSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [status, setStatus] = useState("available");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Collect all the input data into an object
    const formData = {
      username,
      email,
      password,
      vehicle: {
        color,
        vehicleNo,
        vehicleType,
        capacity,
      },
      location: {
        latitude,
        longitude,
      },
      status,
    };

    console.log(formData);

    // Reset all input fields
    setEmail("");
    setPassword("");
    setUsername("");
    setColor("");
    setVehicleNo("");
    setVehicleType("");
    setCapacity("");
    setLatitude("");
    setLongitude("");
    setStatus("available");
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-between p-2 gap-2">
        <div className="w-1/3 p-2 text-start">
          <img
            src="https://images.seeklogo.com/logo-png/29/1/uber-logo-png_seeklogo-299630.png?v=638659041970000000"
            alt=""
          />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <h3 className="text-xl font-bold">Signup as Driver</h3>
          <form
            className="flex flex-col gap-2 w-2/3"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <input
              type="text"
              placeholder="Vehicle color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <input
              type="text"
              placeholder="Vehicle number"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="outline-none bg-black text-white rounded-lg border-[1px] border-gray-400 p-2"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="rickshaw">Rickshaw</option>
            </select>
            <input
              type="number"
              placeholder="Vehicle capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <input
              type="number"
              step="0.0001"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <input
              type="number"
              step="0.0001"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="outline-none bg-transparent rounded-lg border-[1px] border-gray-400 p-2"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="outline-none bg-black text-white rounded-lg border-[1px] border-gray-400 p-2"
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
            </select>
            <Link
              to={"/login"}
              className="text-sm underline text-blue-500 cursor-pointer"
            >
              Already have an account? Login
            </Link>
            <button className="bg-white text-black rounded-lg p-2 w-full text-center outline-none border-none">
              <p className="text-lg">Submit</p>
            </button>
          </form>
        </div>
        <Link
          to={"/login"}
          className="bg-transparent text-white rounded-lg p-2 w-full text-center outline-none border-[1px] border-green-500"
        >
          <p className="text-lg">Login as user</p>
        </Link>
      </div>
    </>
  );
};

export default DriverSignup;
