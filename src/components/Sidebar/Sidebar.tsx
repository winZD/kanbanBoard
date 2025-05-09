import { Menu } from "lucide-react";
import Vector from "../../assets/Vector.svg";
import logo from "../../assets/Logomark.png";
import title from "../../assets/slothui.png";

const Sidebar = () => {
  return (
    <>
      <div className="hidden md:flex flex-col  nesto p-4">
        <div className="relative">
          <img src={Vector} alt="" />
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <img src={logo} alt="" width={50} />
            <img src={title} alt="" width={100} />
          </div>
          <Menu />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
