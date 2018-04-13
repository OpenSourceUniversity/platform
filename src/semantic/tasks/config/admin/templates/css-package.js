var
  where = 'client' // Adds files only to the client
;

Package.describe({
  name    : 'semantic:ui-css',
  summary : 'Semantic UI - CSS Release of Semantic UI',
  version : '{version}',
  git     : 'git://github.com/Semantic-Org/Semantic-UI-CSS.git',
});

Package.onUse(function(api) {

  api.versionsFrom('1.0');

  api.use('jquery', 'client');

  api.addFiles([
    // icons
    'themes/osu/assets/fonts/icons.eot',
    'themes/osu/assets/fonts/icons.svg',
    'themes/osu/assets/fonts/icons.ttf',
    'themes/osu/assets/fonts/icons.woff',
    'themes/osu/assets/fonts/icons.woff2',

    // flags
    'themes/osu/assets/images/flags.png',

    // release
    'semantic.css',
    'semantic.js'
  ], 'client');

});
