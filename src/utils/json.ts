export function safeJsonParse<T>(val: unknown, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  if (Array.isArray(fallback)) {
    return safeJsonParseArray(val, fallback) as T;
  }
  if (typeof val === 'object') return val as T;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (parsed !== null && parsed !== undefined) return parsed as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export function safeJsonParseArray<T = string>(val: unknown, fallback: T[] = []): T[] {
  if (val === null || val === undefined) return fallback;
  if (Array.isArray(val)) return val as T[];
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed as T[];
      if (parsed && typeof parsed === 'object') return Object.values(parsed) as T[];
      if (parsed) return [parsed as T];
    } catch {
      return fallback;
    }
  }
  if (typeof val === 'object') {
    return Object.values(val as Record<string, T>);
  }
  return fallback;
}
