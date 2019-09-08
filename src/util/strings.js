// https://stackoverflow.com/a/18234317/4028896
const formatUnicorn = (str, args) => {
  if (arguments.length) {
    var key;

    for (key in args) {
      str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);
    }
  }

  return str;
};

export { formatUnicorn };
