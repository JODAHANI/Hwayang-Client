import Navigation from "./Navigation/Navigation";
import HeaderTop from "./HeaderTop/HeaderTop";
import "../../../index.css";

const Header = (): JSX.Element => {
  return (
    <header className="top">
      <HeaderTop />
      <Navigation />
    </header>
  );
};

export default Header;
