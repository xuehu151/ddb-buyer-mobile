#!/bin/bash
cd /home/app/webapps/
mv hhz-ddb-buyer-mobile-test ddb-buyer
cd /home/app/webapps/ddb-buyer/www
http-server -p 3000