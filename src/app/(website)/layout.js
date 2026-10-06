import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        {children}
        {/* <div className="fixed bottom-0 left-0 right-0 w-full mb-3">
          <BottomMenu />
        </div> */}
        <Footer />
      </body>
    </html>
  );
}
