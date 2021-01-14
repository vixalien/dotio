(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.JSH = factory(global.React));
}(this, (function (React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var offline = (() => {
    if (process.browser) {
      navigator.ononline = () => location.reload();
    }

    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("main", null, /*#__PURE__*/React__default['default'].createElement("h1", null, "You are offline!"), /*#__PURE__*/React__default['default'].createElement("p", null, "We will reload when you get connected back")), /*#__PURE__*/React__default['default'].createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `
    	window.ononline = () => location.reload();
		`
      }
    }));
  });

  return offline;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdmlld3MvZGVmYXVsdC9vZmZsaW5lLmpzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJwcm9jZXNzIiwiYnJvd3NlciIsIm5hdmlnYXRvciIsIm9ub25saW5lIiwibG9jYXRpb24iLCJyZWxvYWQiLCJSZWFjdCIsIl9faHRtbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlCQUFlLE1BQU07RUFDcEIsTUFBSUEsT0FBTyxDQUFDQyxPQUFaLEVBQXFCO0VBQ3BCQyxJQUFBQSxTQUFTLENBQUNDLFFBQVYsR0FBcUIsTUFBTUMsUUFBUSxDQUFDQyxNQUFULEVBQTNCO0VBQ0E7O0VBQ0Esc0JBQU9DLCtGQUNOQSxtRUFDR0EsdUVBREgsZUFFR0EsZ0dBRkgsQ0FETSxlQUtMQTtFQUFRLElBQUEsdUJBQXVCLEVBQUU7RUFBQ0MsTUFBQUEsTUFBTSxFQUFHO0FBQy9DO0FBQ0E7RUFGcUM7RUFBakMsSUFMSyxDQUFQO0VBU0QsQ0FiRDs7Ozs7Ozs7In0=
