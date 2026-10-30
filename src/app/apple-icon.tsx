import { brandMarkSvg } from '@/lib/brandMark';

export const contentType = 'image/svg+xml';
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new Response(brandMarkSvg(180), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
