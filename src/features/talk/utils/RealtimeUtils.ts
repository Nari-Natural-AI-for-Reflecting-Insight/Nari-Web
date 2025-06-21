const atobFn: (data: string) => string = globalThis.atob;
const btoaFn: (data: string) => string = globalThis.btoa;

/* 객체 리터럴 형태의 Realtime 유틸리티 */
export const RealtimeUtils = {
  /* Float32Array → Int16Array(ArrayBuffer) */
  floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0, offset = 0; i < float32Array.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
  },

  /** base64 → ArrayBuffer */
  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const bin = atobFn(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {bytes[i] = bin.charCodeAt(i);}
    return bytes.buffer;
  },

  /* ArrayBuffer / Int16Array / Float32Array → base64 */
  arrayBufferToBase64(
    data: ArrayBuffer | Int16Array | Float32Array,
  ): string {
    if (data instanceof Float32Array) {data = this.floatTo16BitPCM(data);}
    else if (data instanceof Int16Array) {data = data.buffer;}

    const bytes = new Uint8Array(data);
    const chunk = 0x8000;
    let binary = '';
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk) as any);
    }
    return btoaFn(binary);
  },

  /* 두 Int16Array 병합 */
  mergeInt16Arrays(
    left: ArrayBuffer | Int16Array,
    right: ArrayBuffer | Int16Array,
  ): Int16Array {
    const l = left instanceof ArrayBuffer ? new Int16Array(left) : left;
    const r = right instanceof ArrayBuffer ? new Int16Array(right) : right;
    if (!(l instanceof Int16Array) || !(r instanceof Int16Array)) {
      throw new Error('Both items must be Int16Array');
    }
    const merged = new Int16Array(l.length + r.length);
    merged.set(l);
    merged.set(r, l.length);
    return merged;
  },

  /* prefix를 붙인 랜덤 ID 생성 */
  generateId(prefix: string, length = 21): string {
    const chars =
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const random = Array.from({ length: length - prefix.length }, () =>
      chars[Math.floor(Math.random() * chars.length)],
    ).join('');
    return `${prefix}${random}`;
  },
}