#!/bin/bash
#palakoti's script to install R and R server ; environment for building webapps using R.
yum install -y R 
wget https://download2.rstudio.org/rstudio-server-rhel-0.99.465-x86_64.rpm
yum install -y --nogpgcheck rstudio-server-rhel-0.99.465-x86_64.rpm 
R -e "install.packages('shiny', repos='http://cran.rstudio.com/')"
wget https://download3.rstudio.org/centos5.9/x86_64/shiny-server-1.4.0.718-rh5-x86_64.rpm
yum install -y --nogpgcheck shiny-server-1.4.0.718-rh5-x86_64.rpm
 