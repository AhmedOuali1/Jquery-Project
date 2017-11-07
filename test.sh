#!/bin/bash
cd /tmp
sudo wget https://nodejs.org/dist/v7.5.0/node-v7.5.0-linux-x64.tar.xz
sudo tar xvf node-v7.5.0-linux-x64.tar.xz
sudo rm node-v7.5.0-linux-x64.tar.xz
cd node-v7.5.0-linux-x64/
sudo cp * /usr/local/ -r
sudo node -v
if [ $? = "0" ] 
then
    echo "installation terminé avec succes"
fi
