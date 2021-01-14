(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.JSH = factory(global.React));
}(this, (function (React) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

	let Name = ({
	  name
	}) => {
	  return /*#__PURE__*/React__default['default'].createElement("div", null, "Hello ", name);
	};

	let Head = ({
	  children
	}) => {
	  // WIP
	  return null;
	};

	var index = ((props = {}) => {
	  let [names, setNames] = React.useState("User");
	  return /*#__PURE__*/React__default['default'].createElement("main", null, /*#__PURE__*/React__default['default'].createElement(Head, null, /*#__PURE__*/React__default['default'].createElement("title", null, "Hello")), /*#__PURE__*/React__default['default'].createElement(Head, null, /*#__PURE__*/React__default['default'].createElement("a", null)), /*#__PURE__*/React__default['default'].createElement("h1", null, /*#__PURE__*/React__default['default'].createElement(Name, {
	    name: names
	  })), /*#__PURE__*/React__default['default'].createElement("input", {
	    type: "text",
	    defaultValue: names,
	    onChange: event => setNames(event.target.value)
	  }));
	});

	return index;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvbmFtZS5qcyIsIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvSGVhZC5qcyIsIi4uLy4uLy4uLy4uL3ZpZXdzL3Bvc3QvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbIk5hbWUiLCJuYW1lIiwiUmVhY3QiLCJIZWFkIiwiY2hpbGRyZW4iLCJwcm9wcyIsIm5hbWVzIiwic2V0TmFtZXMiLCJ1c2VTdGF0ZSIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Q0FBQSxJQUFJQSxJQUFJLEdBQUcsQ0FBQztDQUFFQyxFQUFBQTtDQUFGLENBQUQsS0FBYztDQUN4QixzQkFBT0MsK0RBQVlELElBQVosQ0FBUDtDQUNBLENBRkQ7O0NDQUEsSUFBSUUsSUFBSSxHQUFHLENBQUM7Q0FBRUMsRUFBQUE7Q0FBRixDQUFELEtBQWtCO0NBQzVCO0NBRUEsU0FBTyxJQUFQO0NBQ0EsQ0FKRDs7QUNLQSxjQUFlLENBQUNDLEtBQUssR0FBRyxFQUFULEtBQWdCO0NBQzlCLE1BQUksQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLElBQW9CQyxjQUFRLENBQUMsTUFBRCxDQUFoQztDQUNBLHNCQUFPTixtRUFDTkEsd0NBQUMsSUFBRCxxQkFBTUEsK0RBQU4sQ0FETSxlQUVOQSx3Q0FBQyxJQUFELHFCQUFNQSxrREFBTixDQUZNLGVBR05BLGlFQUFJQSx3Q0FBQyxJQUFEO0NBQU0sSUFBQSxJQUFJLEVBQUVJO0NBQVosSUFBSixDQUhNLGVBSU5KO0NBQU8sSUFBQSxJQUFJLEVBQUMsTUFBWjtDQUFtQixJQUFBLFlBQVksRUFBRUksS0FBakM7Q0FBd0MsSUFBQSxRQUFRLEVBQUVHLEtBQUssSUFBSUYsUUFBUSxDQUFDRSxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsS0FBZDtDQUFuRSxJQUpNLENBQVA7Q0FNQSxDQVJEOzs7Ozs7OzsifQ==
