module.exports = {
  apps: [{
    name: 'lainbo-blog',
    script: 'yarn',
    args: 'start',
    hooks: {
      pre_reboot: 'yarn build'
    }
  }]
};
