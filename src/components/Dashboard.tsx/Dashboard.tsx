import Placeholder from "../../assets/PlaceholderLogo.svg";
import { Card } from "../ui/card";
const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex">
        <div className="flex">
          <img src={Placeholder} />
          <div>
            <h1>Project Planet X</h1>
            <Card className="p-2"></Card>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
