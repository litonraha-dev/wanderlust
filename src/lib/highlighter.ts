// Streams-highlighted code on top of shiki. `loadHighlighter` is async (it
// spins up the shared shiki instance and resolves the language), and once
// loaded the returned highlighter tokenizes synchronously so the
// `useHighlightedCode` hook can tokenize line-by-line during rendering.

import * as React from "react"

import {
  createHighlighter,
  type BundledLanguage,
  type BundledTheme,
  type GrammarState,
  type ThemedToken,
} from "shiki"

const THEME: BundledTheme = "github-light"

// A plain-text fallback for unknown languages ("text" is handled
// specially by shiki, without needing a grammar).
const PLAIN = "text"

const LANGUAGES: BundledLanguage[] = [
  "bash",
  "c",
  "css",
  "diff",
  "go",
  "html",
  "java",
  "javascript",
  "json",
  "jsonc",
  "jsx",
  "markdown",
  "mdx",
  "python",
  "scss",
  "shellscript",
  "sql",
  "tsx",
  "typescript",
  "xml",
  "yaml",
]

const SUPPORTED = new Set<string>([...LANGUAGES, PLAIN])

export interface Highlighter {
  highlight(
    text: string,
    state?: GrammarState
  ): { lines: React.ReactNode[]; state?: GrammarState }
}

let corePromise: Promise<Awaited<ReturnType<typeof createHighlighter>>> | null =
  null

const instances = new Map<string, Promise<Highlighter>>()

function getCore() {
  if (!corePromise) {
    corePromise = createHighlighter({
      themes: [THEME],
      langs: LANGUAGES,
    })
  }

  return corePromise
}

function resolveLanguage(language: string): string {
  return SUPPORTED.has(language) ? language : PLAIN
}

export function loadHighlighter(language: string): Promise<Highlighter> {
  let promise = instances.get(language)

  if (!promise) {
    promise = getCore().then((core) =>
      createLanguageHighlighter(core, resolveLanguage(language))
    )

    instances.set(language, promise)
  }

  return promise
}

function createLanguageHighlighter(
  core: Awaited<ReturnType<typeof createHighlighter>>,
  lang: string
): Highlighter {
  return {
    highlight(text: string, state?: GrammarState) {
      // The tokenization is synchronous because the core instance was created
      // with all needed languages and themes preloaded. Unknown languages fall
      // back to plain text (passed as a plain-text language id to shiki).
      const result = core.codeToTokens(text, {
        lang: lang as BundledLanguage,
        theme: THEME,
        grammarState: state,
      })

      return {
        lines: result.tokens.map((line, lineIndex) =>
          line.length === 0
            ? "\n"
            : React.createElement(
                React.Fragment,
                { key: lineIndex },
                line.map((token, tokenIndex) =>
                  React.createElement(
                    "span",
                    { key: tokenIndex, style: tokenStyle(token) },
                    token.content
                  )
                )
              )
        ),
        state: result.grammarState,
      }
    },
  }
}

const FontStyle = {
  Italic: 1,
  Bold: 2,
  Underline: 4,
}

function tokenStyle(token: ThemedToken): React.CSSProperties {
  const style: React.CSSProperties = {}

  if (token.color) style.color = token.color

  if (typeof token.fontStyle === "number") {
    if (token.fontStyle & FontStyle.Italic) style.fontStyle = "italic"
    if (token.fontStyle & FontStyle.Bold) style.fontWeight = "bold"
    if (token.fontStyle & FontStyle.Underline) style.textDecoration = "underline"
  }

  return style
}
