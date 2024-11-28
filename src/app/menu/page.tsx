// import Menu from "../components/menu/Menu";
import dynamicImport from "next/dynamic";
import Banners from "../components/menu/components/Banners";
import Ads from "../submodules/menu/Ads";

export const dynamic = "force-dynamic";

const Menu = dynamicImport(() => import("../components/menu/Menu"), {
  ssr: false,
});

const MenuPage = () => {
  return (
    <div>
      <Menu banner={<Banners />}>
        <Ads />
      </Menu>
    </div>
  );
};

export default MenuPage;
