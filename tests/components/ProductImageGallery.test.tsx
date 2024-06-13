import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("Product Image Gallery", () => {
  it("should render null if imageUrls are is empty", () => {
    const images: string[] = [];

    const { container } = render(<ProductImageGallery imageUrls={images} />);

    screen.debug(container);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render a list of images", () => {
    const imageUrls: string[] = ["image1.jpg", "image2.jpg", "image3.jpg"];

    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(imageUrls.length);

    imageUrls.forEach((image, index) => {
      expect(images[index]).toHaveAttribute("src", image);
    });
  });
});
