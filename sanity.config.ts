// ./sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
//import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'vs74rvxu';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
