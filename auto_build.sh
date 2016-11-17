#! /bin/bash
# 自动build脚本
SITE_PATH='/export/Data/aotu.jd.com/index/cnt1992.github.io'
USER='admin'
USERGROUP='admin'
cd $SITE_PATH
git reset --hard origin/master
git clean -f
git pull
git checkout master
chown -R $USER:$USERGROUP $SITE_PATH