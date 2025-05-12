// imports
import { Menu } from "lucide-react";
import home from "../../assets/Vector.svg";
import logo from "../../assets/Logomark.png";
import stats from "../../assets/stats.svg";
import s from "../../assets/s.svg";
import slothui from "../../assets/slothui.png";
import thunder from "../../assets/thunder.svg";
import user from "../../assets/user.svg";
import schedule from "../../assets/schedule.svg";
import notification from "../../assets/notification.svg";
import settings from "../../assets/settings.svg";
import avatar from "../../assets/Avatar.png";
import { NavLink } from "react-router-dom";

const sidebarIconsTop = [s, home, stats, user, schedule, thunder, notification];
const sidebarIconsBottom = [settings, avatar];

const Sidebar = () => {
  return (
    <>
      <div className="hidden md:flex flex-col p-4 w-[80px] border-r-[1px] pt-[24px] pr-[16px] pb-[24px] pl-[16px]">
        <div className="flex flex-col justify-between h-full items-center">
          <div className="flex flex-col gap-14">
            {sidebarIconsTop.map((icon, index) => (
              <div key={index}>
                <img
                  src={icon}
                  alt=""
                  width={19}
                  className={
                    index === 0
                      ? "bg-violet-800 rounded-xl bg-gradient-to-br from-purple-200 via-indigo-500 to-violet-700"
                      : ""
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {sidebarIconsBottom.map((icon, index) => (
              <div key={index} className="flex justify-center">
                {index === 0 ? (
                  <NavLink to={"/settings"}>
                    <img src={icon} alt="" />
                  </NavLink>
                ) : (
                  <img src={icon} alt="" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <img src={logo} alt="" width={50} />
            <img src={slothui} alt="" width={100} />
          </div>
          <Menu />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
