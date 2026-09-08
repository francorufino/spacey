import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SpaceAmbience from "./components/SpaceAmbience";

export const metadata = {
  title: "SpaceY",
  description: "Pioneers in space exploration"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-screen justify-between`}>
        <SpaceAmbience />
        <section className={`h-500 `}>
          <Header />
        </section>
        <section className={` h-500 `}>{children}</section>
        <Footer className={`h-500 `} />
      </body>
    </html>
  );
}
