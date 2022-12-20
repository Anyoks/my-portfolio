import * as React from "react"
import { Link } from "gatsby"

require('../style.scss');
// require('../global.scss');

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  // console.log(children);

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl pt-8 min-h-screen flex flex-col justify-between" data-is-root-path={isRootPath}>
      {/* <header className="global-header">{header}</header> */}
      <main className="px-4">{children}</main>
      <footer class="border-t-2 border-gray-200 pb-8 pt-4 mx-4 text-sm text-gray-700">
        Designed and developed by Dennis Mokaya Orina. <br/>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
