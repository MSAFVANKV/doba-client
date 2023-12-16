import FooterItems from "./FooterItems";
import { PRODUCTS, RESOURCES, LOCATION, CONTACT } from "./FooterMenu";

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:px-8 px-5 py-16">
      {/* First column */}
      
      <FooterItems Links={PRODUCTS} title="PRODUCTS" />

      {/* Second column */}
      <div className="hidden sm:block"></div>

      {/* <FooterItems Links={RESOURCES} title="RESOURCES" /> */}
      <FooterItems Links={LOCATION} title="LOCATION" />

      {/* Empty space to start the third column from the fourth column */}
      <div className="hidden sm:block"></div>

      {/* Third column */}
      <FooterItems Links={CONTACT} title="CONTACT" isContact={true}/>
    </div>
  );
};

export default ItemsContainer;
