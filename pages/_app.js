import 'react-table-6/react-table.css'; // Styling for COMP distribution table

// Default App export to preload CSS
export default function App({ Component, pageProps }) {
    // Export with CSS
    return <Component {...pageProps} />
}