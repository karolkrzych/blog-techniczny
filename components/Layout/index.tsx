import Link from 'next/link';

interface Props {
    children: React.ReactNode;
}

const navLinks = [
    { path: '/', label: 'Blog', id: 1 },
    { path: '/about', label: 'About', id: 2 },
    { path: '/projects', label: 'Projects', id: 3 },
];

const Layout = ({ children }: Props) => {
    return (
        <div className="p10 font-mono max-w-screen-xl mx-auto">
            <nav className="bg-blue-400 p-5 flex justify-center">
                {navLinks.map((link) => (
                    <Link
                        href={link.path}
                        key={link.id}
                        className="shadow md:w-40 bg-blue-50 p-2 m-2 text-center hover:bg-gray-50">
                        {link.label}
                    </Link>
                ))}
            </nav>
            <main className="bg-gray-100 p-5">{children}</main>
            <footer className="bg-blue-400 p-5 text-gray-100 text-center">
                {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Layout;
