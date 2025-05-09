import { Plus, Search } from "lucide-react";

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
    <div className="flex w-full flex-row justify-between items-start sm:items-center h-14 mb-8 ">
      <Breadcrumb>
        <BreadcrumbList>
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
      <Search />
      <button className="flex items-center gap-2 px-4 py-2 rounded-3xl bg-red-500 text-white border-2 border-red-500 hover:bg-red-600 transition">
        Invite <Plus size={16} />
      </button>
    </div>
  );
};

export default Header;
