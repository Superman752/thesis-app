type ClassDictionary = Record<string, boolean | undefined | null>;
type ClassValue = string | number | boolean | undefined | null | ClassValue[] | ClassDictionary;

/**
 * Minimal clsx-style class joiner. Supports strings, numbers, arrays, and
 * object maps ({ "class": condition }) so Magic UI / shadcn components that
 * pass conditional object classes resolve correctly. No external dependency.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const process = (val: ClassValue): void => {
    if (val === null || val === undefined || val === false || val === true) return;
    if (typeof val === 'string' || typeof val === 'number') {
      if (val !== '') out.push(String(val));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(process);
      return;
    }
    if (typeof val === 'object') {
      for (const key in val) {
        if (val[key]) out.push(key);
      }
    }
  };

  inputs.forEach(process);
  return out.join(' ');
}
