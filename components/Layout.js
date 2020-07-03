import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
    const router = useRouter()

    return(
        <main>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preload" href="/fonts/OpenSans-Regular.ttf" as="font" crossOrigin="" />
                <link rel="preload" href="/fonts/OpenSans-Bold.ttf" as="font" crossOrigin="" />
            </Head>
            <div className="header">
                <div className="logo">
                    <Link href="/"><a>
                        <img src="/logo.png" alt="StatFarm logo" />
                    </a></Link>
                </div>
            </div>
            <div className="subheader">
                <ul>
                    <li className={router.pathname === '/' ? 'active' : ''}><Link href="/"><a>Compound</a></Link></li>
                    <li className={router.pathname === '/balancer' ? 'active' : ''}><Link href="/balancer"><a>Balancer</a></Link></li>
                </ul>
            </div>
            <div className="content">
                <div className="sizer">
                    {children}
                </div>
            </div>
            <div className="footer">
                <span>Developed by <a href="https://anishagnihotri.com">Anish Agnihotri</a>.</span>
            </div>

            <style global jsx>{`
                body {
                    padding: 0px;
                    margin: 0px;
                    font-family: 'Open Sans', sans-serif;
                    background-color: #F3F5F7;
                }
            `}</style>
            <style jsx>{`
            .header {
                background-color: #F01716;
                height: 60px;
                text-align: center;
            }
            .logo > a > img {
                height: 30px;
                margin-top: 16px;
                transition: 50ms ease-in-out;
            }
            .logo > a:hover > img {
                opacity: 0.8;
            }
            .subheader {
                height: 60px;
                background-color: #fff;
                box-shadow: 0 2px 10px rgba(151,164,175,.1);
            }
            .subheader {
                text-align: center;
            }
            .subheader > ul {
                list-style-type: none;
                margin: 0px;
                padding: 0px;
            }
            .subheader > ul > li {
                height: 58px;
                display: inline-block;
                padding: 0px 10px;
                margin: 0 7.5px;
                border-bottom: 2px solid transparent;
            }
            .active {
                border-bottom-color: #F01716 !important;
            }
            .active > a {
                color: #000 !important;
            }
            .subheader > ul > li > a {
                text-decoration: none;
                color: #8E929C;
                font-weight: 700;
                transform: translateY(20px);
                display: inline-block;
                transition: 75ms ease-in-out;
            }
            .subheader > ul > li:hover {
                border-bottom-color: #F01716;
            }
            .subheader > ul > li:hover > a {
                color: #000;
            }
            .content {
                background-color: #F3F5F7;
                min-height: calc(100vh - 122px);
                text-align: center;
            }
            .footer {
                text-align: center;
                background-color: #F3F5F7;
                padding: 10px 0px 20px 0px;
            }
            .footer > span > a {
                color: #F01716;
            }
            .sizer {
                display: inline-block;
            }
            @media screen and (min-width: 1300px) {
                .sizer {
                    width: 1200px;
                }
            }
            @media screen and (min-width: 600px) and (max-width: 1300px) {
                .sizer {
                    width: 90vw;
                }
            }
            @media screen and (max-width: 600px) {
                .sizer {
                    width: 95vw;
                }
            }
            `}</style>
        </main>
    )
}