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

  // if (posts.length === 0) {
  //   return (
  //     <Layout location={location} title={siteTitle}>
  //       <Bio />
  //       <p>
  //         No blog posts found. Add markdown posts to "content/blog" (or the
  //         directory you specified for the "gatsby-source-filesystem" plugin in
  //         gatsby-config.js).
  //       </p>
  //     </Layout>
  //   )
  // }

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
      {/* <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          console.log(post)

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol> */}
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
