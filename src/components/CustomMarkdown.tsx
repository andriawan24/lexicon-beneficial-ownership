import { MDXRemote } from "next-mdx-remote/rsc";
import React, { ReactElement } from "react";

interface Props {
  source: string;
}

export default function CustomMarkdown(props: Props): ReactElement {
  return (
    <MDXRemote
      source={props.source}
      components={{
        h1: (elements) => (
          <h1 {...elements} className="text-xl font-semibold">
            {elements.children}
          </h1>
        ),
        ul: (elements) => <ul {...elements}>{elements.children}</ul>,
        li: (elements) => (
          <li {...elements} className="list-disc ml-4">
            {elements.children}
          </li>
        ),
      }}
    />
  );
}
