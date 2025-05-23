import { ChevronLeft, Plus, Search } from "lucide-react";
import Avatars from "../../assets/AvatarGroup.png";

import Vector from "../../assets/Vector.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const Header = () => {
  return (
    <div className="flex w-full flex-row justify-between items-start sm:items-center  h-[80px] gap-[10px] border-b-[1px] pt-[20px] pr-[32px] pb-[20px] pl-[32px]">
      <Breadcrumb>
        <BreadcrumbList className="inline lg:hidden">
          <BreadcrumbItem>
            <ChevronLeft />
            <BreadcrumbLink href="/dashboard">Back To Project</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        <BreadcrumbList className="hidden lg:flex">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              {" "}
              <img src={Vector} alt="" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/project">Project</BreadcrumbLink>
          </BreadcrumbItem>{" "}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/project/planetx">
              Project PlanetX
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-center items-center">
        <Search />
        <div>
          <img src={Avatars} alt="" />
        </div>
        <button className="flex items-center cursor-pointer  gap-2 px-4 py-2 rounded-3xl bg-gray-50  border-2 border-gray-100 hover:bg-gray-300 transition">
          Invite <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default Header;
