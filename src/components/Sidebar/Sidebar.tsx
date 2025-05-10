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

// sidebar icon image array
const sidebarIconsTop = [s, home, stats, user, schedule, thunder, notification];
const sidebarIconsBottom = [settings, avatar];

const Sidebar = () => {
  return (
    <>
      <div className="hidden md:flex flex-col p-4">
        <div className="flex flex-col justify-between h-full items-center">
          <div className="flex flex-col gap-5">
            {sidebarIconsTop.map((icon, index) => (
              <div key={index}>
                <img
                  src={icon}
                  alt=""
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
              <div key={index}>
                <img src={icon} alt="" />
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
