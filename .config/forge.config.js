export default {
  packagerConfig: {
    executableName: 'Warframe Name Generator',
    icon: './src/resources/win/logo.ico',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'wfcd-name-generator',
        exe: 'Warframe Name Generator.exe',
        loadingGif: './src/resources/logo_color.png',
        setupIcon: './src/resources/win/logo.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin',
        'linux',
      ],
    },
  ],
};
