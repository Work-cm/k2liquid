import { brandMarkSvg } from '@/lib/brandMark';

export const contentType = 'image/svg+xml';
export const size = { width: 32, height: 32 };

export default function Icon() {
  return new Response(brandMarkSvg(32), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
