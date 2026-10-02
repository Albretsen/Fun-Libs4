module.exports = function (api) {
	api.cache(true);
	return {
		// unstable_transformImportMeta: zustand's ESM build (used on web) reads
		// import.meta, which Metro's non-module web bundle can't parse.
		presets: [['babel-preset-expo', { unstable_transformImportMeta: true }]],
	};
};
