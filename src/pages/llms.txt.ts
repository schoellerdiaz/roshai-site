import { llmInfoRaw } from '../lib/content';
export const GET = () => new Response(llmInfoRaw(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
