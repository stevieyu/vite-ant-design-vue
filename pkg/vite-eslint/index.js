const path = require('path');
const ESLint = require('eslint').ESLint;

module.exports = (options = {}) => {
  options = {
    extNames: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    formatter: 'friendly',
    fix: true,
    ...options,
  };

  const cwd = process.cwd();
  const eslint = new ESLint({
    cwd,
    fix: options.fix,
  });

  let formatter = null;

  const ck = cachedKey(5);

  return {
    transforms: [
      {
        test({path: filepath}) {
          return (
            filepath.startsWith(cwd) &&
            !filepath.includes('node_modules') &&
            options.extNames.includes(path.extname(filepath))
          );
        },
        async transform(ctx) {
          const {code, path: filepath, isBuild} = ctx;

          if (ck(filepath) || isBuild) return code;

          if (!formatter) {
            formatter = await eslint.loadFormatter(options.formatter || 'stylish');
          }

          const lintResultList = await eslint.lintFiles([filepath]);

          if (lintResultList && lintResultList.length) {
            if (options.fix) {
              await ESLint.outputFixes(lintResultList);
            }
            const text = formatter.format(lintResultList);

            if (text && text.trim().length) {
              console.log(text);
            }
          }

          return code;
        },
      },
    ],
  };
};

const cachedKey = (tls = 1) => {
  const keys = new Map();

  tls *= 1000;

  return (key) => {
    const now = Date.now();
    if (!keys.has(key) || keys.get(key) < now) {
      keys.set(key, now + tls);
      return false;
    }
    return true;
  };
};
