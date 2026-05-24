import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingAssistant from "@/components/shared/FloatingAssistant";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const product = products.find(
    (p) => p.id === params.id || p.slug === params.id
  );

  if (!product) {
    return {
      title: "Product Not Found | Electon Store",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} - Electon Premium Electronics`,
    description: product.description,
  };
}

export default async function ProductPage(props: { params: Params }) {
  const params = await props.params;
  const product = products.find(
    (p) => p.id === params.id || p.slug === params.id
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-text-dark relative overflow-x-hidden">
      <Navbar />
      <ProductDetailClient product={product} />
      <Footer />
      <FloatingAssistant />
    </main>
  );
}
