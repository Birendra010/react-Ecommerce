import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/productDetail";

function ProductDetailPage() {
  return (
    <div>
      <NavBar>
        <ProductDetail></ProductDetail>
      </NavBar>
    </div>
  );
}

export default ProductDetailPage;
