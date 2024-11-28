import Menu from "./components/menu/Menu";
import Banners from "./components/menu/components/Banners";

import Ads from "./submodules/menu/Ads";

export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <main>
      <Menu banner={<Banners />}>
        <Ads />
      </Menu>
    </main>
  );
};

export default HomePage;
