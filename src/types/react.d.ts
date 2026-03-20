// Minimal React typings for compilation in this repo.
// EverShop provides React at runtime; we only need TypeScript to compile.
declare module 'react' {
  const React: {
    createElement: (...args: any[]) => any;
    useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  };

  export default React;
}

