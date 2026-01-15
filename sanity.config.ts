'use client'
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
  
      {
        id: "note-observation",
        title: "Note: Observation",
        schemaType: "note",
        value: {
          public: true,
          pinned: false,
          publishedAt: new Date().toISOString(),
          text: [
            {
              _type: "block",
              children: [{ _type: "span", text: "" }],
            },
          ],
        },
      },
  
      {
        id: "note-headline-framing",
        title: "Note: Headline framing",
        schemaType: "note",
        value: {
          public: true,
          pinned: false,
          publishedAt: new Date().toISOString(),
          text: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "What assumption does this headline smuggle in?",
                },
              ],
            },
          ],
        },
      },
  
      {
        id: "note-question",
        title: "Note: Question",
        schemaType: "note",
        value: {
          public: true,
          pinned: false,
          publishedAt: new Date().toISOString(),
          text: [
            {
              _type: "block",
              children: [{ _type: "span", text: "Question: " }],
            },
          ],
        },
      },
    ],
  },
  plugins: [structureTool({ structure })],
});