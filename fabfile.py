from fabric.api import env, require, cd, run

env.hosts = ['doralproperties.us']
env.user = 'deploy'
env.deploy_path = '~/apps/doralproperties'


def deploy():
    require('deploy_path')

    with cd(env.deploy_path):
        run('git pull')
        run('grunt')
