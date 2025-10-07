import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Section from "../components/section"
import Meta from "../components/Meta"
import Header from "../components/Header"


const BlogIndex = ({ data, location }) => {
  console.log(data)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const author = data.site.siteMetadata.author
  const posts = data.allMarkdownRemark.nodes
  const avatar = data.avatar

  return (
    <Layout location={location} title={siteTitle}>
      <Meta />
      <Header
        author={author}
        avatarSrc={avatar.childImageSharp.fixed.src}
        // splashSrc={splash.childImageSharp.fixed.src}
      />
      {posts.map(s =>
        <Section
          title={s.frontmatter.title}
          htmlContent={s.html}
          key={s.frontmatter.title}
        />
      )}
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        author {
          name
          summary
          location
          social {
            email
            github
            linkedin
          }
        }
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 120, height: 120, quality: 95) {
          src
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }) {
      nodes {
        html
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
