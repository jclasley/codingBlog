const fs = require('fs');
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark';
import html from 'remark-html'
import highlight from 'remark-highlight.js';
import prism from 'remark-prism'

const postsDirectory = path.join(process.cwd(), 'algos')

export function getSortedAlgoData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allAlgoData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents, { excerpt_separator: '<!-- end -->' })

    // Combine the data with the id
    return {
      ...matterResult.data,
      id,
      excerpt: matterResult.excerpt
    }
  })
  // Sort posts by date
  return allAlgoData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllAlgoIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: { // must return an array of objects and each must have a params key
        id: fileName.replace(/\.md$/, '') // each obj must have a id property because that's what's used in [id].js
      }
    }
  })
}

export async function getAlgoData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to process markdown to HTML
  const processedContent = await remark()
    .use(html)
    .use(prism)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}