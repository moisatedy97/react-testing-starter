import { useQuery } from "react-query";
import { Product } from "../entities";

const ProductDetail = ({ productId }: { productId: number }) => {
  const {
    data: product,
    isLoading,
    error
  } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetch(`/products/${productId}`).then((res) => res.json())
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!product) return <div>The given product was not found.</div>;

  return (
    <div>
      <h1>Product Detail</h1>
      <div>Name: {product!.name}</div>
      <div>Price: ${product!.price}</div>
    </div>
  );
};

export default ProductDetail;
