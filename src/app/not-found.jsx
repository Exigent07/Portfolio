import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function NotFoundPage() {
	return (
        <>
            <Nav />
            <main className="notFound">
                <h1>404 | Not Found</h1>
                <p>Hmm, did you got lost?</p>
            </main>
            <Footer />
        </>
    );
}